import {
  Button,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AspectRatio,
  Flex,
  Text,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  buttonBgColorAtom,
  isConnectedAtom,
  lightModeAtom,
  openEmbedModalAtom,
  roundAtom,
  variantAtom,
} from "core/atoms";
import IframeResizer from "@iframe-resizer/react";
import { Styles } from "types";
import Link from "./Link";
import SimpleLink from "./SimpleLink";
import TextIcon from "components/features/TextIcon";
import { LinkIcon } from "components/logos";
import NumberIcon from "components/features/NumberIcon";
import AvatarSvg from "./AvatarSvg";

interface Props {
  title?: string;
  type?: string;
  url?: string;
  icon?: JSX.Element;
  styles?: Styles;
}

export default function PSNProfile({ title, url, type, styles, icon }: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const round = useAtomValue(roundAtom);
  const bgColor = styles?.bg;

  return (
    <>
      <Flex
        flexDirection={"column"}
        gap={0}
        bgColor={bgColor}
        rounded={round === "none" ? round : "lg"}
        w={'100%'}
      >
        <Flex
          justify={"center"}
          align={"center"}
          background={"whiteAlpha.200"}
          minH={"300px"}
          flexDir={"column"}
          rounded={"2xl"}
          minW={'340px'} 
          w={'100%'}
        >
          <Flex
            gap={4}
            p={[4, 6, 8]}
            justify={"space-between"}
            align={"center"}
            w={"100%"}
          >
            <Flex align={"center"} gap={4}>
              <AvatarSvg styles={{ width: "60px", height: "60px" }} />
              <Stack gap={0}>
                <Text fontWeight={"bold"}>PSN Profile</Text>
                <Text variant={"caption"}>LEVEL : 23</Text>
              </Stack>
            </Flex>{" "}
            <LinkIcon type="RiVerifiedBadgeFill" size={"40px"} />
          </Flex>
          <Flex
            gap={4}
            px={[4, 6, 8]}
            py={0}
            justify={"space-between"}
            align={"center"}
            w={"100%"}
          >
            <NumberIcon
              text="13"
              icon={<LinkIcon type="game" size={"40px"} />}
              tip="games played"
            />
            <NumberIcon
              text="23"
              icon={<LinkIcon type="level" size={"40px"} />}
              tip="level"
            />
          </Flex>{" "}
          <Flex
            gap={4}
            p={[4, 6, 8]}
            py={4}
            justify={"space-between"}
            align={"center"}
            w={"100%"}
          >
            <NumberIcon
              text="1800"
              icon={<LinkIcon type="rank" size={"40px"} />}
              tip="rank"
            />

            <NumberIcon
              text="52"
              icon={<LinkIcon type="RiTrophyFill" size={"40px"} />}
              tip="trophies"
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
