import { useColorMode, Box } from "@chakra-ui/react";
interface Props {
  color?: string;
  size?: string | number;
}
function Soneium({ color, size }: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box  width={size ?? 26}
    height={size ?? 26}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        width={'100%'}
        height={'100%'}
      >
        <path
          fill={color}
          d="M20.307 27.712a9.98 9.98 0 0 1-9.38-2.64 9.68 9.68 0 0 1-1.57-12.051 16.8 16.8 0 0 1 2.717-3.352C15.394 6.36 21.49.344 21.49.344A17.987 17.987 0 0 0 .535 13.637a18 18 0 0 0 12.25 21.584z"
        ></path>
        <path
          fill={color}
          d="M15.677 8.266a9.98 9.98 0 0 1 9.38 2.639c3.289 3.29 3.931 8.173 1.556 12.035a17 17 0 0 1-2.717 3.356 5137 5137 0 0 1-9.416 9.325 17.987 17.987 0 0 0 20.985-13.29A18 18 0 0 0 23.18.74z"
        ></path>
      </svg>
    </Box>
  );
}

export default Soneium;
