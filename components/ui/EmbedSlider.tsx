import React, { useEffect } from "react";
import { Flex, Text, keyframes } from "@chakra-ui/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { SwiperSlide, Swiper} from "swiper/react";
import { Link } from "components/Profile";
import { LinkIcon } from "components/logos";

export const EmbedSlider = () => {
  return (
    <Flex>
      <Swiper
        className="button-swiper"
        style={{ height: "100%", width: "100%" }}
        loop
        grabCursor
        effect={"coverflow"}
        modules={[EffectCoverflow, Autoplay]}
        centeredSlides
        spaceBetween={"10px"}
        slidesPerView={3}
      >
        <SwiperSlide>
          <Link
            type="embed"
            title="Website"
            url="https://oncyber.io/savenature"
            styles={{ size: "md"}}
            icon={<LinkIcon type={"soneiumdomains"} size={"40px"} />}
            color={"dark"}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
        <Link
            type="embed"
            title="Website"
            url="https://oncyber.io/savenature"
            styles={{ size: "md"}}
            icon={<LinkIcon type={"soneiumdomains"} size={"40px"} />}
            color={"dark"}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
        <Link
            type="embed"
            title="Website"
            url="https://oncyber.io/savenature"
            styles={{ size: "md"}}
            icon={<LinkIcon type={"soneiumdomains"} size={"40px"} />}
            color={"dark"}
          />
        </SwiperSlide>
        <SwiperSlide style={{ height: "80px" }}>
        <Link
            type="embed"
            title="Website"
            url="https://oncyber.io/savenature"
            styles={{ size: "md"}}
            icon={<LinkIcon type={"soneiumdomains"} size={"40px"} />}
            color={"dark"}
          />
        </SwiperSlide>
      </Swiper>
    </Flex>
  );
};
