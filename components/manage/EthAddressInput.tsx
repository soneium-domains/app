import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  Tooltip,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import { Metamask } from 'components/logos';
import { ethAtom } from 'core/atoms';
import { useAtom } from 'jotai';
import { RiFileCopy2Line } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { ConnectWallet, useAddress, useConnectionStatus } from '@thirdweb-dev/react';
import { FaEthereum } from 'react-icons/fa';
import { SITE_URL } from 'core/utils/constants';
import { ConnectWalletButton } from 'components/walletConnect';

export default function EthAddressInput() {
  

  return (
    <ConnectWalletButton />
  );
}
