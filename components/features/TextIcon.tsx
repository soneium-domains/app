import { Text, Box, useColorMode, Center, Flex, Button, Collapse, Icon, useMediaQuery } from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';

import { useState } from 'react';

interface Props {
  text: string;
  icon: JSX.Element;
}


export default function TextIcon({ text, icon }: Props) {
  const { colorMode } = useColorMode();
  return (
      <Center
        key={`text-icon-${text}`}
        bg={
          colorMode === 'dark' ? 'blackAlpha.300' : 'whiteAlpha.300'
        }
        flexDirection="column"
        transition={'all 1s ease'}
        borderRadius={16}
        borderWidth={1}
        borderColor={colorMode === 'dark' ? 'whiteAlpha.300' : 'gray'}
        minH={[160,160,200,250]}>
        <Center flexDirection="column" px={6} transition={'all 1s ease'}>
          <Box my={4}>{icon}</Box>
          <Text fontSize={['lg', 'md', 'lg']} fontWeight="bold" my={1} align={'center'}>
            {text}
          </Text>
          
          {/* <Text fontSize={'lg'} fontWeight='light'>
          {text}
        </Text> */}
        </Center>
      </Center>
  );
}
