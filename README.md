# Soneium Domains

Soneium Domains is a distributed, open, and extensible naming system built on the Soneium Blockchain and is fully ENS-based.
Soneium Domains map human-readable names like 'jack.son' to machine-readable identifiers such as Soneium addresses, other cryptocurrency addresses, content hashes, metadata, and more. It also supports reverse resolution, making it possible to associate metadata such as primary names or interface descriptions with Soneium addresses.

This repository contains the code for the Soneium Domains Web/Manager App

## :point_down: Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) v18.xx.x

### Run locally

1. Clone repo

   ```sh
   git clone https://github.com/soneium-domains/soneium-domains-app.git
   ```

2. Install packages
   ```sh
   yarn install
   ```
3. Run application
   ```sh
   yarn dev
   ```
4. Open development server on http://localhost:3000

<p align="right">(<a href="#top">back to top</a>)</p>

# How to use
### TODO

### Smart Contracts Deployed to Minato (Soneium Testnet)

```javascript 

const contract_addresses = {
  priceOracle: "0xE5fd332C36f69484cd71004a071EB3E14f8abC3D", // DUMMY
  ENSDeployer: "0x9E8E9BaBff69327D5cC8070FCcaA281dFD0AAbC2",
  ENSRegistry: "0xF0A7aC86FE19c8Af9f42f00e60aA781818F676CB",
  BaseRegistrarMetadataService: "0x67Eb7038d4BAE2470ccefd9729BcE7E0572eF7ac",
  BaseRegistrarImplementation: "0xfE87E2f93570f64A69180826f7BE1fD0A46b268a",
  FIFSRegistrar: "0xd4A0a404a416914B6e3DE4b8501aa892C9361563",
  ReverseRegistrar: "0xC140Fd7686c3D4571FE46A469C283DBB5D56815E",
  MetadataService: "0x43a6dcaf6Ac1d40526d9bb62D4A8056bb029aE5f",
  MetadataService721: "0x67Eb7038d4BAE2470ccefd9729BcE7E0572eF7ac",
  NameWrapper: "0x02Cd40daE88c503ef462b05adAc329a7F87A6421",
  ETHRegistrarController: "0xA2baDb1a39b578573371BfbaEe85a2fD1db16D63", // .son
  PublicResolver: "0x93D577C082c928b2A6e856a8cbB7a31Fc0305BD2",
  UniversalResolver: "0x8d2CBd32Dd12d7Bf98be518197BB5CeFbb58A518",
  Multicall: "0x689272A97B3F5b500c27e8A4EE50e8Ff1BC0570b",
};


```


## :writing_hand: Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create.
We are currently working on refining the codebase and creating comprehensive instructions to make the project easier to navigate. Once the code is more organized and documentation is complete, Any contributions you make are **greatly appreciated**.

<!-- If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

<p align="right">(<a href="#top">back to top</a>)</p>