import { ComponentType, useEffect, useState } from 'react';
import { Image, ImageProps } from '@chakra-ui/react';
import { motion, MotionProps } from 'framer-motion';
import axios from 'axios';
import { AVATAR_PREVIEW_URL, IPFS_URLS } from 'core/utils/constants';
import { ipfsCheckedUrl } from 'core/utils';

const ImageMotion = motion<MotionProps | ImageProps>(Image as ComponentType);
interface Props {
  url: string;
  nft?: any;
  alt?: string;
  noanimate?: boolean;
  nodrag?: boolean;
  shape?: "hex" | "circle" | "round" | "square" | string;
  my?: number | string;
  maxH?: number | string;
  shadow?: string;
  className?: string;
  onError?: any;
}
const Avatar = ({
  url,
  alt,
  noanimate,
  nodrag,
  shape,
  my,
  shadow,
  nft,
  maxH,
  className,
  onError
}: Props) => {

  const [avatarUrl, setAvatarUrl] = useState<string>(ipfsCheckedUrl(url));


  return (
    <ImageMotion
      initial={{ scale: !noanimate ? 0.96 : 1 }}
      animate={!noanimate ? { scale: 1 } : 'none'}
      transition={
        !noanimate
          ? {
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse',
            }
          : {}
      }
      onError={onError ? (e:any)=> onError(e) : ({ currentTarget }: any) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = '/logos/logo.png';
      }}
      drag={!nodrag}
      dragDirectionLock={!nodrag}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      dragElastic={0.5}
      borderRadius={shape !== 'hex' ? (shape === 'circle' ? '100%' : shape === 'round' ? 16 : 0) : 0}
      whileTap={{ cursor: 'grabbing' }}
      key={avatarUrl && avatarUrl.length > 10 ? avatarUrl : '/logos/logo.png'}
      src={avatarUrl && avatarUrl.length > 10 ? avatarUrl : '/logos/logo.png'}
      width="100%"
      className={className}
      maxH={maxH ? maxH : 'auto'}
      boxShadow={shadow ? shadow : 'none'}
      my={my ? my : 4}
      zIndex={100}
      alt={alt ? alt : 'Domain Profile Image'}
      style={{
        maskImage: shape === 'hex' ? 'url(/logos/hex.svg)' : 'none',
        WebkitMaskImage: shape === 'hex' ? 'url(/logos/hex.svg)' : 'none',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'none',
        WebkitMaskRepeat: 'none',
        maskPosition: 'center',
        WebkitMaskPosition: 'center'
      }}
      textAlign={'center'}
    />
  );
};

export default Avatar;
