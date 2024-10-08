import React, { useEffect } from "react";
import {
  Center,
  Flex,
  Image,
  Stack,
  Text,
  keyframes,
  useMediaQuery,
} from "@chakra-ui/react";
import { Autoplay, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "components/Profile";
import { LinkIcon } from "components/logos";
import { Game, RarestTrophy, Trophy, TrophyMilestone } from "types";

interface Props {
  games: Game[];
  lightMode?: boolean;
}

export const GameSlider = ({ games, lightMode }: Props) => {
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  const [small] = useMediaQuery("(min-width: 378px)");

  return (
    <Flex>
      <Swiper
        className="games-swiper"
        style={{
          height: "100%",
          width: notMobile ? "100%" : "90vw",
          //@ts-ignore
          "--swiper-pagination-color": lightMode ? "#34343499" : "#99999999",
        }}
        grabCursor
        effect={"slide"}
        modules={[Pagination]}
        pagination={{
          dynamicBullets: true,
          clickable: true, 
        }}
        centeredSlides
        spaceBetween={"10px"}
        slidesPerView={1}
      >
        {games.map((item) => (
          <SwiperSlide>
            <Flex
              rounded={"2xl"}
              p={4}
              mb={8}
              bg={lightMode ? "blackAlpha.100" : "whiteAlpha.100"}
              gap={4}
              w={"100%"}
              align={["start","center"]}
              justifyContent={"space-between"}
              flexDir={["column", "row"]}
            >
              <Center gap={4} justifyContent={["start", "center"]}>
                <Image
                  src={item.imageUrl}
                  w={["100px", "100px", "100px"]}
                  rounded={'lg'}
                  alt={item.name}
                />
                <Stack gap={1}>
                  <Text fontWeight={"bold"} fontSize={"xl"}>
                    {item?.name}
                  </Text>
                  <Text>{item.completion} Completed</Text>
                </Stack>
              </Center>
              <Flex gap={1} flexDir={['row','column']} justify={['space-between']} w={['100%','100px']}>
                <Flex gap={2}>
                  <LinkIcon type={"rank"} /><strong>{item.rank}</strong>
                </Flex>
                <Flex gap={2}>
                  <LinkIcon type="trophy" />
                  <Text maxW={["100%","120px"]}> {item.trophies.gold + item.trophies.bronze + item.trophies.silver}</Text>
                </Flex>
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};
