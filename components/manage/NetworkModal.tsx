import {
  Button,
  Tooltip,
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
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiCheckLine, RiShuffleLine } from 'react-icons/ri';
import { useAtom, useAtomValue } from 'jotai';
import { addressAtom, ethAtom, nftsNetworkAtom } from 'core/atoms';
import { capFirstLetter, truncAddress } from 'core/utils';
import { Base } from 'components/logos';
import EthAddressInput from './EthAddressInput';
import { FaEthereum } from 'react-icons/fa';
import { useActiveAccount } from 'thirdweb/react';

export default function NetworkModal() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [network, setNetwork] = useAtom(nftsNetworkAtom);
  const eth = useActiveAccount()?.address;

  return (
    <>
      <Tooltip
        borderRadius={4}
        label={<Text p={2}>Change Blockchain</Text>}
        color="white"
        bgColor={'black'}
        hasArrow>
        <Button variant={"pop"} gap={2} onClick={onOpen} rounded={'xl'}>
          Network : {capFirstLetter(network)}
          <RiShuffleLine size={'24px'} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.500" backdropFilter="auto" backdropBlur={'6px'} />
        <ModalContent bg={colorMode === 'dark' ? 'var(--dark1)' : 'var(--white)'}>
          <ModalHeader>Select Blockchain</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={2}>
              
              {!eth && (
                <Stack my={2}>
                  <Text>Connect your Ethereum address to pick from NFTs</Text>
                  <EthAddressInput />
                </Stack>
              )}
              {eth && <Button
                colorScheme={network.includes('ethereum') ? 'green' : 'gray'}
                gap={2}
                height={'80px'}
                isDisabled={eth.length < 30}
                onClick={() => setNetwork('ethereum')}
                size={'lg'}
                rightIcon={network.includes('ethereum') ? <RiCheckLine /> : undefined}
                variant={network.includes('ethereum') ? 'outline' : 'solid'}>
                <FaEthereum size={'28'} />
                <Stack textAlign={'left'} gap={0}>
                  <Text>Ethereum </Text>
                  <Text fontSize={'xs'} color={'gray'}>
                    Polygon, Arbitrum, Optimism
                  </Text>
                  <Text fontSize={'sm'} color={'gray'}>
                    {eth.length > 30 ? `NFTs of ${truncAddress(eth)}` : `ETH wallet not connected!`}
                  </Text>
                </Stack>
              </Button>}
            </Stack>
          </ModalBody>
          <ModalFooter>Current : {capFirstLetter(network)}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
