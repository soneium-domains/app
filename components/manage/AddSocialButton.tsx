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
import {
  RiAddFill,
  RiArrowLeftLine,
  RiFileCopy2Line,
  RiSearchLine,
} from "react-icons/ri";
import { useAtom, useAtomValue } from "jotai";
import {
  openAddAtom,
  openAddSocialAtom,
  socialsArrayAtom,
  useLineIconsAtom,
} from "core/atoms";
import { capFirstLetter } from "core/utils";
import { LinkIcon } from "components/logos";
import { EXAMPLE_SOCIAL_URLS, getSocialTitle, getSocialUrlScheme, SOCIALS } from "core/utils/constants";
import { ObjectItem } from "types";

export default function AddSocialButton() {
  const { colorMode } = useColorMode();
  const useLineIcons = useAtomValue(useLineIconsAtom);
  const [_open, _setOpen] = useAtom(openAddSocialAtom);
  const [_back, _setBack] = useAtom(openAddAtom);
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const [availableSocials, setAvailableSocials] = useState<ObjectItem[]>([]);
  const [selectedSocial, setSelectedSocial] = useState<ObjectItem | undefined>();
  const [searchText, setSearchText] = useState("");
  const [searchedSocials, setSearchedSocials] = useState<ObjectItem[]>([]);
  const [selectedSocialUrl, setSelectedSocialUrl] = useState("");
  const [socialsArray, setSocialsArray] = useAtom(socialsArrayAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (_open) {
      setSelectedSocialUrl("");
      setSelectedSocial(undefined);
      setSearchText("");
      onOpen();
    }
  }, [_open]);

  const addToSocial = () => {
    let _newSocialsArray = [
      { key: String(selectedSocial?.value).toLowerCase(), value: selectedSocialUrl },
      ...socialsArray,
    ];
    setSocialsArray(_newSocialsArray);
    console.log(_newSocialsArray)
    setSelectedSocialUrl("");
    setSelectedSocial(undefined);
    _setOpen(false);
    onClose();
  };

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    let _socials: ObjectItem[] = [...SOCIALS.sort()];

    socialsArray.map((item) => {
      
      _socials.splice(_socials.findIndex((sitem) => item.key === sitem.value), 1);
    });

    setAvailableSocials(_socials);
  }, [socialsArray]);

  useEffect(() => {
    searchText.length > 0
      ? setSearchedSocials(
          availableSocials.filter((item) =>
            item.key.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      : setSearchedSocials([]);
  }, [searchText]);

  return (
    <>
      <Button
        onClick={() => {
          setSelectedSocial(undefined);
          onOpen();
        }}
        flexDir={"column"}
        gap={4}
        variant={"pop"}
        rounded={"xl"}
        height={100}
      >
        Social Media Links
        <Flex gap={2} alignItems={"center"}>
          <LinkIcon type="twitter" line={useLineIcons} />
          <LinkIcon type="email" line={useLineIcons} />
          <LinkIcon type="github" line={useLineIcons} />
          <LinkIcon type="whatsapp" line={useLineIcons} />
          <Text fontSize={"xl"}>+28</Text>
        </Flex>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        isCentered
        size={["full", "full", "lg","xl","2xl"]}
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
                  if (!selectedSocial) {
                    _setBack(true);
                    onClose();
                  } else {
                    setSelectedSocial(undefined);
                  }
                }}
              >
                <RiArrowLeftLine size={"28"} />
              </IconButton>{" "}
              Add{" "}
              {selectedSocial
                ? `${capFirstLetter(selectedSocial.key)} Link`
                : "New"}
            </Flex>
            {!selectedSocial && (
              <Flex justify={"center"}>
                <InputGroup size={"lg"}>
                  <InputLeftElement p={2}>
                    <RiSearchLine size={24} />
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
            {selectedSocial ? (
              <Stack gap={2}>
                {selectedSocial && (
                  <>
                    <InputGroup size="lg" minWidth="xs" borderColor="gray">
                      <InputLeftAddon>
                        <LinkIcon type={selectedSocial.key.toLowerCase()} />
                      </InputLeftAddon>
                      <Input
                        isDisabled={selectedSocial.key === ""}
                        value={selectedSocialUrl}
                        placeholder={`Enter your ${selectedSocial.key} URL`}
                        onChange={(e) =>
                          setSelectedSocialUrl(e.currentTarget.value)
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
                                .then((text) => setSelectedSocialUrl(text))
                            }
                          >
                            <RiFileCopy2Line />
                          </IconButton>
                        </Tooltip>
                      </InputRightElement>
                    </InputGroup>
                    <Box pt={2}>
                      <Text>Example {capFirstLetter(selectedSocial.key)} Link</Text>
                      <Text color={"gray"}>
                        {
                          EXAMPLE_SOCIAL_URLS[
                            selectedSocial.key.toLowerCase().replace(" ", "")
                          ]
                        }
                      </Text>
                    </Box>
                  </>
                )}
              </Stack>
            ) : (
              <SimpleGrid columns={[1]} gap={2} pb={4}>
                {(searchText.length > 0
                  ? searchedSocials
                  : availableSocials
                ).map((item) => (
                  <Button
                    gap={4}
                    fontWeight={"bold"}
                    size={"lg"}
                    fontSize={"xl"}
                    justifyContent={"left"}
                    height={"64px"}
                    key={item.value}
                    onClick={() => item && setSelectedSocial(item)}
                  >
                    <LinkIcon type={item.key.toLowerCase()} line={useLineIcons} />
                    {capFirstLetter(item.key)}
                  </Button>
                ))}
              </SimpleGrid>
            )}
          </ModalBody>
          {selectedSocial && (
            <ModalFooter gap={2} justifyContent={"left"}>
              <Button
                color="white"
                bgColor="var(--base1)"
                isDisabled={selectedSocialUrl === ""}
                onClick={addToSocial}
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
