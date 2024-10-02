import { Button, Flex, Text, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { Logo, LogoIcon } from 'components/logos';
import NextLink from 'next/link';


export default function LogoLink() {
  const lightMode = useColorMode().colorMode === 'light';
  const [small] = useMediaQuery('(min-width: 560px)');
  return (
    <Flex flexGrow={1} width={'100%'}>
    <NextLink href="/" passHref>
      <Button
        id="header-logo"
        fontWeight="900"
        variant="ghost"
        p={[1,4]}
        gap={2}
        fontSize={'2xl'}
        size={'lg'}
        rounded={'full'}>
        
        <Logo light={lightMode} key={'logo-'+lightMode ? 'light' : 'dark'}/>
        {small && (
          <Text  fontWeight="900">
            Soneium Domains
          </Text>
        )}
      </Button>
    </NextLink>
    </Flex>
  );
}
