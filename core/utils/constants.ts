import { BgColorItem, LinkType, BgImageItem } from "types";
import { capFirstLetter } from ".";

export const MINT_OPEN = true;
export const MINT_TOTAL_SUPPLY: number = 10000;
export const TLD = "son";
export const DOMAIN_REGISTER_FEE = 0.00001;
export const MINT_DATE = "";
export const MINT_MESSAGE = "Soon on Soneium Testnet (Minato)";
export const SITE_URL = "https://soneium.domains/";
export const SITE_LOGO_URL = "https://soneium.domains/logo.svg";
export const SITE_OGS_URL = "https://soneium.domains/ogs/";
export const SITE_URL_SHORT = "soneium.domains";
export const VID_IMAGE_API = "https://img.soneium.domains/api/";
export const SITE_TITLE = "Soneium Domains";
export const SITE_DESCRIPTION = "Soneium Naming Service for Soneium Blockchain";
export const SITE_FULL_DESCRIPTION =
  "Soneium Domains is a ENS-Based domain naming system for Soneium Blockchain which provides users and dapps the ability to assign human-readable names to Soneium addresses";
export const NFT_IMAGE_URL =
  "https://ipfs.io/ipfs/QmUvfedgHDXdiMsq5nfLPGLQrR4QAYXHzR5SETBZQ6RGyd";
export const SITE_MANAGE_URL = "https://soneium.domains/names/";
export const SITE_MANAGE_SINGLE_URL = "https://soneium.domains/name/";
export const METADATA_URL = "https://metadata.soneium.domains/";
export const SITE_PROFILE_URL = "https://soneium.domains/";
export const ZEALY_URL = "https://zealy.io/c/Soneiumdomains/";
export const AVATAR_API_URL = "https://metadata.soneium.domains/minato/avatar/";
export const AVATAR_PREVIEW_URL = "https://metadata.soneium.domains/preview/";
export const BTCSCAN_ADDRESS = "https://blockchair.com/bitcoin/";
export const ETHERSCAN_ADDRESS = "https://explorer-testnet.soneium.org/tx/";
export const MAX_NAME_LENGTH = 63;
export const MIN_NAME_LENGTH = 2;
export const MIN_FEE = 660000000;
export const TWITTER_CALLBACK_URL =
  "https://soneium.domains/api/twitter/callback";
//export const TWITTER_CALLBACK_URL = 'http://localhost:3000/api/twitter/callback';
export const TWITTER_ME = "https://api.twitter.com/2/users/me";
export const TWITTER_SCOPES = ["tweet.read", "users.read", "offline.access"];
export const TWITTER_FOLLOW_URL =
  "https://twitter.com/intent/user?screen_name=Soneium_domains";
export const TWITTER_RETWEET_URL = "";
export const ZEALY_USERS_API = "";
export const IPFS_IO_URL = "https://ipfs.io/ipfs/";

export const SOCIAL_TWITTER = "Soneiumdomains";
export const TWITTER_URL = "https://twitter.com/";
export const DISCORD_URL = "https://discord.gg/eRD8PBVFaB";
export const GITHUB_URL = "https://github.com/Soneiumdomains";
export const TELEGRAM_URL = "https://t.me/Soneiumdomains";
export const DOCS_URL = "https://docs.soneium.domains";
export const ROADMAP_URL = "https://docs.soneium.domains/overview/roadmap";
export const GUIDES_URL = "https://docs.soneium.domains/guides/overview";
export const EMAIL_URL = "mailto:info@soneium.domains";
export const MEDIUM_URL = "https://medium.com/@soneiumdomains";
export const YLIDE_URL = "";
export const YOUTUBE_URL = "https://www.youtube.com/@SoneiumDomains";
export const OPENSEA_URL =
  "https://testnets.opensea.io/assets/arbitrum-sepolia/0x955357e06046c91186cf4571f4dd729157bfbcfb/";
export const FAUCET_URL = "https://www.alchemy.com/faucets/arbitrum-sepolia";

export const MARKETPLACE_URLS_COLLECTION: any = {
  ethereum: "https://opensea.io/assets/ethereum/",
  polygon: "https://opensea.io/assets/matic/",
  arbitrum: "https://opensea.io/assets/arbitrum/",
  optimism: "https://opensea.io/assets/optimism/",
};

export const MARKETPLACE_URLS: any = {
  ethereum: "https://opensea.io/assets/ethereum/",
  polygon: "https://opensea.io/assets/matic/",
  arbitrum: "https://opensea.io/assets/arbitrum/",
  optimism: "https://opensea.io/assets/optimism/",
};

