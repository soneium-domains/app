import {
  useDisclosure,
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Text,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Drawer,
  SimpleGrid,
  Center,
  Box,
  Spinner,
  Stack,
  Image,
  HStack,
  Tooltip,
  Link,
  DarkMode,
  LightMode,
} from "@chakra-ui/react";
import React, { createRef, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  buttonBgColorAtom,
  ethAtom,
  lightModeAtom,
  roundAtom,
  variantAtom,
} from "core/atoms";
import {
  capFirstLetter,
  checkGradientBrightness,
  getColor,
  getMimeType,
  getRandomNumber,
  sleep,
  truncAddress,
} from "core/utils";
import { LinkIcon } from "components/logos";
import {
  AVATAR_API_URL,
  ETHERSCAN_URLS,
  MARKETPLACE_URLS,
} from "core/utils/constants";
import { Avatar } from "components/Profile";
import { RiCloseLine, RiExternalLinkLine, RiRestartLine } from "react-icons/ri";
import axios from "axios";
import { ThirdwebNftMedia } from "@thirdweb-dev/react";
import { Styles } from "types";
import ReactPlayer from "react-player";
import NftSlider from "./NftSlider";
import SimpleLink from "./SimpleLink";

interface Props {
  title: string;
  url?: string;
  icon?: JSX.Element;
  image?: string;
  content?: string;
  styles?: Styles;
  color?: string;
  type: string;
}

