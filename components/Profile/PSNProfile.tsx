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
  useMediaQuery,
  Center,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionItem,
  Image,
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
import { PSNProfileData, Styles } from "types";
import Link from "./Link";
import SimpleLink from "./SimpleLink";
import TextIcon from "components/features/TextIcon";
import { LinkIcon } from "components/logos";
import NumberIcon from "components/features/NumberIcon";
import AvatarSvg from "./AvatarSvg";
import { checkGradientBrightness, sortGames } from "core/utils";
import { TrophyMilestonesSlider } from "components/ui/TrophyMilestonesSlider";
import { GameSlider } from "components/ui/GameSlider";

interface Props {
  title?: string;
  url?: string;
  content?: string;
  icon?: JSX.Element;
  styles?: Styles;
}

export default function PSNProfile({
  title,
  url,
  content,
  styles,
  icon,
}: Props) {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const lightMode = useAtomValue(lightModeAtom);
  const _content: PSNProfileData = content ? JSON.parse(content) : {};
  const round = useAtomValue(roundAtom);
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  const [small] = useMediaQuery("(min-width: 378px)");
  const bgColor = styles?.bg ?? "#ffffffee";
  const light = checkGradientBrightness(bgColor) === "light";

  return (
    <>
      <Center
        flexDirection={"column"}
        key={"psn-profile-box-" + bgColor}
        gap={0}
        bg={bgColor}
        rounded={round === "none" ? round : "lg"}
        w={"100%"}
      >
        <Flex
          justify={"center"}
          align={"center"}
          as={Button}
          variant={"ghost"}
          color={light ? "#111111" : "#fdfdfd"}
          colorScheme={light ? "dark" : "light"}
          onClick={onOpen}
          p={0}
          minH={
            styles?.size === "sm"
              ? "100px"
              : styles?.size === "md"
              ? "200px"
              : "300px"
          }
          flexDir={"column"}
          minW={notMobile ? "100%" : "90vw"}
          w={"100%"}
        >
          <Flex
            gap={4}
            p={[4, 6, 8]}
            justify={"space-between"}
            align={"center"}
            w={"100%"}
          >
            <Flex align={"center"} gap={4} w={"100%"}>
              <AvatarSvg styles={{ width: "60px", height: "60px" }} />
              <Stack gap={1} textAlign={"left"}>
                <Text fontWeight={"bold"} fontSize={["lg"]}>
                  {_content.username}
                </Text>
                <Text>LEVEL : {_content.level}</Text>
              </Stack>
            </Flex>
            {styles?.size === "sm" && (
              <NumberIcon
                text={_content.stats.gamesPlayed.toString()}
                icon={<LinkIcon type="game" size={"30px"} />}
                tip="games played"
              />
            )}

            {styles?.size !== "lg" && (
              <NumberIcon
                text={_content.trophies.total.toString()}
                icon={<LinkIcon type="trophy" size={"30px"} />}
                tip="total trophies"
              />
            )}
          </Flex>
          {styles?.size !== "sm" && (
            <Flex
              gap={4}
              px={[4, 6, 8]}
              py={0}
              justify={"space-between"}
              align={"center"}
              w={"100%"}
            >
              <NumberIcon
                text={_content.stats.gamesPlayed.toString()}
                icon={
                  <LinkIcon type="game" size={notMobile ? "40px" : "32px"} />
                }
                tip="games played"
              />
              <NumberIcon
                text={_content.stats.completionRate}
                icon={
                  <LinkIcon type="level" size={notMobile ? "40px" : "32px"} />
                }
                tip="completion rate"
              />
            </Flex>
          )}
          {styles?.size === "lg" && (
            <Flex
              gap={4}
              p={[4, 6, 8]}
              py={4}
              justify={"space-between"}
              align={"center"}
              w={"100%"}
            >
              <NumberIcon
                text={_content.stats.countryRank}
                icon={
                  <LinkIcon type="rank" size={notMobile ? "40px" : "32px"} />
                }
                tip="country rank"
              />

              <NumberIcon
                text={_content.trophies.total.toString()}
                icon={
                  <LinkIcon
                    type="RiTrophyFill"
                    size={notMobile ? "40px" : "32px"}
                  />
                }
                tip="trophies"
              />
            </Flex>
          )}
        </Flex>
      </Center>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
        key={_content.username + "-psnprofile-modal"}
        colorScheme={light ? "dark" : "light"}
      >
        <ModalOverlay bg={bgColor} backdropFilter="auto" backdropBlur={"6px"} />
        <ModalContent
          bg={bgColor}
          transition={"all ease 0.3s"}
          fontSize={"lg"}
          color={light ? "blackAlpha.800" : "whiteAlpha.800"}
        >
          <ModalHeader
            gap={2}
            display={"flex"}
            justifyContent={notMobile ? "center" : "left"}
            alignItems={"center"}
          >
            {_content.username}'s PSN Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody as={Center} w="100%">
            <Flex gap={8} w={"2xl"} flexDir={"column"}>
              <Flex
                px={[0, 4, 8]}
                justify={"space-between"}
                align={"center"}
                w={"100%"}
              >
                <Flex align={"center"} gap={4} w={"100%"}>
                  <AvatarSvg styles={{ width: "60px", height: "60px" }} />
                  <Stack gap={1} textAlign={"left"}>
                    <Text fontWeight={"bold"} fontSize={["lg", "xl", "2xl"]}>
                      {_content.username}
                    </Text>
                    <Text>LEVEL : {_content.level}</Text>
                  </Stack>
                </Flex>
              </Flex>

              <Accordion
                allowToggle
                allowMultiple
                borderRadius={10}
                minWidth={"100%"}
                color={light ? "blackAlpha.800" : "whiteAlpha.800"}
                size="lg"
                backgroundColor={!light ? "whiteAlpha.100" : "blackAlpha.50"}
              >
                <AccordionItem border={0} borderRadius={10} width={"100%"}>
                  <AccordionButton
                    minWidth={"100%"}
                    as={Button}
                    justifyContent={"start"}
                    gap={4}
                    fontSize={["xl", "xl", "2xl"]}
                    px={[6]}
                    colorScheme={light ? "blackAlpha" : "whiteAlpha"}
                    size="lg"
                    color={light ? "blackAlpha.800" : "whiteAlpha.800"}
                    height={"100px"}
                  >
                    <LinkIcon
                      type="RiTrophyFill"
                      size={notMobile ? "40px" : "32px"}
                    />
                    <Text> Total Trophies </Text>
                    <Text>{_content.trophies.total}</Text>
                  </AccordionButton>

                  <AccordionPanel w={"100%"}>
                    <Flex gap={8} p={[2, 4, 6]} flexDirection={"column"}>
                      <Flex justify={"space-between"}>
                        <Flex gap={4}>
                          <LinkIcon
                            type="RiTrophyFill"
                            size={"30px"}
                            color="#9B5FC0"
                          />
                          <Text fontWeight={"bold"}>
                            {_content.trophies.platinum} Platinium
                          </Text>
                        </Flex>
                        <Flex gap={4}>
                          <LinkIcon
                            type="RiTrophyFill"
                            size={"30px"}
                            color="#FFD700"
                          />
                          <Text fontWeight={"bold"}>
                            {_content.trophies.gold} Gold
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex justify={"space-between"}>
                        <Flex gap={4}>
                          <LinkIcon
                            type="RiTrophyFill"
                            size={"30px"}
                            color="#909090"
                          />
                          <Text fontWeight={"bold"}>
                            {_content.trophies.silver} Silver
                          </Text>
                        </Flex>
                        <Flex gap={4}>
                          <LinkIcon
                            type="RiTrophyFill"
                            size={"30px"}
                            color="#bd9972"
                          />
                          <Text fontWeight={"bold"}>
                            {_content.trophies.bronze} Bronze
                          </Text>
                        </Flex>
                      </Flex>
                      <Stack gap={6}>
                        <Text fontSize={"xl"} fontWeight={"bold"}>
                          Trophy Milestones
                        </Text>
                        {_content.trophyMilestones && (
                          <TrophyMilestonesSlider
                            trophies={_content.trophyMilestones}
                            lightMode={light}
                          />
                        )}

                        {_content.recentTrophies && (
                          <>
                            <Text fontSize={"xl"} fontWeight={"bold"}>
                              Recent Trophies
                            </Text>
                            <TrophyMilestonesSlider
                              trophies={_content.recentTrophies}
                              lightMode={light}
                            />
                          </>
                        )}

                        {_content.rarestTrophies && (
                          <>
                            <Text fontSize={"xl"} fontWeight={"bold"}>
                              Rarest Trophies
                            </Text>
                            <TrophyMilestonesSlider
                              trophies={_content.rarestTrophies.filter((item) => item.name && item.name.length > 0)}
                              lightMode={light}
                            />
                          </>
                        )}
                      </Stack>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem border={0} borderRadius={10} width={"100%"}>
                  <AccordionButton
                    minWidth={"100%"}
                    as={Button}
                    colorScheme={light ? "blackAlpha" : "whiteAlpha"}
                    justifyContent={"start"}
                    gap={4}
                    fontSize={["xl", "xl", "2xl"]}
                    px={[6]}
                    size="lg"
                    color={light ? "blackAlpha.800" : "whiteAlpha.800"}
                    height={"100px"}
                  >
                    <LinkIcon type="game" size={notMobile ? "40px" : "32px"} />
                    <Text> Games Played </Text>
                    <Text>{_content.stats.gamesPlayed}</Text>
                  </AccordionButton>

                  <AccordionPanel w={"100%"}>
                    <Flex gap={8} p={[2, 4, 6]} flexDirection={"column"}>
                      <Flex justify={"space-between"}>
                        <Flex gap={4}>
                          <LinkIcon type="game" size={"30px"} />
                          <Text fontWeight={"bold"}>
                            {_content.stats.gamesPlayed} Games
                          </Text>
                        </Flex>
                        <Flex gap={4}>
                          <LinkIcon type="level" size={"30px"} />
                          <Text fontWeight={"bold"}>
                            {_content.stats.completionRate} Completed
                          </Text>
                        </Flex>
                      </Flex>
                      {_content.games && (
                          <>
                            <Text fontSize={"xl"} fontWeight={"bold"}>
                              Games Played
                            </Text>
                            <GameSlider
                              games={sortGames(_content.games.filter((item) => item.name && item.name.length > 0),"completion").reverse()}
                              lightMode={light}
                            />
                          </>
                        )}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem border={0} borderRadius={10} width={"100%"}>
                  <AccordionButton
                    minWidth={"100%"}
                    as={Button}
                    gap={4}
                    colorScheme={light ? "blackAlpha" : "whiteAlpha"}
                    fontSize={["xl", "xl", "2xl"]}
                    size="lg"
                    color={light ? "blackAlpha.800" : "whiteAlpha.800"}
                    px={[6]}
                    justifyContent={"start"}
                    height={"100px"}
                  >
                    <LinkIcon type="rank" size={notMobile ? "40px" : "32px"} />
                    <Text textAlign={"left"}> Rank</Text>
                    <Text>{_content.stats.countryRank}</Text>
                  </AccordionButton>

                  <AccordionPanel
                    display={"flex"}
                    justifyContent={"space-between"}
                    p={4}
                  >
                    <Flex gap={4} p={[2, 4]}>
                      <LinkIcon type="rank" size={"30px"} />
                      <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
                        Country Rank
                        <br />
                        {_content.stats.countryRank}
                      </Text>
                    </Flex>
                    <Flex gap={4} p={[2, 4]}>
                      <LinkIcon type="world rank" size={"30px"} />
                      <Text fontWeight={"bold"} fontSize={["lg", "xl"]}>
                        World Rank
                        <br />
                        {_content.stats.worldRank}
                      </Text>
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Flex>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}
