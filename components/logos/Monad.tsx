import { useColorMode, Box } from '@chakra-ui/react';
interface Props {
  color?: string;
  size?: string | number;
}
function Monad({color,size}: Props) {
  const { colorMode } = useColorMode();
  return (
    <Box>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 243 243.3149" width={size ?? 26} height={size ?? 26}>
    <path
                d="m121.6582,0C86.526,0,0,86.5231,0,121.6568s86.526,121.6582,121.6582,121.6582,121.6596-86.526,121.6596-121.6582S156.7918,0,121.6582,0Zm-18.9584,191.2243c-14.8148-4.037-54.646-73.7111-50.6083-88.5259,4.0377-14.8155,73.7111-54.6453,88.5259-50.6077,14.8155,4.037,54.6466,73.7098,50.609,88.5253-4.0377,14.8155-73.7118,54.646-88.5266,50.6083Z"
                fill={color ? color : "#836ef9"} />
            
    </svg>
    </Box>
  );
}

export default Monad;
