import { Button, ButtonProps, keyframes } from "@chakra-ui/react";
import React from "react";

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

interface BouncingButtonProps extends ButtonProps {}

const BouncingButton: React.FC<BouncingButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      position="absolute"
      top="90vh"
      left="50%-30px"
      transform="translateX(-50%)"
      animation={`${bounceAnimation} 2s infinite`}
      {...props}  // Inherit other Chakra Button props
    >
      {children}
    </Button>
  );
};

export default BouncingButton;