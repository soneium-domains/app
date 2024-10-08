import {
  Button,
  Flex,
  useMediaQuery,
  useColorMode,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  useToast,
  Center,
  Spinner,
  Switch,
  Box,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { LinkIcon, Logo } from "components/logos";
import {
  avatarAtom,
  claimingNameAtom,
  connectedAccountAtom,
  isConnectedAtom,
  linksArrayAtom,
  openRegisterAtom,
  pathAtom,
  primaryNameAtom,
  secretAtom,
  socialsArrayAtom,
  subtitleAtom,
  titleAtom,
  walletsArrayAtom,
} from "core/atoms";
import {
  AVATAR_API_URL,
  AVATAR_PREVIEW_URL,
  ETHERSCAN_ADDRESS,
  SITE_MANAGE_SINGLE_URL,
  SITE_PROFILE_URL,
  TLD,
} from "core/utils/constants";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useTranslate } from "core/lib/hooks/use-translate";
import {
  ETHRegistrarController,
  PriceOracle,
  Resolver,
} from "core/utils/contracts";
import {
  estimateGasCost,
  prepareContractCall,
  toWei,
} from "thirdweb";
import {
  makeCommitment,
  rentPrice,
} from "contracts/421614/0x89c108a78ef261a9f9e977e566b310cb3518e714";
import { toEther } from "thirdweb/utils";
import { latestAnswer } from "contracts/421614/0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165";
import {
  EditAvatar,
  ManageLinks,
  ManageSocials,
  ManageWallets,
  TitleInput,
} from "components/manage";
import CropAvatar from "components/manage/CropAvatar";
import AddModal from "components/manage/AddModal";
import TextIcon from "components/features/TextIcon";
import { TransactionButton, useActiveAccount } from "thirdweb/react";
import { getRandomBytes32 } from "core/utils/stringUtils";
import { BigNumber } from "ethers";
import { generateRecordCallArray, namehash } from "@soneium-domains/js/utils";
import Lottie from "react-lottie";
import * as animationData from "assets/animations/congrats.json";
import LoadingIcon from "components/ui/LoadingIcon";

