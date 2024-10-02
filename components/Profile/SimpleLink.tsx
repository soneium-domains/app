import {
  Button,
  useColorMode,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { buttonBgColorAtom, fontAtom, lightModeAtom, roundAtom, variantAtom } from "core/atoms";
import { getColor, getColorSchemeName, withHttps } from "core/utils";
import { AVAILABLE_LINKS } from "core/utils/constants";
import { useAtomValue } from "jotai";
import { Styles } from "types";

interface Props {
  title: string;
  type: string;
  icon?: JSX.Element;
  url: string;
  styles?: Styles;
  onClick?: any;
}
export default function SimpleLink({ title, icon, url, styles, type, onClick }: Props) {
  const { colorMode } = useColorMode();
  const reg = AVAILABLE_LINKS.find((e) => e.type === type)?.reg ?? "";
  const round = styles?.round ?? useAtomValue(roundAtom);
  const variant = styles?.variant ?? useAtomValue(variantAtom);
  const font = styles?.font ?? useAtomValue(fontAtom);
  const buttonBg = styles?.bg ?? useAtomValue(buttonBgColorAtom);
  const lightMode = useAtomValue(lightModeAtom);

  return (
    <ChakraLink
      width={"100%"}
      href={onClick ? undefined : withHttps(url)}
      onClick={onClick ? ()=> onClick() : ()=> console.log('clicked')}
      target={onClick ? "_self" : "_blank"}
      id={`Soneium-domains-${title}-link`}
    >
      <Button
        size={styles?.size === "sm" ? "md" : "lg"}
        fontSize={
          styles?.size === "lg" ? "xl" : styles?.size === "md" ? "lg" : "md"
        }
        height={
          styles?.size === "lg"
            ? "80px"
            : styles?.size === "md"
            ? "64px"
            : "44px"
        }
        rounded={round}
        variant={variant}
        colorScheme={getColorSchemeName(buttonBg)}
        color={getColor(variant, getColorSchemeName(buttonBg), lightMode)}
        placeContent={"center"}
        placeItems={"center"}
        fontFamily={font}
        px={3}
        width={"100%"}
      >
        {icon}
        <Text px={2} w={"100%"} textAlign={"center"}>
          {title}
        </Text>
      </Button>
    </ChakraLink>
  );
}
