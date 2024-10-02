import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { LinkIcon, Metamask } from 'components/logos';
import { useEffect, useState } from 'react';
import { RiFileCopy2Line } from 'react-icons/ri';
import { useAddress, useConnect as useThirdWebConnect, metamaskWallet } from '@thirdweb-dev/react';
import { useAtomValue } from 'jotai';
import { addressAtom, connectedAccountAtom } from 'core/atoms';
import { useActiveAccount } from 'thirdweb/react';

interface Props {
  title: string;
  value: string;
  setValue: Function;
  hideTitle?: boolean;
}

export default function WalletInput({ title, value, setValue, hideTitle = false }: Props) {
  const connectedAccount = useAtomValue(connectedAccountAtom);
  const ethAddressFromWallet = useActiveAccount()?.address;

 

  return (
    <InputGroup size="lg" borderColor="gray" w={'100%'}>
      {!hideTitle && <InputLeftAddon height={'48px'}>
        <Flex gap={2}>
          <LinkIcon type={title.toLowerCase()} />
          {title}
        </Flex>
      </InputLeftAddon>}
      <Input
        size="lg"
        value={value}
        variant={'filled'}
        border={'1px solid gray'}
        placeholder={`Enter ${title} Wallet Address`}
        onChange={(e) => setValue(e.currentTarget.value)}
        pr={title !== 'Bitcoin' ? '96px' : '48px'}
        //onChange={(e) => setUrl(title.toLowerCase(),e.currentTarget.value)}
      />
      <InputRightElement gap={1} width={'-moz-fit-content'}>
        {title.includes('Eth') && (
          <Tooltip
            borderRadius={4}
            label={
              <Text p={2}>
                {ethAddressFromWallet ? 'Use Connected Address' : 'Connect Wallet'}
              </Text>
            }
            hasArrow
            color="white"
            bgColor={'black'}>
            <IconButton
              aria-label="connect eth wallet"
              onClick={async () => {
                  setValue(ethAddressFromWallet);
              }}>
              <Metamask />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip
          borderRadius={4}
          label={<Text p={2}>Paste</Text>}
          hasArrow
          color="white"
          bgColor={'black'}>
          <IconButton
            mr={1}
            aria-label={`paste-${title}-address`}
            onClick={() => navigator.clipboard.readText().then((text) => setValue(text))}>
            <RiFileCopy2Line />
          </IconButton>
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
}
