import {
  Text,
  Box,
  useColorMode,
  Center,
  Flex,
  Button,
  Collapse,
  Icon,
  useMediaQuery,
  Tooltip,
} from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";

import { useState } from "react";

interface Props {
  text: string;
  tip?: string;
  icon: JSX.Element;
}

export default function NumberIcon({ text, icon, tip }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Tooltip
      key={`number-icon-${tip}`}
      borderRadius={4}
      label={<Text p={2}>{tip?.toUpperCase() + " : " + text}</Text>}
      hasArrow
      color="black"
      bgColor={"white"}
    >
      <Flex key={`number-icon-${text}`} gap={2} flexDirection="row" align={'center'} >
        <Box>{icon}</Box>
        <Text fontSize={["2xl","3xl"]} fontWeight="bold" my={1} align={"center"}>
          {text}
        </Text>
      </Flex>
    </Tooltip>
  );
}
