import type { NextPage } from "next";
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
import { detectCoinChanges, detectTextChanges, truncAddress } from "core/utils";
import axios from "axios";
import {
  ManageSocials,
  ManageLinks,
  EditAvatar,
  BioTextInput,
  TitleInput,
  ManageWallets,
  PreviewModal,
} from "components/manage";
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
  showDomainAtom,
  horizontalAvatarAtom,
  linksAtom,
} from "core/atoms";
import {
  SITE_DESCRIPTION,
  SITE_PROFILE_URL,
  SITE_TITLE,
  IPFS_URLS,
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
  minato,
  viemClient,
} from "components/walletConnect";

import AddModal from "components/manage/AddModal";
import ShareButton from "components/manage/Share";
import Preview from "components/Profile/Preview";
import ProfileCompletion from "components/manage/ProfileCompletion";
import CropAvatar from "components/manage/CropAvatar";
import ManageSidebar from "components/manage/ManageSidebar";
import { LinkIcon } from "components/logos";
import StyleDrawer from "components/manage/StyleDrawer";
import ManageHeader from "components/manage/ManageHeader";
import { CustomLink } from "types";
import { getNamesForAddress } from "@soneium-domains/js/subgraph";
import { generateRecordCallArray, namehash } from "@soneium-domains/js/utils";
import { multicallWithNodeCheck } from "contracts/421614/0x7016f6bafd4ae35a30dd264ce8eeca16ab417fad";
import { Resolver } from "core/utils/contracts";
import { sendTransaction, waitForReceipt } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import ManageSubnames from "components/manage/ManageSubnames";
import { DeviceFrameset } from "react-device-frameset";

