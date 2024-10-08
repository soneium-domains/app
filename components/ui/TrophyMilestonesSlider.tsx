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
import { RarestTrophy, Trophy, TrophyMilestone } from "types";

interface Props {
  trophies: TrophyMilestone[] | Trophy[] | RarestTrophy[];
  lightMode?: boolean;
}

export const TrophyMilestonesSlider = ({ trophies, lightMode }: Props) => {
  const [notMobile] = useMediaQuery("(min-width: 769px)");
  const [small] = useMediaQuery("(min-width: 378px)");

  return (
    <Flex>
      <Swiper
        className="trophies-swiper"
        style={{
          height: "100%",
          width: notMobile ? "100%" : "90vw",
          //@ts-ignore
          "--swiper-pagination-color": lightMode ? "#34343499" : "#99999999",
        }}
        grabCursor
        effect={"slide"}
        modules={[Autoplay, Pagination]}
        pagination={{
          dynamicBullets: true,
          clickable: true, 
        }}
        autoplay={{ delay: 5000 }}
        centeredSlides
        spaceBetween={"10px"}
        slidesPerView={1}
      >
        {trophies.map((item) => (
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
                  w={["50px", "60px", "80px"]}
                  rounded={'lg'}
                  alt={item.name}
                />
                <Stack gap={1}>
                  <Text fontWeight={"bold"} fontSize={"xl"}>
                    {/* @ts-ignore */}
                    {item?.milestone ? item.milestone : item.name}
                  </Text>
                  <Text>{item.game}</Text>
                </Stack>
              </Center>
              <Flex gap={1} flexDir={['row','column']} justify={['space-between']} w={['100%','auto']}>
                <Flex gap={2}>
                    {/* @ts-ignore */}
                  <LinkIcon type={item.timeAgo ? "RiTimeLine" : "RiShapesLine"} /> {item.timeAgo ? item.timeAgo : `Rarity ${item.rarity}`}
                </Flex>
                <Flex gap={2}>
                  <LinkIcon type="trophy" />
                    {/* @ts-ignore */}
                  <Text maxW={["100%","120px"]}> {item?.milestone ? item.name : item.type}</Text>
                </Flex>
              </Flex>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};
