"use client";
import {
  useMediaQuery,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import NextLink from "next/link";
import {
  openModalAtom,
} from "core/atoms";
import { useAtom, useSetAtom } from "jotai";
import { motion } from "framer-motion";
import TextCard from "components/claiming/TextCard";
import { LinkIcon, Logo, LogoIcon } from "components/logos";
import DomainName from "components/features/DomainName";
import AccountAddress from "components/features/AccountAddress";
import AnimateOnScroll from "components/animate/AnimateOnScroll";

export default function IntroSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  const [small] = useMediaQuery("(min-width: 580px)");
  const [_open, _setOpen] = useAtom(openModalAtom);

  return (
    <motion.div key={"whatnwhy"}>
      <Container
        maxW="container.md"
        display="grid"
        placeContent="center"
        placeItems="center"
        id="what"
        minH="100vh"
      >
        <SimpleGrid columns={[1, 1, 1]} gap={10} py={16}>
          <GridItem>
            <Stack px={[4, 4, 6, 0]} gap={12}>
              <AnimateOnScroll delay={0.1}>
                <Heading
                  as={"h3"}
                  fontWeight="bold"
                  fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  textAlign={["center", "center", "center"]}
                >
                  {t("Own Your Web3 Identity")}
                </Heading>
              </AnimateOnScroll>
            </Stack>
          </GridItem>
          <AnimateOnScroll delay={0.3} styles={{ overflow: "visible" }}>
            <GridItem
              display={"flex"}
              justifyContent={"center"}
              rounded={"2xl"}
              border={"1px solid #77777750"}
              bg={"#444444"}
            >
              <Flex
                gap={[6, 6, 6]}
                flexDirection={[!notMobile ? "column" : "row"]}
                justify={"center"}
                align={"center"}
                p={6}
              >
                <AnimateOnScroll delay={0.5} styles={{ overflow: "visible" }}>
                  <AccountAddress
                    address="0xD2D128316E8DF3 .... 001CE"
                    chain="soneium"
                    size={["md", "lg"]}
                  />
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.7} styles={{ overflow: "visible" }}>
                  <LinkIcon
                    type={
                      !notMobile ? "RiArrowUpDownLine" : "RiArrowLeftRightLine"
                    }
                    size={!small ? "36px" : "44px"}
                  />
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.9} styles={{ overflow: "visible" }}>
                  <DomainName
                    name={"jack.son"}
                    avatar={"logo"}
                    size={["md", "lg"]}
                    fontSize={["md", "lg", "xl"]}
                  />
                </AnimateOnScroll>
              </Flex>
            </GridItem>
          </AnimateOnScroll>

          <AnimateOnScroll delay={1.2}>
            <GridItem>
              <Text
                fontWeight="normal"
                fontSize={["xl", "xl", "2xl", "2xl"]}
                textAlign={["center", "center", "center"]}
              >
                {t("watis")}
              </Text>
            </GridItem>
          </AnimateOnScroll>
        </SimpleGrid>
      </Container>
      
    </motion.div>
  );
}
