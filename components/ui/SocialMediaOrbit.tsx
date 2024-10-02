import React, { useState, useEffect, useCallback } from 'react';
import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { LinkIcon } from "components/logos";
import { getSocialMediaColor } from "core/utils/constants";
import { checkGradientBrightness } from "core/utils";

interface SocialMediaOrbitProps {
  names: string[];
  centralElement: React.ReactNode;
  resetTime?: number;
  iconBgSize?: number | string | number[] | string[];
  iconSize?: number | string | number[] | string[];
  props?: any;
}

const MotionBox = motion(Box);

// Helper function to position icons in a circle
const getCirclePosition = (index: number, total: number, radius: number) => {
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  return { x, y };
};

const SocialMediaOrbit: React.FC<SocialMediaOrbitProps> = ({
  names,
  centralElement,
  resetTime = 5000,
  iconSize = '26px',
  iconBgSize = '38px',
  props
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [randomScales, setRandomScales] = useState([]);
  const [resetKey, setResetKey] = useState(0);
  const [radius, setRadius] = useState({
    first: 0,
    second: 0,
    third: 0,
  });

  // Minimum and maximum radius values
  const minRadius = 0;
  const maxRadii = {
    first: 75,
    second: 135,
    third: 195,
  };
  // Initialize random scales for each icon
  useEffect(() => {
    const scales: any = names.map(() => Math.random() * 0.4 + 1); // Random scale between 1 and 1.4
    setRandomScales(scales);
  }, [names, resetKey]);

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    setRadius((prevRadius) => {
      const newFirstRadius = Math.min(Math.max(minRadius, scrollY / 26), maxRadii.first);
      const newSecondRadius = Math.min(Math.max(minRadius, scrollY / 13), maxRadii.second);
      const newThirdRadius = Math.min(Math.max(minRadius, scrollY / 7), maxRadii.third);

      return {
        first: newFirstRadius,
        second: newSecondRadius,
        third: newThirdRadius,
      };
    });
  }, [maxRadii]);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);


  // Split the icons into layers
  const firstLayerIcons = names.slice(0, 7); // First 7 icons
  const secondLayerIcons = names.length > 7 ? names.slice(7, 20) : []; // Next 13 icons
  const thirdLayerIcons = names.length > 20 ? names.slice(20) : []; // Remaining icons

  useEffect(() => {
    const interval = setInterval(() => {
      setResetKey((prevKey) => prevKey + 1); // Change key to trigger re-render
    }, resetTime);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [resetTime]);

  return (
    <Flex
      position="relative"
      justifyContent="center"
      alignItems="center"
      w={"100%"}
      key={'social-media-orbit'}
      h="400px"
      {...props}
    >
      {/* Central Element */}
      <Box zIndex={10}>{centralElement}</Box>

      {/* First Circle (7 icons) */}
      {firstLayerIcons.map((name, index) => {
        const { x, y } = getCirclePosition(
          index,
          firstLayerIcons.length,
          radius.first
        );
        const isHovered = hoveredIndex === index;

        return (
          <MotionBox
            key={index}
            position="absolute"
            width={iconBgSize} // Smaller icons
            height={iconBgSize} 
            borderRadius="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
            initial={{ opacity: 0.8, scale: randomScales[index], backgroundColor : '#00000055' }}
            animate={{
              scale: isHovered ? 1.5 : randomScales[index], // Scale up hovered icon
              backgroundColor : isHovered ? getSocialMediaColor(name) : '#00000055',
              x: `${x}px`, // Apply x and y positions for the circular effect
              y: `${y}px`,
            }}
            whileHover={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <LinkIcon type={name} color={checkGradientBrightness(getSocialMediaColor(name)) === 'dark' ? '#fff' : '#000'} size={iconSize}/>
          </MotionBox>
        );
      })}

      {/* Second Circle (13 icons) */}
      {secondLayerIcons.map((name, index) => {
        const { x, y } = getCirclePosition(
          index,
          secondLayerIcons.length,
          radius.second
        );
        const isHovered = hoveredIndex === index + 7; // Adjust hover index for second circle

        return (
          <MotionBox
            key={index + 7}
            position="absolute"
            width={iconBgSize} 
            height={iconBgSize} 
            borderRadius="full"
            display="flex"
            justifyContent="center"
            alignItems="center"
            initial={{ opacity: 0.8, scale: randomScales[index + 7], backgroundColor : '#00000055' }}
            animate={{
              scale: isHovered ? 1.5 : randomScales[index + 7], // Scale up hovered icon
              backgroundColor : isHovered ? getSocialMediaColor(name) : '#00000055',
              x: `${x}px`, // Apply x and y positions for the circular effect
              y: `${y}px`,
            }}
            whileHover={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => handleMouseEnter(index + 7)}
            onMouseLeave={handleMouseLeave}
          >
            <LinkIcon type={name} color={checkGradientBrightness(getSocialMediaColor(name)) === 'dark' ? '#fff' : '#000'} size={iconSize}/>
            </MotionBox>
        );
      })}

      {/* Third Circle (remaining icons) */}
      {thirdLayerIcons.map((name, index) => {
        const { x, y } = getCirclePosition(
          index,
          thirdLayerIcons.length,
          radius.third
        );
        const isHovered = hoveredIndex === index + 20; // Adjust hover index for third circle

        return (
          <MotionBox
            key={index + 20}
            position="absolute"
            width={iconBgSize} 
            height={iconBgSize} 
            borderRadius="full"
            bg={getSocialMediaColor(name)}
            display="flex"
            justifyContent="center"
            alignItems="center"
            initial={{ opacity: 0.8, scale: randomScales[index+20], backgroundColor : '#00000055' }}
            animate={{
              scale: isHovered ? 1.5 : randomScales[index+20], // Scale up hovered icon
              backgroundColor : isHovered ? getSocialMediaColor(name) : '#00000055',
              x: `${x}px`, // Apply x and y positions for the circular effect
              y: `${y}px`,
            }}
            whileHover={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => handleMouseEnter(index + 20)}
            onMouseLeave={handleMouseLeave}
          >
            <LinkIcon type={name} color={checkGradientBrightness(getSocialMediaColor(name)) === 'dark' ? '#fff' : '#000'} size={iconSize}/>
            </MotionBox>
        );
      })}
    </Flex>
  );
};

export default SocialMediaOrbit;