export const ETHERSCAN_URLS: any = {
  btc: "https://blockchair.com/bitcoin/address/",
  trx: "https://tronscan.org/#/address/",
  avax: "https://snowtrace.io/address/",
  eth: "https://etherscan.io/address/",
  matic: "https://polygonscan.com/address/",
  bnb: "https://bscscan.com/address/",
  sol: "https://solscan.io/account/",
  son: "https://explorer-testnet.soneium.org/address/",
  arb1: "https://arbiscan.io/address/",
  op: "https://optimistic.etherscan.io/address/",
};

export const IPFS_IMAGE_URI = "ipfs";
export const IMAGE_URI = "http";

export const IPFS_URLS = [
  `https://${process.env.NEXT_PUBLIC_THIRDWEB_ID}.ipfscdn.io/ipfs/`,
  "https://cf-ipfs.com/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://gateway.ipfs.io/",
  "https://gateway.pinata.cloud/ipfs/",
  "https://10.via0.com/ipfs/",
  "https://ipfs.cf-ipfs.com/",
];

export const SIGN_MESSAGE =
  "Welcome to Soneium Domains. By signing this message, you agree with our terms and conditions. timestamp=";

export const MAX_FILE_UPLOAD = 15728640;

export const DONATE_VALUES: any = {
  ethereum: ["0.001", "0.01", "0.1"],
  bitcoin: ["0.0001 BTC", "0.001 BTC", "0.005 BTC"],
  paypal: ["1 USD", "10 USD", "50 USD"],
};


export const LINK_VALIDATION_REGEX =
  "^(https?:\\/\\/)?" + // protocol
  "([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)" + // subdomain and domain name
  "(\\.[a-zA-Z]{2,})+" + // top-level domain
  "(\\:\\d+)?" + // port
  "(\\/[\\-a-zA-Z\\d%_.~+:]*)*" + // path (updated to include colon)
  "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
  "(\\#[-a-zA-Z\\d_]*)?$"; // fragment identifier

