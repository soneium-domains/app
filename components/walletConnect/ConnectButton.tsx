import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  useMediaQuery,
  Text,
  Center,
  Stack,
  useColorMode,
  LightMode,
  Menu,
  MenuButton,
  Flex,
  Avatar,
  MenuList,
  Tooltip,
  IconButton,
  useClipboard,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { LinkIcon } from "components/logos";
import {
  AVATAR_API_URL,
  FAUCET_URL,
  SITE_DESCRIPTION,
  SITE_LOGO_URL,
  SITE_TITLE,
  SITE_URL,
} from "core/utils/constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  RiLogoutBoxRLine,
  RiFileCopyLine,
  RiCheckDoubleFill,
  RiRefund2Line,
} from "react-icons/ri";
import LogoIcon from "../logos/LogoIcon";
import {
  connectedAccountAtom,
  isConnectedAtom,
  networkAtom,
  primaryNameAtom,
} from "core/atoms";
import {
  AutoConnect,
  ConnectButton,
  darkTheme,
  lightTheme,
  useActiveAccount,
  useActiveWallet,
  useConnect,
  useConnectModal,
  useDisconnect,
  useWalletBalance,
} from "thirdweb/react";
import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { client, minato, viemClient } from ".";
import { getAddressRecord, getName } from "@soneium-domains/js/public";
import {
  addr,
  name,
} from "contracts/421614/0x7016f6bafd4ae35a30dd264ce8eeca16ab417fad";
import { node } from "contracts/421614/0xd05661277665e9fb85d5acb5cbb30de2d6076988";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { getContract } from "thirdweb";
import { arbitrumSepolia } from "thirdweb/chains";
import { truncAddress } from "core/utils";
import Link from "next/link";
import { addresses } from "core/utils/contractAddresses";

const wallets = [
  createWallet("io.metamask"),
  //createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  //createWallet("com.trustwallet.app"),
  //createWallet("io.zerion.wallet"),
  //createWallet("me.rainbow"),
  //createWallet("app.phantom"),
];

interface Props {
  title?: string;
  style?: any;
  onConnect?: Function | undefined;
}

