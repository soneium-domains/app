import { Button, useColorMode } from '@chakra-ui/react';
import { LinkIcon } from 'components/logos';
import { SITE_URL, SITE_PROFILE_URL } from 'core/utils/constants';
import { RiShareLine } from 'react-icons/ri';

export default function ShareButton({
  name,
  type = 'blue',
  url,
  isDisabled = false
}: {
  name: string;
  type: 'blue' | 'gray';
  url: string;
  isDisabled?: boolean;
}) {
  const shareProfile = async () => {
    let hashtags = 'Soneium_Domains,Soneium';
    let text = `🚀 Just claimed my testnet .son domain with Soneium Domains on Minato!!%0a%0a✅ check it out : ${name} %0a%0a🔥 Explore the alpha app and claim your unique soneium profile via @soneium_domains!%0a%0a`;
    let href = `https://twitter.com/intent/tweet?original_referer=${SITE_URL}&text=${text}&hashtags=${hashtags}&url=${url}`;
    window.open(href);
  };
  const {colorMode } = useColorMode();


  return (
    <>
      {type === 'blue' ? (
        <Button
          gap={2}
          flexDirection={'column'}
          height="72px"
          w={'100%'}
          className="share"
          isDisabled={isDisabled}
          borderRadius={12}
          colorScheme="red"
          color={'white'}
          bgGradient={
            colorMode === 'light'
              ? 'linear(to-r, var(--red0), var(--red2))'
              : 'linear(to-r, var(--red0), var(--red2))'
          }
          onClick={shareProfile}>
          <LinkIcon type="x" />
          Share
        </Button>
      ) : (
        <Button gap={2} size={'lg'} width={'100%'} className="share" onClick={shareProfile}>
          <LinkIcon type="x" />
          Share
        </Button>
      )}
    </>
  );
}