export const YOUTUBE_LINK_VALIDATION_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const SOUNDCLOUD_LINK_REGEX =
  /https?:\/\/(?:w\.|www\.|)(?:soundcloud\.com\/)(?:(?:player\/\?url=https\%3A\/\/api.soundcloud.com\/tracks\/)|)(((\w|-)[^A-z]{7})|([A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*(?!\/sets(?:\/|$))(?:\/[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*){1,2}))/;

export const TWITTER_STATUS_REGEX =
  /^https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)$/;


export const AVAILABLE_LINKS: LinkType[] = [
  { type: "heading", av: true, reg: "" },
  { type: "text paragraph", av: true, reg: "" },
  { type: "block", av: true, reg: "" },
  { type: "nft link", av: true, reg: "" },
  { type: "simple link", av: true, reg: LINK_VALIDATION_REGEX },
  { type: "image link", av: true, reg: LINK_VALIDATION_REGEX },
  { type: "tweet", av: true, reg: TWITTER_STATUS_REGEX },
  { type: "ipfs image", av: true, reg: "" },
  { type: "youtube video", av: true, reg: YOUTUBE_LINK_VALIDATION_REGEX },
  { type: "soundcloud track", av: true, reg: SOUNDCLOUD_LINK_REGEX },
  { type: "pdf document", av: true, reg: LINK_VALIDATION_REGEX },
  { type: "donate button", av: true, reg: "" },
  { type: "payment button", av: true, reg: "" },
  { type: "nft gallery", av: true, reg: "" },
  { type: "nft slider", av: true, reg: "" },
  { type: "embed", av: true, reg: "" },
  { type: "token link", av: false, reg: "" },
  { type: "contact form", av: false, reg: "" },
  { type: "contact info", av: false, reg: "" },
];

export const EXAMPLE_SOCIAL_URLS: any = {
  twitter: "https://twitter.com/exampleuser",
  linkedin: "https://www.linkedin.com/in/exampleuser/",
  github: "https://github.com/exampleuser",
  medium: "https://medium.com/@exampleuser",
  youtube: "https://www.youtube.com/@exampleuser",
  instagram: "https://www.instagram.com/exampleuser",
  tiktok: "https://www.tiktok.com/@exampleuser",
  twitch: "https://www.twitch.tv/exampleuser",
  snapchat: "https://www.snapchat.com/add/exampleuser",
  facebook: "https://www.facebook.com/exampleuser",
  dribbble: "https://dribbble.com/exampleuser",
  pinterest: "https://www.pinterest.com/exampleuser",
  soundcloud: "https://soundcloud.com/exampleuser",
  spotify: "https://open.spotify.com/user/exampleuser",
  patreon: "https://www.patreon.com/exampleuser",
  substack: "https://exampleuser.substack.com",
  galxe: "https://galxe.com/exampleuser",
  opensea: "https://opensea.io/exampleuser",
  zealy: "https://zealy.io/c/exampleuser",
  ylide: "https://hub.ylide.io/project/exampleuser",
  amazon: "https://www.amazon.com/gp/profile/exampleuser",
  playstore: "https://play.google.com/store/apps/developer?id=Example+User",
  appstore: "https://apps.apple.com/us/developer/example-user/id123456789",
  applemusic: "https://music.apple.com/profile/exampleuser",
  clubhouse: "https://www.joinclubhouse.com/@exampleuser",
  etsy: "https://www.etsy.com/shop/exampleuser",
  discord: "https://discord.gg/exampleuser",
  skype: "exampleuser",
  slack: "https://exampleuser.slack.com",
  telegram: "https://t.me/exampleuser",
  whatsapp: "44234567890",
  phone: "44234567890",
  email: "example@example.com",
};

export const EXAMPLE_LINK_URLS: any = {
  nftlink: "https://yourlink.com",
  simplelink: "https://yourlink.com",
  imagelink: "https://yourlink.com",
  youtubevideo: "https://www.youtube.com/watch?v=6Bq132cv_G0",
  soundcloudtrack: "https://soundcloud.com/symbolico/im-free",
  tweet: "https://x.com/SamyWalters/status/1720165257019073014",
};

export const EXAMPLE_WALLETS: any = {
  soneium: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  ethereum: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  bitcoin: "bc1qpvsvcfzvz59h02hcuvc8y8jj385r2mlhnkt654",
  polygon: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  arbitrum: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  binance: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  avalanche: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  optimism: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  solana: "BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i",
  tron: "TR22H7PLMm1BUaGfhmfnPY7VLEhG2U6y3t",
};

export const SOCIALS = [
  { key: "Twitter", value: "com.twitter", color: "#000000" },
  { key: "Discord", value: "com.discord", color: "#5865F2" },
  { key: "Medium", value: "com.medium", color: "#000000" },
  { key: "Opensea", value: "com.opensea", color: "#2081E2" },
  { key: "Telegram", value: "org.telegram", color: "#0088CC" },
  { key: "Github", value: "com.github", color: "#181717" },
  { key: "Instagram", value: "com.instagram", color: "#E4405F" },
  { key: "Youtube", value: "com.google.youtube", color: "#FF0000" },
  { key: "Galxe", value: "com.galxe", color: "#101010" }, // Estimated brand color
  { key: "Facebook", value: "com.facebook", color: "#1877F2" },
  { key: "Zealy", value: "com.zealy", color: "#101010" }, // Estimated brand color
  { key: "Linkedin", value: "com.linkedin", color: "#0077B5" },
  { key: "Email", value: "email", color: "#DD4B39" }, // Standard email color (Gmail red)
  { key: "Dribbble", value: "com.dribbble", color: "#EA4C89" },
  { key: "Phone", value: "phone", color: "#000000" }, // Default phone color
  { key: "Pinterest", value: "com.pinterest", color: "#BD081C" },
  { key: "Soundcloud", value: "com.soundcloud", color: "#FF5500" },
  { key: "Spotify", value: "com.spotify", color: "#1DB954" },
  { key: "TikTok", value: "com.tiktok", color: "#010101" },
  { key: "Twitch", value: "tv.twitch", color: "#9146FF" },
  { key: "Snapchat", value: "com.snapchat", color: "#FFFC00" },
  { key: "Substack", value: "com.substack", color: "#FF6719" },
  { key: "Patreon", value: "com.patreon", color: "#F96854" },
  { key: "Ylide", value: "com.ylide", color: "#0057FF" }, // Estimated brand color
  { key: "Amazon", value: "com.amazon", color: "#FF9900" },
  { key: "Play Store", value: "com.google.play", color: "#34A853" },
  { key: "App Store", value: "com.apple.appstore", color: "#0D96F6" },
  { key: "Apple Music", value: "com.apple.music", color: "#FA243C" },
  { key: "Clubhouse", value: "com.clubhouse", color: "#F3E6D3" },
  { key: "Etsy", value: "com.etsy", color: "#F56400" },
  { key: "Skype", value: "com.skype", color: "#00AFF0" },
  { key: "Slack", value: "com.slack", color: "#4A154B" },
  { key: "Reddit", value: "org.reddit", color: "#FF4500" },
  { key: "Whatsapp", value: "com.whatsapp", color: "#25D366" },
];

// Function to get the color of a social media platform by name
export function getSocialMediaColor(name: string): string {
  const social = SOCIALS.find((s) => s.key.toLowerCase() === name.toLowerCase());
  return social ? social.color : "#000000"; // Default to black if not found
}

export function getSocialUrlScheme(platform: string): string {
  const socialItem = SOCIALS.find(
    (item) => item.key.toLowerCase() === platform.toLowerCase()
  );
  return socialItem ? socialItem.value : `com.${platform.toLowerCase()}`;
}

export function getSocialTitle(value: string): string | undefined {
  const socialItem = SOCIALS.find(
    (item) => item.value.toLowerCase() === value.toLowerCase()
  );
  return socialItem ? socialItem.key : undefined;
}

// export function getWalletName(platform: string): string | undefined {
//   const socialItem = SOCIALS.find((item) => item.key.toLowerCase() === platform.toLowerCase());
//   return socialItem?.value;
// }

export const WALLETS = [
  { value: "ethereum", label: "Ethereum" },
  { value: "arbitrum", label: "Arbitrum" },
  { value: "avalanche", label: "Avalanche" },
  { value: "base", label: "Base" },
  { value: "blast", label: "Blast" },
  { value: "matic", label: "Matic" },
  { value: "optimism", label: "Optimism" },
  { value: "solana", label: "Solana" },
  { value: "zora", label: "Zora" },
];

export const BG_COLORS = [
  {
    color: "linear-gradient(0deg, #000000 10%, #232323 90%)",
    lightMode: false,
  }, // darkGradient
  { color: "#161618", lightMode: false }, // dark
  {
    color: "linear-gradient(to bottom, #232526 10%, #414345 90%)",
    lightMode: false,
  }, // darkGradient0
  {
    color:
      "radial-gradient(at 40% 30%, #e6e6e6 10%, #ededed 35%, #dcdcdc 55%, #f0f0f0 80%)",
    lightMode: true,
  }, // lightGradient
  {
    color: "linear-gradient(to bottom, #cfdef3 10%, #e0eafc 90%)",
    lightMode: true,
  }, // grayGradient
  {
    color: "linear-gradient(to bottom, #8e9eab 10%, #eef2f3 90%)",
    lightMode: true,
  }, // lightGreyGradient
  {
    color: "linear-gradient(to bottom, #444444 0%, #888888 100%)",
    lightMode: false,
  }, // baseGradient
  {
    color: "linear-gradient(to bottom, #5e1494 0%, #af4bd6 100%)",
    lightMode: false,
  }, // purpleGradient
  {
    color: "linear-gradient(to bottom, #ed213a 0%, #93291e 100%)",
    lightMode: false,
  }, // redGradient
  {
    color: "linear-gradient(to bottom, #b2fefa 0%, #0ed2f7 100%)",
    lightMode: true,
  }, // blueGradient
  {
    color: "linear-gradient(to bottom, #f16311 0%, #f5af19 100%)",
    lightMode: true,
  }, // orangeGradient
  {
    color: "linear-gradient(to bottom, #fffc00 0%, #fffbc0 100%)",
    lightMode: true,
  }, // yellowGradient
];

export const BG_COLORS_SAMPLE = [
  "#161618",
  "#FF6900",
  "#FCB900",
  "#7BDCB5",
  "#00D084",
  "#8ED1FC",
  "#0693E3",
  "#ABB8C3",
  "#607d8b",
  "#EB144C",
  "#F78DA7",
  "#ba68c8",
  "#9900EF",
  "linear-gradient(0deg, #000000 10%, #232323 90%)",
  "linear-gradient(0deg, rgb(0, 0, 0) 0%, #acacac 100%)",
  "linear-gradient(0deg, rgb(255, 177, 153) 0%, rgb(255, 8, 68) 100%)",
  "linear-gradient(270deg, rgb(251, 171, 126) 8.00%, rgb(247, 206, 104) 92.00%)",
  "linear-gradient(315deg, rgb(150, 230, 161) 8.00%, rgb(212, 252, 121) 92.00%)",
  "linear-gradient(to left, rgb(249, 240, 71) 0%, rgb(15, 216, 80) 100%)",
  "linear-gradient(315deg, rgb(194, 233, 251) 8.00%, rgb(161, 196, 253) 92.00%)",
  "linear-gradient(0deg, rgb(0, 198, 251) 0%, rgb(0, 91, 234) 100%)",
  "linear-gradient(0deg, rgb(167, 166, 203) 0%, rgb(137, 137, 186) 51.00%, rgb(137, 137, 186) 100%)",
  "linear-gradient(0deg, rgb(80, 82, 133) 0%, rgb(88, 94, 146) 15.0%, rgb(101, 104, 159) 28.00%, rgb(116, 116, 176) 43.00%, rgb(126, 126, 187) 57.00%, rgb(131, 137, 199) 71.00%, rgb(151, 149, 212) 82.00%, rgb(162, 161, 220) 92.00%, rgb(181, 174, 228) 100%)",
  "linear-gradient(270deg, rgb(255, 126, 179) 0%, rgb(255, 117, 140) 100%)",
  "linear-gradient(90deg, rgb(120, 115, 245) 0%, rgb(236, 119, 171) 100%)",
  "linear-gradient(45deg, #2e266f 0.00%, #9664dd38 100.00%)",
  "linear-gradient(0deg, #cfdef3 10%, #e0eafc 90%)",
  "linear-gradient(0deg, #8e9eab 10%, #eef2f3 90%)",
  "linear-gradient(0deg, #444444 0%, #888888 100%)",
  "linear-gradient(0deg, #5e1494 0%, #af4bd6 100%)",
  "linear-gradient(0deg, #ed213a 0%, #93291e 100%)",
  "linear-gradient(0deg, #b2fefa 0%, #0ed2f7 100%)",
  "linear-gradient(0deg, #f16311 0%, #f5af19 100%)",
  "linear-gradient(0deg, #fffc00 0%, #fffbc0 100%)",
  "radial-gradient(circle at center, yellow 0%, #009966 50%, purple 100%)",
];

export const BG_IMAGES: BgImageItem[] = [
  { bg: "var(--bg1Gradient)", lightMode: false },
  { bg: "var(--bg3Gradient)", lightMode: false },
  { bg: "var(--bg2Gradient)", lightMode: true },
  { bg: "var(--bg4Gradient)", lightMode: false },
  { bg: "var(--bg5Gradient)", lightMode: false },
  { bg: "var(--bg6Gradient)", lightMode: false },
  { bg: "var(--bg7Gradient)", lightMode: false },
  { bg: "var(--bg8Gradient)", lightMode: false },
  { bg: "var(--bg9Gradient)", lightMode: false },
];


export function isLink(value: string): boolean {
  const _isLink = AVAILABLE_LINKS.filter((item) =>
    value.toLowerCase().includes(item.type.toLowerCase().replace(" ", "."))
  );
  return _isLink.length > 0;
}

export const BUTTON_BG_COLORS = [
  "dark",
  "light",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export const BUTTON_ROUNDS = ["none", "md", "full"];
export const BUTTON_VARIANTS = [
  "solid",
  "outline",
  "pop",
  "border",
  "border2",
  "fill",
];
export const FONTS = [
  "Montserrat",
  "DM Sans",
  "Poppins",
  "Lato",
  "Pixelify Sans",
  "Space Mono",
  "Playfair Display",
  "Luckiest Guy",
  "Audiowide",
  "Black Ops One",
];

export const VARIATIONS = [
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/pun.son.svg",
    avatarShape: "hex",
    bg: BG_IMAGES[7].bg,
    lightMode: BG_IMAGES[7].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[2],
    round: BUTTON_ROUNDS[1],
    font: FONTS[0],
    title: "Jonathan",
    WalletButtons: true,
    subtitle: "Investigator",
    vid: "jonathan.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/sam.son.svg",
    avatarShape: "circle",
    bg: BG_IMAGES[1].bg,
    lightMode: BG_IMAGES[3].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[1],
    round: BUTTON_ROUNDS[2],
    font: FONTS[3],
    WalletButtons: true,
    title: "Crypto Explorer",
    vid: "samoel.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/anony.son.svg",
    avatarShape: "circle",
    bg: BG_IMAGES[6].bg,
    lightMode: BG_IMAGES[8].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[5],
    round: BUTTON_ROUNDS[2],
    font: FONTS[0],
    title: "Joe",
    WalletButtons: true,
    subtitle: "Community Mod",
    vid: "mod.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/anon.son.svg",
    avatarShape: "hex",
    bg: BG_COLORS[0].color,
    lightMode: BG_COLORS[0].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[2],
    round: BUTTON_ROUNDS[1],
    font: FONTS[2],
    title: "0xLuc",
    subtitle: "Crypto Enthusiast",
    WalletButtons: true,
    socialButtons: false,
    vid: "0xluc.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/rain.son.svg",
    avatarShape: "round",
    bg: BG_COLORS[7].color,
    lightMode: BG_COLORS[7].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[3],
    round: BUTTON_ROUNDS[0],
    font: FONTS[2],
    title: "Jack",
    subtitle: "Blockchain Dev",
    vid: "jack.son",
    WalletButtons: true,
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/col.son.svg",
    avatarShape: "round",
    bg: BG_IMAGES[4].bg,
    lightMode: BG_IMAGES[4].lightMode,
    buttonBg: BUTTON_BG_COLORS[1],
    variant: BUTTON_VARIANTS[0],
    round: BUTTON_ROUNDS[1],
    font: FONTS[0],
    title: "Alice",
    subtitle: "Domains on Soneium",
    WalletButtons: true,
    vid: "alice.son",
  },
];

export const VARIATIONS_VIDS = [
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/anon.son.svg",
    vid: "boo.son",
    address: "0xD2D....001CE",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/luc.son.svg",
    address: "0xD2D....01ED2",
    vid: "luc.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/john.son.svg",
    address: "0xD2D....01ECE",
    vid: "john.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/anony.son.svg",
    address: "0xD2D....00101C",
    vid: "alice.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/dark.son.svg",
    address: "0xD2D....001CE",
    vid: "alex.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/col.son.svg",
    address: "0xD2D....00112",
    vid: "sara.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/pun.son.svg",
    address: "0xD2D....D212E",
    vid: "mary.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/joe.son.svg",
    address: "0xD2D....D2D12",
    vid: "joe.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/dark.son.svg",
    address: "0xD2D....001CE",
    vid: "dark.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmNpdhihDxWCykpci1EJPA4VJTo7TTKH4NnZJStbN1MVqC/sam.son.svg",
    address: "0xD2D....D21CE",
    vid: "jack.son",
  },
  {
    avatar:
      "https://ipfs.io/ipfs/QmTQqf3ge2SvpgeBAucDtfxExE3zMci6hfMrqZmLJXVCm6/ben.son.svg",
    address: "0xD2D....D2EF3",
    vid: "ben.son",
  },
];

