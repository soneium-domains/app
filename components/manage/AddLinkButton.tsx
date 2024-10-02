import {
  InputRightElement,
  useDisclosure,
  IconButton,
  Button,
  Tooltip,
  Textarea,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  useMediaQuery,
  useColorMode,
  Input,
  InputGroup,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  SimpleGrid,
  Switch,
  Flex,
  useToast,
  ButtonGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  RiAddFill,
  RiArrowLeftLine,
  RiCheckLine,
  RiFileCopy2Line,
  RiUploadCloudLine,
} from "react-icons/ri";
import { useAtom, useAtomValue } from "jotai";
import {
  addLinkContentAtom,
  addLinkImageAtom,
  addLinkStylesAtom,
  addLinkTitleAtom,
  addLinkTypeAtom,
  addLinkUrlAtom,
  addressAtom,
  btcAtom,
  ethAtom,
  linksArrayAtom,
  openAddAtom,
  openAddLinkAtom,
  useLineIconsAtom,
} from "core/atoms";
import { capFirstLetter } from "core/utils";
import { useStorageUpload } from "@thirdweb-dev/react";
import { LinkIcon } from "components/logos";
import { ImageLink, Link } from "components/Profile";
import AddNFTAvatar from "./AddNFTAvatar";
import {
  AVAILABLE_LINKS,
  EXAMPLE_LINK_URLS,
  IPFS_IMAGE_URI,
  OPENSEA_URL,
} from "core/utils/constants";
import { LinkType, Styles } from "types";
import NftLink from "components/Profile/NftLink";
import SelectOptionButton from "./SelectOptionButton";
import ManageSimpleLink from "./ManageSimpleLink";
import ManageUpload from "./ManageUpload";
import ManageDonate from "./ManageDonate";
import ManageNftGallery from "./ManageNftGallery";
import SettingsButton from "./SettingButton";
import ManageNftSlider from "./ManageNftSlider";
import ManageEmbedLink from "./ManageEmbedLink";
import ManageBlock from "./ManageBlock";
import useUploadJsonFile from "core/lib/hooks/use-upload";
import { client } from "components/walletConnect";

