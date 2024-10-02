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
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Select,
  Link,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiCheckLine, RiShuffleLine } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import {
  buttonBgColorAtom,
  fontAtom,
  isConnectedAtom,
  lightModeAtom,
  openModalAtom,
  roundAtom,
  variantAtom,
} from 'core/atoms';
import { LinkIcon } from 'components/logos';
import QRCode from 'react-qr-code';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { Styles } from 'types';
import { getColor } from 'core/utils';
import { TransactionButton, useActiveWallet } from 'thirdweb/react';
import { getContract, prepareContractCall, toWei } from 'thirdweb';
import { client } from 'components/walletConnect';
import SimpleLink from './SimpleLink';

interface Props {
  title: string;
  content: string;
  style?: Styles;
  type: string;
  icon?: JSX.Element;
}

export default function Pay({ title, content, style, icon, type }: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const wallet = useActiveWallet();
  const eth = style?.eth;
  const btc = style?.btc;
  const success = content;
  const font = useAtomValue(fontAtom);
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);
  const [connected, setIsConnected] = useAtom(isConnectedAtom);
  const [autoEth, setAutoEth] = useState(false);
  const [isPaying, setisPaying] = useState(false);
  const [paySuccessful, setpaySuccessful] = useState(false);

  const [_open, _setOpen] = useAtom(openModalAtom);

  useEffect(() => {
    _setOpen(isOpen)
  }, [isOpen]);


  const [value, setValue] = useState('1');
  const ethuri = `ethereum:${eth}?value=${Number(value) * 1e18}&gas=42000`;

  const btcuri = `bitcoin:${btc}?amount=${value}&label=payment`;


  return (
    <>
      <SimpleLink title={title} styles={style} onClick={onOpen} url="#" icon={icon} type={type} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'} fontFamily={font} color={lightMode ? 'var(--dark1)' : 'white'}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant={'soft-rounded'} colorScheme={colorMode === 'light' ? "blackAlpha" : 'whiteAlpha'}>
              <TabList justifyContent={'center'} >
                {eth && <Tab gap={2} onClick={() => setValue('0.001')} ><LinkIcon type='ethereum' size='24'/>Ethereum</Tab>}
                {btc && <Tab gap={2} onClick={() => setValue('0.0001')} ><LinkIcon type='bitcoin' size='24'/>Bitcoin</Tab>}
              </TabList>

              <TabPanels>
                
                <TabPanel>
                  {eth && (
                    <Stack gap={4}>
                      <Text>Enter an amount</Text>
                      <InputGroup size="lg" minWidth="xs" borderColor="gray">
                        <InputLeftAddon>
                          <FaEthereum size={'28'} />
                        </InputLeftAddon>
                        <Input
                          placeholder={'Enter amount'}
                          value={value}
                          type="number"
                          onChange={(e) => setValue(String(e.currentTarget.value))}
                        />
                        <InputRightElement width={'70px'} fontWeight={'bold'}>
                          ETH
                        </InputRightElement>
                      </InputGroup>

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
                          setisPaying(false);
                          setpaySuccessful(true);
                        }}
                        onError={(error) => {
                          console.error("Transaction error", error);
                          setpaySuccessful(false);
                          setisPaying(false);
                        }}
                        onClick={() => {
                          setisPaying(true);
                        }}
                      >
                        {title}
                      </TransactionButton>

                      {paySuccessful && !isPaying && (
                        <Text color="green">{success.length > 0 ? success : 'Done. Thanks!'}</Text>
                      )}
                      <Text>or Scan the QR Code below</Text>
                      <Box p={2} bg="white">
                        <QRCode style={{ width: '100%' }} value={ethuri} />
                      </Box>
                    </Stack>
                  )}
                </TabPanel>
                <TabPanel>
                  {btc && (
                    <Stack gap={4}>
                      <Text>Enter an amount</Text>
                      <InputGroup size="lg" minWidth="xs" borderColor="gray">
                        <InputLeftAddon>
                          <FaBitcoin size={'28'} />
                        </InputLeftAddon>
                        <Input
                          placeholder={'Enter amount'}
                          value={value}
                          type="number"
                          onChange={(e) => setValue(String(e.currentTarget.value))}
                        />
                        <InputRightElement width={'70px'} fontWeight={'bold'}>
                          BTC
                        </InputRightElement>
                      </InputGroup>
                      <Text>Scan the QR Code below</Text>
                      <Box p={2} bg="white">
                        <QRCode style={{ width: '100%' }} value={btcuri} />
                      </Box>
                    </Stack>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
