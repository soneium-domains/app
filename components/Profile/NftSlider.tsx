import {
  useDisclosure,
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Box,
  Spinner,
  Stack,
  Image,
  Link,
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
import { capFirstLetter, getColor, getMimeType, sleep, truncAddress } from "core/utils";
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
import { Swiper, SwiperSlide } from "swiper/react";
import {EffectCards, Autoplay, EffectCoverflow, EffectCreative, Navigation, EffectFlip} from "swiper/modules";

import 'swiper/css/bundle';


interface Props {
  title: string;
  icon?: JSX.Element;
  image?: string;
  content?: string;
  styles?: Styles;
  color?: string;
  buttonTitle?: string;
  onButtonClick?: any;
}

export default function NftSlider({
  title,
  image,
  content,
  styles,
  color,
  buttonTitle,
  onButtonClick
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
  const size = String(styles?.size);
  const slides = styles?.slides;
  const effect = styles?.effect;
  const imageColor = styles?.color;
  const bgColor = styles?.bg;
  const position = styles?.position ?? 'cover';
  const navigation = styles?.nav;
  const autoplay = styles?.auto;
  const navigationColor = styles?.navColor;
  const centered = styles?.centered;
  const vertical = styles?.vertical;
  const network = String(styles?.network).toLowerCase();
  const round = useAtomValue(roundAtom);

  function fullScreen(index: number) {
    setNftJson(nftjsons && nftjsons[index]);
    onModalOpen();
  }

  const getApiUrl = (chain: string, _address: string) => {
    if (isPortfolio) {
      return `https://api.opensea.io/api/v2/chain/${chain}/account/${_address}/nfts`
    } else {
      return `https://api.opensea.io/api/v2/chain/${chain}/contract/${_address}/nfts`
    }
  };

  const loadNFTs = async () => {
    setNftJsons([]);
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);

      const options = {
        method: "GET",
        headers: { accept: "application/json" , "x-api-key": String(process.env.NEXT_PUBLIC_OPENSEA_API) },
      };

      await fetch(
        getApiUrl(network,address),
        options
      )
        .then((response) => response.json())
        .then((response) => {
          // console.log(response);
          (response?.nfts).map(
            (nft: any) => {
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
            }
          );
        })
        .catch((err) => console.error(err));

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getNfts() {
      loadNFTs();
    }

    getNfts();
  }, [network]);

  return (
    <><Flex flexDirection={'column'} gap={0} bgColor={bgColor} pb={4} rounded={round === 'none' ? round : 'lg'} overflow={'hidden'}>
      <Flex justify={buttonTitle ? 'space-between' : 'center'} align={'center'} p={4}><Text fontSize={['lg','xl']}>{title}</Text>{buttonTitle && <Button rounded={round} onClick={onButtonClick}>{buttonTitle}</Button>}</Flex><Flex gap={4} flexDirection="column" width={'100%'} p={4} overflow={'hidden'} key={`nft-swiper-${title.replaceAll(' ','-')}-${nftjsons?.length}-${effect}`}>
      <Swiper
        className="nft-swiper"
        loop
        grabCursor
        effect={effect}
        autoplay={autoplay}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          scale:1.2,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        //direction={vertical ? 'vertical' : 'horizontal'}
        navigation={navigation}
        modules={[Navigation,EffectCoverflow,EffectCards,EffectCreative,Autoplay,EffectFlip]}
        centeredSlides={centered}
        spaceBetween={'24px'}
        slidesPerView={slides}
        style={{
          //@ts-ignore
          '--swiper-navigation-color': navigationColor,
        }}
        
      >
        {nftjsons?.map((nft, index) => (
          <SwiperSlide key={`swiper-slide-${index}`}>
          <Box
            onClick={() => fullScreen(index)}
            key={"nft-" + index}
            borderRadius={12}
            bg={imageColor ?? 'transparent'}
            width={'100%'}
            h={ size === 'sm' ? 180 : size === 'md' ? 280 : size === 'full' ? 600 : 360}
          >
            {String(nft.preview?.mimetype).includes("mp4") ? (
              <Center>
                <ReactPlayer
                  url={ nft.files && nft.files[0]?.source !== ""
                    ? String(nft.files[0]?.source)
                    : String(nft.preview?.source)}
                  
                  width={"100%"}
                  loop
                  style={{borderRadius : '25px'}}
                  muted
                  playing
                  height={'100%'}
                />
              </Center>
            ) : (
              <Center w={'100%'} h={'100%'}>
              <Image
                rounded={'lg'}
                width={"100%"}
                bgPosition={'center'}
                bgSize={position}
                //@ts-ignore
                objectFit={position}
                h={ size === 'sm' ? 180 : size === 'md' ? 280 : size === 'full' ? 600 : 360}
                transition={"ease"}
                transitionDuration={"1000"}
                alt={nft.name}
                textAlign={"center"}
                src={String(nft.preview?.source)}
              />
              </Center>
            )}
          </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      </Flex>
      </Flex>
      <Modal isOpen={isModalOpen} onClose={onModalClose} size={"full"}>
        <ModalOverlay
          bg="blackAlpha.500"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent bg={bgColor} transition={"all ease 0.3s"}>
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
          <ModalBody as={Center}>
            <Center gap={4}>
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
                        url={
                          nftjson?.files && nftjson?.files[0]?.source !== ""
                             ? String(nftjson?.files[0]?.source)
                             : String(nftjson?.preview?.source)
                         }
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
                      height={notMobile ? "74vh" : "auto"}
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
                      <LinkIcon type={String(nftjson?.network)} line={false} />
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
            </Center>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
      
    </>
  );
}