export default function AddLinkButton() {
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [_open, _setOpen] = useAtom(openAddLinkAtom);
  const [_type, _setType] = useAtom(addLinkTypeAtom);
  const _title = useAtomValue(addLinkTitleAtom);
  const _image = useAtomValue(addLinkImageAtom);
  const _url = useAtomValue(addLinkUrlAtom);
  const _content = useAtomValue(addLinkContentAtom);
  const _styles = useAtomValue(addLinkStylesAtom);
  const ethAddress = useAtomValue(ethAtom);
  const btcAddress = useAtomValue(btcAtom);
  const { colorMode } = useColorMode();
  const [linksArray, setLinksArray] = useAtom(linksArrayAtom);
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const [type, setType] = useState("");
  const [_back, _setBack] = useAtom(openAddAtom);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [styles, setStyles] = useState<Styles>({});
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? "";
  const toast = useToast();
  const { isLoading, data, hasError, uploadJsonFile } = useUploadJsonFile({client: client});

  useEffect(() => {
    if (_open) {
      setType(_type);
      setTitle(_title);
      setImage(_image);
      setUrl(_url);
      setContent(_content);
      setStyles(_styles);
      onOpen();
    } else {
      _setType("");
    }
  }, [_open]);

  const addToLinks = async () => {
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
    let _newLinksArray = [
      {
        type,
        title,
        url,
        image,
        content : __content,
        styles,
      },
      ...linksArray,
    ];

    console.log(_newLinksArray);

    setLinksArray(_newLinksArray);
    //// console.log(_newLinksArray);
    setType("");
    setTitle("");
    setImage("");
    setUrl("");
    setContent("");
    setStyles({});
    _setOpen(false);
    onClose();
  };

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  const addLink = (item: LinkType) => {
    if (item?.av) {
      setTitle("");
      setUrl("");
      setImage("");

      switch (item.type) {
        case "donate":
        case "pay":
          setStyles({
            size: "md",
          });
          break;

        case "simple link":
          setStyles({
            size: "md",
            icon: "RiLinksLine",
          });
          break;

        default:
          setStyles({ size: "md" });
          break;
      }

      setContent("");
      _setOpen(false);
      setType(item.type);
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setType("");
          onOpen();
        }}
        flexDir={"column"}
        gap={4}
        variant={"pop"}
        rounded={"xl"}
        height={100}
      >
        Add Block, NFT Gallery, Button ...
        <Flex gap={2}>
          <LinkIcon type="text" line={useLineIcons} />
          <LinkIcon type="simple link" line={useLineIcons} />
          <LinkIcon type="nft link" line={useLineIcons} color="dark" />
          <LinkIcon type="youtube video" line={useLineIcons} />
          <Text fontSize={"xl"}>+8</Text>
        </Flex>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
        size={["full", "full", "lg", "xl", "2xl"]}
      >
        <ModalOverlay
          bg="blackAlpha.700"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent
          bg={colorMode === "dark" ? "var(--dark1)" : "var(--white)"}
          minHeight={"80vh"}
        >
          <ModalHeader display="flex" gap={2} alignItems={"center"}>
            <IconButton
              variant={"ghost"}
              aria-label="back-to-add-modal"
              onClick={() => {
                if (!type) {
                  _setBack(true);
                  onClose();
                } else {
                  setType("");
                }
              }}
            >
              <RiArrowLeftLine size={"28"} />
            </IconButton>{" "}
            Add New {type ? capFirstLetter(type) : ""}
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            {type ? (
              <Stack gap={4}>
                {type && (
                  <>
                    <InputGroup size="lg" minWidth="xs" borderColor="gray">
                      <Input
                        isDisabled={type === ""}
                        value={title}
                        variant="filled"
                        placeholder={`Enter ${capFirstLetter(type)} Title`}
                        fontWeight="bold"
                        onChange={(e) => setTitle(e.currentTarget.value)}
                      />
                    </InputGroup>
                  </>
                )}

                {(type.includes("link") ||
                  type.includes("video") ||
                  type.includes("tweet") ||
                  type.includes("soundcloud")) && (
                  <ManageSimpleLink
                    type={type}
                    url={url}
                    setUrl={setUrl}
                    styles={styles}
                    setStyles={setStyles}
                  />
                )}

                {type.includes("embed") && (
                  <ManageEmbedLink
                    preview
                    title={title}
                    type={type}
                    url={url}
                    setUrl={setUrl}
                    styles={styles}
                    setStyles={setStyles}
                  />
                )}

                {(type.includes("youtube") ||
                  type.includes("tweet") ||
                  type.includes("soundcloud")) &&
                  RegExp(reg, "i").test(url) && (
                    <Link
                      type={type}
                      title={title}
                      url={url}
                      styles={styles}
                      content={content}
                      image={image}
                    />
                  )}

                {(type.includes("image") || type.includes("pdf")) && (
                  <ManageUpload
                    type={type}
                    setUrl={setUrl}
                    setImage={setImage}
                    galleryItems={6}
                    image={image}
                  />
                )}

                {(type.includes("simple link") ||
                  type.includes("image") ||
                  type.includes("pdf")) && (
                  <>
                    {/* <SelectOptionButton
                      options={[true, false]}
                      value={String(styles?.popup) ?? false}
                      setValue={(e: any) => setStyles({ ...styles, popup: e })}
                      title="Open In Pop Up"
                    /> */}
                    {(image || url) && (
                      <Link
                        type={type}
                        title={title ? title : capFirstLetter(type)}
                        icon={
                          <LinkIcon
                            type={
                              type === "simple link"
                                ? String(styles.icon)
                                : type
                            }
                            line={useLineIcons}
                            size={
                              String(styles?.icon).includes(IPFS_IMAGE_URI)
                                ? styles?.size
                                : styles?.size === "sm"
                                ? "24"
                                : styles?.size === "md"
                                ? "28"
                                : "36"
                            }
                          />
                        }
                        url={url}
                        image={image}
                        styles={styles}
                      />
                    )}
                  </>
                )}

                {type.indexOf("nft link") >= 0 && (
                  <>
                    <AddNFTAvatar defaultType="nft" key="add-nft-modal" />
                    {content && (
                      <>
                        <SelectOptionButton
                          options={["sm", "md", "lg"]}
                          value={String(styles?.size)}
                          setValue={(e: any) =>
                            setStyles({ ...styles, size: e })
                          }
                          title="Size"
                        />

                        <SettingsButton
                          title="Explorer Link"
                          value={styles?.scanLink ?? false}
                          setValue={(e: any) =>
                            setStyles({ ...styles, scanLink: e })
                          }
                        />

                        <Flex gap={2} width={"100%"}>
                          <Button
                            flexGrow={1}
                            variant={
                              url.includes(OPENSEA_URL) ? "outline" : "solid"
                            }
                            onClick={() =>
                              setUrl(
                                url.length > 0
                                  ? ""
                                  : OPENSEA_URL +
                                      styles.network +
                                      JSON.parse(String(content)).address
                              )
                            }
                          >
                            {url.length > 0
                              ? "Remove Link To Opensea"
                              : "Link To Opensea"}
                          </Button>
                        </Flex>
                        <NftLink
                          url={String(image)}
                          link={url}
                          title={title}
                          styles={styles}
                          address={String(content)}
                          alt={title}
                          color={colorMode === "light" ? "dark" : "white"}
                        />
                      </>
                    )}
                  </>
                )}

                {type.includes("nft gallery") && (
                  <ManageNftGallery
                    title={title}
                    type={type}
                    content={String(content)}
                    setContent={setContent}
                    setStyles={setStyles}
                    styles={styles ? styles : {}}
                    preview
                  />
                )}

                {type.includes("nft slider") && (
                  <ManageNftSlider
                    title={title}
                    type={type}
                    content={String(content)}
                    setContent={setContent}
                    setStyles={setStyles}
                    styles={styles ? styles : {}}
                    preview
                  />
                )}

                {type.indexOf("text") >= 0 && (
                  <Textarea
                    minWidth="xs"
                    my={2}
                    rows={5}
                    maxLength={500}
                    placeholder={"Simple Text ..."}
                    size="lg"
                    bg={
                      colorMode === "dark" ? "whiteAlpha.100" : "blackAlpha.100"
                    }
                    variant="outline"
                    border="none"
                    resize={"none"}
                    value={content}
                    onChange={(e) => setContent(e.currentTarget.value)}
                  />
                )}

                {type.indexOf("text") >= 0 ||
                  (type.indexOf("heading") >= 0 && (
                    <SelectOptionButton
                      options={["sm", "md", "lg"]}
                      value={String(styles?.size)}
                      setValue={(e: any) => setStyles({ ...styles, size: e })}
                      title="Size"
                    />
                  ))}

                {(type.includes("donate") || type.includes("pay")) && (
                  <ManageDonate
                    title={title}
                    type={type}
                    content={String(content)}
                    setContent={setContent}
                    setStyles={setStyles}
                    styles={styles ? styles : {}}
                    preview
                  />
                )}

                {type.includes("block") && (
                  <ManageBlock
                    title={title}
                    type={type}
                    content={String(content)}
                    setContent={setContent}
                    setStyles={setStyles}
                    styles={styles ? styles : {}}
                  />
                )}
              </Stack>
            ) : (
              <SimpleGrid columns={[1]} gap={2} pb={2}>
                {AVAILABLE_LINKS.map(
                  (item) =>
                    item !== undefined && (
                      <Button
                        gap={4}
                        fontWeight={"bold"}
                        fontSize={"xl"}
                        key={item?.type}
                        justifyContent={"left"}
                        size={"lg"}
                        height={"64px"}
                        onClick={() => addLink(item)}
                      >
                        {item.av && (
                          <LinkIcon type={item.type} line={useLineIcons} />
                        )}
                        {!item?.av && (
                          <Badge variant="solid" colorScheme="gray" p={1.5}>
                            Soon
                          </Badge>
                        )}
                        {capFirstLetter(item.type)}
                      </Button>
                    )
                )}
              </SimpleGrid>
            )}
          </ModalBody>
          {type && (
            <ModalFooter gap={2} justifyContent={"left"}>
              <Button
                color="white"
                bgColor="var(--base1)"
                isDisabled={type === undefined || title === ""}
                isLoading={isLoading}
                onClick={() => {
                  if (new RegExp(reg, "i").test(url)) {
                    addToLinks();
                  } else {
                    toast({
                      status: "warning",
                      title: "Invalid URL",
                      description:
                        "Please enter the url in the required format",
                      duration: 3000,
                    });
                  }
                }}
              >
                Add
              </Button>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