export default function RegisterModal() {
  const { colorMode } = useColorMode();
  const [isPrimary, setIsPrimary] = useState<boolean>(false);
  const [_open, _setOpen] = useAtom(openRegisterAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useAtom(claimingNameAtom);
  const connected = useAtomValue(isConnectedAtom);
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const primaryName = useAtomValue(primaryNameAtom);
  const lightMode = useColorMode().colorMode === "light";
  const [year, setYear] = useState<number>(1);
  const [step, setStep] = useState<number>(1);
  const [fee, setFee] = useState<bigint | null>(null);
  const [gas, setGas] = useState<bigint | Number | string | null>(null);
  const [usdFee, setUsdFee] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);
  const [totalFee, setTotalFee] = useState<number | null>(null);
  const [cmHash, setCmHash] = useState<`0x${string}`>("0x");
  const [registeredTx, setRegisteredTx] = useState<string | undefined>();
  const [recordsData, setRecordsData] = useState<`0x${string}`[]>();
  const [notMobile] = useMediaQuery("(min-width: 768px)");
  const [isMinting, setIsMinting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [timerPassed, setTimerPassed] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [animated, setAnimated] = useState<boolean>(false);
  const [claimedName, setClaimedName] = useState("");
  const setPath = useSetAtom(pathAtom);
  const avatar = useAtomValue(avatarAtom);
  const toast = useToast();
  const { t } = useTranslate();
  const minFee: number = 2000000000;
  const address = useActiveAccount()?.address;
  const [secret, setSecret] = useAtom(secretAtom);
  const walletsArray = useAtomValue(walletsArrayAtom);
  const socialsArray = useAtomValue(socialsArrayAtom);
  const linksArray = useAtomValue(linksArrayAtom);
  const display = useAtomValue(titleAtom);
  const location = useAtomValue(subtitleAtom);

  async function prepare() {
    const _secret = getRandomBytes32();
    console.log(_secret);
    console.log(address);
    console.log(BigNumber.from(new Uint8Array(8).fill(255)).toString());
    setSecret(_secret);

    let _texts: { key: string; value: string }[] = [];
    let _coins: { coin: string; value: string }[] = [];
    if (avatar) {
      _texts.push({ key: "avatar", value: avatar });
    }

    if (display) {
      _texts.push({ key: "display", value: display });
    }

    if (location) {
      _texts.push({ key: "location", value: location });
    }

    if (walletsArray.length > 0) {
      walletsArray.map((item) =>
        _coins.push({ coin: item.key as string, value: item.value as string })
      );
    }

    if (socialsArray.length > 0) {
      socialsArray.map((item) =>
        _texts.push({ key: item.key as string, value: item.value as string })
      );
    }

    const typeCounter: { [key: string]: number } = {};

    if (linksArray.length > 0) {
      linksArray.map((item, index) => {
        typeCounter[item.type] = (typeCounter[item.type] || 0) + 1;
        // return {
        //   ...item,
        //   typeCount: typeCounter[item.type],
        // };
        _texts.push({
          key: `${item.type.replace(" ", ".")}.${typeCounter[item.type]}`,
          value: JSON.stringify(item),
        });
      });
    }

    const options = {
      texts: _texts,
      coins: _coins,
      clearRecords: false,
    };

    console.log(options);

    const hash = namehash(name + "." + TLD);
    console.log(hash);

    let data: any;

    const callArray = generateRecordCallArray({
      namehash: namehash(`${name}.son`),
      ...options,
    });

    if (callArray.length === 0) data = [];

    data = callArray;

    setRecordsData(data);
    console.log(data);

    const commitmentHash: any = await makeCommitment({
      contract: ETHRegistrarController,
      name: name,
      owner: address!,
      secret: _secret,
      duration: BigInt(365 * 24 * 60 * 60 * year),
      resolver: Resolver.address,
      reverseRecord: isPrimary,
      fuses: 0,
      data: data,
      wrapperExpiry: BigInt(
        BigNumber.from(new Uint8Array(8).fill(255)).toString()
      ),
    });
    console.log(commitmentHash);
    setCmHash(commitmentHash);

    const commitTx = prepareContractCall({
      contract: ETHRegistrarController,
      method: "commit",
      params: [commitmentHash],
    });

    //const gas = await estimateGas({ transaction: _makeCommitmentTx });
    const gasCost = await estimateGasCost({ transaction: commitTx });
    setGas(Number(gasCost.ether).toFixed(5));
  }

  async function saveAvatar() {
    await prepare();
  }

  useEffect(() => {
    if (_open) {
      onOpen();
      if (primaryName.length < 3) {
        setIsPrimary(true);
      }
      setYear(1);
      setAnimated(false);
    } else {
      onClose();
    }
  }, [_open]);

  useEffect(() => {
    setFee(null);
    async function getFee() {
      console.log("getting fee");
      //@ts-ignore: Unreachable code error
      const _fee: any = await rentPrice({
        name: name,
        duration: BigInt(365 * 24 * 60 * 60 * year),
        contract: ETHRegistrarController,
      });

      console.log(_fee);

      setFee(_fee.base);

      const _ethPrice = await latestAnswer({ contract: PriceOracle });
      console.log(_ethPrice);
      const _usdFee =
        ((Number(toEther(_fee.base)) + Number(gas)) * Number(_ethPrice)) / 1e8;
      setEthPrice(Number(_ethPrice));
      setUsdFee(_usdFee);

      setTotalFee(Number(toEther(_fee.base)) + Number(gas));
    }

    if (isOpen) {
      getFee();
      prepare();
    }
  }, [
    year,
    address,
    connected,
    isOpen,
    avatar,
    isPrimary,
    walletsArray,
    linksArray,
    socialsArray,
    display,
    location,
  ]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => _setOpen(false)}
        size={["full", "full", "3xl"]}
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.700"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent
          bg={
            isMinting || isConfirming
              ? lightMode
                ? "var(--base0)"
                : "var(--base2)"
              : colorMode === "dark"
              ? "var(--dark1)"
              : "var(--white)"
          }
          transition={"all ease 1s"}
        >
          <ModalHeader
            display={"flex"}
            fontSize={["xl", "2xl"]}
            justifyContent={"center"}
            gap={1}
            fontWeight={"normal"}
            cursor={"default"}
          >
            Registering Domain
          </ModalHeader>
          {notMobile && <ModalCloseButton />}
          <ModalBody as={Flex} direction={"column"} justify={"center"}>
            {step === 1 && (
              <Flex gap={10} direction={"column"} justify={"center"}>
                <Flex
                  fontWeight={"light"}
                  fontSize={["xl", "2xl", "3xl"]}
                  gap={1}
                  justify={"center"}
                >
                  <Text>
                    {name}.{TLD}
                  </Text>
                </Flex>
                <Flex gap={2} align={"center"}>
                  <Button
                    height={"68px"}
                    rounded={"full"}
                    fontSize={"4xl"}
                    variant={"pop"}
                    isDisabled={year === 1}
                    size={"lg"}
                    onClick={() => setYear((y) => (y > 1 ? y - 1 : 1))}
                  >
                    -
                  </Button>
                  <Text
                    fontSize={["xl", "2xl", "3xl"]}
                    flexGrow={1}
                    textAlign={"center"}
                  >
                    {year} {year > 1 ? "years" : "year"}
                  </Text>
                  <Button
                    height={"68px"}
                    variant={"pop"}
                    px={5}
                    fontSize={"4xl"}
                    rounded={"full"}
                    isDisabled={year === 10}
                    size={"lg"}
                    onClick={() => setYear((y) => y + 1)}
                  >
                    +
                  </Button>
                </Flex>
                <Flex
                  align={"center"}
                  bg={
                    colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
                  }
                  p={4}
                  direction={"column"}
                  gap={2}
                  rounded={"lg"}
                  fontSize={["md", "lg"]}
                >
                  <Flex justify={"space-between"} w={"100%"}>
                    <Text>
                      {year} {year > 1 ? "years" : "year"} registration
                    </Text>

                    <Center gap={2}>
                      <Text textAlign={"right"}>
                        {fee
                          ? `${Number(toEther(fee)).toFixed(5)} ETH `
                          : "Calculating..."}
                      </Text>
                    </Center>
                  </Flex>
                  <Flex justify={"space-between"} w={"100%"}>
                    <Text>Est. network fee</Text>
                    <Text>{gas ? `${gas} ETH` : "Loading"}</Text>
                  </Flex>

                  <Flex
                    justify={"space-between"}
                    w={"100%"}
                    fontSize={["lg", "xl"]}
                    fontWeight={"bold"}
                  >
                    <Text>Estimated Total fee</Text>
                    <Stack>
                      <Text textAlign={"right"}>
                        {totalFee ? `${totalFee?.toFixed(5)} ETH` : "Loading"}
                      </Text>
                      {/* <Text textAlign={"right"} fontSize={"md"}>
                        {usdFee ? ` $${usdFee?.toFixed(0)} USD ` : ``}
                      </Text> */}
                    </Stack>
                  </Flex>
                </Flex>
                <Flex
                  align={"center"}
                  bg={
                    colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
                  }
                  p={4}
                  direction={"column"}
                  gap={2}
                  rounded={"lg"}
                  fontSize={["lg", "xl"]}
                >
                  <Flex justify={"space-between"} w={"100%"}>
                    <Stack>
                      <Text fontSize={"xl"} fontWeight={"bold"}>
                        Set As Primary
                      </Text>
                      <Text fontSize={"small"}>
                        This links your address to this name, allowing dApps to
                        display it as your profile when connected to them. You
                        can only have one primary name per address.
                      </Text>
                    </Stack>
                    <Switch
                      size={"lg"}
                      isChecked={isPrimary}
                      onChange={() => setIsPrimary((s) => !s)}
                    ></Switch>
                  </Flex>
                </Flex>
              </Flex>
            )}
            {step === 2 && (
              <Flex gap={10} direction={"column"} justify={"center"}>
                <Text
                  fontWeight={"light"}
                  w={"100%"}
                  textAlign={"center"}
                  fontSize={["xl", "2xl"]}
                >
                  Create Your Profile
                </Text>

                <Flex gap={4} direction={"column"} justify={"center"}>
                  <EditAvatar onClick={saveAvatar} />
                  <CropAvatar />
                  <TitleInput />
                  <AddModal type="full" />
                  <ManageWallets json={{}} />
                  <ManageLinks json={{}} />
                  <ManageSocials json={{}} />
                </Flex>
              </Flex>
            )}
            {step === 3 && (
              <Flex gap={6} direction={"column"} justify={"center"}>
                <SimpleGrid columns={[1, 3]} gap={4}>
                  <TextIcon
                    text="Complete a transaction to begin the timer"
                    icon={<LinkIcon type="No.1" size={"50px"} />}
                  />
                  <TextIcon
                    text="Wait 10 seconds for the timer to complete"
                    icon={<LinkIcon type="No.2" size={"50px"} />}
                  />
                  <TextIcon
                    text="Complete a second transaction to secure your name"
                    icon={<LinkIcon type="No.3" size={"50px"} />}
                  />
                </SimpleGrid>

                <Flex
                  align={"center"}
                  bg={
                    colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"
                  }
                  p={4}
                  direction={"column"}
                  gap={2}
                  rounded={"lg"}
                  fontSize={["md", "lg"]}
                >
                  <Flex justify={"space-between"} w={"100%"}>
                    <Text>
                      {year} {year > 1 ? "years" : "year"} registration
                    </Text>

                    <Center gap={2}>
                      <Text textAlign={"right"}>
                        {fee
                          ? `${Number(toEther(fee)).toFixed(5)} ETH `
                          : "Calculating..."}
                      </Text>
                    </Center>
                  </Flex>
                  <Flex justify={"space-between"} w={"100%"}>
                    <Text>Est. network fee</Text>
                    <Text>{`${gas} ETH`}</Text>
                  </Flex>

                  <Flex
                    justify={"space-between"}
                    w={"100%"}
                    fontSize={["lg", "xl"]}
                    fontWeight={"bold"}
                  >
                    <Text>Estimated Total fee</Text>
                    <Stack>
                      <Text textAlign={"right"}>
                        {totalFee?.toFixed(5)} ETH
                      </Text>
                      {/* <Text textAlign={"right"} fontSize={"md"}>
                        {fee ? ` $${usdFee?.toFixed(0)} USD ` : ``}
                      </Text> */}
                    </Stack>
                  </Flex>
                </Flex>
              </Flex>
            )}
            {step === 4 && (
              <>
                <Flex gap={6} direction={"column"} justify={"center"}>
                  {(isMinting || isConfirming) && (
                    <Center minH={246} flexDirection={"column"} gap={6}>
                      {isMinting && (
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          textAlign={"center"}
                        >
                          {loadingText}
                        </Text>
                      )}
                      <Spinner size={"xl"} />
                    </Center>
                  )}
                  {!isMinting && !isConfirming && (
                    <>
                      <Center flexDirection={"column"} gap={4}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          Confirm Details
                        </Text>
                        <Text textAlign={"center"}>
                          Double check these details before confirming in your
                          wallet
                        </Text>
                      </Center>
                      <Flex
                        align={"center"}
                        bg={
                          colorMode === "light"
                            ? "blackAlpha.100"
                            : "whiteAlpha.100"
                        }
                        p={4}
                        direction={"column"}
                        gap={2}
                        rounded={"lg"}
                        fontSize={["lg", "xl"]}
                      >
                        <Flex justify={"space-between"} w={"100%"}>
                          <Text fontWeight={"bold"}>Name</Text>

                          <Text>{`${name}.son`} </Text>
                        </Flex>
                        <Flex justify={"space-between"} w={"100%"}>
                          <Text fontWeight={"bold"}>Duration</Text>

                          <Text>
                            {year} {year > 1 ? "years" : "year"}{" "}
                          </Text>
                        </Flex>
                        <Flex
                          justify={"space-between"}
                          w={"100%"}
                          fontSize={["lg", "xl"]}
                          fontWeight={"bold"}
                        >
                          <Text>est. Total fee</Text>
                          <Stack>
                            <Text textAlign={"right"}>
                              {totalFee?.toFixed(5)} ETH
                            </Text>
                            {/* <Text textAlign={"right"} fontSize={"md"}>
                              {fee ? ` $${usdFee?.toFixed(0)} USD ` : ``}
                            </Text> */}
                          </Stack>
                        </Flex>
                      </Flex>
                    </>
                  )}
                </Flex>
              </>
            )}

            {step === 5 && (
              <>
                <Flex gap={6} direction={"column"} justify={"center"}>
                  {(isMinting || isConfirming) && (
                    <Center minH={246} flexDirection={"column"} gap={6}>
                      {isMinting && (
                        <Text
                          fontSize={"xl"}
                          fontWeight={"bold"}
                          textAlign={"center"}
                        >
                          {loadingText}
                        </Text>
                      )}
                      <Spinner size={"xl"} />
                    </Center>
                  )}
                  {!isMinting && !isConfirming && (
                    <>
                      <Center flexDirection={"column"} gap={8}>
                        {!timerPassed ? (
                          <>
                            <Text fontSize={"xl"} fontWeight={"bold"}>
                              Timer Started
                            </Text>
                            <Text textAlign={"center"}>
                              Wait 10 seconds and Complete the second
                              transaction
                            </Text>
                            <LoadingIcon delay={10} icon={<Logo w={'44px'} h={'44px'} />} text="Waiting ..." onComplete={() => {
                                setTimerPassed(true);
                                return { shouldRepeat: false, delay: 1 };
                              }}/>
                          </>
                        ) : (
                          <>
                            <Text fontSize={"xl"} fontWeight={"bold"}>
                              Last Step
                            </Text>
                            <Text textAlign={"center"}>
                              Complete a second transaction to secure your name
                            </Text>
                          </>
                        )}
                      </Center>
                    </>
                  )}
                </Flex>
              </>
            )}

            {step === 6 && (
              <>
                <Flex gap={6} direction={"column"} justify={"center"}>
                  {!isMinting && !isConfirming && (
                    <>
                      <Box position={"fixed"} top={-100} zIndex={1000}>
                        {!animated && (
                          //@ts-ignore
                          <Lottie
                            options={{
                              loop: false,
                              autoplay: true,
                              animationData: animationData,
                              rendererSettings: {
                                preserveAspectRatio: "xMidYMid slice",
                              },
                            }}
                            height={800}
                            width={800}
                            eventListeners={[
                              {
                                eventName: "complete",
                                callback: () => setAnimated(true),
                              },
                            ]}
                          />
                        )}
                      </Box>
                      <Center flexDirection={"column"} gap={4}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          Name Registered!
                        </Text>
                        <Image
                          w={["100%", "xs"]}
                          src={avatar ? `${AVATAR_API_URL}${name}.son` : `${AVATAR_PREVIEW_URL}${name}.son`}
                          rounded={"xl"}
                          alt={name+'-son-avatar-image'}
                        />
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          {name}.son
                        </Text>
                        {/* <Button
                          w={["100%", "xs"]}
                          as={Link}
                          href={OPENSEA_URL + BigInt(namehash(name + ".son"))}
                          target="_blank"
                          size={"lg"}
                        >
                          View On Opensea!
                        </Button> */}
                        <Button
                          w={["100%", "xs"]}
                          as={Link}
                          href={ETHERSCAN_ADDRESS + registeredTx}
                          target="_blank"
                          size={"lg"}
                        >
                          View On Soneium Explorer!
                        </Button>
                        <Button
                          w={["100%", "xs"]}
                          as={Link}
                          href={SITE_PROFILE_URL + name + ".son"}
                          target="_blank"
                          size={"lg"}
                        >
                          View Name
                        </Button>
                        <Button
                          w={["100%", "xs"]}
                          as={Link}
                          href={SITE_MANAGE_SINGLE_URL + name + ".son"}
                          target="_blank"
                          size={"lg"}
                        >
                          Manage Name
                        </Button>
                      </Center>
                    </>
                  )}
                </Flex>
              </>
            )}
          </ModalBody>
          <ModalFooter py={8}>
            <Flex justify={step === 6 ? "center" : "space-between"} w={"100%"}>
              <Button
                rounded={"full"}
                height={["58px"]}
                isDisabled={isMinting || isConfirming}
                size="lg"
                variant={"pop"}
                onClick={() => {
                  switch (step) {
                    case 1:
                      _setOpen(false);
                      break;

                    case 6:
                      _setOpen(false);
                      setStep(1);
                      break;
                    // case 3:
                    //   setStep((s) => s - 2);
                    //     break;

                    default:
                      setStep((s) => s - 1);
                      break;
                  }
                }}
              >
                {step === 1 || step === 6 ? "Close" : "Back"}
              </Button>

              {step === 1 && (
                <Button
                  rounded={"full"}
                  size="lg"
                  fontSize={"xl"}
                  variant={"pop"}
                  height={["58px"]}
                  isDisabled={!fee || isMinting || isConfirming}
                  // isLoading={feeIsLoading || isMinting}
                  // loadingText={
                  //   isMinting && !isConfirming
                  //     ? 'Claiming ...'
                  //     : isMinting && isConfirming
                  //     ? t('confirming')
                  //     : ''
                  // }
                  onClick={() => setStep(2)}
                >
                  Confirm
                </Button>
              )}
              {step === 2 && (
                <Button
                  rounded={"full"}
                  size="lg"
                  fontSize={"xl"}
                  variant={"pop"}
                  height={["58px"]}
                  isDisabled={!fee || isMinting || isConfirming}
                  // isLoading={feeIsLoading || isMinting}
                  // loadingText={
                  //   isMinting && !isConfirming
                  //     ? 'Claiming ...'
                  //     : isMinting && isConfirming
                  //     ? t('confirming')
                  //     : ''
                  // }
                  onClick={() => setStep(3)}
                >
                  {recordsData && recordsData.length > 0
                    ? "Next"
                    : "Skip Profile"}
                </Button>
              )}
              {step === 3 && (
                <Button
                  rounded={"full"}
                  size="lg"
                  fontSize={"xl"}
                  variant={"pop"}
                  height={["58px"]}
                  isDisabled={!fee || isMinting || isConfirming}
                  // isLoading={feeIsLoading || isMinting}
                  // loadingText={
                  //   isMinting && !isConfirming
                  //     ? 'Claiming ...'
                  //     : isMinting && isConfirming
                  //     ? t('confirming')
                  //     : ''
                  // }
                  onClick={() => setStep(4)}
                >
                  {"Begin"}
                </Button>
              )}

              {step === 4 && (
                <TransactionButton
                  style={{ borderRadius: "54px" }}
                  transaction={() => {
                    setLoadingText(t("confirmInWallet"));
                    const tx = prepareContractCall({
                      contract: ETHRegistrarController,
                      method: "commit",
                      params: [cmHash],
                    });
                    return tx;
                  }}
                  onTransactionSent={(result) => {
                    setLoadingText(t("submitedTransaction"));
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
                    console.log(receipt);
                    setIsMinting(false);
                    setTimerPassed(false);
                    setStep(5);
                  }}
                  onError={(error) => {
                    console.error("Transaction error", error);
                    setIsMinting(false);
                  }}
                  onClick={() => {
                    setIsMinting(true);
                  }}
                >
                  Open Wallet
                </TransactionButton>
              )}

              {step === 5 && timerPassed && (
                <TransactionButton
                  style={{ borderRadius: "54px" }}
                  transaction={() => {
                    setLoadingText(t("confirmInWallet"));
                    const tx = prepareContractCall({
                      contract: ETHRegistrarController,
                      method: "register",
                      value: toWei(String(totalFee! + totalFee! * 0.01)),
                      params: [
                        name,
                        address!,
                        BigInt(365 * 24 * 60 * 60 * year),
                        secret,
                        Resolver.address,
                        recordsData ?? [],
                        isPrimary,
                        0,
                        BigInt(
                          BigNumber.from(new Uint8Array(8).fill(255)).toString()
                        ),
                      ],
                    });
                    console.log(tx);
                    return tx;
                  }}
                  onTransactionSent={(result) => {
                    setLoadingText(t("submitedTransaction"));
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
                    setRegisteredTx(receipt.transactionHash);
                    console.log(receipt);
                    setIsMinting(false);
                    setStep(6);
                  }}
                  onError={(error) => {
                    console.error("Transaction error", error);
                    setIsMinting(false);
                  }}
                  disabled={!timerPassed}
                  onClick={() => setIsMinting(true)}
                >
                  Open Wallet
                </TransactionButton>
              )}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
