import { Box, Container, Link, Text, useColorMode } from '@chakra-ui/react';
import { SITE_URL } from 'core/utils/constants';
import { roundAtom, lightModeAtom } from 'core/atoms';
import { useAtomValue } from 'jotai';
import { Logo } from 'components/logos';
export default function ProfileFooter() {
  const round = useAtomValue(roundAtom);
  const lightMode = useAtomValue(lightModeAtom);
  const { colorMode } = useColorMode();

  return (
    <Box
      as="footer"
      width={['100%', '100%', 'md', 'lg', 'xl']}
      py={4}
      color={lightMode ? 'var(--dark)' : 'var(--light)'}
      backgroundColor={lightMode ? 'whiteAlpha.300' : 'blackAlpha.300'}
      my={12}
      rounded={round}>
      <Container
        gap={1}
        maxW="container.md"
        display="flex"
        justifyContent="center"
        alignItems={'center'}>
        <Text>Powered By</Text>
        <Logo />
        <Link id="soneiumdomains-app-footer" href={SITE_URL}>
          Soneium Domains
        </Link>
      </Container>
    </Box>
  );
}
