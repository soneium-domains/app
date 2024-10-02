import React, { useEffect } from 'react';
import { Flex, Text, keyframes } from '@chakra-ui/react';

// Define a keyframe animation for rotating the icon
const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

interface RotatingIconTextProps {
  icon: JSX.Element;
  text: string;
  delay: number; // delay in milliseconds
  onComplete: () => void; // callback function to be called after the delay
}

const LoadingIcon: React.FC<RotatingIconTextProps> = ({ icon, text, delay, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Call the callback function after the delay
    }, delay * 1000);

    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [delay, onComplete]);

  return (
    <Flex align="center" gap={2}>
      {/* Apply the rotating animation to the icon */}
      <Flex
        as="span"
        animation={`${rotateAnimation} 2s infinite linear`} // Rotate the icon
      >
        {icon}
      </Flex>
      <Text>{text}</Text>
    </Flex>
  );
};

export default LoadingIcon;