const ManagePage: NextPage = () => {
  const { t } = useTranslate();
  const [name, setName] = useAtom(nameAtom);
  const [bio, setBio] = useAtom(bioAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [lightMode, setLightMode] = useAtom(lightModeAtom);
  const [ipfsGateway, setIpfsGateway] = useAtom(ipfsGatewayAtom);
  const [retries, setRetries] = useState<number>(0);
  const isConnected = useAtomValue(isConnectedAtom);
  const network = useAtomValue(networkAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const linksArray = useAtomValue(linksArrayAtom);
  const links = useAtomValue(linksAtom);
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
  const [avatarShape, setAvatarShape] = useAtom(avatarShapeAtom);
  const [socialIcons, setSocialIcons] = useAtom(horizontalSocialAtom);
  const [showDomain, setShowDomain] = useAtom(showDomainAtom);
  const [horizontalAvatar, setHorizontalAvatar] = useAtom(horizontalAvatarAtom);
  const [socialButtons, setSocialButtons] = useAtom(socialButtonsAtom);
  const [walletButtons, setWalletButtons] = useAtom(walletButtonsAtom);
  const [title, setTitle] = useAtom(titleAtom);
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

  const getJson = () => {
    let socialsObj: any = {};
    socials.map((social) => {
      socialsObj[social["key"]] = social["value"];
    });

    let walletsObj: any = {};
    wallets.map((wallet) => {
      walletsObj[wallet["key"]] = wallet["value"];
    });

    let styles: any = {
      lineIcons: lineIcons,
      lightMode: lightMode,
      bgColor: bgColor,
      avatarShape: avatarShape,
      socialIcons: socialIcons,
      walletButtons: walletButtons,
      socialButtons: socialButtons,
      buttonBgColor: buttonBgColor,
      showDomain: showDomain,
      horizontalAvatar: horizontalAvatar,
      round: round,
      variant: variant,
      font: font,
    };

    const data = {
      name: name,
      title: title,
      subtitle: subtitle,
      avatar: avatar,
      bio: bio,
      links: links,
      wallets: walletsObj,
      socials: socialsObj,
      styles: styles,
    };

    return data;
  };

  async function saveProfile() {
    setIsSaving(true);
    toast({
      status: "loading",
      title: "Saving profile to the blockchain",
      description: "Please confirm the transaction in your wallet",
      duration: null,
      isClosable: true,
    });

    const newProfileData = getJson(); // Get updated profile data
    const currentProfileData = json; // Existing profile data from `getProfileJson`

    // Compare old and new profile data for changes and deletions
    const { changedRecords, deletedRecords } = detectTextChanges(
      currentProfileData,
      newProfileData
    );

    const { changedCoins, deletedCoins } = detectCoinChanges(
      currentProfileData.wallets,
      newProfileData.wallets
    );

    // Only proceed if there are changes
    if (changedRecords.length === 0 && deletedRecords.length === 0 && changedCoins.length === 0 && deletedCoins.length === 0) {
      toast.closeAll();
      toast({
        status: "info",
        title: "No changes detected",
        description: "No updates to save.",
        duration: 3000,
        isClosable: true,
      });
      setIsSaving(false);
      return;
    }

    // Prepare text records to save (only changed ones)
    let _texts: { key: string; value: string }[] = [];
    changedRecords.map((record) =>
      _texts.push({ key: record.key, value: record.value })
    );

    // Handle deleted records
    if (deletedRecords.length > 0) {
      deletedRecords.map((key) => handleDeletedRecord(key));
    }

    // Prepare coin records (order-independent)
    let _coins: { coin: string; value: string }[] = [];
    changedCoins.forEach((coin) =>
      _coins.push({ coin: coin.coin, value: coin.value })
    );

    // Handle deleted coins if necessary (optional)
    deletedCoins.forEach((key) => {
      // Implement your logic to handle deleted coins
      console.log(`Coin deleted: ${key}`);
    });

    const options = {
      texts: _texts,
      coins: _coins,
      clearRecords: false, // Do not clear all records, only update the changes
    };

    const hash = namehash(domainName);

    let data = generateRecordCallArray({
      namehash: hash,
      ...options,
    });

    if (data.length === 0) data = [];

    const tx = multicallWithNodeCheck({
      contract: Resolver,
      nodehash: hash,
      data: data,
    });

    console.log(options);

    try {
      const { transactionHash } = await sendTransaction({
        transaction: tx,
        account: account!,
      });

      if (transactionHash) {
        setIsSaving(false);
        setIsConfirming(true);
        toast.closeAll();
        toast({
          status: "loading",
          title: "Confirming changes on the blockchain",
          description: "Please wait a few moments while your changes are saved",
          duration: null,
          isClosable: true,
        });
      } else {
        return;
      }

      const receipt = await waitForReceipt({
        client: client,
        chain: minato,
        transactionHash: transactionHash,
      });

      if (receipt.status === "success") {
        toast.closeAll();
        toast({
          status: "success",
          title: "Save Successful",
          description: `${name} Profile Saved Successfully. You can now view and share your profile link.`,
          duration: null,
          isClosable: true,
        });
      } else {
        toast.closeAll();
        toast({
          status: "error",
          title: "Failed",
          description:
            "There was an error saving your profile. Please try again.",
          duration: null,
          isClosable: true,
        });
      }
    } catch (e) {
      toast.closeAll();
      toast({
        status: "error",
        title: "Failed",
        description:
          "There was an error saving your profile. Please try again.",
        duration: null,
        isClosable: true,
      });
    }

    setIsSaving(false);
    setIsConfirming(false);
  }

  // Handle deletion of a record (calls a separate function to remove the record)
  const handleDeletedRecord = (key: string) => {
    console.log(`Record deleted: ${key}`);
    // Implement your delete record logic here
    console.log("removing rec : ", key); // Call to remove record from the blockchain
  };

  useEffect(() => {
    async function getProfileJson() {
      if (connectedAccount && isConnected && domainName) {
        try {
          if (json) {
            return;
          }

          setIsLoading(true);
          // console.log('getting nft0');
          const subgraphRecords: any = await viemClient.getSubgraphRecords({
            name: domainName,
          });
          console.log(subgraphRecords);
          // console.log('getting nft');
          const textRecords = await Promise.all(
            subgraphRecords.texts.map(async (textKey: string) => {
              const textValue = await viemClient.getTextRecord({
                name: domainName,
                key: textKey,
              });
              return { key: textKey, value: textValue };
            })
          );

          const _wallets: { [key: string]: string } = {};
          const _socials: { [key: string]: string } = {};
          const _links: CustomLink[] = [];
          let _title: string = "";
          let _subtitle: string = "";
          let _bio: string = "";
          let _avatar: string = "";
          let _styles: any = {
            lineIcons: lineIcons,
            lightMode: lightMode,
            bgColor: bgColor,
            avatarShape: avatarShape,
            socialIcons: socialIcons,
            walletButtons: walletButtons,
            socialButtons: socialButtons,
            buttonBgColor: buttonBgColor,
            showDomain: showDomain,
            horizontalAvatar: horizontalAvatar,
            round: round,
            variant: variant,
            font: font,
          };

          const coinRecords = await Promise.all(
            subgraphRecords.coins.map(async (coinKey: string) => {
              const coinValue = await viemClient.getAddressRecord({
                name: domainName,
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
            }

            if (text.key === "location") {
              _subtitle = text.value;
            }

            if (text.key === "description") {
              _bio = text.value;
            }

            if (text.key === "styles") {
              _styles = JSON.parse(text.value);
            }
          });

          // @ts-ignore: Unreachable code error
          const nfts = await getNamesForAddress(viemClient, {
            address: connectedAccount! as `0x${string}`,
            filter: {
              searchString: domainName.slice(0, domainName.indexOf(".son")),
            },
          });

          if (nfts.length === 0) {
            setError(
              `${domainName} doesn't exist, yet! If you have registered this domain, please reload in a few minutes.`
            );
            setIsLoading(false);
            return;
          }

          const nftJson: any = {
            info: {
              owner: nfts[0].wrappedOwner,
              manager: nfts[0].wrappedOwner,
            },
            name: domainName,
          };

          if (
            String(nftJson.info.owner).toLowerCase() !==
              connectedAccount.toLowerCase() ||
            String(nftJson.info.manager).toLowerCase() !==
              connectedAccount.toLowerCase()
          ) {
            setError(
              `You (${truncAddress(
                connectedAccount
              )}) don't have permission to manage this NFT`
            );
            setIsLoading(false);
            return;
          } else {
            setError("");
          }
          setNftJson(nftJson);
          //console.log(nftJson);

          setJson({
            name: domainName,
            title: _title,
            subtitle: _subtitle,
            avatar: _avatar,
            bio: _bio,
            links: _links,
            wallets: _wallets,
            socials: _socials,
            styles: _styles,
          });
          setName(domainName);
          setTitle(_title);
          setSubtitle(_subtitle);
          setBio(_bio);

          //setBtc(res.data.btcAddress);
          //setEth(res.data.ethAddress);
          setAvatar(_avatar);
          setAvatarShape(_styles.avatarShape ?? "round");
          setSocialIcons(_styles.socialIcons ?? true);
          setSocialButtons(_styles.socialButtons ?? true);
          setWalletButtons(_styles.walletButtons ?? true);
          setBgColor(_styles.bgColor ?? BG_COLORS[0].color);
          setLineIcons(_styles.lineIcons ?? false);
          setLightMode(_styles.lightMode ?? BG_COLORS[0].lightMode);
          setButtonBgColor(_styles.buttonBgColor ?? BUTTON_BG_COLORS[1]);
          setShowDomain(_styles.showDomain);
          setRound(_styles.round ?? BUTTON_ROUNDS[1]);
          setVariant(_styles.variant ?? BUTTON_VARIANTS[3]);
          setFont(_styles.font ?? FONTS[0]);
          //setIsStyled(res.data?.styles?.isStyled ?? false);
          // setIsLoading(false);
          // setIsLoaded(true);
          setIsLoading(false);
          setIsLoaded(true);
        } catch (error: any) {
          // console.log('error fetching nft', error);
          // console.log("retries : " + retries)
          if (
            error.code === "ERR_NETWORK" ||
            error.code === "ERR_BAD_REQUEST"
          ) {
            // console.log("retries : " + retries)
            if (retries < 5) {
              setRetries((r) => r + 1);
              let currentIndex = IPFS_URLS.indexOf(ipfsGateway);
              let newIndex =
                currentIndex === IPFS_URLS.length - 1 ? 0 : currentIndex + 1;
              setIpfsGateway(IPFS_URLS[newIndex]);
              toast({
                title: "changing ipfs gateway",
                description:
                  "There was a problem fetching data from ipfs, changing the ipfs gateway to resolve the problem",
                isClosable: true,
                duration: 3000,
                status: "warning",
              });
              //await sleep(4000);
              //getProfileJson();
            } else {
              toast({
                title: "network error",
                description:
                  "There was a problem fetching data from ipfs, please check your network and retry",
                isClosable: true,
                duration: 5000,
                status: "warning",
              });
              setIsLoading(false);
              setError(error.message + " please try again");
              console.log(error);
            }
          } else {
            setIsLoading(false);
            console.log(error);
            setError(error.message + " please try again");
            //router.reload();
          }
        }
      }
    }
    getProfileJson();
  }, [connectedAccount, isConnected, network, nftContract, domainName]);

  return (
    <>
      <Head>
        <title>
          {`${name && !isLoading ? name : SITE_TITLE} | ${
            json && !isLoading && bio !== "" ? bio : SITE_DESCRIPTION
          }`}
        </title>
        <meta
          name="description"
          content={`${json && !isLoading ? name : SITE_TITLE} | ${
            json && !isLoading && bio !== "" ? bio : SITE_DESCRIPTION
          }`}
        />
        <link
          rel="icon"
          href={
            json && !isLoading && json.avatar !== "" ? json.avatar : "/logo.svg"
          }
        />
      </Head>

      {isConnected ? (
        <Box width="100%">
          <Container
            as="main"
            maxW="full"
            display="grid"
            key={"name-soneium-domains-main"}
            placeContent={[
              "center",
              "center",
              "center",
              "start",
              "start",
              "start",
            ]}
            placeItems={["start"]}
            h="100vh"
          >
            {error ? (
              <Center my={20} gap={6} flexDirection={"column"} w={"100%"}>
                <Text>{error}</Text>
                <ConnectWalletButton />
              </Center>
            ) : (
              <>
                {!isLoading && json ? (
                  <Flex gap={[4, 4, 4, 4, 6]} justify={"center"}>
                    {notMobile && desktop && (
                      <Flex
                        display={["none", "none", "none", "none", "flex"]}
                        flexDir={"column"}
                      >
                        <ManageSidebar onSave={saveProfile} />
                      </Flex>
                    )}

                    <Flex display={"flex"} flexDir={"column"}>
                      <Flex
                        my={4}
                        direction={"column"}
                        gap={2}
                        borderRadius={12}
                        width={[
                          "100%",
                          "md",
                          "lg",
                          mobileView ? "md" : "sm",
                          mobileView ? "md" : "sm",
                          mobileView ? "xl" : "lg",
                        ]}
                        backgroundColor={
                          colorMode === "light" ? "white" : "blackAlpha.600"
                        }
                        justify={"space-between"}
                        h={notMobileH ? "96vh" : "96vh"}
                        p={3}
                      >
                        <Stack>
                          <ManageHeader />
                          <Flex
                            direction={"column"}
                            maxHeight={notMobileH ? "77vh" : "72vh"}
                            overflow={"auto"}
                            w={"100%"}
                            className="noscroll"
                            gap={4}
                            rounded={"lg"}
                          >
                            {/* <ProfileCompletion /> */}
                            <Flex>
                              <EditAvatar />
                            </Flex>
                            <CropAvatar />
                            {/* <BtcAddressInput />
                        <EthAddressInput /> */}
                            {/* {account && json && <div>
                              <ChatUIProvider theme={darkChatTheme}>
                                <ChatView
                                  chatId="0xBFd210db795A9Ac48D0C3be2a74232BE44144E84"
                                  limit={10}
                                  isConnected={true}
                                  verificationFailModalPosition={
                                    "RELATIVE"
                                  }
                                />
                              </ChatUIProvider>
                            </div>} */}
                            <TitleInput />
                            <BioTextInput />
                            <ManageSubnames />
                            <ManageWallets json={json} />
                            <ManageLinks json={json} />
                            <ManageSocials json={json} />
                          </Flex>
                        </Stack>
                        <Flex gap={2} justify={"stretch"}>
                          <AddModal type={"square"} />
                          {!isLoading && json && (
                            <PreviewModal
                              json={getJson()}
                              onSave={saveProfile}
                              key={lastChange}
                            />
                          )}

                          <Flex
                            display={["none", "none", "none", "flex", "none"]}
                          >
                            <StyleDrawer onSave={saveProfile} />
                          </Flex>
                          <LightMode>
                            <Button
                              gap={2}
                              borderRadius={12}
                              colorScheme="green"
                              bgGradient={
                                colorMode === "light"
                                  ? "linear(to-r, var(--green), var(--green2))"
                                  : "linear(to-r, var(--green), var(--green2))"
                              }
                              flexDirection={"column"}
                              w={"100%"}
                              className="save"
                              height="72px"
                              isLoading={isSaving || isConfirming}
                              isDisabled={isLoading || isSaving || isConfirming}
                              loadingText={
                                isSaving
                                  ? "Saving..."
                                  : isConfirming
                                  ? "Confirming..."
                                  : ""
                              }
                              onClick={saveProfile}
                            >
                              <LinkIcon type="RiSave2Line" />
                              Save
                            </Button>
                            <ShareButton
                              name={name}
                              type={"blue"}
                              url={SITE_URL + name}
                            />
                          </LightMode>
                        </Flex>
                      </Flex>
                    </Flex>
                    {isLoaded && json && notMobile && (
                      <Flex my={4} position={"fixed"} top={0} right={4}>
                        <DeviceFrameset
                          device={"iPhone 5s"}
                          color={colorMode === "dark" ? "black" : "silver"}
                          width={mobileView ? 410 : 540}
                          // @ts-ignore: Unreachable code error
                          height={"84vh"}
                        >
                          <Center
                            rounded={"2xl"}
                            w={"100%"}
                            borderRadius={0}
                            px={4}
                            py={2}
                            gap={3}
                            h={"60px"}
                            transition={'"all 1s ease"'}
                            alignItems={"center"}
                            pt={2}
                            bgColor={"dark.600"}
                          >
                            <Button
                              as={Link}
                              href={`https://soneium.domains/${name}`}
                              target="_blank"
                              variant={"outline"}
                              gap={2}
                              display={"flex"}
                            >
                              <LinkIcon type="RiExternalLinkLine" />{" "}
                              soneium.domains/
                              {name}
                            </Button>
                          </Center>
                          <Preview
                            json={getJson()}
                            onSave={saveProfile}
                            key={lastChange}
                          />
                        </DeviceFrameset>
                      </Flex>
                    )}
                  </Flex>
                ) : (
                  <Center w={"96%"} minH="94vh" position={"absolute"}>
                    <Spinner size="lg" />
                  </Center>
                )}
              </>
            )}
          </Container>
        </Box>
      ) : (
        <Center my={8} flexDirection="column" minH="100vh">
          <Text my={4}>Please Connect Your Wallet</Text>
          <ConnectWalletButton />
        </Center>
      )}
    </>
  );
};

export default ManagePage;