export default function NftGallery({
  url,
  title,
  type,
  icon,
  content,
  styles,
  color,
}: Props) {
  const { colorMode } = useColorMode();
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [nftjsons, setNftJsons] = useState<any[] | undefined>(undefined);
  const [nftjson, setNftJson] = useState<any | undefined>(undefined);
  const isPortfolio = styles?.type === "My Portfolio";
  const address = String(styles?.eth);
  const mode = String(styles?.mode);
  const bgColor = String(styles?.bg);
  const network = String(styles?.network).toLowerCase();
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);

  function fullScreen(index: number) {
    setNftJson(nftjsons && nftjsons[index]);
    onModalOpen();
  }

  const getApiUrl = (chain: string, _address: string) => {
    if (isPortfolio) {
      return `https://api.opensea.io/api/v2/chain/${chain}/account/${_address}/nfts`;
    } else {
      return `https://api.opensea.io/api/v2/chain/${chain}/contract/${_address}/nfts`;
    }
  };

  const loadNFTs = async () => {
    setNftJsons([]);
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": String(process.env.NEXT_PUBLIC_OPENSEA_API),
        },
      };

      await fetch(getApiUrl(network, address), options)
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          (response?.nfts).map((nft: any) => {
            const _nftJson = {
              name: nft.name,
              tokenId: nft.identifier,
              description: nft.description,
              address: nft.contract,
              network: network,
              metadata: nft.metadata_url,
              preview: {
                source: nft.display_image_url,
                mimetype: getMimeType(nft.image_url),
              },
              files: [
                {
                  source: nft.image_url,
                  mimetype: getMimeType(nft.image_url),
                },
              ],
            };
            nft.name !== null &&
              setNftJsons((nfts) => [...(nfts ? nfts : []), _nftJson]);
          });
        })
        .catch((err) => console.error(err));

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const onDrawerClose = () => {
    onClose();
  };

  useEffect(() => {
    async function getNfts() {
      if (isOpen) {
        loadNFTs();
      }
    }
    if (isOpen || mode !== "title") {
      getNfts();
    }
  }, [isOpen, network]);

  return (
    <>
      {mode !== "slider" ? (
        <SimpleLink key={`simple-link-${getRandomNumber(0,9999999999999)}`} title={title} styles={styles} onClick={onOpen} url="#" icon={icon} type={type} />
      ) : (
        <NftSlider
          title={title}
          styles={styles}
          content={content}
          color={color}
          onButtonClick={onOpen}
          buttonTitle={"View All"}
        />
      )}
      <Drawer
        onClose={onDrawerClose}
        isOpen={isOpen}
        size={"full"}
        placement="bottom"
      >
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerHeader
            gap={3}
            display={"flex"}
            flexDirection={notMobile ? "row" : "column"}
          >
            <HStack gap={2} flexGrow={1}>
              <Text flexGrow={1}>{title}</Text>
              <Button aria-label="reload-nfts" onClick={loadNFTs} gap={2}>
                <RiRestartLine size={"24"} />
              </Button>
              <Button
                aria-label="close-nfts-modal"
                onClick={onDrawerClose}
                gap={2}
              >
                <RiCloseLine size={"24"} />
              </Button>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <Box
              w="100%"
              maxW="900px"
              mx="auto"
              sx={{ columnCount: [1, 2, 3], columnGap: "16px" }}
            >
              {nftjsons?.map((nft, index) => (
                <Button
                  onClick={() => fullScreen(index)}
                  key={"nft-" + index}
                  borderRadius={12}
                  width={"100%"}
                  p={0}
                  h={"auto"}
                  minH={"200px"}
                  mb={4}
                >
                  <Center
                    width={"100%"}
                    key={"nft-div-" + index}
                    flexDirection={"column"}
                    gap={2}
                    background={
                      colorMode === "dark" ? "blackAlpha.300" : "blackAlpha.100"
                    }
                    borderRadius={12}
                  >
                    {/* <Box
                      position={"absolute"}
                      right={3}
                      top={3}
                      opacity={0.5}
                      zIndex={900}
                    >
                      <LinkIcon type={String(nft.network)} line />
                    </Box> */}
                    <Flex
                      key={nft.name + " name" + index}
                      gap={2}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Box>
                        {String(nft.preview?.mimetype).includes("mp4") ? (
                          <Center>
                            <ReactPlayer
                              url={nft?.files[0]?.source}
                              width={"100%"}
                              loop
                              muted
                              playing
                              height={"230"}
                            />
                          </Center>
                        ) : (
                          <Image
                            borderRadius={12}
                            position={"relative"}
                            width={"100%"}
                            height={"auto"}
                            transition={"ease"}
                            transitionDuration={"1000"}
                            alt={nft.name}
                            textAlign={"center"}
                            src={String(nft.preview?.source)}
                          />
                        )}
                      </Box>
                      {/* <Text
                        fontWeight={'bold'}
                        fontSize={
                          listView
                            ? String(nft.name).length > 15
                              ? String(nft.name).length > 18
                                ? 'xs'
                                : 'sm'
                              : 'md'
                            : 'lg'
                        }>
                        {listView
                          ? String(nft.name).length > 18
                            ? String(nft.name).slice(0, 18) + '...'
                            : String(nft.name)
                          : String(nft.name).length > 23
                          ? String(nft.name).slice(0, 23) + '...'
                          : String(nft.name)}
                      </Text> */}
                    </Flex>
                  </Center>
                </Button>
              ))}
            </Box>

            <Modal isOpen={isModalOpen} onClose={onModalClose} size={"full"}>
              <ModalOverlay
                bg="blackAlpha.500"
                backdropFilter="auto"
                backdropBlur={"6px"}
              />
              <ModalContent bg={bgColor}>
                <ModalHeader
                  gap={2}
                  display={"flex"}
                  justifyContent={notMobile ? "center" : "left"}
                  alignItems={"center"}
                >
                  <LinkIcon type={String(nftjson?.network)} />
                  {nftjson?.name}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack gap={4}>
                    <Flex
                      key={nftjson?.name + " key"}
                      gap={4}
                      flexDirection={"column"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Center width={"100%"}>
                        {String(nftjson?.preview?.mimetype).includes("mp4") ? (
                          <Center>
                            <ReactPlayer
                              url={nftjson?.files[0]?.source}
                              width={"100%"}
                              loop
                              muted
                              playing
                              height={notMobile ? "80vh" : "auto"}
                            />
                          </Center>
                        ) : (
                          <Image
                            borderRadius={12}
                            position={"relative"}
                            width={notMobile ? "auto" : "100%"}
                            height={notMobile ? "80vh" : "auto"}
                            alt={nftjson?.name}
                            textAlign={"center"}
                            src={
                              nftjson?.files && nftjson?.files[0]?.source !== ""
                                ? String(nftjson?.files[0]?.source)
                                : String(nftjson?.preview?.source)
                            }
                          />
                        )}
                      </Center>
                      <Stack gap={4} w={notMobile ? "md" : "100%"}>
                        <Text textAlign={"center"}>
                          {nftjson?.metadata?.description}
                        </Text>
                        <Link
                          href={
                            ETHERSCAN_URLS[
                              String(nftjson?.network).replace(" ", "")
                            ] + nftjson?.address
                          }
                          target="_blank"
                        >
                          <Flex
                            opacity={0.5}
                            gap={2}
                            fontSize={"md"}
                            justify={"center"}
                          >
                            <LinkIcon
                              type={String(nftjson?.network)}
                              line={false}
                            />
                            {truncAddress(String(nftjson?.address))}
                          </Flex>
                        </Link>
                        <Link
                          href={
                            MARKETPLACE_URLS[
                              String(nftjson?.network).replace(" ", "")
                            ] + String(nftjson?.address)
                          }
                          target="_blank"
                          id={`Soneium-domains-${nftjson?.name}-link`}
                        >
                          <Button
                            width={"100%"}
                            rightIcon={<RiExternalLinkLine />}
                            backgroundColor={
                              colorMode === "dark"
                                ? "whiteAlpha.100"
                                : "blackAlpha.100"
                            }
                          >
                            View On Marketplace
                          </Button>
                        </Link>
                      </Stack>
                    </Flex>
                  </Stack>
                </ModalBody>
                <ModalFooter />
              </ModalContent>
            </Modal>

            {isLoading && (
              <Center width={"100%"} height={150}>
                <Spinner size="lg" />
              </Center>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
