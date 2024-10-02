import type { AppProps } from 'next/app';
import ThemeProvider from 'components/Provider/ThemeProvider';
import Layout from 'components/Layout';
import { useDirectionSetter } from 'core/lib/hooks/use-directionSetter';
import { Base, BaseSepoliaTestnet } from '@thirdweb-dev/chains';
import { GoogleAnalytics } from '@next/third-parties/google';
//import { SpeedInsights } from "@vercel/speed-insights/next"
import '../styles/globals.css';
import 'intro.js/introjs.css';
import { motion } from 'framer-motion';
import { ThirdwebProvider } from "thirdweb/react";
import { useColorMode } from '@chakra-ui/react';



function MyApp({ Component, pageProps }: AppProps) {
  useDirectionSetter();
  const lightMode = useColorMode().colorMode === 'light';

  return (
    <ThemeProvider>
        <ThirdwebProvider>
          
          <Layout>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}>
              <Component {...pageProps} />
            </motion.div>
            <GoogleAnalytics gaId={String(process.env.NEXT_PUBLIC_GA_ID)} />
          </Layout>
        </ThirdwebProvider>
    </ThemeProvider>
  );
}

export default MyApp;
