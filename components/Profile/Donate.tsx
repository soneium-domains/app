import {
  Button,
  Box,
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
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  LightMode,
  DarkMode,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiCheckLine } from "react-icons/ri";
import { useAtom, useAtomValue } from "jotai";
import {
  buttonBgColorAtom,
  fontAtom,
  isConnectedAtom,
  lightModeAtom,
  openModalAtom,
  roundAtom,
  variantAtom,
} from "core/atoms";
import { capFirstLetter, getColor, truncAddress } from "core/utils";
import { LinkIcon } from "components/logos";
import QRCode from "react-qr-code";

import { DONATE_VALUES } from "core/utils/constants";
import WalletLink from "./WalletLink";
import { Styles } from "types";
import { PayEmbed, TransactionButton, useActiveAccount, useActiveWallet } from "thirdweb/react";
import { client } from "components/walletConnect";
import { getContract, prepareContractCall, toWei } from "thirdweb";
import SimpleLink from "./SimpleLink";

interface Props {
  title: string;
  content: string;
  style?: Styles;
  type: string;
  icon?: JSX.Element;
}

export default function Donate({ title, content, style, icon, type }: Props) {
  const eth = style?.eth;
  const btc = style?.btc;
  const success = content;
  const wallet = useActiveWallet();
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const font = useAtomValue(fontAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const [comment, setComment] = useState<string | undefined>();
  const [isDonating, setIsDonating] = useState(false);
  const [donateSuccessful, setDonateSuccessful] = useState(false);
  const [_open, _setOpen] = useAtom(openModalAtom);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  const [value, setValue] = useState("0.001");
  const ethuri = `ethereum:${eth}?value=${
    Number(value.slice(0, value.indexOf(" "))) * 1e18
  }&gas=42000`;

  const btcuri = `bitcoin:${btc}?amount=${value.slice(
    0,
    value.indexOf(" ")
  )}&label=donation`;


  return (
    <>
      <SimpleLink title={title} styles={style} onClick={onOpen} url="#" icon={icon} type={type} />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        key={"donate-box-" + title}
      >
        <ModalOverlay
          bg="blackAlpha.500"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent
          bg={colorMode === "dark" ? "var(--dark1)" : "var(--white)"}
          fontFamily={font}
          color={lightMode ? "var(--dark1)" : "white"}
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody as={lightMode ? LightMode : DarkMode}>
            <Tabs
              variant={"soft-rounded"}
              colorScheme={colorMode === "light" ? "blackAlpha" : "whiteAlpha"}
            >
              <TabList justifyContent={"center"}>
                {eth && (
                  <Tab gap={2} onClick={() => setValue("0.001 ETH")}>
                    <LinkIcon type="ethereum" size="24" />
                    Ethereum
                  </Tab>
                )}
                {btc && (
                  <Tab gap={2} onClick={() => setValue("0.0001 BTC")}>
                    <LinkIcon type="bitcoin" size="24" />
                    Bitcoin
                  </Tab>
                )}
              </TabList>

              <TabPanels>
                {eth && (
                  <TabPanel>
                    <Stack gap={4}>
                      <Stack gap={4}>
                        <Text>Select an amount</Text>
                        {DONATE_VALUES["ethereum"].map((val: string) => (
                          <Button
                            leftIcon={
                              val === value ? <RiCheckLine /> : undefined
                            }
                            onClick={() => setValue(val)}
                            isActive={val === value}
                            size="lg"
                            rounded={round}
                            key={"donate-value-eth-" + val}
                            variant={variant}
                            colorScheme={buttonBg}
                            color={getColor(variant, buttonBg, lightMode)}
                          >
                            {val} ETH
                          </Button>
                        ))}
                      </Stack>

                      <TransactionButton
                        style={{ borderRadius: "54px" }}
                        transaction={async () => {
                          const tx = prepareContractCall({
                              contract: getContract({
                                client: client,
                                address: eth,
                                chain: wallet?.getChain()!}),
                              method: "function transfer(address to, uint256 value)",
                              params: [eth, toWei(value)],
                              value: toWei(value)
                             });
                             console.log(toWei(value))
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
                          console.log(receipt);
                          setIsDonating(false);
                          setDonateSuccessful(true);
                        }}
                        onError={(error) => {
                          console.error("Transaction error", error);
                          setDonateSuccessful(false);
                          setIsDonating(false);
                        }}
                        onClick={() => {
                          setIsDonating(true);
                        }}
                      >
                        {title}
                      </TransactionButton>

                      
                      {donateSuccessful && !isDonating && (
                        <Text color="green">{success.length > 0 ? success : 'Done. Thanks!'}</Text>
                      )}
                      {/* <Text>or scan the QR Code below</Text>
                      <Box p={2} bg="white">
                        <QRCode style={{ width: "100%" }} value={ethuri} />
                      </Box> */}
                    </Stack>
                  </TabPanel>
                )}
                {btc && (
                  <TabPanel>
                    <Stack gap={4}>
                      <Stack gap={2}>
                        <Text>Select an amount</Text>
                        {DONATE_VALUES["bitcoin"].map((val: string) => (
                          <Button
                            leftIcon={
                              val === value ? <RiCheckLine /> : undefined
                            }
                            onClick={() => setValue(val)}
                            isActive={val === value}
                            size={"lg"}
                            key={"donate-value-btc-" + val}
                            rounded={round}
                            variant={variant}
                            colorScheme={buttonBg}
                            color={getColor(variant, buttonBg, lightMode)}
                          >
                            {val}
                          </Button>
                        ))}
                      </Stack>
                      <Text>Scan the QR Code below</Text>
                      <Box p={2} bg="white">
                        <QRCode style={{ width: "100%" }} value={btcuri} />
                      </Box>
                    </Stack>
                  </TabPanel>
                )}
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
