import React, { useEffect } from "react";
import { Flex, Text, keyframes } from "@chakra-ui/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { Link } from "components/Profile";
import { LinkIcon } from "components/logos";

export const LinksSlider = () => {
  return (
    <Flex px={12} minW={"340px"} w={"100%"}>
      <Swiper
        className="button-swiper"
        style={{ height: "260px", width: "100%" }}
        loop
        grabCursor
        effect={"coverflow"}
        autoplay={{ delay: 3000 }}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        direction={"vertical"}
        modules={[EffectCoverflow, Autoplay]}
        centeredSlides
        spaceBetween={"10px"}
        slidesPerView={3}
      >
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Official Website"
            url="#"
            styles={{ size: "lg", variant: "solid" }}
            icon={<LinkIcon type={"soneiumdomains"} size={"40px"} />}
            color={"dark"}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Whitepaper"
            url="#"
            styles={{
              size: "lg",
              variant: "border2",
              bg: "yellow",
              font: "Lato",
            }}
            icon={<LinkIcon type={"whitepaper"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="payment button"
            title="Pay Me Ethereum"
            url="#"
            styles={{
              size: "lg",
              variant: "solid",
              eth: "0x046fC1185e45224325f3191140fd236462574C07",
              btc: "tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7",
            }}
            icon={<LinkIcon type={"eth"} size={"40px"} />}
            color={"dark"}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Discord Server"
            url="#"
            styles={{
              size: "lg",
              variant: "border",
              bg: "purple",
              font: "DM Sans",
            }}
            icon={<LinkIcon type={"discord"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Medium Blog"
            url="#"
            styles={{
              size: "lg",
              variant: "border",
              bg: "dark",
              font: "Playfair Display",
            }}
            icon={<LinkIcon type={"medium"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="donate button"
            title="Buy Me A Coffee"
            url="#"
            content="Thank you for that coffee!"
            styles={{
              size: "lg",
              variant: "solid",
              eth: "0x046fC1185e45224325f3191140fd236462574C07",
              btc: "tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7",
              bg: "red",
              font: "Space Mono",
            }}
            icon={<LinkIcon type={"RiCupFill"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="simple link"
            title="Limited Offer"
            url="#"
            styles={{
              size: "lg",
              variant: "border2",
              bg: "orange",
              font: "Space Mono",
            }}
            icon={<LinkIcon type={"RiCalendarEventFill"} size={"40px"} />}
          />
        </SwiperSlide>

        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="embed"
            title="Submit Form"
            url="https://fz9yr1hrjv9.typeform.com/to/ZfBeoCGT"
            styles={{
              size: "lg",
              variant: "border2",
              type: 'modal',
              bg: "green",
              font: "Lato",
            }}
            icon={<LinkIcon type={"RiChatCheckLine"} size={"40px"} />}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
          <Link
            type="embed"
            title="Opensea"
            url="https://opensea.io/collection/cryptopunks"
            styles={{
              size: "lg",
              type:'modal',
              variant: "border2",
              bg: "blue",
              font: "Pixelify Sans",
            }}
            icon={<LinkIcon type={"opensea"} size={"40px"} />}
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
