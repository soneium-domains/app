import ConnectWalletButton from './ConnectButton';
import { createThirdwebClient, defineChain } from "thirdweb";
import { FleekSdk, ApplicationAccessTokenService } from '@fleek-platform/sdk';
import { http } from "viem";
import { addEnsContracts, createEnsPublicClient } from "@soneium-domains/js";


export const minato = defineChain({
  id: 1946,
  chainId : 1946,
  name: "Soneium Minato",
  rpcUrls: { default : { http : ['https://rpc.minato.soneium.org/']}},
  rpc: 'https://rpc.minato.soneium.org/',
  nativeCurrency: {
    name: "Minato Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Minato Explorer",
      url: "https://explorer-testnet.soneium.org/",
      apiUrl: "https://explorer-testnet.soneium.org/api",
    },
  ],
  testnet: true,
});

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_ID,
} as any);

const applicationService = new ApplicationAccessTokenService({
  clientId: process.env.NEXT_PUBLIC_FLEEK_AAT || '',
});

const fleekSdk = new FleekSdk({
  accessTokenService: applicationService
});

const viemClient = createEnsPublicClient({
  //@ts-ignore
  chain: addEnsContracts(minato),
  transport: http(),
});

export { ConnectWalletButton, client, fleekSdk , viemClient}