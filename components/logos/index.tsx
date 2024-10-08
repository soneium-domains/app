import Zealy from "./Zealy";
import Galxe from "./Galxe";
import Metamask from "./Metamask";
import {
  RiTwitterFill,
  RiTelegramFill,
  RiFacebookFill,
  RiDiscordFill,
  RiMediumFill,
  RiYoutubeFill,
  RiLinkedinFill,
  RiGithubFill,
  RiPinterestFill,
  RiInstagramFill,
  RiWhatsappFill,
  RiSailboatFill,
  RiTwitterLine,
  RiTelegramLine,
  RiFacebookLine,
  RiDiscordLine,
  RiMediumLine,
  RiYoutubeLine,
  RiLinkedinLine,
  RiGithubLine,
  RiPinterestLine,
  RiInstagramLine,
  RiWhatsappLine,
  RiSailboatLine,
  RiMailLine,
  RiMailFill,
  RiPhoneLine,
  RiPhoneFill,
  RiLinksFill,
  RiLinksLine,
  RiImage2Line,
  RiImage2Fill,
  RiText,
  RiImageFill,
  RiImageLine,
  RiVideoFill,
  RiVideoLine,
  RiHeading,
  RiFilePdfFill,
  RiFilePdfLine,
  RiFileGifFill,
  RiFileGifLine,
  RiServiceLine,
  RiServiceFill,
  RiP2PLine,
  RiP2PFill,
  RiMoreLine,
  RiMoreFill,
  RiSnapchatLine,
  RiSnapchatFill,
  RiDribbbleLine,
  RiDribbbleFill,
  RiTiktokLine,
  RiTiktokFill,
  RiTwitchLine,
  RiTwitchFill,
  RiSkypeLine,
  RiSkypeFill,
  RiSoundcloudLine,
  RiSoundcloudFill,
  RiSpotifyLine,
  RiSpotifyFill,
  RiPatreonLine,
  RiPatreonFill,
  RiSlackLine,
  RiSlackFill,
  RiAmazonLine,
  RiAmazonFill,
  RiAppStoreLine,
  RiAppStoreFill,
  RiGooglePlayLine,
  RiMusic2Fill,
  RiMusic2Line,
  RiGooglePlayFill,
  RiWallet3Line,
  RiWallet3Fill,
} from "react-icons/ri";
import {
  PiGameController,
  PiGameControllerFill,
  PiHandWaving,
  PiHandWavingFill,
  PiStairs,
  PiStairsFill,
} from "react-icons/pi";
import { SiEtsy, SiSubstack } from "react-icons/si";
import { NftFill, NftLine } from "./NFT";
import Polygon from "./Polygon";
import Arbitrum from "./Arbitrum";
import Optimism from "./Optimism";
import Logo from "./Logo";
import LogoIcon from "./LogoIcon";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { FaRankingStar, FaXTwitter } from "react-icons/fa6";
import Binance from "./Binance";
import Avalanche from "./Avalanche";
import Solana from "./Solana";
import Tron from "./Tron";
import Ylide from "./Ylide";
import * as Icons from "react-icons/ri";
import { Avatar, Center, Icon } from "@chakra-ui/react";
import EmojiIcon from "components/Profile/Emoji";
import { IMAGE_URI, IPFS_IMAGE_URI } from "core/utils/constants";
import Base from "./Base";
import Monad from "./Monad";
import Soneium from "./Soneium";
import Linktree from "./Linktree";

interface LinkIconProps {
  type: string;
  line?: boolean;
  color?: string;
  size?: any;
  rounded?: string;
}

