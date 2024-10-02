import type { NextPage } from "next";
import Head from "next/head";
import { SITE_DESCRIPTION, SITE_URL, SITE_TITLE } from "core/utils/constants";
import { Seo } from "components/Layout/Seo";
import SettingsSection from "components/sections/SettingsSection";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Lottie from "react-lottie";
import * as animationData from "assets/animations/coming-soon.json";

const Roadmap: NextPage = () => {
  const title = "Roadmap";
  const des = "Soneium Domains Roadmap d";
  return (
    <>
      <Seo title={title} description={des} />
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={des} />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&w=30&image=${SITE_URL}logos/logo.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={des} />
        <meta
          name="og:image"
          content={`${SITE_URL}/api/og?title=${title}&subtitle=${des}&w=30&image=${SITE_URL}logos/logo.svg`}
        />
        <link rel="icon" type="image/png" href="/logos/logo.png" />
      </Head>

      {/* <ClaimSection /> */}
      <Box id="roadmap" width={'100%'} >
        <Container
          as="main"
          maxW="container.md"
          display="grid"
          minH="100vh"
          py={20}
        >
          <Flex flexDirection="column" maxW={"container.lg"}>
            <Stack fontSize={"xl"} gap={8} textAlign={'center'}>
              <Heading as="h2" size="lg" my={8}>
                RoadMap
              </Heading>
              <Text>
                <strong>Hold Tight, We are building this page! </strong>
              </Text>
              <Center>
                {/* @ts-ignore */}
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
              />
              </Center>
            </Stack>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Roadmap;
