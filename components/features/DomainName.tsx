import {
    Text,
    useColorMode,
    Flex,
    Avatar,
    Stack,
    Box,
  } from '@chakra-ui/react';
import { LinkIcon, Logo } from 'components/logos';
  
  interface Props {
    name: string;
    avatar?: string;
    address?: string;
    size?: 'md' | 'lg' | 'xl' | string[];
    fontSize?: 'md' | 'lg' | 'xl' | string[];
  }
  export default function DomainName({ name, avatar , size = 'lg', fontSize= 'xl', address = undefined}: Props) {
    const { colorMode } = useColorMode();
    return (
        <Flex w={'100%'} gap={3} align={'center'} border='3px solid black' position='relative' boxShadow='1px 1px 0px 0px black, 2px 2px 0px 0px black, 3px 3px 0px 0px black' rounded={'full'} bg={colorMode === 'light' ? 'white' : 'blackAlpha.500'}>
        {avatar === 'logo' ? <Logo w={'104px'} h={'64px'}/> :<Avatar color='white' icon={<LinkIcon type='RiUserLine' size={22} color='#ffffff'/>} rounded={'full'} src={avatar} size={size}/>}
        <Stack w={'100%'} pr={address ? 6 : 0} gap={0}>
          <Text
            fontWeight={'semibold'}
            textAlign={'center'}
            w={'100%'}
            cursor={'default'}
            pr={address ? 5 : 4}
            fontSize={fontSize}
            bgGradient={
              colorMode === 'light'
                ? 'linear(to-r, var(--base2), var(--base00))'
                : 'linear(to-r, var(--base000), var(--base00))'
            }
            bgClip="text">
              {name}
          </Text>
          {address && <Text color={colorMode === 'light' ? '#00000099' : '#ffffff99'}>{address}</Text>}
          </Stack>
      </Flex>
    );
  }
  