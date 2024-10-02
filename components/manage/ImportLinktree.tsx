import {
  Button,
  Flex,
  useMediaQuery,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiAddFill, RiAddLine, RiFileCopy2Line } from "react-icons/ri";
import { useAtom, useAtomValue } from "jotai";
import { addLinkTypeAtom, avatarAtom, bioAtom, linksArrayAtom, openImportLinktreeAtom, socialsArrayAtom, titleAtom } from "core/atoms";
import { capFirstLetter } from "core/utils";
import { LinkIcon } from "components/logos";
import AddWalletButton from "./AddWalletButton";
import AddLinkButton from "./AddLinkButton";
import AddSocialButton from "./AddSocialButton";
import { importLinktreeAccount } from "core/utils/dataImports";

export default function ImportLinktree() {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [_open, _setOpen] = useAtom(openImportLinktreeAtom);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useAtom(bioAtom);
  const [title, setTitle] = useAtom(titleAtom);
  const [avatar, setAvatar] = useAtom(avatarAtom);
  const [socials, setSocials] = useAtom(socialsArrayAtom);
  const [links, setLinks] = useAtom(linksArrayAtom);

  useEffect(() => {
    if (_open) {
      onOpen();
    }
  }, [_open]);

  useEffect(() => {
    _setOpen(isOpen);
  }, [isOpen]);

  const importLinktree = async ()=> {
    setLoading(true);
    const name = username.split('/')[3].split('?')[0];
    const data = await importLinktreeAccount(name);
    if(data.status === 200){
      const user = data.data ;
      console.log(user);
      if(user.title.length > 0){
        console.log(user.title)
        setTitle(user.title);
      }
      if(user.avatar.length > 0){
        setAvatar(user.avatar);
      }
      if(user.links.length > 0){
        console.log(user.links);
        setLinks(user.links);
      }
      if(user.socials.length > 0){
        setSocials((s)=> [...s,user.socials]);
      }
    }
    setLoading(false);

  }

  return (
    <>
      <Button
        variant={"pop"}
        rounded={"xl"}
        gap={2}
        onClick={onOpen}
        className="add"
        h={"80px"}
        w={"100%"}
        size={"lg"}
      >
        <LinkIcon type="linktree" size={"28px"} />
        Import from Linktree
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={["full", "full", "lg", "xl", "2xl"]}
      >
        <ModalOverlay
          bg="blackAlpha.700"
          backdropFilter="auto"
          backdropBlur={"6px"}
        />
        <ModalContent
          bg={colorMode === "dark" ? "var(--dark1)" : "var(--white)"}
        >
          <ModalHeader>Import from Linktree</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={"center"} alignContent={"center"}>
            <Stack gap={4}>
              <Text>Enter your linktree URL : </Text>
              <Input size={'lg'} value={username} onChange={(e)=> setUsername(e.currentTarget.value)} placeholder="e.g. https://linktree.com/abolfazlbayat" />
              <Button size={'lg'} onClick={importLinktree} isLoading={loading}>Import</Button>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent={"center"} fontSize={"xs"}>
            Updating Regularly
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
