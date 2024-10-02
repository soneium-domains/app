import {
  Button,
  ButtonGroup,
  Center,
  Collapse,
  Flex,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { buttonBgColorAtom, roundAtom, variantAtom } from "core/atoms";
import { BG_COLORS, BG_COLORS_SAMPLE } from "core/utils/constants";
import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import ReactGPicker from "react-gcolor-picker";

interface Props {
  title?: string;
  value: string;
  setValue: any;
  options?: any;
  withTitle?: boolean;
  defaultMode?: string;
}
export default function SelectColor({ title, value, setValue, options, withTitle = true, defaultMode = 'solid' }: Props) {
  // const bgColor = useAtomValue(buttonBgColorAtom);
  // const variant = useAtomValue(variantAtom);
  // const round = useAtomValue(roundAtom);
  const refContainer = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [width, setWidth] = useState(380);
  useEffect(() => {
    if (refContainer.current) {
      //@ts-ignore
      setWidth(refContainer.current.offsetWidth);
    }
  }, [isOpen]);

  return (
    <Flex
      gap={2}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      {/* @ts-ignore */}
      {withTitle && <Button size="lg" onClick={isOpen ? onClose : onOpen} width={"100%"} ref={refContainer}>
        {title}
      </Button>}
      <Collapse startingHeight={0} in={withTitle ? isOpen : true}>
      <Center py={2}>
        <ReactGPicker
          value={value}
          defaultActiveTab={defaultMode}
          onChange={setValue}
          defaultColors={BG_COLORS_SAMPLE}
          popupWidth={width}
          format='hex'
          gradient
          solid
          showAlpha
          {...options}
        /></Center>
      </Collapse>
    </Flex>
  );
}
