import {
  Image,
  Text,
  Stack,
  Link,
  Flex,
  Spinner,
  Center,
  useMediaQuery,
  useColorMode,
  Button,
} from "@chakra-ui/react";
import { getColor, truncAddress } from "core/utils";
import { LinkIcon } from "components/logos";
import { ETHERSCAN_URLS, MARKETPLACE_URLS } from "core/utils/constants";
import { RiExternalLinkLine } from "react-icons/ri";
import { MediaRenderer, MediaRendererProps } from "thirdweb/react";
import { Styles } from "types";
import {
  buttonBgColorAtom,
  lightModeAtom,
  roundAtom,
  variantAtom,
} from "core/atoms";
import { useAtomValue } from "jotai";
import { client } from "components/walletConnect";
interface Props {
  url: string;
  title: string;
  link: string;
  address: string;
  alt?: string;
  loading?: boolean;
  color?: string;
  styles?: Styles;
}
const NftLink = ({
  url,
  title,
  link,
  address,
  styles,
  alt,
  loading,
  color,
}: Props) => {
  const [notMobile] = useMediaQuery("(min-width: 800px)");
  const { colorMode } = useColorMode();
  const lightMode = useAtomValue(lightModeAtom);
  const network = String(styles?.network?.replace(" ", ""));
  const size = styles?.size ?? "md";
  const scanLink = styles?.scanLink ?? false;
  const type = styles?.type ?? "normal";
  const round = useAtomValue(roundAtom);
  const variant = useAtomValue(variantAtom);
  const buttonBg = useAtomValue(buttonBgColorAtom);

  //// console.log(url,title, link, address, alt)
  let _nftAddress = "";
  let metadata: any;
  let src: string | undefined;
  _nftAddress = address !== "undefined" ? JSON.parse(address).address : "";
  metadata = address !== "undefined" ? JSON.parse(address).metadata : {};
  src = metadata.external_url;

  const nftAddress = _nftAddress;

  return (
    <>
      {url ? (
        <Flex
          borderRadius={round === "none" ? 0 : round === "md" ? 8 : 16}
          flexDirection={
            size !== "lg"
              ? size === "sm"
                ? "row"
                : notMobile
                ? "row"
                : "column"
              : "column"
          }
          align={"center"}
          justify={"center"}
          width={"100%"}
          bgColor={lightMode ? "blackAlpha.200" : "whiteAlpha.200"}
        >
          <>
            <Image
              borderRadius={
                size !== "lg"
                  ? 0
                  : round === "none"
                  ? 0
                  : round === "md"
                  ? 8
                  : 16
              }
              borderLeftRadius={round === "none" ? 0 : round === "md" ? 8 : 16}
              objectFit={"cover"}
              src={url}
              width={size !== "lg" ? (size === "md" ? "50%" : "100px") : "100%"}
              height={
                size !== "lg" ? (size === "md" ? "200" : "100px") : "auto"
              }
              boxShadow="0 0 10px #00000030"
              alt={alt ? alt : title + " NFT"}
              textAlign={"center"}
            />
            <Stack p={4} justifyContent="center" width={"100%"}>
              <Stack>
                <Text
                  fontSize={size === "lg" ? "xl" : size === "md" ? "lg" : "md"}
                >
                  {title}
                </Text>
                {scanLink && (
                  <Link
                    href={ETHERSCAN_URLS[network] + nftAddress}
                    target="_blank"
                  >
                    <Flex opacity={0.5} gap={2} fontSize={"md"}>
                      <LinkIcon
                        type={network}
                        line={false}
                        color={color ? color : "default"}
                      />
                      {truncAddress(nftAddress)}
                    </Flex>
                  </Link>
                )}
              </Stack>
              {link.length > 0 && (
                <Link
                  href={MARKETPLACE_URLS[network] + nftAddress}
                  target="_blank"
                  id={`Soneium-domains-${title}-link`}
                >
                  <Button
                    width={"100%"}
                    variant={variant}
                    colorScheme={buttonBg}
                    color={getColor(variant, buttonBg, lightMode)}
                    rounded={round}
                    size={size}
                    rightIcon={<RiExternalLinkLine />}
                  >
                    View
                  </Button>
                </Link>
              )}
            </Stack>
          </>
        </Flex>
      ) : (
        <>
          {loading && (
            <Center width={"100%"} height={150}>
              <Spinner size="lg" />
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default NftLink;