const LinkIcon = ({
  type,
  line,
  color,
  size = "28px",
  rounded,
}: LinkIconProps) => {
  switch (type) {
    case "close":
      return <Icons.RiCloseLine size={size} />;
    case "x":
    case "twitter":
    case "tweet":
      return line ? (
        <FaXTwitter size={size} color={color ? color : undefined} />
      ) : (
        <FaXTwitter size={size} color={color ? color : undefined} />
      );

    case "level":
      return line ? (
        <PiStairs size={size} color={color ? color : undefined} />
      ) : (
        <PiStairsFill size={size} color={color ? color : undefined} />
      );
    case "game":
      return line ? (
        <PiGameController size={size} color={color ? color : undefined} />
      ) : (
        <PiGameControllerFill size={size} color={color ? color : undefined} />
      );
    case "rank":
      return line ? (
        <FaRankingStar size={size} color={color ? color : undefined} />
      ) : (
        <FaRankingStar size={size} color={color ? color : undefined} />
      );
    case "world rank":
      return line ? (
        <Icons.RiEarthLine size={size} color={color ? color : undefined} />
      ) : (
        <Icons.RiEarthFill size={size} color={color ? color : undefined} />
      );
    case "ps":
    case "psn":
    case "psn profile":
    case "playstation":
      return line ? (
        <Icons.RiPlaystationLine
          size={size}
          color={color ? color : undefined}
        />
      ) : (
        <Icons.RiPlaystationFill
          size={size}
          color={color ? color : undefined}
        />
      );
    case "linkedin":
      return line ? (
        <RiLinkedinLine size={size} color={color ? color : undefined} />
      ) : (
        <RiLinkedinFill size={size} color={color ? color : undefined} />
      );
    case "trophy":
    case "trophies":
      return line ? (
        <Icons.RiTrophyLine size={size} color={color ? color : undefined} />
      ) : (
        <Icons.RiTrophyFill size={size} color={color ? color : undefined} />
      );
    case "reddit":
      return line ? (
        <Icons.RiRedditLine size={size} color={color ? color : undefined} />
      ) : (
        <Icons.RiRedditFill size={size} color={color ? color : undefined} />
      );
    case "medium":
      return line ? (
        <RiMediumLine size={size} color={color ? color : undefined} />
      ) : (
        <RiMediumFill size={size} color={color ? color : undefined} />
      );
    case "telegram":
      return line ? (
        <RiTelegramLine size={size} color={color ? color : undefined} />
      ) : (
        <RiTelegramFill size={size} color={color ? color : undefined} />
      );
    case "facebook":
      return line ? (
        <RiFacebookLine size={size} color={color ? color : undefined} />
      ) : (
        <RiFacebookFill size={size} color={color ? color : undefined} />
      );
    case "discord":
      return line ? (
        <RiDiscordLine size={size} color={color ? color : undefined} />
      ) : (
        <RiDiscordFill size={size} color={color ? color : undefined} />
      );
    case "youtube":
      return line ? (
        <RiYoutubeLine size={size} color={color ? color : undefined} />
      ) : (
        <RiYoutubeFill size={size} color={color ? color : undefined} />
      );
    case "github":
      return line ? (
        <RiGithubLine size={size} color={color ? color : undefined} />
      ) : (
        <RiGithubFill size={size} color={color ? color : undefined} />
      );
    case "pinterest":
      return line ? (
        <RiPinterestLine size={size} color={color ? color : undefined} />
      ) : (
        <RiPinterestFill size={size} color={color ? color : undefined} />
      );
    case "amazon":
      return line ? (
        <RiAmazonLine size={size} color={color ? color : undefined} />
      ) : (
        <RiAmazonFill size={size} color={color ? color : undefined} />
      );
    case "clubhouse":
      return line ? (
        <PiHandWaving size={size} color={color ? color : undefined} />
      ) : (
        <PiHandWavingFill size={size} color={color ? color : undefined} />
      );
    case "app store":
      return line ? (
        <RiAppStoreLine size={size} color={color ? color : undefined} />
      ) : (
        <RiAppStoreFill size={size} color={color ? color : undefined} />
      );
    case "apple music":
      return line ? (
        <RiMusic2Line size={size} color={color ? color : undefined} />
      ) : (
        <RiMusic2Fill size={size} color={color ? color : undefined} />
      );
    case "play store":
      return line ? (
        <RiGooglePlayLine size={size} color={color ? color : undefined} />
      ) : (
        <RiGooglePlayFill size={size} color={color ? color : undefined} />
      );
    case "substack":
      return line ? (
        <SiSubstack size={size} color={color ? color : undefined} />
      ) : (
        <SiSubstack size={size} color={color ? color : undefined} />
      );
    case "etsy":
      return line ? (
        <SiEtsy size={size} color={color ? color : undefined} />
      ) : (
        <SiEtsy size={size} color={color ? color : undefined} />
      );
    case "instagram":
      return line ? (
        <RiInstagramLine size={size} color={color ? color : undefined} />
      ) : (
        <RiInstagramFill size={size} color={color ? color : undefined} />
      );
    case "snapchat":
      return line ? (
        <RiSnapchatLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSnapchatFill size={size} color={color ? color : undefined} />
      );
    case "dribbble":
      return line ? (
        <RiDribbbleLine size={size} color={color ? color : undefined} />
      ) : (
        <RiDribbbleFill size={size} color={color ? color : undefined} />
      );
    case "tiktok":
      return line ? (
        <RiTiktokLine size={size} color={color ? color : undefined} />
      ) : (
        <RiTiktokFill size={size} color={color ? color : undefined} />
      );
    case "twitch":
      return line ? (
        <RiTwitchLine size={size} color={color ? color : undefined} />
      ) : (
        <RiTwitchFill size={size} color={color ? color : undefined} />
      );
    case "skype":
      return line ? (
        <RiSkypeLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSkypeFill size={size} color={color ? color : undefined} />
      );
    case "soundcloud":
    case "soundcloud track":
      return line ? (
        <RiSoundcloudLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSoundcloudFill size={size} color={color ? color : undefined} />
      );
    case "spotify":
      return line ? (
        <RiSpotifyLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSpotifyFill size={size} color={color ? color : undefined} />
      );
    case "patreon":
      return line ? (
        <RiPatreonLine size={size} color={color ? color : undefined} />
      ) : (
        <RiPatreonFill size={size} color={color ? color : undefined} />
      );
    case "slack":
      return line ? (
        <RiSlackLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSlackFill size={size} color={color ? color : undefined} />
      );
    case "opensea":
      return line ? (
        <RiSailboatLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSailboatFill size={size} color={color ? color : undefined} />
      );
    case "zealy":
      return line ? (
        <Zealy color={color ? color : undefined} size={size} />
      ) : (
        <Zealy color={color ? color : undefined} size={size} />
      );
    case "galxe":
      return line ? (
        <Galxe color={color ? color : undefined} />
      ) : (
        <Galxe color={color ? color : undefined} />
      );
    case "email":
      return line ? (
        <RiMailLine size={size} color={color ? color : undefined} />
      ) : (
        <RiMailFill size={size} color={color ? color : undefined} />
      );
    case "phone":
      return line ? (
        <RiPhoneLine size={size} color={color ? color : undefined} />
      ) : (
        <RiPhoneFill size={size} color={color ? color : undefined} />
      );
    case "whatsapp":
      return line ? (
        <RiWhatsappLine size={size} color={color ? color : undefined} />
      ) : (
        <RiWhatsappFill size={size} color={color ? color : undefined} />
      );
    case "soundcloud song":
      return line ? (
        <RiSoundcloudLine size={size} color={color ? color : undefined} />
      ) : (
        <RiSoundcloudFill size={size} color={color ? color : undefined} />
      );
    case "nft link":
    case "nft":
      return line ? (
        <NftLine color={color ? color : undefined} />
      ) : (
        <NftFill color={color ? color : undefined} />
      );
    case "nft gallery":
      return line ? (
        <Icons.RiLayoutMasonryLine
          size={size}
          color={color ? color : undefined}
        />
      ) : (
        <Icons.RiLayoutMasonryFill
          size={size}
          color={color ? color : undefined}
        />
      );
    case "nft slider":
      return line ? (
        <Icons.RiSlideshow3Line size={size} color={color ? color : undefined} />
      ) : (
        <Icons.RiSlideshow3Fill size={size} color={color ? color : undefined} />
      );

    case "embed":
      return line ? (
        <Icons.RiWindowLine size={size} color={color ? color : undefined} />
      ) : (
        <Icons.RiWindowFill size={size} color={color ? color : undefined} />
      );
    case "simple link":
      return line ? <RiLinksLine size={size} /> : <RiLinksFill size={size} />;
    case "image link":
    case "image":
    case "image/png":
    case "image/svg":
    case "image/svg+xml":
    case "image/jpeg":
      return line ? <RiImage2Line size={size} /> : <RiImage2Fill size={size} />;
    case "youtube video":
      return line ? (
        <RiYoutubeLine size={size} />
      ) : (
        <RiYoutubeFill size={size} />
      );
    case "text":
    case "text paragraph":
    case "simple text":
      return line ? <RiText size={size} /> : <RiText size={size} />;
    case "heading":
      return line ? <RiHeading size={size} /> : <RiHeading size={size} />;
    case "ipfs video":
    case "video/mp4":
    case "mp4":
      return line ? <RiVideoLine size={size} /> : <RiVideoFill size={size} />;
    case "ipfs image":
      return line ? <RiImageLine size={size} /> : <RiImageFill size={size} />;
    case "pdf document":
    case "pdf doc":
    case "pdf":
    case "application/pdf":
      return line ? (
        <RiFilePdfLine size={size} color={color ? color : undefined} />
      ) : (
        <RiFilePdfFill size={size} color={color ? color : undefined} />
      );

    case "whitepaper":
      return line ? (
        <Icons.RiFileList3Line size={size} color={color ? color : undefined} />
      ) : (
        <Icons.RiFileList3Fill size={size} color={color ? color : undefined} />
      );
    case "block":
      return line ? (
        <Icons.RiPagesLine size={size} color={color ? color : undefined} />
      ) : (
        <Icons.RiPagesFill size={size} color={color ? color : undefined} />
      );

    case "base":
      return <Base color={color ? color : undefined} size={size} />;
    case "monad":
      return <Monad color={color ? color : undefined} size={size} />;
    case "soneium":
      return <Soneium color={color ? color : undefined} size={size} />;
    case "soneiumdomains":
      return <Logo />;
    case "soneiumdomainsicon":
      return <LogoIcon />;
    case "donate":
    case "donate button":
      return line ? (
        <RiServiceLine size={size} />
      ) : (
        <RiServiceFill size={size} />
      );
    case "pay":
    case "pay button":
    case "payment":
    case "payment button":
      return line ? <RiP2PLine size={size} /> : <RiP2PFill size={size} />;
    case "more":
      return line ? <RiMoreLine size={size} /> : <RiMoreFill size={size} />;
    case "ethereum":
    case "eth":
      return <FaEthereum size={size} color={color ? color : undefined} />;
    case "bitcoin":
    case "btc":
      return <FaBitcoin size={size} color={color ? color : undefined} />;
    case "arbitrum":
    case "arbitrum one":
    case "arb":
      return <Arbitrum color={color ? color : undefined} />;
    case "polygon":
    case "pol":
    case "matic":
      return <Polygon color={color ? color : undefined} />;
    case "optimism":
    case "opt":
      return <Optimism color={color ? color : undefined} />;
    case "binance":
    case "bsc":
    case "bnb":
      return <Binance color={color ? color : undefined} />;
    case "avalanche":
    case "avax":
      return <Avalanche color={color ? color : undefined} />;
    case "solana":
    case "sol":
      return <Solana color={color ? color : undefined} />;
    case "ylide":
      return <Ylide color={color ? color : undefined} size={size} />;
    case "wallet":
    case "wallet button":
      return line ? (
        <RiWallet3Line size={size} color={color ? color : undefined} />
      ) : (
        <RiWallet3Fill size={size} color={color ? color : undefined} />
      );
    case "tron":
    case "trx":
      return <Tron color={color ? color : undefined} />;
    case "image/gif":
    case "gif":
      return line ? (
        <RiFileGifLine size={size} color={color ? color : undefined} />
      ) : (
        <RiFileGifFill size={size} color={color ? color : undefined} />
      );
    case "linktree":
      return <Linktree color={color ? color : undefined} size={size} />;
    default:
      //// console.log('here : ', type);
      if (type.indexOf("Ri") === 0) {
        const SelectedIcon = Icons[type as keyof typeof Icons];
        return <SelectedIcon size={size} color={color ? color : undefined} />;
      } else if (
        type.indexOf(IPFS_IMAGE_URI) === 0 ||
        type.indexOf(IMAGE_URI) === 0
      ) {
        return (
          <Avatar
            src={type}
            w={size === "sm" ? "32px" : size === "lg" ? "56px" : "44px"}
            h={size === "sm" ? "32px" : size === "lg" ? "56px" : "44px"}
            borderRadius={rounded ? rounded : "8px"}
            color="white"
            maxW={"80px"}
            maxH={"80px"}
            bg={"transparent"}
            icon={<NftLine color={color ? color : undefined} />}
          />
        );
      } else if (type.indexOf("No.") === 0) {
        return (
          <Center
            rounded="full"
            w={size}
            bgColor={"var(--base0)"}
            h={size}
            fontWeight={"bold"}
            fontSize={"2xl"}
          >
            {type.slice(3)}
          </Center>
        );
      } else {
        return <EmojiIcon size={parseInt(size)} native={type} />;
      }
  }
};
export { Logo, LogoIcon, Base, LinkIcon, Zealy, Metamask };