export default function ConnectWalletButton({
  title = "Connect",
  style,
  onConnect,
}: Props) {
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const [small] = useMediaQuery("(min-width: 480px)");
  const lightMode = useColorMode().colorMode === "light";
  //const web3Name = createWeb3Name();
  const [network, setNetwork] = useAtom(networkAtom);
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom);
  const [connectedAccount, setConnectedAccount] = useAtom(connectedAccountAtom);
  const [primaryName, setPrimary] = useAtom(primaryNameAtom);
  const { connect, isConnecting } = useConnectModal();
  const _connectedAccount = useActiveAccount()?.address;
  const { data, isLoading, isError } = useWalletBalance({
    client,
    chain: minato,
    address: _connectedAccount,
  });
  const { onCopy, hasCopied } = useClipboard(String(connectedAccount));
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();

  async function handleConnect() {
    const wallet = await connect({ client }); // opens the connect modal
    console.log("connected to", wallet);
    setIsConnected(true);
    setConnectedAccount(wallet.getAccount()?.address!);
    if (wallet.getChain() !== minato) {
      wallet.switchChain(minato);
    }
    getEthPrimary();
    try {
      if (onConnect) {
        onConnect();
      }
    } catch (e) {
      console.log(e);
    }
  }
  //const ethAddress = useAtomValue(ethAtom);
  const [checkName, setCheckName] = useState(false);

  useEffect(() => {
    if (connectedAccount) {
      getEthPrimary();
    }
  }, [connectedAccount]);

  async function getEthPrimary() {
    try {
      //@ts-ignore
      const _primary = await getName(viemClient, {
        address: connectedAccount as `0x${string}`,
      })
      console.log(_primary)
      // const _node: any = await node({
      //   contract: getContract({
      //     client: client,
      //     address: addresses.ReverseRegistrar,
      //     chain: minato,
      //   }),
      //   addr: connectedAccount as `0x${string}`,
      // });

      // console.log(_node);
      // const _name: any = await name({
      //   contract: getContract({
      //     client: client,
      //     address: addresses.PublicResolver,
      //     chain: minato,
      //   }),
      //   node: _node as `0x${string}`,
      // });
      setPrimary(_primary.name);
    } catch {
      (e: any) => {
        console.log("error in eth primary", e);
      };
    }
  }

  const switchAccount = async () => {
    await logout();
    await handleConnect();
  };

  const logout = async () => {
    wallet && disconnect(wallet);
    setConnectedAccount("");
    setIsConnected(false);
    setPrimary("");
  };

  const switchNetwork = async (_network: string) => {
    setNetwork(_network);
  };
  return (
    <>
      <Box
        w={
          title !== "Connect"
            ? ["100%", "100%", "fit-content"]
            : ["168px", "192px"]
        }
      >
        <AutoConnect
          wallets={wallets}
          client={client}
          onConnect={(wallet) => {
            setIsConnected(true);
            setConnectedAccount(String(wallet.getAccount()?.address));
            if (wallet.getChain() !== minato) {
              wallet.switchChain(minato);
            }
            getEthPrimary();
          }}
          appMetadata={{
            logoUrl: SITE_LOGO_URL,
            name: SITE_TITLE,
            description: SITE_DESCRIPTION,
            url: SITE_URL,
          }}
        />
        {_connectedAccount ? (
          <>
            <Menu>
              <MenuButton
                as={Button}
                size={"lg"}
                rounded={"full"}
                w={["168px", "192px"]}
                px={0}
                colorScheme={lightMode ? "whiteAlpha" : "dark"}
                bgColor={lightMode ? "whiteAlpha.900" : "var(--dark)"}
                variant={lightMode ? "solid" : "outline"}
              >
                <Flex
                  gap={2}
                  align={"center"}
                  key={
                    primaryName
                      ? `primary-avatar-box-${primaryName}`
                      : "wallet-avatar-box"
                  }
                >
                  {primaryName !== "" ? (
                    <Avatar
                      color={!lightMode ? "var(--base)" : "var(--base)"}
                      icon={
                        <LinkIcon type="RiUserLine" size={22} color="#ffffff" />
                      }
                      bgColor={!lightMode ? "var(--base0)" : "var(--base0)"}
                      rounded={"full"}
                      src={AVATAR_API_URL + primaryName}
                      size={["md"]}
                    />
                  ) : (
                    <Box p={3} rounded={"full"} border={"1px #77777750 solid"}>
                      <LinkIcon type="RiUserLine" size={22} color="#777777" />
                    </Box>
                  )}
                  <Text
                    fontWeight={"semibold"}
                    textAlign={"left"}
                    fontSize={["md", "lg"]}
                    color={"#777777"}
                    my={"0 !important"}
                  >
                    {primaryName && primaryName !== ""
                      ? primaryName.length > (!small ? 8 : 10)
                        ? primaryName?.slice(0, !small ? 8 : 10) + "..."
                        : primaryName
                      : truncAddress(connectedAccount)}
                  </Text>
                  {/* </Stack> */}
                </Flex>
              </MenuButton>
              <MenuList
                width={320}
                mt={1}
                py={2}
                border={lightMode ? "none" : "1px #77777750 solid"}
                shadow={lightMode ? "md" : "none"}
                position={"relative"}
                zIndex={1500}
                rounded={"2xl"}
                bg={lightMode ? "var(--white)" : "var(--dark0)"}
              >
                <Flex
                  p={5}
                  alignItems="center"
                  gap={2}
                  key={
                    primaryName
                      ? `primary-name-box-${primaryName}`
                      : "wallet-name-box"
                  }
                >
                  {primaryName !== "" ? (
                    <Avatar
                      color={!lightMode ? "var(--base)" : "var(--base)"}
                      icon={
                        <LinkIcon type="RiUserLine" size={22} color="#ffffff" />
                      }
                      bgColor={!lightMode ? "var(--base0)" : "var(--base0)"}
                      rounded={"full"}
                      src={AVATAR_API_URL + primaryName}
                      size={["md"]}
                    />
                  ) : (
                    <Box p={3} rounded={"full"} border={"1px #77777750 solid"}>
                      <LinkIcon type="RiUserLine" size={22} color="#777777" />
                    </Box>
                  )}
                  <Stack gap={0.5} mx={1} flexGrow={1}>
                    <Text
                      fontWeight={"semibold"}
                      textAlign={"left"}
                      fontFamily={"Poppins"}
                      fontSize="14px"
                      my={"0 !important"}
                    >
                      {primaryName !== ""
                        ? String(primaryName)
                        : truncAddress(connectedAccount)}
                    </Text>
                    <Text
                      fontWeight={"semibold"}
                      textAlign={"left"}
                      fontFamily={"Poppins"}
                      my={"0 !important"}
                      fontSize="14px"
                      color="gray.500"
                    >
                      {!isLoading && !isError && data
                        ? Number(data?.displayValue).toFixed(4)
                        : "Loading"}{" "}
                      {notMobile ? "ETH" : ""}
                    </Text>
                  </Stack>
                  <Tooltip
                    borderRadius={4}
                    label={<Text p={2}>Copy Address</Text>}
                    color={lightMode ? "white" : "black"}
                    bgColor={lightMode ? "black" : "white"}
                    placement="bottom"
                    hasArrow
                  >
                    <IconButton
                      onClick={onCopy}
                      variant="ghost"
                      aria-label="copy-wallet-address"
                    >
                      {hasCopied ? (
                        <RiCheckDoubleFill size={22} />
                      ) : (
                        <RiFileCopyLine size={22} />
                      )}
                    </IconButton>
                  </Tooltip>
                  <Tooltip
                    borderRadius={4}
                    label={<Text p={2}>Disconnect Wallet</Text>}
                    hasArrow
                    placement="bottom-end"
                    color={lightMode ? "white" : "black"}
                    bgColor={lightMode ? "black" : "white"}
                  >
                    <IconButton
                      onClick={logout}
                      variant="ghost"
                      aria-label="disconnect-wallet"
                    >
                      <RiLogoutBoxRLine size={22} />
                    </IconButton>
                  </Tooltip>
                </Flex>
                <Stack gap={2} my={primaryName ? 4 : 0} justify={"center"}>
                  {primaryName && (
                    <LinkBox px={5}>
                      <Link href={"name/" + primaryName} passHref>
                        <Button
                          borderColor={"gray.800"}
                          gap={2}
                          variant="outline"
                          width={"100%"}
                          size="md"
                        >
                          <LinkIcon type="RiUserLine" size={22} />
                          Profile
                        </Button>
                      </Link>
                    </LinkBox>
                  )}

                  {/* <Box px={5}>
                    <Button
                      onClick={switchAccount}
                      borderColor={"gray.800"}
                      gap={2}
                      variant="outline"
                      width={"100%"}
                    >
                      <LinkIcon type="RiShuffleLine" size={22} />
                      Switch Account
                    </Button>
                  </Box> */}
                  <LinkBox px={5}>
                    <Button
                      as={NextLink}
                      borderColor={"gray.800"}
                      gap={2}
                      href={"/names"}
                      passHref
                      variant="outline"
                      width={"100%"}
                      size="md"
                    >
                      <LinkIcon type="RiApps2Line" size={24} />
                      My Names
                    </Button>
                  </LinkBox>
                </Stack>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Button
            rounded={"full"}
            onClick={handleConnect}
            variant="solid"
            colorScheme="light"
            height={"47px"}
            fontSize={"medium"}
            width={
              title !== "Connect"
                ? ["100%", "100%", "fit-content"]
                : ["168px", "192px"]
            }
            {...style}
          >
            {title}
          </Button>
        )}
      </Box>
    </>
  );
}
