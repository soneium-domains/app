import { defineChain, getContract, readContract } from "thirdweb";
import { client, minato } from "components/walletConnect";

export const ETHRegistrarController = getContract({
  client: client,
  address: "0xA2baDb1a39b578573371BfbaEe85a2fD1db16D63",
  chain: minato,
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "secret",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address",
        },
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
        {
          internalType: "bool",
          name: "reverseRecord",
          type: "bool",
        },
        {
          internalType: "uint32",
          name: "fuses",
          type: "uint32",
        },
        {
          internalType: "uint64",
          name: "wrapperExpiry",
          type: "uint64",
        },
      ],
      name: "makeCommitment",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "duration",
          type: "uint256",
        },
        {
          internalType: "bytes32",
          name: "secret",
          type: "bytes32",
        },
        {
          internalType: "address",
          name: "resolver",
          type: "address",
        },
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
        {
          internalType: "bool",
          name: "reverseRecord",
          type: "bool",
        },
        {
          internalType: "uint32",
          name: "fuses",
          type: "uint32",
        },
        {
          internalType: "uint64",
          name: "wrapperExpiry",
          type: "uint64",
        },
      ],
      name: "register",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "commitment",
          type: "bytes32",
        },
      ],
      name: "commit",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});

export const PriceOracle = getContract({
  client: client,
  address: "0x2a421E3b874B83e1AA835399ECc6B541dbDBD28c",
  chain: minato,
});

export const Resolver = getContract({
  client: client,
  address: "0x93D577C082c928b2A6e856a8cbB7a31Fc0305BD2",
  chain: minato,
  abi: [
    {
      inputs: [
        {
          internalType: "bytes[]",
          name: "data",
          type: "bytes[]",
        },
      ],
      name: "multicall",
      outputs: [
        {
          internalType: "bytes[]",
          name: "results",
          type: "bytes[]",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});

export const ReverseRegistrar = getContract({
  client: client,
  address: "0xC140Fd7686c3D4571FE46A469C283DBB5D56815E",
  chain: minato,
  abi: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "setName",
      outputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
});


