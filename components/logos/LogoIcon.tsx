import * as React from "react";
import { Box } from "@chakra-ui/react";

interface Props {
  size?: string | number ;
  color?: string;
}
function LogoIcon({size = '26px', color = 'black'} : Props) {
  return (
    <Box width={size} height={size}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M53.4283 38.2217H46.8525V82.1971H53.4283V38.2217Z"
          fill={color}
        />
        <path
          d="M33.7007 46.852V53.4277H66.5795V46.852H33.7007Z"
          fill={color}
        />
        <path
          d="M40.8532 36.1956L36.1953 40.8535L59.4848 64.143L64.1427 59.4851L40.8532 36.1956Z"
          fill={color}
        />
        <path
          d="M64.1428 40.8532L59.4849 36.1953L36.1954 59.4848L40.8533 64.1427L64.1428 40.8532Z"
          fill={color}
        />
        <path
          d="M53.4283 33.7012H46.8525V66.58H53.4283V33.7012Z"
          fill={color}
        />
        <path
          d="M49.9997 0C35.5609 0 0 35.5597 0 49.9991C0 64.4386 35.5609 99.9988 49.9997 99.9988C64.4385 99.9988 100 64.4379 100 49.9991C100 35.5603 64.4391 0 49.9997 0ZM42.2081 78.5903C36.1194 76.9312 19.7494 48.2962 21.4088 42.2075C23.0683 36.1186 51.703 19.7491 57.7917 21.4085C63.8806 23.0676 80.2506 51.7021 78.5912 57.7911C76.9318 63.88 48.2968 80.2498 42.2081 78.5903Z"
          fill={color}
        />
      </svg>
    </Box>
  );
}

export default LogoIcon;
