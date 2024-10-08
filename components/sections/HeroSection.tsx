import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
  SimpleGrid,
  HStack,
  Grid,
  GridItem,
  useColorMode,
  Flex,
  Link,
  Badge,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
  textDecoration,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslate } from "core/lib/hooks/use-translate";
import { motion } from "framer-motion";
import { LinkIcon, Logo, LogoIcon } from "components/logos";
import BouncingButton from "components/ui/BouncingButton";
import AnimateOpacity from "components/animate/AnimateOpacity";
import FloatingObjects from "components/ui/FloatingObjects";
import AnimateOnScroll from "components/animate/AnimateOnScroll";

export default function HeroSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 1200px)");
  const { colorMode } = useColorMode();
  const lightMode = colorMode === "light";

  return (
    <motion.div key={"hero"}>
      <FloatingObjects
        shapeColors={{
          square: "#D591BD77",
          circle: "#F06E6C77",
          triangle: "#38DEC877",
          x: "#9BADE477",
        }}
        styles={{backgroundColor : '#00000077'}}
      />

      <Container
        maxW="container.xl"
        display="grid"
        placeContent="center"
        placeItems="center"
        minH={"100vh"}
      >
        <Stack px={[0, 4, 6]} align={"center"}>
          <Center
            flexDirection={"column"}
            p={[4, 6, 8, 16]}
            py={[8, 8, 12, 16]}
            rounded={"2xl"}
            gap={8}
            w={"100%"}
          >
            <Center
              flexDirection={"column"}
              gap={8}
              backgroundColor={"auto"}
              backdropFilter="auto"
              backdropBlur={"8px"}
            >
              <AnimateOnScroll delay={0.1}>
                <Heading
                  pointerEvents={"none"}
                  fontSize={["3xl", "4xl"]}
                  fontWeight={"bolder"}
                  textAlign={"center"}
                >
                Level Up Your Blockchain Identity 
                </Heading>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.3}>
                <Text
                  pointerEvents={"none"}
                  fontSize={["lg", "2xl"]}
                  textAlign={"center"}
                >
                  Turn your Soneium address into something epic!
                </Text>
              </AnimateOnScroll>
            </Center>
            <AnimateOnScroll delay={0.5}>
              <Center flexDirection={["column", "column", "row"]} gap={6}>
                  <Button size={"lg"} colorScheme="light" w={['100%','xs']} as={NextLink} href={"/app"} passHref>
                    {t("Access Testnet Alpha")}
                  </Button>
                <Button as={NextLink} href="#features" size={"lg"} w={['100%','xs']} passHref>Explore Features</Button>
              </Center>
            </AnimateOnScroll>
            <BouncingButton
              as={Link}
              // @ts-ignore
              href="#what"
              size={"lg"}
              variant={"ghost"}
            >
              <LinkIcon type="RiArrowDownDoubleLine" />
            </BouncingButton>
          </Center>
        </Stack>
      </Container>
    </motion.div>
  );
}
