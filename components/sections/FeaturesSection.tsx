"use client";
import {
  useMediaQuery,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Box,
  Center,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { useTranslate } from "core/lib/hooks/use-translate";
import { Avatar, Link, Links, Socials } from "components/Profile";
import NextLink from "next/link";
import { openModalAtom } from "core/atoms";
import { useAtom, useSetAtom } from "jotai";
import { BG_COLORS_SAMPLE, DOCS_URL, SOCIALS, TWITTER_FOLLOW_URL } from "core/utils/constants";
import { LinkIcon, Logo, LogoIcon } from "components/logos";
import AnimateOnScroll from "components/animate/AnimateOnScroll";
import { LinksSlider } from "components/ui/LinksSlider";
import SocialMediaOrbit from "components/ui/SocialMediaOrbit";
import PSNProfile from "components/Profile/PSNProfile";
import { PreviewSlider } from "components/ui/PreviewSlider";
import Lottie from "react-lottie";
import * as animationData from "assets/animations/page-design.json";

export default function FeaturesSection() {
  const { t } = useTranslate();
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  const [small] = useMediaQuery("(min-width: 580px)");
  const [_open, _setOpen] = useAtom(openModalAtom);

  return (
    <Box id="features" w={"100%"}>
      <Container
        w={"100%"}
        display="grid"
        placeContent="center"
        placeItems="center"
        minH="100vh"
      >
        <Center
          w={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
        >
          <Flex
            flexDir={"column"}
            justify={"center"}
            bg={"blackAlpha.400"}
            gap={8}
            align={"center"}
            h={"100vh"}
            w={"100%"}
            px={6}
          >
            <AnimateOnScroll delay={0.1}>
              <Heading
                as={"h3"}
                fontWeight="bold"
                fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                textAlign={["center", "center", "center"]}
              >
                More Than Just a Name
              </Heading>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.3}>
              <Text textAlign={"center"} fontSize={["2xl", "2xl", "4xl"]}>
                Build Your Personalized Space
              </Text>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.5}>
              <Text
                textAlign={"center"}
                fontSize={["lg", "lg", "2xl"]}
                maxW={"container.md"}
                px={4}
              >
                Your Soneium Domain landing page isn't just a link in bio—it's
                your personalized on-chain digital hub.
              </Text>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.8}>
              <Center flexDirection={["column", "column", "row"]} gap={6}>
                <Button
                  size={"lg"}
                  colorScheme="light"
                  w={["100%", "xs"]}
                  as={NextLink}
                  passHref
                  href={DOCS_URL}
                >
                  {t("Developer Docs")}
                </Button>
                <Button
                  as={NextLink}
                  passHref
                  href="#components"
                  size={"lg"}
                  w={["100%", "xs"]}
                >
                  Explore Components
                </Button>
              </Center>
            </AnimateOnScroll>
          </Flex>
          <Stack w={"100%"} gap={0} id="components">
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              h={"100vh"}
              w={"100vw"}
            >
              <Center rounded={"2xl"} p={[4, 4, 12]}>
                <Flex w={["100%", "100%", "lg"]} position={"relative"}>
                  <AnimateOnScroll
                    delay={0.3}
                    x={-200}
                    y={0}
                    styles={{ width: "100%", overflow: "visible" }}
                  >
                    <PreviewSlider />
                  </AnimateOnScroll>
                </Flex>
              </Center>
              <Center rounded={"2xl"} p={[4, 4, 12]} flexDir={"column"}>
                <AnimateOnScroll
                  delay={0.5}
                  x={notMobile ? 200 : 0}
                  y={notMobile ? 0 : 50}
                >
                  <Text
                    textAlign={"center"}
                    fontWeight="bold"
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Shareable")}
                  </Text>
                </AnimateOnScroll>
                <AnimateOnScroll
                  delay={0.7}
                  x={notMobile ? 200 : 0}
                  y={notMobile ? 0 : 50}
                >
                  <Text
                    textAlign={"center"}
                    fontWeight="bold"
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Web URL")}
                  </Text>
                </AnimateOnScroll>
              </Center>
            </Flex>
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              h={"100vh"}
              bg={"blackAlpha.400"}
              w={"100vw"}
            >
              <Center rounded={"2xl"} p={[4, 4, 12]} flexDir={"column"}>
                <AnimateOnScroll
                  delay={0.3}
                  x={-200}
                  y={0}
                  styles={{ width: "100%", overflow: "visible" }}
                >
                  <Center gap={4}>
                    <LinkIcon type="psn" size={notMobile ? "60px" : "40px"} />
                    <Text
                      textAlign={"center"}
                      fontWeight="bold"
                      fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                    >
                      {t("PSN")}
                    </Text>
                  </Center>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5} x={-200} y={0}>
                  <Text
                    textAlign={"center"}
                    fontWeight="bold"
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Profile")}
                  </Text>
                </AnimateOnScroll>
              </Center>
              <Center rounded={"2xl"} p={[4, 4, 12]}>
                <Flex w={["100%", "100%", "lg"]} position={"relative"}>
                  {" "}
                  <AnimateOnScroll
                    delay={0.7}
                    x={notMobile ? 200 : 0}
                    y={notMobile ? 0 : 50}
                    styles={{ width: "100%", overflow: "visible" }}
                  >
                    <PSNProfile
                      styles={{ bg: 'linear-gradient(0deg, #b9b9b9 10%, #eef2f3 90%)' , size: 'lg'}}
                      title="PSN User"
                      content={JSON.stringify({
                        username: "PSN Username",
                        level: "22",
                        levelProgress: "75",
                        trophies: {
                          total: 52,
                          platinum: 0,
                          gold: 5,
                          silver: 10,
                          bronze: 37,
                        },
                        stats: {
                          gamesPlayed: 13,
                          completedGames: 0,
                          completionRate: "18.01%",
                          unearnedTrophies: 279,
                          trophiesPerDay: "0.02",
                          views: 20,
                          worldRank: "4,227,357",
                          countryRank: "1,369,417",
                        },
                        trophyMilestones: [
                          {
                            name: "Tinkerer",
                            game: "Rocket League",
                            milestone: "First Trophy",
                            timeAgo: "7 years ago",
                            imageUrl:
                              "https://i.psnprofiles.com/games/13f789/trophies/33S4347c5.png",
                          },
                        ],
                      })}
                    />
                  </AnimateOnScroll>
                </Flex>
              </Center>
            </Flex>
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              bg={"whiteAlpha.100"}
              h={"100vh"}
              w={"100vw"}
              py={12}
            >
              <Center rounded={"2xl"} p={[4, 4, 12]}>
                <AnimateOnScroll
                  delay={0.3}
                  x={-200}
                  y={0}
                  styles={{ width: "100%", overflow: "visible" }}
                >
                  <Flex
                    w={["100%", "100%", "lg"]}
                    position={"relative"}
                    pt={[8, 6, 0]}
                  >
                    <SocialMediaOrbit
                      iconSize={"24px"}
                      iconBgSize={["40px"]}
                      centralElement={<Logo w={"50px"} h={"50px"} />}
                      names={SOCIALS.slice(0, 20).map((s) =>
                        s.key.toLowerCase()
                      )}
                      resetTime={1000}
                      props={{ h: "300px" }}
                    />
                  </Flex>
                </AnimateOnScroll>
              </Center>
              <Center rounded={"2xl"} p={12} flexDir={"column"}>
                <AnimateOnScroll
                  delay={0.5}
                  x={notMobile ? 200 : 0}
                  y={notMobile ? 0 : 50}
                >
                  <Text
                    fontWeight="black"
                    textAlign={"center"}
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Social")}
                  </Text>
                </AnimateOnScroll>
                <AnimateOnScroll
                  delay={0.7}
                  x={notMobile ? 200 : 0}
                  y={notMobile ? 0 : 50}
                >
                  <Text
                    fontWeight="bold"
                    textAlign={"center"}
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Media")}
                  </Text>
                </AnimateOnScroll>
              </Center>
            </Flex>
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              h={"100vh"}
              w={"100vw"}
            >
              <Center rounded={"2xl"} p={12} flexDir={"column"}>
                <AnimateOnScroll delay={0.3} x={-200} y={0}>
                  <Text
                    textAlign={"center"}
                    fontWeight="black"
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Simple")}
                  </Text>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5} x={-200} y={0}>
                  <Text
                    textAlign={"center"}
                    fontWeight="bold"
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Buttons")}
                  </Text>
                </AnimateOnScroll>
              </Center>
              <Center rounded={"2xl"} py={12}>
                <Flex w={["100%", "100%", "lg"]} position={"relative"}>
                  <AnimateOnScroll
                    delay={0.7}
                    x={notMobile ? 200 : 0}
                    y={notMobile ? 0 : 50}
                    styles={{ width: "100%", overflow: "visible" }}
                  >
                    <LinksSlider />
                  </AnimateOnScroll>
                </Flex>
              </Center>
            </Flex>
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              bg={"blackAlpha.400"}
              w={"100vw"}
              h={"100vh"}
            >
              <Center rounded={"2xl"} p={[4, 4, 12]}>
                <Flex
                  w={["400px", "420px", "lg", "xl", "2xl"]}
                  position={"relative"}
                >
                  <AnimateOnScroll
                    delay={0.3}
                    x={-200}
                    y={0}
                    styles={{ width: "100%", overflow: "visible" }}
                  >
                    <Link
                      type="nft slider"
                      title=""
                      url=""
                      styles={{
                        effect: "cards",
                        mode: "slider",
                        color: "#ffffff77",
                        nav: true,
                        navColor: "#ffffff",
                        size: notMobile ? "md" : "sm",
                        position: "fill",
                        type: "collection",
                        eth: "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
                        slides: 2,
                        centered: true,
                        auto: true,
                        network: "ethereum",
                      }}
                      color={"dark"}
                    />
                  </AnimateOnScroll>
                </Flex>
              </Center>
              <Center rounded={"2xl"} p={12} flexDir={"column"}>
                <AnimateOnScroll
                  delay={0.5}
                  x={notMobile ? 200 : 0}
                  y={notMobile ? 0 : 50}
                >
                  <Text
                    fontWeight="black"
                    textAlign={"center"}
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("NFT Image")}
                  </Text>
                </AnimateOnScroll>
                <AnimateOnScroll
                  delay={0.7}
                  x={notMobile ? 200 : 0}
                  y={notMobile ? 0 : 50}
                >
                  <Text
                    fontWeight="bold"
                    textAlign={"center"}
                    fontSize={["4xl", "4xl", "5xl", "5xl", "6xl"]}
                  >
                    {t("Galleries")}
                  </Text>
                </AnimateOnScroll>
              </Center>
            </Flex>
            <Flex
              flexDir={["column", "column", "column", "row"]}
              justify={"center"}
              align={"center"}
              h={"100vh"}
              w={"100vw"}
            >
              <Center
                rounded={"2xl"}
                p={[4, 4, 12]}
                flexDir={"column"}
                gap={12}
              >
                <AnimateOnScroll delay={0.3}>
                  <Flex w={["100%", "100%", "lg"]} position={"relative"}>
                    <Heading
                      as={"h3"}
                      fontWeight="bold"
                      fontSize={["4xl", "4xl", "5xl", "5xl"]}
                      textAlign={["center", "center", "center"]}
                    >
                      Get Your Soneium Domain Today
                    </Heading>
                  </Flex>
                </AnimateOnScroll>
                <AnimateOnScroll delay={0.5}>
                  <Text fontSize={["xl", "xl", "2xl"]} textAlign={"center"}>
                    Join the growing community and take control of your
                    blockchain identity.
                  </Text>
                </AnimateOnScroll>
                <Center gap={6} flexDir={["column", "column", "column", "row"]}>
                  <AnimateOnScroll
                    delay={0.7}
                    styles={{ width: notMobile ? "320px" : "100%" }}
                  >
                    <Button
                      h={"54px"}
                      size={"lg"}
                      rounded={"full"}
                      colorScheme="light"
                      w={["100%", "xs"]}
                      minW={"320px"}
                      as={ChakraLink}
                      href={TWITTER_FOLLOW_URL}
                      target="_blank"
                    >
                      {t("Join X Community")}
                    </Button>
                  </AnimateOnScroll>
                  <AnimateOnScroll
                    delay={0.9}
                    styles={{ width: notMobile ? "inherit" : "100%" }}
                  >
                    <Button
                      h={"54px"}
                      size={"lg"}
                      rounded={"full"}
                      colorScheme="light"
                      minW={"320px"}
                      w={["100%", "xs"]}
                      as={NextLink}
                      href={"/app"}
                      passHref
                    >
                      {t("Get Started")}
                    </Button>
                  </AnimateOnScroll>
                </Center>
              </Center>
            </Flex>
          </Stack>
        </Center>
      </Container>
    </Box>
  );
}
