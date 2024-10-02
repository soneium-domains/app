import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  useMediaQuery,
  useColorMode,
  Box,
  LightMode,
  DarkMode,
  Center,
  useColorModeValue,
  IconButton,
  Link,
  Button,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { Avatar, Socials, ProfileSkeleton } from "components/Profile";
import Links from "components/Profile/Links";

import {
  avatarAtom,
  avatarShapeAtom,
  bgColorAtom,
  bioAtom,
  colorModeAtom,
  fontAtom,
  horizontalAvatarAtom,
  horizontalSocialAtom,
  isStyledAtom,
  lightModeAtom,
  mobileViewAtom,
  nameAtom,
  showDomainAtom,
  socialButtonsAtom,
  socialsArrayAtom,
  subtitleAtom,
  titleAtom,
  useLineIconsAtom,
  walletButtonsAtom,
} from "core/atoms";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import Wallets from "./Wallets";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import { RiExternalLinkLine, RiLinksLine } from "react-icons/ri";
import { FaCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

interface Attribute {
  trait_type: string;
  value: string;
}

interface Props {
  json: any;
  onSave: Function;
  w?: any;
}

const Preview = ({ json, onSave, w}: Props) => {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { colorMode, toggleColorMode } = useColorMode();
  const [useLineIcons, setUseLineIcons] = useAtom(useLineIconsAtom);
  const [horizontalSocial, setHorizontalSocial] = useAtom(horizontalSocialAtom);
  //const [horizontalWallet, setHorizontalWallet] = useAtom(horizontalWalletsAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const bgColor = useAtomValue(bgColorAtom);
  const setIsStyled = useSetAtom(isStyledAtom);
  const wallet = useActiveWallet();
  const avatarShape = useAtomValue(avatarShapeAtom);
  const socials = useAtomValue(socialsArrayAtom);
  const font = useAtomValue(fontAtom);
  const avatar = useAtomValue(avatarAtom);
  const title = useAtomValue(titleAtom);
  const name = useAtomValue(nameAtom);
  const bio = useAtomValue(bioAtom);
  const subtitle = useAtomValue(subtitleAtom);
  const lightMode = useAtomValue(lightModeAtom);
  const showDomain = useAtomValue(showDomainAtom);
  const horizontalAvatar = useAtomValue(horizontalAvatarAtom);
  const [colorM, setColorM] = useAtom(colorModeAtom);
  const mobileView = useAtomValue(mobileViewAtom);
  const { pathname } = useRouter();
  //console.log(json);

  // useEffect(() => {
  //   // console.log(json)

  //   if (lightMode === true && colorMode === 'dark') {
  //     toggleColorMode();
  //     // console.log('toggledColor');
  //   }

  //   if (lightMode === false && colorMode === 'light') {
  //     toggleColorMode();
  //     // console.log('toggledColor');
  //   }

  //   setIsStyled(true);
  // }, [lightMode]);

  

  return (
    <>
      
        <Flex
          bg={bgColor}
          key={`preview-soneiumdomains-desktop-${lightMode}`}
          bgSize={"cover"}
          bgRepeat={"no-repeat"}
          w={'100%'}
          bgPosition={"center"}
          justify={"center"}
          minH={"100vh"}
          color={lightMode ? "var(--dark1)" : "white"}
        >
          <Flex my={10}>
            <>
              <Container
                width={w ? w : mobileView ? "380px" : "lg"}
                key={`soneiumdomains-preview-main-${lightMode}`}
                display="flex"
                flexDir={"column"}
                gap={4}
                fontFamily={font}
              >
                {json && (
                  <Flex
                    direction="column"
                    justify={"center"}
                    align={"center"}
                    gap={4}
                    width={"100%"}
                  >
                    <Box
                      as={lightMode ? LightMode : DarkMode}
                      key={`preview-soneiumdomains-desktop-mode-${lightMode}`}
                    >
                      <Flex
                        gap={8}
                        my={4}
                        alignItems={"center"}
                        justifyContent={"center"}
                        w={"100%"}
                        flexDir={horizontalAvatar ? "row" : "column"}
                      >
                        <Box
                          maxW={horizontalAvatar ? "140px" : "180px"}
                          key={"avatar-box-" + avatar}
                        >
                          <Avatar
                            my={6}
                            key={"avatar-" + avatar}
                            maxH={horizontalAvatar ? "140" : "180"}
                            url={avatar}
                            alt={name}
                            shape={avatarShape}
                            shadow="none"
                          />
                        </Box>

                        <Stack
                          textAlign={
                            horizontalAvatar ? "left" : "center"
                          }
                        >
                          <Heading
                            fontWeight="bold"
                            fontSize="3xl"
                            fontFamily={font}
                          >
                            {title}
                          </Heading>
                          <Heading
                            fontWeight="normal"
                            fontSize="xl"
                            fontFamily={font}
                          >
                            {subtitle}
                          </Heading>
                          {showDomain && <Heading
                            fontWeight="bold"
                            fontSize="xl"
                            fontFamily={font}
                          >
                            {name}
                          </Heading>}
                          {/* <Button
                            my={1}
                            borderRadius={'25'}
                            variant={'outline'}
                            leftIcon={<RiMessage3Line />}>
                            Message
                          </Button> */}
                        </Stack>
                      </Flex>

                      {horizontalSocial && (
                        <Socials
                          json={json}
                          onlyIcons
                          key={`social-icons-${socials.length}`}
                        />
                      )}

                      {walletButtons && (
                        <Wallets
                          json={json}
                          color={
                            !lightMode
                              ? "var(--chakra-colors-gray-100)"
                              : "var(--chakra-colors-gray-800)"
                          }
                        />
                      )}

                      <Stack width={"100%"} gap={2} pb={4}>
                        {bio && bio.length > 0 && (
                          <Text
                            fontWeight="normal"
                            fontSize={notMobile ? "xl" : "lg"}
                            my={4}
                            textAlign={"center"}
                          >
                            {bio}
                          </Text>
                        )}
                        
                        {/* <ChatUIProvider>
                        <ChatWidget
                          chatId={"0x862cD05C263Ff60a4Ea53db12eaa7548499E07E7"} //chatId or recipient's address
                        />
                        </ChatUIProvider> */}
                        

                        <Links
                          json={json}
                          color={
                            !lightMode
                              ? "var(--chakra-colors-gray-100)"
                              : "var(--chakra-colors-gray-800)"
                          }
                        />

                        {socialButtons && (
                          <Socials
                            json={json}
                            key={`social-buttons-${socials.length}`}
                          />
                        )}
                      </Stack>
                    </Box>
                  </Flex>
                )}
              </Container>
            </>
          </Flex>
        </Flex>
    </>
  );
};

export default Preview;