export const LINK_VARIATIONS = [
  [
    {
      type: "tweet",
      title: "tweet",
      styles: {
        size: "sm",
      },
      url: "https://x.com/monad_xyz/status/1819352362198118522",
    },
  ],
  [
    {
      type: "donate button",
      title: "buy me a coffee",
      styles: {
        size: "sm",
        eth: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
      },
      url: "https://soundcloud.com/sam-walters-715497925/sets/trippy",
    },
  ],
  [
    {
      type: "simple link",
      title: "Youtube Channel",
      url: "https://www.youtube.com/@soneiumdomains",
      styles: {
        icon: "RiYoutubeFill",
        size: "md",
      },
    },
  ],
  [
    {
      type: "simple link",
      title: "Telegram Bot",
      url: "https://t.me/@monid_xyz_bot",
      styles: {
        icon: "RiTelegramFill",
        size: "md",
      },
    },
  ],
  [
    {
      type: "donate button",
      title: "buy me a coffee",
      styles: {
        size: "sm",
        eth: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
      },
      url: "https://soundcloud.com/sam-walters-715497925/sets/trippy",
    },
    {
      type: "tweet",
      title: "tweet",
      styles: {
        size: "sm",
      },
      url: "https://x.com/monad_xyz/status/1819352362198118522",
    },
    {
      type: "pdf document",
      title: "My Old CV",
      url: "",
      image:
        "https://ipfs.io/ipfs/QmUeSvTQtZiBoa344JvfA8ekeKFH8pRMk8sY3tBjDEG3d9/CV.pdf",
      content: "",
      styles: {
        size: "sm",
      },
    },
    {
      type: "nft link",
      title: "Bear Market Builder NFT",
      url: "https://opensea.io/assets/polygon/0x3C29F6B19bcbeB85d26460bB2f7Bd4cd065cE28E/0",
      image:
        "https://nft-cdn.alchemy.com/matic-mainnet/2e664665ea294c94798de67894c608ac",
      content:
        '{"address":"0x3C29F6B19bcbeB85d26460bB2f7Bd4cd065cE28E/0","metadata":{"image":"ipfs://QmTNi5umYXWV2THy65WDUMszTdHvuQRsZ9RuUmR7GEJyFx/bear-market-builder.png","external_url":"","animation_url":"ipfs://QmTNi5umYXWV2THy65WDUMszTdHvuQRsZ9RuUmR7GEJyFx/bear-market-builder.mp4","background_color":"","name":"Bear Market Builder NFT","description":"","attributes":[{"value":"common","trait_type":"rarity"}],"supply":"98477"}}',
      styles: {
        size: "sm",
        scanLink: false,
        network: "polygon",
        type: "complex",
      },
    },
  ],
  [
    {
      type: "soundcloud track",
      title: "music",
      styles: {
        size: "sm",
      },
      url: "https://soundcloud.com/sam-walters-715497925/sets/trippy",
    },
  ],
];

