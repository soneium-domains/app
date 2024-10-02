import {
    InputRightElement,
    Accordion,
    AccordionItem,
    AccordionButton,
    IconButton,
    AccordionPanel,
    Button,
    Flex,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useMediaQuery,
    useColorMode,
    Input,
    InputLeftAddon,
    InputGroup,
    Stack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    SimpleGrid,
    useDisclosure,
    InputLeftElement,
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { RiAddFill, RiArrowLeftLine, RiFileCopy2Line } from "react-icons/ri";
  import { useAtom, useAtomValue } from "jotai";
  import {
    openAddAtom,
    openAddWalletAtom,
    useLineIconsAtom,
    walletsArrayAtom,
  } from "core/atoms";
  import { EXAMPLE_WALLETS, WALLETS } from "core/utils/constants";
  import { capFirstLetter } from "core/utils";
  import { LinkIcon } from "components/logos";
  import { allCoins } from "core/utils/coins";
  
  export default function AddSubnameButton() {
    const { colorMode } = useColorMode();
    const lightMode = useColorMode().colorMode === "light";
    const useLineIcons = useAtomValue(useLineIconsAtom);
    const [_open, _setOpen] = useAtom(openAddWalletAtom);
    const [_back, _setBack] = useAtom(openAddAtom);
    const [notMobile] = useMediaQuery("(min-width: 800px)");
    const [availableWallets, setAvailableWallets] = useState<string[]>([]);
    const [selectedWallet, setSelectedWallet] = useState("");
    const [selectedWalletUrl, setSelectedWalletUrl] = useState("");
    const [searchText, setSearchText] = useState("");
    const [searchedWallets, setSearchedWallets] = useState<string[]>([]);
    const [walletsArray, setWalletsArray] = useAtom(walletsArrayAtom);
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    useEffect(() => {
      if (_open) {
        setSelectedWalletUrl("");
        setSelectedWallet("");
        setSearchText("");
        onOpen();
      }
    }, [_open]);
  
    const addWallet = () => {
      let _newWalletsArray = [
        { key: selectedWallet[1][0].toUpperCase(), value: selectedWalletUrl },
        ...walletsArray,
      ];
      setWalletsArray(_newWalletsArray);
      console.log(_newWalletsArray);
      setSelectedWalletUrl("");
      setSelectedWallet("");
      _setOpen(false);
      onClose();
    };
  
    useEffect(() => {
      _setOpen(isOpen);
    }, [isOpen]);
  
    useEffect(() => {
      let _wallets = [...allCoins];
  
      walletsArray.map((item) => {
        console.log(item.key)
        _wallets.splice(_wallets.findIndex((sitem) => item.key.toLowerCase() === sitem[1][0]), 1);
      });
  
      setAvailableWallets(_wallets);
    }, [walletsArray]);
  
    useEffect(() => {
      //console.log(allCoins);
      searchText.length > 0
        ? setSearchedWallets(
          availableWallets.filter((item : any) =>
              String(item[1][1]).toLowerCase().includes(searchText.toLowerCase())
            )
          )
        : setSearchedWallets([]);
    }, [searchText]);
  
    return (
      <>
        <Button
          onClick={() => {
            setSelectedWallet("");
            onOpen();
          }}
          flexDir={"column"}
          gap={4}
          variant={"pop"}
          isDisabled
          rounded={"xl"}
          height={'60px'}
        >
          Add Subname (Soon)
          
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered
          size={["full", "full", "lg","xl","2xl"]}
          scrollBehavior="inside"
        >
          <ModalOverlay
            bg="blackAlpha.700"
            backdropFilter="auto"
            backdropBlur={"6px"}
          />
          <ModalContent
            bg={colorMode === "dark" ? "var(--dark1)" : "var(--white)"}
          >
            <ModalHeader display="flex" gap={2} flexDir={"column"}>
              <Flex align={"center"} gap={2}>
                <IconButton
                  variant={"ghost"}
                  aria-label="back-to-add-modal"
                  onClick={() => {
                    if (!selectedWallet) {
                      _setBack(true);
                      onClose();
                    } else {
                      setSelectedWallet("");
                    }
                  }}
                >
                  <RiArrowLeftLine size={"28"} />
                </IconButton>{" "}
                {/* Add {selectedWallet ? capFirstLetter(selectedWallet[1][1].replace(/[0-9]/g, '')) : ""} Address */}
              </Flex>
              {!selectedWallet && (
                <Flex justify={"center"}>
                  <InputGroup size={"lg"}>
                    <InputLeftElement p={2}>
                      <LinkIcon type="RiSearchLine" size={24} />
                    </InputLeftElement>
                    <Input
                      rounded={"lg"}
                      value={searchText}
                      onChange={(e) => setSearchText(e.currentTarget.value)}
                      placeholder="Search"
                    />
                  </InputGroup>
                </Flex>
              )}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedWallet ? (
                <Stack>
                  <InputGroup size="lg" minWidth="xs" borderColor="gray">
                    <InputLeftAddon>
                    <LinkIcon
                        type={`https://raw.githubusercontent.com/ensdomains/ens-app-v3/ed4af2c6821d13eae5a83873daa9f4ecaca066f2/src/assets/address/${capFirstLetter(selectedWallet[1][0].replace(/[0-9]/g, ''))}Icon.svg`}
                        size={'sm'}
                      />
                    </InputLeftAddon>
                    <Input
                      isDisabled={selectedWallet === ""}
                      value={selectedWalletUrl}
                      placeholder={`Enter your ${selectedWallet[1][1]} Address`}
                      onChange={(e) =>
                        setSelectedWalletUrl(e.currentTarget.value)
                      }
                    />
                    <InputRightElement>
                      <Tooltip
                        borderRadius={4}
                        label={<Text p={2}>Paste</Text>}
                        hasArrow
                        color="white"
                        bgColor={"black"}
                      >
                        <IconButton
                          aria-label="paste-url"
                          onClick={() =>
                            navigator.clipboard
                              .readText()
                              .then((text) => setSelectedWalletUrl(text))
                          }
                        >
                          <RiFileCopy2Line />
                        </IconButton>
                      </Tooltip>
                    </InputRightElement>
                  </InputGroup>
                  <Box pt={2}>
                    <Text>Example {capFirstLetter(selectedWallet[1][1].replace(/[0-9]/g, ''))} Address</Text>
                    <Text color={"gray"}>
                      {
                        EXAMPLE_WALLETS[
                          selectedWallet[1][1].toLowerCase().replace(" ", "")
                        ]
                      }
                    </Text>
                  </Box>
                </Stack>
              ) : (
                <SimpleGrid columns={1} gap={2} py={2} pb={6}>
                  {(searchText.length > 0
                    ? searchedWallets
                    : availableWallets
                  ).map((item) => (
                    <Button
                      gap={4}
                      fontWeight={"bold"}
                      size={"lg"}
                      justifyContent={"left"}
                      fontSize={"xl"}
                      height={"64px"}
                      key={item[0] + item[1][1]}
                      onClick={() => item && setSelectedWallet(item)}
                    >
                      <LinkIcon
                        type={`https://raw.githubusercontent.com/ensdomains/ens-app-v3/ed4af2c6821d13eae5a83873daa9f4ecaca066f2/src/assets/address/${capFirstLetter(item[1][0].replace(/[0-9]/g, ''))}Icon.svg`}
                        line={useLineIcons}
                        size={'sm'}
                        color={lightMode ? "dark" : "white"}
                      />
                      {capFirstLetter(item[1][1])}
                    </Button>
                  ))}
                </SimpleGrid>
              )}
            </ModalBody>
            {selectedWallet && (
              <ModalFooter gap={2} justifyContent={"left"}>
                <Button
                  color="white"
                  bgColor="var(--base1)"
                  isDisabled={selectedWalletUrl === ""}
                  onClick={addWallet}
                >
                  Add
                </Button>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  