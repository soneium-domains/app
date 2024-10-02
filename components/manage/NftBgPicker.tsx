import {
  Button,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  IconButton,
  SimpleGrid,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { avatarAtom, bgColorAtom, lightModeAtom } from 'core/atoms';
import { RiCheckDoubleLine, RiCheckLine } from 'react-icons/ri';
import { BG_COLORS, BG_IMAGES } from 'core/utils/constants';

export default function NftBgPicker() {
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const avatar = useAtom(avatarAtom);
  const setLightMode = useSetAtom(lightModeAtom);
  const lightMode = useColorMode().colorMode === 'light';
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState<string[]>();
  const [loaded, setLoaded] = useState(false);
  const [nftjsons, setNftJsons] = useState<any[] | undefined>(undefined);

 

  return (
    <>
      <Accordion
        allowToggle
         onChange={(e) => {
          if(e === 0){
          } else {
            //
          }
        }}
        allowMultiple={false}
        borderRadius={0}
        size="lg"
        display={'flex'}
        flexGrow={1}>
        <AccordionItem border={0} borderRadius={0} width={'100%'}>
          <AccordionButton
            as={Button}
            height={['44px', '52px']}
            _expanded={{ bgColor: lightMode ? BG_COLORS[4].color : BG_COLORS[2].color }}
            _hover={{ bgColor: lightMode ? BG_COLORS[4].color : BG_COLORS[2].color }}
            px={4}
            variant="solid"
            borderRadius={0}
            width={'100%'}
            justifyContent="space-between">
            <Text fontSize={'lg'}>Background Image</Text>
            <IconButton
              size={'sm'}
              aria-label="bg-image-picker"
              bg={bgColor}
              bgSize={'cover'}></IconButton>
          </AccordionButton>
          <AccordionPanel py={4} bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color} gap={2} display={'flex'} flexDir={'column'}>
            <SimpleGrid columns={[3]} gap={2}>
              {BG_IMAGES.map((bg) => (
                <IconButton
                  height={'180px'}
                  aria-label="bg-image-picker-item"
                  bg={bg.bg}
                  key={'bg-image-picker-item-' + bg.bg}
                  bgSize={'cover'}
                  onClick={() => {
                    setBgColor(bg.bg);
                    setLightMode(bg.lightMode);
                  }}
                  size={'lg'}
                  borderColor={'green'}
                  border={bgColor === bg.bg ? '4px' : '0px'}>
                  {bgColor === bg.bg && (
                    <RiCheckLine
                      size={24}
                      color={bg.lightMode ? 'var(--dark1)' : 'var(--lightGrey)'}
                    />
                  )}
                </IconButton>
              ))}
            </SimpleGrid>
            {nftjsons && <SimpleGrid columns={[3]} gap={2}>
              {nftjsons.map((nft) => (
                <IconButton
                  height={'180px'}
                  aria-label="bg-image-picker-item"
                  bg={`url('${nft.avatar}')`}
                  key={'bg-image-picker-item-' + nft.name}
                  bgSize={'cover'}
                  onClick={() => {
                    setBgColor(`url('${nft.avatar}')`);
                  }}
                  size={'lg'}
                  borderColor={'green'}
                  border={bgColor === `url('${nft.avatar}')` ? '4px' : '0px'}>
                  {bgColor === `url('${nft.avatar}')` && (
                    <RiCheckLine
                      size={24}
                    />
                  )}
                </IconButton>
              ))}
            </SimpleGrid>}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
