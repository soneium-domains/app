import type { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useMediaQuery,
  useColorMode,
  Button,
  Container,
  Heading,
  Text,
  Flex,
  Spinner,
  Center,
  Link,
  useToast,
  Box,
  LightMode,
  Stack,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { useAtom, useAtomValue } from "jotai";
import {
  bioAtom,
  btcAtom,
  lightModeAtom,
  ethAtom,
  avatarAtom,
  nameAtom,
  jsonAtom,
  socialsArrayAtom,
  nftContractAtom,
  linksArrayAtom,
  useLineIconsAtom,
  titleAtom,
  subtitleAtom,
  horizontalSocialAtom,
  addressAtom,
  socialButtonsAtom,
  isConnectedAtom,
  bgColorAtom,
  connectedAccountAtom,
  ipfsGatewayAtom,
  walletsArrayAtom,
  jsonHashAtom,
  walletButtonsAtom,
  roundAtom,
  buttonBgColorAtom,
  variantAtom,
  fontAtom,
  tourStepAtom,
  nftJsonAtom,
  avatarShapeAtom,
  isStyledAtom,
  networkAtom,
  mobileViewAtom,
  targetAtom,
  headerAtom,
  containerColorAtom,
  horizontalAvatarAtom,
  showDomainAtom,
} from "core/atoms";
import {
  BUTTON_BG_COLORS,
  BUTTON_ROUNDS,
  BUTTON_VARIANTS,
  BG_COLORS,
  FONTS,
  BG_IMAGES,
  getSocialTitle,
  isLink,
  TLD,
  SITE_URL,
} from "core/utils/constants";
import {
  client,
  ConnectWalletButton,
  viemClient,
} from "components/walletConnect";

import { CustomLink } from "types";
import { useActiveAccount } from "thirdweb/react";
import AnimateScale from "components/animate/AnimateScale";
import {
  Avatar,
  Links,
  ProfileSkeleton,
  Socials,
  Wallets,
} from "components/Profile";
import AnimateOpacity from "components/animate/AnimateOpacity";
import ProfileFooter from "components/Profile/ProfileFooter";
import AnimateOnScroll from "components/animate/AnimateOnScroll";

interface LinkPageProps {
  name: string;
  nftJson: any;
  title: string;
  description: string;
  avatar: string;
  ogTitle: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const { query } = context;
  let _name = query.name ? String(query.name) : "";
  const name = _name.toLowerCase();

  const subgraphRecords: any = await viemClient.getSubgraphRecords({
    name: name,
  });

  if(!subgraphRecords){
    const nftJson = {name: '', status : 'error', styles : {lightMode : false}};
    const title = 'name not found';
    const description = 'name not found';
    const avatar = 'name not found';
    return {
      props: {
        name,
        nftJson,
        title,
        description,
        avatar,
      }, 
    };
  }
  // console.log('getting nft');
  const textRecords = await Promise.all(
    subgraphRecords.texts.map(async (textKey: string) => {
      const textValue = await viemClient.getTextRecord({
        name: name,
        key: textKey,
      });
      return { key: textKey, value: textValue };
    })
  );

  //console.log(textRecords);

  const _wallets: { [key: string]: string } = {};
  const _socials: { [key: string]: string } = {};
  const _links: CustomLink[] = [];
  let _title: string = "";
  let _ogTitle: string = "";
  let _subtitle: string = "";
  let _description: string = "";
  let _bio: string = "";
  let _avatar: string = "";
  let _avatarShape: string = "round";
  let _font: string = FONTS[0];
  let _bg: string = BG_COLORS[0].color;
  let _styles: any = {
    lineIcons: false,
    lightMode: BG_COLORS[0].lightMode,
    bgColor: BG_COLORS[0].color,
    avatarShape: 'circle',
    socialIcons: true,
    walletButtons: true,
    socialButtons: true,
    buttonBgColor: BUTTON_BG_COLORS[0],
    showDomain: true,
    horizontalAvatar: false,
    round: "md",
    variant: "solid",
    font: FONTS[0],
  };
  
  const coinRecords = await Promise.all(
    subgraphRecords.coins.map(async (coinKey: string) => {
      const coinValue = await viemClient.getAddressRecord({
        name: name,
        coin: coinKey,
      });
      return { key: coinKey, value: coinValue };
    })
  );

  coinRecords.map((coin) => {
    _wallets[coin.value.name] = coin.value.value;
  });

  textRecords.map((text) => {
    if (getSocialTitle(text.key) !== undefined) {
      _socials[text.key] = text.value;
    }

    if (isLink(text.key)) {
      _links.push(JSON.parse(text.value));
    }

    if (text.key === "avatar") {
      _avatar = text.value;
    }

    if (text.key === "display") {
      _title = text.value;
      _ogTitle = text.value;
    }

    if (text.key === "location") {
      _subtitle = text.value;
    }

    if (text.key === "description") {
      _bio = text.value;
    }

    if (text.key === "styles" && text.value.length > 10) {
      _styles = JSON.parse(text.value);
    }
  });

  const nftJson = {
    name: name,
    title: _title,
    ogTitle: _ogTitle,
    subtitle: _subtitle,
    avatar: _avatar,
    bio: _bio,
    links: _links,
    wallets: _wallets,
    socials: _socials,
    styles: _styles,
  };

  if (nftJson.title && nftJson.title.length > 2) {
    _title = nftJson.title;
    _ogTitle = nftJson.ogTitle;
  }

  if (nftJson.subtitle && nftJson.subtitle.length > 1) {
    _title += " | " + nftJson.subtitle;
  }

  if (_title.indexOf("|") < 0 && nftJson.bio && nftJson.bio.length > 1) {
    //console.log('adding bio')
    _title += " | " + nftJson.bio;
  }

  if (nftJson.bio && nftJson.bio.length > 1) {
    _description = nftJson.bio;
  }

  if (nftJson.avatar && nftJson.avatar.length > 10) {
    _avatar = nftJson.avatar;
  }

  // }

  // _title += ' | ' + SITE_TITLE;

  const title = _title;
  const description = _description;
  const avatar = _avatar;
  const ogTitle = _ogTitle;

  return {
    props: {
      name,
      nftJson,
      title,
      description,
      avatar,
      ogTitle
    },
  };
}

const DomainPage: NextPage<LinkPageProps> = ({
  name,
  nftJson,
  title,
  description,
  avatar,
  ogTitle
}: LinkPageProps) => {
  const { t } = useTranslate();
  const [_name, setName] = useAtom(nameAtom);
  const [bio, setBio] = useAtom(bioAtom);
  const [header, setHeader] = useAtom(headerAtom);
  const [containerColor, setContainerColor] = useAtom(containerColorAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const links = useAtomValue(linksArrayAtom);
  const socials = useAtomValue(socialsArrayAtom);
  const wallets = useAtomValue(walletsArrayAtom);
  const [lineIcons, setLineIcons] = useAtom(useLineIconsAtom);
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const [round, setRound] = useAtom(roundAtom);
  const [buttonBgColor, setButtonBgColor] = useAtom(buttonBgColorAtom);
  const [variant, setVariant] = useAtom(variantAtom);
  const [font, setFont] = useAtom(fontAtom);
  const [notMobile] = useMediaQuery("(min-width: 992px)");
  const [notMobileH] = useMediaQuery("(min-height: 896px)");
  const [desktop] = useMediaQuery("(min-width: 1280px)");
  const [_avatar, setAvatar] = useAtom(avatarAtom);
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
  const [socialIcons, setSocialIcons] = useAtom(horizontalSocialAtom);
  const [showDomain,setShowDomain] = useAtom(showDomainAtom);
  const [horizontalAvatar, setHorizontalAvatar] = useAtom(horizontalAvatarAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const { toggleColorMode } = useColorMode();
  const [_title, setTitle] = useAtom(titleAtom);
  const [subtitle, setSubtitle] = useAtom(subtitleAtom);
  const [json, setJson] = useAtom(jsonAtom);
  const [_nftJson, setNftJson] = useAtom(nftJsonAtom);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();
  const domainName = String(router.query.name);
  const [nftContract, setNftContract] = useAtom(nftContractAtom);
  const { colorMode } = useColorMode();
  const [mobileView, setMobileView] = useAtom(mobileViewAtom);
  const [lastChange, setLastChange] = useState(0);
  const toast = useToast();
  const [nameDontExist, setNameDontExist] = useState(false);
  const account = useActiveAccount();
  //const [horizontalWallet, setHorizontalWallet] = useAtom(horizontalWalletsAtom);
  useEffect(() => {
    //setLastChange(Date.now());
    //console.log(Date.now());
    //console.log(socials);
  }, [
    title,
    subtitle,
    links,
    socials,
    wallets,
    lightMode,
    avatarShape,
    bgColor,
    buttonBgColor,
    variant,
    font,
    avatar,
    socialButtons,
    walletButtons,
    socialIcons,
    lineIcons,
  ]);

  useEffect(() => {
    async function initUI() {
      //console.log(nftJson);
      if (nftJson?.status === "error") {
        setIsLoading(false);
        setLightMode(false);
        setNameDontExist(true);
        return;
      }
      console.log(nftJson);
      setIsLoading(true);
      setJson(nftJson);
      setName(nftJson.name);
      setTitle(nftJson.title);
      setSubtitle(nftJson.subtitle);
      setBio(nftJson.bio);
      setAvatar(nftJson.avatar);
      setAvatarShape(nftJson.styles.avatarShape ?? "round");
      setSocialIcons(nftJson.styles.socialIcons ?? true);
      setHorizontalAvatar(nftJson.styles.horizontalAvatar ?? false);
      setShowDomain(nftJson.styles.showDomain ?? true);
      setSocialButtons(nftJson.styles.socialButtons ?? true);
      setWalletButtons(nftJson.styles.walletButtons ?? true);
      setBgColor(nftJson.styles.bgColor ?? BG_COLORS[0].color);
      setLineIcons(nftJson.styles.lineIcons ?? false);
      setLightMode(nftJson.styles.lightMode ?? BG_COLORS[0].lightMode);
      setButtonBgColor(nftJson.styles.buttonBgColor ?? BUTTON_BG_COLORS[1]);
      setRound(nftJson.styles.round ?? BUTTON_ROUNDS[1]);
      setVariant(nftJson.styles.variant ?? BUTTON_VARIANTS[3]);
      setFont(nftJson.styles.font ?? FONTS[0]);
      setIsLoading(false);
    }

    if (nftJson) {
      initUI();
    }
  }, [nftJson]);

  useEffect(() => {
    //console.log(lightMode);
    //console.log(colorMode);
    if (lightMode) {
      if (colorMode === 'dark') {
        toggleColorMode();
      }
    } else {
      if (colorMode === 'light') {
        toggleColorMode();
      }
    }
  }, [lightMode, colorMode]);

  return (
    <>
      <Head>
        {/* {json !== undefined && !isLoading && (
          <NextSeo
            title={json.name !== '' ? json.name : SITE_TITLE}
            description={json.bio !== '' ? json.bio : SITE_DESCRIPTION}
          />
        )} */}
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta
          property="og:image"
          content={`https://soneium.domains/api/pog?title=${encodeURIComponent(ogTitle)}&name=${domainName}&bg=${encodeURIComponent(nftJson.styles.bgColor)}&subtitle=${encodeURIComponent(subtitle)}&lightmode=${nftJson.styles.lightMode}${avatar.length > 0 ? '&avatar=1' : ''}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />

        <meta
          property="twitter:image"
          content={`https://soneium.domains/api/pog?title=${encodeURIComponent(ogTitle)}&name=${domainName}&bg=${encodeURIComponent(nftJson.styles.bgColor)}&subtitle=${encodeURIComponent(subtitle)}&lightmode=${nftJson.styles.lightMode}${avatar.length > 0 ? '&avatar=1' : ''}`}

        />
        {/* <link rel="icon" type="image/png" href="/logos/vidicon.png" /> */}
        <link
          rel="icon"
          href={  
            json && !isLoading && avatar ? avatar : "/logo.svg"
          }
        />
      </Head>

      <Flex
        as="main"
        maxW="100%"
        display="flex"
        flexDirection={"column"}
        align={"center"}
        bg={bgColor}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
        transition={"all ease 1s"}
        minH="100vh"
        px={[4, 4, 0]}
        pt={12}
      >
        {!isLoading && !nameDontExist && (
          <>
            <Flex
              minH="100vh"
              width={["100%", "100%", "md", "lg", "xl", "2xl"]}
              display="flex"
              flexDir={"column"}
              gap={4}
              placeContent="center"
              placeItems="center"
              fontFamily={font}
             // rounded={'2xl'}
              //p={12}
              color={!lightMode ? "var(--white)" : "var(--dark1)"}
              //bgColor={notMobile ? lightMode ? "white" : "blackAlpha.900" : 'transparent'}
            >
              <Flex
                direction="column"
                justify={"center"}
                align={"center"}
                gap={6}
                width="100%"
              >
                <Flex
                  gap={[0, 0, 8]}
                  mt={notMobile ? 4 : 0}
                  align={"center"}
                  justify={"center"}
                  w={"100%"}
                  flexDir={horizontalAvatar ? "row" : "column"}
                >
                  <AnimateOnScroll delay={0.3} x={-200} y={0} styles={{overflow: 'visible', maxWidth:'220px'}}>
                    <Box maxW={horizontalAvatar ? "140px" : "180px"}>
                      <Avatar
                        my={6}
                        url={_avatar}
                        maxH={horizontalAvatar ? "140" : "180"}
                        alt={name + "avatar image"}
                        shape={avatarShape}
                        shadow="none"
                      />
                    </Box>
                  </AnimateOnScroll>

                  <Stack textAlign={horizontalAvatar ? "left" : "center"}>
                  <AnimateOnScroll delay={0.6} x={notMobile ? 200 : 0} y={notMobile ? 0 : 50} styles={{overflow: 'visible', width:'100%'}}>
                      <Heading
                        fontWeight="bold"
                        fontSize="3xl"
                        fontFamily={font}
                      >
                        {json.title}
                      </Heading>
                    </AnimateOnScroll>
                    <AnimateOnScroll delay={0.8} x={notMobile ? 200 : 0} y={notMobile ? 0 : 50} styles={{overflow: 'visible', width:'100%'}}>
                      <Heading
                        fontWeight="normal"
                        fontSize="xl"
                        fontFamily={font}
                      >
                        {json.subtitle}
                      </Heading>
                    </AnimateOnScroll>
                    {showDomain && <AnimateOnScroll delay={1} x={notMobile ? 200 : 0} y={notMobile ? 0 : 50} styles={{overflow: 'visible', width:'100%'}}>
                      <Heading
                        fontWeight="bold"
                        fontSize="xl"
                        fontFamily={font}
                      >
                        {json.name}
                      </Heading>
                    </AnimateOnScroll>}
                    {/* <Button
                            my={1}
                            borderRadius={'25'}
                            variant={'outline'}
                            leftIcon={<RiMessage3Line />}>
                            Message
                          </Button> */}
                  </Stack>
                </Flex>
                {socialIcons && <Socials json={json} onlyIcons />}

                {walletButtons && <Wallets json={json} />}

                <Stack width={"100%"} gap={2}>
                  {json.bio && json.bio.length > 0 && (
                    <AnimateOnScroll delay={1.7} styles={{width:'100%'}}>
                      <Text
                        fontWeight="normal"
                        fontSize={notMobile ? "xl" : "lg"}
                        mb={6}
                        textAlign={"center"}
                      >
                        {json.bio}
                      </Text>
                    </AnimateOnScroll>
                  )}
                  <Links
                    json={json}
                    color={
                      !lightMode
                        ? "var(--chakra-colors-gray-100)"
                        : "var(--chakra-colors-gray-800)"
                    }
                  />

                  <AnimateOnScroll delay={3} styles={{overflow: 'visible', width:'100%'}}>
                    {socialButtons && <Socials json={json} />}
                  </AnimateOnScroll>
                </Stack>
              </Flex>
            </Flex>
          </>
        )}

        {isLoading && (
          <Container width={["100%", "100%", "md", "lg", "xl"]} p={4}>
            <ProfileSkeleton notMobile={notMobile} />
          </Container>
        )}

        {nameDontExist && (
          <Center width={"100%"} height={"70vh"} flexDir={"column"} gap={4}>
            Soneium Domain {name} Does Not Exist, Yet!
            <Button as={Link} href={SITE_URL + "app"}>
              Claim {name} Now
            </Button>
          </Center>
        )}

        <ProfileFooter />
      </Flex>
    </>
  );
};

export default DomainPage;
