import { type ReactElement } from 'react';
import { ChakraProvider, extendTheme, type ThemeExtension } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { useAtomValue } from 'jotai';
import { fontAtom, localeAtom } from 'core/atoms';
import { Direction, Locale } from 'translations';
import '@fontsource/montserrat';
import '@fontsource/poppins';
import '@fontsource/lato';
import '@fontsource/audiowide';
import '@fontsource/black-ops-one';
import '@fontsource/luckiest-guy';//audiowide  - mystery-quest - black-ops-one
import '@fontsource/pixelify-sans';
import '@fontsource/dm-sans';
import '@fontsource/playfair-display';
import '@fontsource/space-mono';
import { buttonTheme } from './Theme/Button';
import { colors } from './Theme/Colors';

interface IThemeProvider {
  children: ReactElement;
}

const ThemeProvider = ({ children }: IThemeProvider) => {
  const locale = useAtomValue(localeAtom);
  const direction = getDirection(locale);

  const config = {
    initialColorMode: "dark",
    useSystemColorMode: false
  };

  const fonts = {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  };

  const components = {
    Button: buttonTheme
  }

  const styles = {
    global: (props: ThemeExtension) => ({
      body: {
        bg: mode('var(--lightGradient)', 'var(--darkGradient)')(props),
        bgSize: '1000% 1000%',
        animation: 'MainBG 10s ease infinite',

      },
    }),
  };

  const theme = extendTheme({ config, styles, direction, fonts, components, colors });

  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export const getDirection = (locale: string) => {
  switch (locale) {
    default:
      return Direction.LeftToRight;
      break;
  }
};

export default ThemeProvider;
