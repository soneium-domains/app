import React, { useState, useEffect } from "react";
import { Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BUTTON_BG_COLORS, BUTTON_VARIANTS } from "core/utils/constants";
import { getColor, getRandomNumber } from "core/utils";
import { LinkIcon } from "components/logos";

// Motion button using framer-motion and chakra ui
const MotionButton = motion(Button);
const intervalTime = 2000; // Interval time in milliseconds (e.g., 2000ms = 2 seconds)

const RotatingButton = () => {
  const [currentVariant, setCurrentVariant] = useState(BUTTON_VARIANTS[0]); // Initial variant index
  const currentBg = BUTTON_BG_COLORS[getRandomNumber(0,BUTTON_BG_COLORS.length-1)];
  const randomIndex = getRandomNumber(0,7);
  const title = ['My Link','X Community','Buy me a coffee','Official Website','Medium Blog','Discord','CV','Project Code'][randomIndex];
  const currentIcon = ['simple link','x','bitcoin','soneium','medium','discord','pdf','github'][randomIndex];
  // Function to cycle through the button BUTTON_VARIANTS
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prevVariant) => {
        const currentIndex = BUTTON_VARIANTS.indexOf(prevVariant);
        const nextIndex = (currentIndex + 1) % BUTTON_VARIANTS.length; // Cycle to the next variant
        return BUTTON_VARIANTS[nextIndex];
      });
    }, intervalTime);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <MotionButton
        size={"lg"}
        height={'80px'}
        rounded={['none','lg','full'][getRandomNumber(0,2)]}
        variant={currentVariant}
        colorScheme={currentBg}
        color={getColor(currentVariant, currentBg,false)}
        placeContent={"center"}
        placeItems={"center"}
        px={3}
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1] }}
      transition={{ duration: 0.5 }}
        width={"100%"}
      >
        <LinkIcon type={currentIcon} size={'40px'} color={getColor(currentVariant, currentBg,false)}/>
        <Text px={2} w={"100%"} textAlign={"center"}>
          {title}
        </Text>
      </MotionButton>
  );
};

export default RotatingButton;