export const SOCIALS_VARIATIONS = [
  {
    "com.discord": "#",
    email: "#",
    "com.twitter": "#",
    "org.telegram": "#",
    "com.whatsapp": "#",
  },
  {
    "com.twitter": "https://twitter.com/Soneiumdomains",
    "com.ylide": "",
    "com.medium": "https://medium.com/@soneiumdomains",
    "com.zealy": "https://zealy.io/c/#",
    "org.telegram": "https://t.me/Soneiumdomains",
  },
  {
    "com.soundcloud": "#",
    "com.opensea": "#",
    "com.patreon": "#",
    "com.twitter": "#",
    "com.spotify": "#",
  },
  {
    "org.telegram": "https://t.me/Soneiumdomains",
    "com.zealy": "https://zealy.io/c/#",
    "com.github": "https://github.com/sam-shariat/Soneiumdomains",
    "com.google.youtube": "#",
  },
  {
    "com.facebook": "#",
    "tv.twitch": "#",
    "com.snapchat": "#",
    "com.tiktok": "#",
  },
  {
    "com.pinterest": "#",
    "com.slack": "#",
    "com.skype": "#",
    "com.dribbble": "#",
    "com.twitter": "#",
  },
];

export const WALLETS_VARIATIONS = [
  {
    btc: "tb1qshvfpzfa0p46gztp00jwccf0c4kdfac72lmuz7",
  },
  {
    eth: "0xBFd210db795A9Ac48D0C3be2a74232BE44144E84",
  },
  {
    sol: "BfiZDeHXzuz8pz5EGM6eUv1B1hLsGJQPRoxqYsBRKW3i",
  },
  {
    arb1: "0x424c939664F9e007aaF30180fD2f1824a44334D7",
  },
  {
    trx: "TR22H7PLMm1BUaGfhmfnPY7VLEhG2U6y3t",
  },
  {
    bnb: "0xCDbab7630551d069DBdF0050E4a53D8C5ED2482b",
  },
];

