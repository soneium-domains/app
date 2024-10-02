import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Avatar } from "components/Profile";
import {
  Button,
  Container,
  Text,
  Stack,
  SimpleGrid,
  Box,
  Tooltip,
  Center,
  Flex,
  Link,
  useMediaQuery,
  useColorMode,
  Spinner,
  HStack,
  IconButton,
  Switch,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  Input,
  Select,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import Logo from "components/logos/Logo";
import { sleep } from "core/utils";
import { sql } from "@vercel/postgres";
import {
  primaryNameAtom,
  ipfsGatewayAtom,
  networkAtom,
  connectedAccountAtom,
  isConnectedAtom,
} from "core/atoms";
import { useAtom, useAtomValue } from "jotai";
import {
  AVATAR_API_URL,
  AVATAR_PREVIEW_URL,
  ETHERSCAN_ADDRESS,
  SITE_PROFILE_URL,
} from "core/utils/constants";
import { RiMoreFill, RiRestartLine } from "react-icons/ri";
import { MdOutlinePreview, MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
import { useAddress } from "@thirdweb-dev/react";
import { createWeb3Name } from "@web3-name-sdk/core";
import { useRouter } from "next/router";
import { LinkIcon } from "components/logos";
import { formatDateDifference } from "core/utils/stringUtils";
import {
  client,
  ConnectWalletButton,
  viemClient,
} from "components/walletConnect";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { getNamesForAddress } from "@ensdomains/ensjs/subgraph";
import { setName } from "contracts/421614/0xd05661277665e9fb85d5acb5cbb30de2d6076988";
import { getContract, prepareContractCall } from "thirdweb";
import { ReverseRegistrar } from "core/utils/contracts";

function ManageSection() {
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const isConnected = useAtomValue(isConnectedAtom);

  const address = useActiveAccount()?.address;
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState<string[]>();
  const [loaded, setLoaded] = useState(false);
  const [nftjsons, setNftJsons] = useState<any>(undefined);
  const network = useAtomValue(networkAtom);
  const [_network, _setNetwork] = useState(network);
  const { t } = useTranslate();
  const ipfsGateway = useAtomValue(ipfsGatewayAtom);
  const [primaryName, setPrimaryName] = useAtom(primaryNameAtom);
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { colorMode } = useColorMode();
  const [nextPage, setNextPage] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const { pathname } = useRouter();
  const [page, setPage] = useState<string | undefined>();
  const [searchText, setSearchText] = useState<string>("");
  const [order, setOrder] = useState<string>("expiryDate");
  const [orderDir, setOrderDir] = useState<"desc" | "asc">("desc");

  const loadEthNFTs = async () => {
    try {
      // Take a salted code
      // console.log('loading all nfts', account?.address);
      if (!isConnected || !address){
        setNftJsons([]);
        setIsLoading(false);
        setListIsEmpty(true);
        return;
      } 
      setNftJsons([]);
      setIsLoading(true);
      setListIsEmpty(false);

      // @ts-ignore: Unreachable code error
      const nfts = await getNamesForAddress(viemClient, {
        address: address! as `0x${string}`,
        filter: { searchType: "labelName", searchString: searchText },
        pageSize: 50,
        orderBy: order,
        orderDirection: orderDir,
      });
      console.log(nfts);

      const _nfts = await Promise.all(
        nfts.map(async (nft: any) => {
          try {
            let _avatar = `${AVATAR_API_URL}${nft.labelName}.${nft.parentName}`;
            const options = { year: "numeric", month: "short", day: "numeric" };
            let _nftJson: any = {
              name: nft.labelName + "." + nft.parentName,
              avatar: _avatar ?? "",
              address: nft.id,
              init_time: nft.registrationDate.date,
              expire_date: nft.expiryDate.date.toLocaleString(
                "en-US",
                options as Intl.DateTimeFormatOptions
              ),
            };
            _nftJson.external_url = SITE_PROFILE_URL + _nftJson.name;
            _nftJson.manageUrl = "/name/" + _nftJson.name;
            console.log(_nftJson);
            if (nft.wrappedOwner !== connectedAccount) return {};
            return _nftJson;
          } catch (e: any) {
            console.log("error getting soneiumdomains nft ", e);
            return {};
          }
        })
      );
      setNftJsons(
        _nfts.filter((nft) => nft && nft.name && nft.name.length > 3)
      );

      setLoaded(true);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (nftjsons?.length === 0 && loaded) {
      setListIsEmpty(true);
    } else {
      setListIsEmpty(false);
    }
  }, [nftjsons]);

  useEffect(() => {
    async function getNfts() {
      if (connectedAccount && isConnected) {
        if (!loaded || network !== _network || page || page === "") {
          console.log(network);
          loadEthNFTs();

          _setNetwork(network);
        }
      }

      if (!isConnected) setNftJsons([]);
    }
    getNfts();
  }, [isConnected, network, address, page]);

  useEffect(() => {
    loadEthNFTs();
  }, [order, searchText, orderDir]);

  const reload = async () => {
    await loadEthNFTs();
  };

  return (
    <Box>
      <Container
        as="main"
        maxW="container.lg"
        display="grid"
        flexDir={"column"}
        minH={"90vh"}
        flexGrow={1}
      >
        <Box py={6} gap={0} width={"100%"} pb={20}>
          <Stack gap={6} width={"100%"}>
            <Text
              flexGrow={1}
              fontWeight="bold"
              fontSize={notMobile ? "4xl" : "2xl"}
              my={notMobile ? 6 : 4}
            >
              My Names
            </Text>
            <Flex
              minWidth={["350px", "420px", "580px", "800px"]}
              align={"center"}
              minH={"80px"}
              p={3}
              justifyContent={"space-between"}
              borderTopRadius={"2xl"}
              borderBottom={"1px solid #77777755"}
              gap={3}
              flexDir={["column", "column", "row"]}
              background={colorMode === "dark" ? "blackAlpha.500" : "white"}
            >
              <Flex gap={3} w={["100%", "xs"]}>
                <Input
                  placeholder="Search"
                  value={searchText}
                  fontSize={["md", "lg"]}
                  rounded={"2xl"}
                  variant={"solid"}
                  w={["100%", "xs"]}
                  px={4}
                  size={"lg"}
                  onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                  bg={
                    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.100"
                  }
                />
              </Flex>
              <Flex gap={3} w={["100%", "xs", "auto"]}>
                <Select
                  value={order}
                  onChange={(e) => setOrder(e.currentTarget.value)}
                  size={"lg"}
                  variant={"solid"}
                  bg={
                    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.100"
                  }
                  rounded={"2xl"}
                >
                  <option value={"expiryDate"}>Expiry Date</option>
                  <option value={"name"}>Name</option>
                  <option value={"createdAt"}>Creation Date</option>
                </Select>
                <IconButton
                  size={"lg"}
                  rounded={"2xl"}
                  aria-label="order-direction-button"
                  onClick={(e) =>
                    setOrderDir(orderDir === "desc" ? "asc" : "desc")
                  }
                  key={`order-button-${orderDir}`}
                >
                  {orderDir === "desc" ? (
                    <LinkIcon type="RiSortDesc" size={22} />
                  ) : (
                    <LinkIcon type="RiSortAsc" size={22} />
                  )}
                </IconButton>
                <IconButton
                  aria-label="reload-nfts"
                  key={`reload-${network}-nfts`}
                  rounded={"2xl"}
                  size={"lg"}
                  onClick={reload}
                  gap={2}
                >
                  <RiRestartLine size={"24"} />
                </IconButton>
                <NextLink href={"/app"} passHref>
                  <IconButton
                    size={"lg"}
                    rounded={"2xl"}
                    aria-label="add-new-domain-button"
                  >
                    <LinkIcon type="RiAddLine" />
                  </IconButton>
                </NextLink>
              </Flex>
            </Flex>
            {isLoading && (
              <Center width={"100%"} height={500}>
                <Spinner size="lg" />
              </Center>
            )}
          </Stack>

          <Stack
            gap={2}
            width={"100%"}
            background={colorMode === "dark" ? "blackAlpha.500" : "white"}
            borderBottomRadius={"2xl"}
          >
            {nftjsons?.map((nft: any, i: number) => (
              <Flex
                key={nft.name + "-manage-item"}
                flexDirection={"row"}
                gap={2}
                minWidth={["100%", "420px", "580px", "800px"]}
                height={["72px", "80px"]}
                alignItems={"center"}
                borderBottom={
                  i === nftjsons.length - 1 ? "none" : "1px solid #77777755"
                }
                p={2}
                rounded={"none"}
              >
                <Flex gap={3} w={"100%"} align={"center"}>
                  <Box
                    width={["48px", "48px", "56px"]}
                    key={nft.name + "-box-name"}
                  >
                    <Avatar
                      my={"0px"}
                      noanimate
                      onError={({ currentTarget }: any) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = AVATAR_PREVIEW_URL + nft.name;
                      }}
                      nodrag
                      alt={nft.name}
                      shadow="none"
                      url={String(nft.avatar)}
                      shape="circle"
                    />
                  </Box>
                  <Stack gap={0}>
                    <Text
                      flexGrow={1}
                      fontWeight={"bold"}
                      fontSize={["xl", "xl", "2xl"]}
                    >
                      {String(nft.name).toLowerCase()}
                    </Text>
                    <Text
                      flexGrow={1}
                      fontWeight={"normal"}
                      fontSize={["md", "lg"]}
                      opacity={0.5}
                    >
                      expires in {String(nft.expire_date).toLowerCase()}
                    </Text>
                  </Stack>
                </Flex>

                <Flex gap={2} align={"center"}>
                  {primaryName === nft.name && (
                    <Tooltip
                      borderRadius={4}
                      label={<Text p={2}>Primary Name</Text>}
                      color="white"
                      bgColor={"black"}
                      hasArrow
                    >
                      <IconButton
                        variant={"ghost"}
                        aria-label={`copy-nft-address-icon`}
                      >
                        <LinkIcon type="RiUserStarLine" size={"24px"} />
                      </IconButton>
                    </Tooltip>
                  )}

                  {!nft.manageUrl?.includes("old") && (
                    <Menu>
                      <IconButton
                        size={"lg"}
                        rounded={"full"}
                        as={MenuButton}
                        aria-label="more-settings"
                        variant={"ghost"}
                        p={2}
                      >
                        <RiMoreFill size={32} />
                      </IconButton>

                      <MenuList
                        p={0}
                        bgColor={
                          colorMode === "light" ? "white" : "var(--dark)"
                        }
                      >
                        <MenuItem
                          height={"48px"}
                          bgColor={
                            colorMode === "light"
                              ? "whiteAlpha.400"
                              : "blackAlpha.400"
                          }
                          sx={{
                            textDecoration: "none",
                            _hover: {
                              textDecoration: "none",
                              bgColor:
                                colorMode === "light"
                                  ? "blackAlpha.200"
                                  : "whiteAlpha.300",
                            },
                          }}
                          as={Link}
                          target="_blank"
                          href={String(nft.manageUrl)}
                          gap={2}
                          borderBottomRadius={0}
                        >
                          <LinkIcon type="RiSettings4Line" size={24} />{" "}
                          Customize
                        </MenuItem>
                        {primaryName !== nft.name && (
                          <TransactionButton
                            style={{
                              borderRadius: "0px",
                              height: "48px",
                              width: "100%",
                              justifyContent: "start",
                              display: "flex",
                              padding: 12,
                              backgroundColor:
                                colorMode === "dark"
                                  ? "rgba(0, 0, 0, 0.24)"
                                  : "rgba(255, 255, 255, 0.24)",
                              color: colorMode === "dark" ? "white" : "black",
                            }}
                            transaction={() => {
                              const tx = prepareContractCall({
                                contract: ReverseRegistrar,
                                method: "setName",
                                params: [nft.name],
                              });
                              return tx;
                            }}
                            onTransactionSent={(result) => {
                              console.log(
                                "Transaction submitted",
                                result.transactionHash
                              );
                              console.log(result);
                            }}
                            onTransactionConfirmed={(receipt) => {
                              console.log(
                                "Transaction confirmed",
                                receipt.transactionHash
                              );
                              setPrimaryName(nft.name);
                              reload();
                            }}
                            onError={(error) => {
                              console.error("Transaction error", error);
                            }}
                            onClick={() =>
                              console.log("setting ", nft.name, " as primary")
                            }
                          >
                            <Flex gap={2} align={"center"}>
                              <LinkIcon type="RiUserStarLine" size={"24px"} />
                              <Text>Set As Primary</Text>
                            </Flex>
                          </TransactionButton>
                        )}

                        <MenuItem
                          size={"lg"}
                          as={Link}
                          height={"48px"}
                          bgColor={
                            colorMode === "light"
                              ? "whiteAlpha.400"
                              : "blackAlpha.400"
                          }
                          sx={{
                            textDecoration: "none",
                            _hover: {
                              textDecoration: "none",
                              bgColor:
                                colorMode === "light"
                                  ? "blackAlpha.200"
                                  : "whiteAlpha.300",
                            },
                          }}
                          href={nft.external_url}
                          target="_blank"
                          icon={<MdOutlineVisibility size={24} />}
                        >
                          View Profile
                        </MenuItem>

                        <MenuItem
                          size={"lg"}
                          as={Link}
                          height={"48px"}
                          bgColor={
                            colorMode === "light"
                              ? "whiteAlpha.400"
                              : "blackAlpha.400"
                          }
                          sx={{
                            textDecoration: "none",
                            _hover: {
                              textDecoration: "none",
                              bgColor:
                                colorMode === "light"
                                  ? "blackAlpha.200"
                                  : "whiteAlpha.300",
                            },
                          }}
                          href={ETHERSCAN_ADDRESS + nft.address}
                          target="_blank"
                          icon={<LinkIcon type="RiSearchEyeLine" size={24} />}
                        >
                          View on Explorer
                        </MenuItem>

                        {/* <MenuItem
                              size={"lg"}
                              as={Link}
                              height={"48px"}
                              bgColor={
                                colorMode === "light"
                                  ? "whiteAlpha.400"
                                  : "blackAlpha.400"
                              }
                              sx={{
                                textDecoration: "none",
                                _hover: {
                                  textDecoration: "none",
                                  bgColor:
                                    colorMode === "light"
                                      ? "blackAlpha.200"
                                      : "whiteAlpha.300",
                                },
                              }}
                              href={ETHERSCAN + nft.address}
                              target="_blank"
                              icon={
                                <LinkIcon
                                  size={"sm"}
                                />
                              }
                            >
                              Sell on Opensea
                            </MenuItem> */}

                        <MenuItem
                          size={"lg"}
                          as={Link}
                          height={"48px"}
                          bgColor={
                            colorMode === "light"
                              ? "whiteAlpha.400"
                              : "blackAlpha.400"
                          }
                          isDisabled
                          sx={{
                            textDecoration: "none",
                            _hover: {
                              textDecoration: "none",
                              bgColor:
                                colorMode === "light"
                                  ? "blackAlpha.200"
                                  : "whiteAlpha.300",
                            },
                          }}
                          icon={<LinkIcon type="RiExpandRightLine" size={24} />}
                        >
                          Extend
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
              </Flex>
            ))}
          </Stack>
          {nftjsons && nftjsons?.length > 0 && page && page !== "" && (
            <Flex align={"center"} py={8} gap={4} justify={"end"}>
              <Text fontSize={["xl"]} textAlign={"center"}>
                Page {pageNum}
              </Text>
              <Button
                rounded={"full"}
                isDisabled={page === undefined || page === "" || isLoading}
                size={"lg"}
                onClick={() => {
                  setPageNum(1);
                  setPage("");
                }}
              >
                <LinkIcon type="RiArrowLeftDoubleFill" />
              </Button>
              <Button
                rounded={"full"}
                isDisabled={
                  nextPage === undefined || nextPage === "" || isLoading
                }
                size={"lg"}
                onClick={() => {
                  setPageNum((y) => y + 1);
                  setPage(nextPage);
                }}
              >
                <LinkIcon type="RiArrowRightSLine" />
              </Button>
            </Flex>
          )}
          {listIsEmpty && !isLoading && (
            <Center
              display="flex"
              flexDirection="column"
              gap={4}
              minH={"200px"}
            >
              {!isConnected ? 
                <Center my={8} flexDirection="column" minH={"200px"} gap={4}>
                   <Text fontSize="xl">Connect your wallet
                  </Text>
                  <ConnectWalletButton />
                </Center>
               : 
                <>
                  <Text fontSize="xl">
                    You don't own any {pathname.includes("old") ? " old " : ""}{" "}
                    Domains
                  </Text>
                  <NextLink href={"/app"} passHref>
                    <Button
                      variant="outline"
                      textAlign="left"
                      borderWidth={1}
                      gap={2}
                      borderColor="grey"
                    >
                      Claim Your Domain Now
                    </Button>
                  </NextLink>
                </>
              }
            </Center>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default ManageSection;
