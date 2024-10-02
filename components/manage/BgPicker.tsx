import {
  Button,
  Text,
  IconButton,
  SimpleGrid,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  useColorMode,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import React, { Suspense } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { bgColorAtom, lightModeAtom } from "core/atoms";
import { RiCheckLine } from "react-icons/ri";
import { BG_COLORS } from "core/utils/constants";
//import ColorPicker from 'react-best-gradient-color-picker';
import ReactGPicker from "react-gcolor-picker";
import SelectColor from "./SelectColor";
import { checkGradientBrightness } from "core/utils";

export default function BgPicker() {
  const [bgColor, setBgColor] = useAtom(bgColorAtom);
  const setLightMode = useSetAtom(lightModeAtom);
  const lightMode = useColorMode().colorMode === "light";
  return (
    <>
      <Accordion
        allowToggle
        allowMultiple={false}
        borderBottomRadius={0}
        size="lg"
        display={"flex"}
        flexGrow={1}
      >
        <AccordionItem border={0} borderRadius={0} width={"100%"}>
          <AccordionButton
            as={Button}
            height={["44px", "52px"]}
            _expanded={{
              bgColor: lightMode ? BG_COLORS[4].color : BG_COLORS[2].color,
            }}
            _hover={{
              bgColor: lightMode ? BG_COLORS[4].color : BG_COLORS[2].color,
            }}
            px={4}
            variant="solid"
            borderBottomRadius={0}
            width={"100%"}
            justifyContent="space-between"
          >
            <Text fontSize={"lg"}>Background Color</Text>
            <IconButton
              size={"sm"}
              aria-label="bg-color-picker"
              bg={bgColor}
            ></IconButton>
          </AccordionButton>
          <AccordionPanel
            py={4}
            bgColor={lightMode ? BG_COLORS[4].color : BG_COLORS[2].color}
            gap={4}
            display={"flex"}
            flexDir={"column"}
          >
            <SelectColor
              withTitle={false}
              value={bgColor}
              defaultMode="gradient"
              setValue={(color: any) => {
                setBgColor(color);
                if (checkGradientBrightness(color) === "light") {
                  setLightMode(true);
                } else if (checkGradientBrightness(color) === "dark") {
                  setLightMode(false);
                }
              }}
              title="Pick Color"
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
