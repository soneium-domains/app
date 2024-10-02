import {
  Box,
  Container,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Socials } from "components/Profile";
import { getIconColor } from "core/utils";
import {
  DISCORD_URL,
  EMAIL_URL,
  GITHUB_URL,
  MEDIUM_URL,
  SOCIAL_TWITTER,
  TELEGRAM_URL,
  TWITTER_URL,
  YLIDE_URL,
  YOUTUBE_URL,
  ZEALY_URL,
} from "core/utils/constants";
export default function Footer() {
  return (
    <Box as="footer" w="full" py={5}>
      <Container
        flexDirection={"column"}
        maxW="container.lg"
        alignItems={"center"}
        display="flex"
        justifyContent="space-between"
        gap={4}
      >
        <Socials
          key={`socials-footer-vid-${useColorModeValue(true, false)}`}
          title={`foot`}
          onlyIcons
          color={getIconColor(useColorModeValue(true, false))}
          json={{
            lightMode: useColorModeValue(true, false),
            socials: {
              //'com.discord': DISCORD_URL,
              "com.twitter": TWITTER_URL + SOCIAL_TWITTER,
              'email': EMAIL_URL,
              //'org.telegram': TELEGRAM_URL,
              //ylide: YLIDE_URL,
              "com.medium": MEDIUM_URL,
              "com.google.youtube": YOUTUBE_URL,
              "com.github": GITHUB_URL,
            },
          }}
        />
      </Container>
    </Box>
  );
}
