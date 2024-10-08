import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Text,
  Flex,
  useMediaQuery,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, ReactNode, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { linksArrayAtom, linksAtom, useLineIconsAtom } from 'core/atoms';
import { LinkIcon } from 'components/logos';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import AddLinkButton from './AddLinkButton';
import ManageLink from './ManageLink';
import { capFirstLetter, arrayRemove, setOrderInCustomLinks } from 'core/utils';
import { CustomLink, SortableItemProps, SortableConProps, Styles } from 'types';
import { IPFS_IMAGE_URI } from 'core/utils/constants';
import useUploadJsonFile from 'core/lib/hooks/use-upload';
import { client } from 'components/walletConnect';

interface Props {
  json: any;
}

export default function ManageLinks({ json }: Props) {
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [linksArray, setLinksArray] = useAtom(linksArrayAtom);
  const [links, setLinks] = useAtom(linksAtom);
  const [notMobile] = useMediaQuery('(min-width: 800px)');
  const { colorMode } = useColorMode();
  const toast = useToast();
  const SortableCon = SortableContainer<SortableConProps>(
    ({ children }: { children: ReactNode }) => {
      return <ul>{children}</ul>;
    }
  );
  const { isLoading, data, hasError, uploadJsonFile } = useUploadJsonFile({client: client});

  const setEditedLinks = async (index: number, title: string, url: string, image: string, content: string, styles: Styles) => {
    let __content = content;
    if(content.length > 300){
      toast({
        title: 'Uploading to IPFS',
        description:'Uploading link content to IPFS to reduce gas costs',
        status: 'loading',
        duration: null,
        isClosable : false
      })
      __content = await uploadJsonFile(JSON.stringify(content),title.replaceAll(' ','-'));
      if(hasError){
        toast.closeAll();
        toast({
          title: 'Error on Uploading to IPFS',
          description:'Can not upload to IPFS, please check your network. If the problem presists, please contact support at info@soneium.domains',
          status: 'warning',
          isClosable : true
        })
        return;
      } else {
        toast.closeAll();
      }
      console.log("Link too bug",__content);
    }

    let _newLinksArray = linksArray.map((item, ind) =>
      ind === index
        ? {
            type: item.type,
            title,
            url,
            image,
            content: __content,
            styles,
          }
        : {
            type: item.type,
            title: item.title,
            url: item.url,
            image: item.image,
            content: item.content,
            styles: item.styles,
          }
    );
    setLinksArray(_newLinksArray);
    const _links = setOrderInCustomLinks(_newLinksArray)
    setLinks(_links);
  };

  const removeLink = (index: number) => {
    // Remove the link at the given index
    const _newLinksArray = arrayRemove(linksArray, index);
  
    // Update the styles.order property for the remaining items
    const updatedLinksArray = _newLinksArray.map((link: CustomLink, idx : number) => ({
      ...link,
      styles: {
        ...(link.styles || {}),
        order: idx, // Set the new order based on the updated index
      },
    }));
  
    // Set the updated links array
    setLinksArray(updatedLinksArray);
    setLinks(updatedLinksArray);
  };

  // @ts-ignore: Unreachable code error
  const SortableItem = SortableElement<SortableItemProps>(
    ({ children }: { children: ReactNode }) => (
      <li style={{ listStyleType: 'none', padding: '0px 0px', margin: '12px 0px' }}>{children}</li>
    )
  );

  useEffect(() => {
    let _links: CustomLink[] = [];
    if (json?.links) {
      json?.links.map((link: CustomLink) => {
        _links.push({
          type: link.type,
          title: link.title,
          url: link.url,
          image: link.image,
          content: link.content,
          styles: link.styles,
        });
      });
    }

    if(_links.length > 0){
    // @ts-ignore: Unreachable code error
    setLinksArray(setOrderInCustomLinks(_links));
    setLinks(setOrderInCustomLinks(_links));
    }
  }, [json.links]);

  // @ts-ignore: Unreachable code error
  const onSortEnd = ({ oldIndex, newIndex }) => {
    // Reorder the array using arrayMoveImmutable
    const newLinksArray = arrayMoveImmutable(links, oldIndex, newIndex);
  
    // Update the styles.order property to reflect the new order
    const updatedLinksArray = newLinksArray.map((link, index) => ({
      ...link,
      styles: {
        ...(link.styles || {}),
        order: index, // Set the new order based on the index
      },
    }));
  
    // Set the reordered and updated links array
    setLinksArray(updatedLinksArray);
    setLinks(updatedLinksArray);
  };

  return (
    <>
      {links && <Accordion
        allowToggle
        allowMultiple={false}
        borderRadius={10}
        minWidth={'100%'}
        size="lg"
        key={'links-box-'+links.length}
        backgroundColor={colorMode === 'dark' ? 'whiteAlpha.100' : 'blackAlpha.100'}
        display={'flex'}
        className="links">
        <AccordionItem border={0} borderRadius={10} width={'100%'}>
          <AccordionButton
            minWidth={'100%'}
            as={Button}
            size="lg"
            _expanded={{ bgColor: 'blackAlpha.50' }}>
            <Flex gap={2} alignItems={'center'} textAlign="left" width={'100%'}>
              <Text fontWeight={'bold'} display={'flex'} flex={1}>
                Links & NFTs
              </Text>
              <AccordionIcon />
            </Flex>
          </AccordionButton>

          <AccordionPanel pb={4} minWidth="100%">
            <Stack gap={2}>
              <AddLinkButton />

              <SortableCon onSortEnd={onSortEnd} useDragHandle>
                <>
                  {links.map((item, index) => (
                    <SortableItem key={`item-${item.title}-${index}`} index={index}>
                      <>
                        <ManageLink
                          icon={
                            <LinkIcon
                              type={item.styles?.icon ?? item.type}
                              line={useLineIcons}
                              size={
                                String(item.styles?.icon).includes(IPFS_IMAGE_URI) ? 'md' : '28px'
                              }
                            />
                          }
                          title={item.title}
                          image={item.image}
                          url={item.url}
                          type={item.type}
                          content={item.content}
                          styles={item.styles}
                          ind={index}
                          setUrl={setEditedLinks}
                          removeUrl={removeLink}
                        />
                      </>
                    </SortableItem>
                  ))}
                </>
              </SortableCon>
            </Stack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>}
    </>
  );
}
