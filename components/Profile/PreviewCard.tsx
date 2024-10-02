import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import Avatar from "./Avatar";
import AvatarSvg from "./AvatarSvg";
import { BG_COLORS_SAMPLE } from "core/utils/constants";
import { checkGradientBrightness } from "core/utils";

interface Props {
  avatarColor: string;
  title: string;
  subtitle?: string;
  name?: string;
  font?: string;
  bg?: string;
}

export default function PreviewCard({ title, subtitle, name, font = "Poppins", bg = BG_COLORS_SAMPLE[0], avatarColor=BG_COLORS_SAMPLE[2]}: Props) {
  
  const lightMode = checkGradientBrightness(bg) === 'light';
  console.log(bg)
  
  return (
    <Center rounded={'2xl'} key={`preview-card-${bg.replaceAll(' ','-')}`} minW={'340px'} w={'100%'} p={4} bg={bg} gap={8} color={lightMode ? '#111111' : '#f5f5f5'} minH={'300px'} flexDir={['column','column','row']}>
      <Box w={['80px','100px','140px']} height={['80px','100px','140px']} key={"avatar-box-" + title} rounded={'full'}>
        <AvatarSvg baseColor={avatarColor} />
      </Box>

      <Stack textAlign={['center','center',"left"]}>
        <Heading fontWeight="bold" fontSize="3xl" fontFamily={font}>
          {title}
        </Heading>
        <Heading fontWeight="normal" fontSize="xl" fontFamily={font}>
          {subtitle}
        </Heading>
        {name && (
          <Heading fontWeight="bold" fontSize="xl" fontFamily={font}>
            {name}
          </Heading>
        )}
      </Stack>
    </Center>
  );
}