export const TOUR_STEPS = [
  {
    element: ".title",
    intro: `Please provide a title for your Soneium Domains by entering your name or brand name, for example: John Doe.`,
  },
  {
    element: ".subtitle",
    intro: `Please enter a subtitle for your Soneium Domains, for example: Content Manager.`,
  },
  {
    element: ".avatar",
    intro: `Upload an avatar image for your Soneium Domains or choose one from your NFTs.`,
  },
  {
    element: ".bio",
    intro: `Please enter a short description for your Soneium Domains Profile, for example: I love Blockchain and AI/ML technologies and currently am learning how to read and write smart contracts.`,
  },
  {
    element: ".wallets",
    intro: `Your Soneium wallet address is added to your Soneium Domains, You can add your wallet addresses from another chains, for example: Ethereum, BTC, Solana and More`,
  },
  {
    element: ".links",
    intro: `Add your resources like Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: ".socials",
    intro: `Add a social media link to your Soneium Domains, for example: Twitter, Instagram, LinkedIn, Github and More`,
  },
  {
    element: ".add",
    intro: `Add your resources like wallet addresses, social media links, Headings, Texts, Links, Images, NFTs, Youtube Video, Soundcloud Track, Donate or Payment Button and More`,
  },
  {
    element: ".design",
    intro: `Design your Soneium Domains the way you like it! change the background color, customize the buttons style and font. change the layout and other settings`,
  },
  {
    element: ".save",
    intro: `Save your changes to the blockchain`,
  },
  {
    element: ".share",
    intro: `Share your Soneium Domains with the world`,
  },

  // ...
];

export const EARLY_ADOPTER_IMAGES: any = {
  explorer: {
    src: "https://ipfs.io/ipfs/QmRdewFUw4jxTWnoVMSVLyQ7WmahWUMxDrCVYEwL7TuUDq/crypto-explorer.svg",
    type: "image/svg+xml",
  },
  pioneer: {
    src: "https://ipfs.io/ipfs/QmQ98JMocRupVnixhGcVupmDdmuMxXdsq1ozPyNhskzqEh/Soneium-domains-pioneer.svg",
    type: "image/svg+xml",
  },
  family: {
    src: "https://ipfs.io/ipfs/QmSoTZi3B6FXLRVBXhsTCwfYPnWMCUHpBc6HiVrGpuBU6o/soneiumdomains-family.gif",
    type: "image/gif",
  },
  geek: {
    src: "https://ipfs.io/ipfs/QmPgY5KJ25cBmG4H4HkF6DTgxQ4gaUtzfChS8wS8EXScgH/soneiumdomains-geek.gif",
    type: "image/gif",
  },
  identorian: {
    src: "https://ipfs.io/ipfs/QmYK9CchybNS3HxrgvgxnKGHCzeRVwNZV1cmiLGf4qpx4m/identorian.svg",
    type: "image/svg+xml",
  },
  maverick: {
    src: "https://ipfs.io/ipfs/QmQt3CTiZEwDdrAW7ebSM7QX7ZLYts6nWfjfh36xB4iWM7/soneiumdomains-maverick.gif",
    type: "image/gif",
  },
  champion: {
    src: "https://ipfs.io/ipfs/QmSdjoBfigMQu2yGpMj5Fhd1xFQFYoTUVTLjUZjGcpnmee/soneiumdomains-champions.gif",
    type: "image/gif",
  },
  earlier: {
    src: "https://ipfs.io/ipfs/Qmb1huuaLMpA3JodFysEqpWc65vy4NkXfuix5mYkvaBkJE/earlier.svg",
    type: "image/svg+xml",
  },
  catalyst: {
    src: "https://ipfs.io/ipfs/QmUYe2xS43JB9d7qNB4KyU9ptGCJ9KG5bJcPj7rkdmfqxg/soneiumdomains-countdown-catalyst_nft.jpg",
    type: "image/jpeg",
  },
  spring: {
    src: "https://ipfs.io/ipfs/QmNt4zMpdSUtZ8p9ZQPWZy3U4anh9Pb6BxvUZzpFwkEWyk/soneiumdomains-springburst-nft.jpg",
    type: "image/jpeg",
  },
};

export const RAFFLE_IMAGES = [
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(4).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(12).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(39).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(58).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(80).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(119).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(139).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(153).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(192).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(197).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(204).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(230).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(260).png",
];

export const RAFFLE_IMAGES2 = [
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(3).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(11).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(38).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(57).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(79).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(118).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(138).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(152).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(191).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(196).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(203).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(229).png",
  "https://ipfs.io/ipfs/QmYroF6MGX8NfABN4Um4VZWwSD9FZRY12ujXHF7VqeJN3d/raffle%20(259).png",
];

export const SOCIAL_URLS: any = {
  twitter: "twitter.com/",
  linkedin: "linkedin.com/in/",
  github: "github.com/",
  medium: "medium.com/",
  youtube: "youtube.com/",
  instagram: "instagram.com/",
  tiktok: "tiktok.com/",
  twitch: "twitch.tv/",
  snapchat: "snapchat.com/add/",
  facebook: "facebook.com/",
  dribbble: "dribbble.com/",
  pinterest: "pinterest.com/",
  soundcloud: "soundcloud.com/",
  spotify: "open.spotify.com/user/",
  patreon: "patreon.com/",
  substack: "substack.com/",
  galxe: "galxe.com/",
  opensea: "opensea.io/",
  zealy: "zealy.io/c/",
  ylide: "hub.ylide.io/project/",
  amazon: "amazon.com/gp/profile/eampleuser/",
  playstore: "play.google.com/store/apps/developer?id=",
  appstore: "apps.apple.com/us/developer/",
  applemusic: "music.apple.com/profile/",
  clubhouse: "joinclubhouse.com/",
  etsy: "etsy.com/shop/",
  discord: "discord:",
  skype: "skype:",
  slack: "slack.com/",
  telegram: "t.me/",
  whatsapp: "wa.me/",
  phone: "tel:",
  email: "mailto:",
};
