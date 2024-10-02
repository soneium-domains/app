import axios from "axios";
import { truncAddress } from "./stringUtils";
import { IPFS_URLS, MAX_NAME_LENGTH, MIN_NAME_LENGTH, SOCIAL_URLS } from "./constants";
//import crypto from 'crypto';

const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms));
const capFirstLetter = (str: string) => {
  if (str === "") return "";
  const words = str.split(" ");
  const final = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
  return String(final);
};

const arrayRemove = (arr: any, index: number) => {
  return arr.filter((item: any, ind: number) => index !== ind && item);
};

const withHttps = (url: string) =>
  url.replace(/^(?:(.*:)?\/\/)?(.*)/i, (match, schemma, nonSchemmaUrl) =>
    schemma ? match : `https://${nonSchemmaUrl}`
  );

function isValidUsername(name: string) {
  var length = Buffer.byteLength(name);
  if (length <= MIN_NAME_LENGTH || length > MAX_NAME_LENGTH) {
    return false;
  }
  var nameAsBytes = Buffer.from(name);
  if (nameAsBytes[0] === 0x2d || nameAsBytes[length - 1] === 0x2d) {
    // starts or ends with char '-'
    return false;
  }
  for (var i = 0; i < length; i++) {
    var char = nameAsBytes[i];
    var ok =
      (char >= 0x61 && char <= 0x7a) ||
      (char >= 0x30 && char <= 0x39) ||
      char === 0x2d; // a-z0-9-
    if (!ok) {
      return false;
    }
  }
  return true;
}

function invalidUsernameMessage(name: string) {
  var length = Buffer.byteLength(name);
  if (length <= MIN_NAME_LENGTH || length > MAX_NAME_LENGTH) {
    return "Domain name must contain more than 2 letters!";
  }
  var nameAsBytes = Buffer.from(name);
  if (nameAsBytes[0] === 0x2d || nameAsBytes[length - 1] === 0x2d) {
    // starts or ends with char '-'
    return "Domain Name can not start or end with hyphen (-)";
  }
  for (var i = 0; i < length; i++) {
    var char = nameAsBytes[i];
    var ok =
      (char >= 0x61 && char <= 0x7a) ||
      (char >= 0x30 && char <= 0x39) ||
      char === 0x2d; // a-z0-9-
    if (!ok) {
      return "Domain Name can consist English letters, numbers, and hyphen (-)";
    }
  }
  return "";
}

const isValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function isValidSignHash(signature: string, date: number) {
  // const verifier = crypto.createVerify('sha256');
  // // console.log(signature,publicKey,data)
  // verifier.update(data);
  // const isValid = verifier.verify(publicKey, signature, 'base64');
  if (signature.length !== 88) {
    return false;
  }
  //// console.log(Date.now() - date)
  if (Date.now() - date < 172800000) {
    return true;
  } else {
    return false;
  }
}


function base64ToBlob(
  b64Data: string,
  contentType: string,
  sliceSize?: number
) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  // console.log(byteArrays);

  return new File(byteArrays, "vid", { type: contentType });
}

const getColor = (variant: string, buttonBg: string, lightMode: boolean) => {
  if (variant === "solid") {
    if (lightMode) {
      if (
        buttonBg === "light" ||
        buttonBg === "gray" ||
        buttonBg === "yellow" ||
        buttonBg === "cyan"
      ) {
        return "dark.800";
      } else {
        return "white";
      }
    } else {
      if (buttonBg === "light") {
        return "dark.800";
      } else if (buttonBg === "dark") {
        return "white";
      } else if (buttonBg === "gray") {
        return "white";
      } else {
        return "gray.800";
      }
    }
  }

  if (variant === "outline") {
    if (lightMode) {
      if (buttonBg === "light") {
        return "white";
      } else if (buttonBg === "dark") {
        return "gray.800";
      } else if (buttonBg === "gray") {
        return "gray.600";
      } else {
        return `${buttonBg}.600`;
      }
    } else {
      if (buttonBg === "light") {
        return "white";
      } else if (buttonBg === "dark") {
        return `${buttonBg}.300`;
      } else if (buttonBg === "gray") {
        return "gray.600";
      } else {
        return `${buttonBg}.300`;
      }
    }
  }

  if (variant === "pop") {
    if (lightMode) {
      if (
        buttonBg === "light" ||
        buttonBg === "yellow" ||
        buttonBg === "cyan"
      ) {
        return "gray.800";
      } else {
        return "white";
      }
    } else {
      if (buttonBg === "light") {
        return "gray.800";
      } else if (buttonBg === "dark") {
        return "white";
      } else if (buttonBg === "gray") {
        return "gray.800";
      } else {
        return "gray.800";
      }
    }
  }

  if (variant === "border" || variant === "border2") {
    if (lightMode) {
      if (buttonBg === "dark") {
        return "white";
      } else {
        return "black";
      }
    } else {
      if (buttonBg === "light") {
        return "gray.800";
      } else if (buttonBg === "dark") {
        return "white";
      } else if (buttonBg === "gray") {
        return "gray.800";
      } else {
        return "gray.800";
      }
    }
  }

  if (variant === "fill") {
    if (lightMode) {
      if (buttonBg === "light") {
        return "white";
      } else if (buttonBg === "dark") {
        return "gray.800";
      } else if (buttonBg === "gray") {
        return "gray.800";
      } else {
        return `${buttonBg}.600`;
      }
    } else {
      if (buttonBg === "light") {
        return "white";
      } else if (buttonBg === "dark") {
        return `${buttonBg}.300`;
      } else if (buttonBg === "gray") {
        return "gray.600";
      } else {
        return `${buttonBg}.300`;
      }
    }
  }
};

const getIconColor = (lightMode: boolean) => {
  if (lightMode) {
    return "var(--chakra-colors-gray-800)";
  } else {
    return "white";
  }
};

export function arraysEqual(a: any[], b: any[]) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const getIconInButtonColor = (
  variant: string,
  buttonBg: string,
  lightMode: boolean
) => {
  let color = getColor(variant, buttonBg, lightMode);
  //// console.log(color);
  if (color === undefined) return undefined;
  let colorString = "var(--chakra-colors-" + color.replace(".", "-") + ")";
  //// console.log(colorString);
  return colorString;
};

const getUrl = (type: string, url: string): string => {
  switch (type) {
    case "email":
    case "phone":
    case "skype":
      return url.includes(SOCIAL_URLS[type]) ? url : SOCIAL_URLS[type] + url;

    case "substack":
    case "slack":
      return url.includes(SOCIAL_URLS[type].slice(0, -1))
        ? withHttps(url)
        : withHttps(url + "." + SOCIAL_URLS[type]);

    default:
      return url.includes(SOCIAL_URLS[type].slice(0, -1))
        ? withHttps(url)
        : withHttps(SOCIAL_URLS[type] + url);
  }
};

const getRandomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const openWindow = (url: string, e: any) => {
  window.open(url, "newwindow", "width=420,height=800");
  e !== null && e.preventDefault();
};

const arrayRemoveDuplicates = (arr: any) => {
  const unique = arr.filter((obj: any, index: number) => {
    return index === arr.findIndex((o: any) => obj.name === o.name);
  });

  return unique;
};

const sumUint128 = (a: any, b: any) => {
  const maxSafeInteger = Number.MAX_SAFE_INTEGER;

  // Convert the input numbers to arrays of digits
  const digitsA = Array.from(String(a), Number);
  const digitsB = Array.from(String(b), Number);

  // Pad the shorter number with leading zeros
  const maxLength = Math.max(digitsA.length, digitsB.length);
  while (digitsA.length < maxLength) {
    digitsA.unshift(0);
  }
  while (digitsB.length < maxLength) {
    digitsB.unshift(0);
  }

  let carry = 0;
  const sum = [];

  // Perform the addition digit by digit
  for (let i = maxLength - 1; i >= 0; i--) {
    const digitSum = digitsA[i] + digitsB[i] + carry;
    const digit = digitSum % 10;
    carry = Math.floor(digitSum / 10);
    sum.unshift(digit);
  }

  // Add the remaining carry if any
  if (carry > 0) {
    sum.unshift(carry);
  }

  // Convert the array of digits back to a string
  const result = sum.join("");

  // Check if the result exceeds the safe integer range
  if (result.length > 15 || Number(result) > maxSafeInteger) {
    throw new Error("Sum exceeds the safe integer range");
  }

  return Number(result);
};

const getCurrentDateUnix = () => Math.floor(Date.now() / 1000);

const formatDateDifference = (unix: number): string => {
  const now = new Date();
  const diff = unix * 1000 - now.getTime();

  const units: { label: string; duration: number }[] = [
    { label: "year", duration: 1000 * 60 * 60 * 24 * 365 },
    { label: "month", duration: 1000 * 60 * 60 * 24 * 30 },
    { label: "day", duration: 1000 * 60 * 60 * 24 },
    { label: "hour", duration: 1000 * 60 * 60 },
    { label: "minute", duration: 1000 * 60 },
  ];

  for (const unit of units) {
    const value = Math.floor(diff / unit.duration);
    if (value > 0) {
      return value > 1 ? `${value} ${unit.label}s` : `about a ${unit.label}`;
    }
  }

  return "just now";
};

function getMimeType(url: string) {
  // Return 'unknown' if the URL is null or undefined
  if (!url) {
    return "unknown";
  }

  // Define common MIME types for images and videos
  const mimeTypes: any = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    bmp: "image/bmp",
    tiff: "image/tiff",
    mp4: "video/mp4",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    webm: "video/webm",
    mkv: "video/x-matroska",
    flv: "video/x-flv",
    wmv: "video/x-ms-wmv",
  };

  // Extract the file extension from the URL
  const extension = url.split(".").pop()?.split("?")[0].toLowerCase() 

  // Return the corresponding MIME type or 'unknown' if not found
  return mimeTypes[extension!] || "unknown";
}

function checkGradientBrightness(input: string) {
  // Regular expression to match hex color codes
  const hexColorRegex: any = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/g;

  // Regular expression to match rgb color values
  const rgbColorRegex: any = /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)/g;

  // Check if the input is a solid hex color
  const isSolidColor = input.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
  if (isSolidColor) {
    const brightness = getBrightnessFromHex(isSolidColor[0]);
    return brightness > 186 ? "light" : "dark";
  }

  // Extract hex color codes from the gradient string
  const hexColors: any = input.match(hexColorRegex) || [];
  // @ts-ignore
  const rgbColors: any = [...input.matchAll(rgbColorRegex)];

  // @ts-ignore
  rgbColors.forEach(match => {
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    const rgbHex: any = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    hexColors.push(rgbHex);
  });

  // @ts-ignore
  const brightnessValues = hexColors.map(color => getBrightnessFromHex(color));

  // @ts-ignore
  const averageBrightness = brightnessValues.reduce((a, b) => a + b, 0) / brightnessValues.length;

  // Determine if the average brightness is light or dark
  return averageBrightness > 186 ? "light" : "dark";
}

// Function to calculate brightness from a hex color
function getBrightnessFromHex(hex: string): number {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');
  // Parse the r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Calculate brightness
  return (r * 0.299 + g * 0.587 + b * 0.114);
}

function generateColorVariations(baseColor: string): string[] {
  const hexToRgb = (hex: string) => hex.match(/\w\w/g)!.map(h => parseInt(h, 16));
  const rgbToHsl = ([r, g, b]: number[]) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h: number, s: number, l = (max + min) / 2;

    if (max === min) h = s = 0;
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  const hslToRgb = (h: number, s: number, l: number): number[] => {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
      return Math.round(color * 255);
    };
    return [f(0), f(8), f(4)];
  };

  const rgb = hexToRgb(baseColor);
  const [h, s, l] = rgbToHsl(rgb);
  return [
    `#${hslToRgb(h, s * 0.8, l * 0.6).map(c => c.toString(16).padStart(2, '0')).join('')}`,
    `#${hslToRgb(h, s * 0.5, l * 0.4).map(c => c.toString(16).padStart(2, '0')).join('')}`,
    `#${hslToRgb(h, s, l * 1.55).map(c => c.toString(16).padStart(2, '0')).join('')}`
  ];
}


const ipfsCheckedUrl = (url :string) => {
  return url.includes('ipfs://') ? IPFS_URLS[0] + url.slice(7) : url
}

const detectTextChanges = (oldProfileData: any, newProfileData: any) => {
  let changedRecords: { key: string; value: string }[] = [];
  let deletedRecords: string[] = [];
  // Compare all individual fields, including structure from `getProfileJson`

  // Compare individual fields in the profile
  if (oldProfileData.name !== newProfileData.name) {
    changedRecords.push({ key: "name", value: newProfileData.name });
  }

  if (oldProfileData.title !== newProfileData.title) {
    changedRecords.push({ key: "display", value: newProfileData.title });
  }

  if (oldProfileData.subtitle !== newProfileData.subtitle) {
    changedRecords.push({ key: "location", value: newProfileData.subtitle });
  }

  if (oldProfileData.bio !== newProfileData.bio) {
    changedRecords.push({ key: "description", value: newProfileData.bio });
  }

  if (oldProfileData.avatar !== newProfileData.avatar) {
    changedRecords.push({ key: "avatar", value: newProfileData.avatar });
  }

  if (JSON.stringify(oldProfileData.styles) !== JSON.stringify(newProfileData.styles)) {
    changedRecords.push({ key: "styles", value: JSON.stringify(newProfileData.styles) });
  }

  // Compare wallets (oldProfileData.wallets is an object, newProfileData.wallets is also an object)
  Object.keys(newProfileData.wallets).forEach((key) => {
    if (oldProfileData.wallets[key] !== newProfileData.wallets[key]) {
      changedRecords.push({ key, value: newProfileData.wallets[key] });
    }
  });

  // Detect deleted wallets
  Object.keys(oldProfileData.wallets).forEach((key) => {
    if (!newProfileData.wallets[key]) {
      deletedRecords.push(key);
    }
  });

  // Compare socials (oldProfileData.socials and newProfileData.socials are both objects)
  Object.keys(newProfileData.socials).forEach((key) => {
    if (oldProfileData.socials[key] !== newProfileData.socials[key]) {
      changedRecords.push({ key, value: newProfileData.socials[key] });
    }
  });

  // Detect deleted socials
  Object.keys(oldProfileData.socials).forEach((key) => {
    if (!newProfileData.socials[key]) {
      deletedRecords.push(key);
    }
  });

  // Compare links (oldProfileData.links is an array, newProfileData.links is also an array)
  const typeCounter: { [key: string]: number } = {};
  newProfileData.links.forEach((link: any, index: number) => {
    const oldLink = oldProfileData.links[index];
    typeCounter[link.type] = (typeCounter[link.type] || 0) + 1;
    if (!oldLink || JSON.stringify(link) !== JSON.stringify(oldLink)) {
      changedRecords.push({
        key: `${link.type.replace(" ", ".")}.${typeCounter[link.type]}`,
        value: JSON.stringify(link),
      });
    }
  });

  // Detect deleted links
  oldProfileData.links.forEach((oldLink: any, index: number) => {
    if (!newProfileData.links[index]) {
      deletedRecords.push(oldLink.type);
    }
  });

  return { changedRecords, deletedRecords };
};

const detectCoinChanges = (oldCoins: any, newCoins: any) => {
  let changedCoins: { coin: string; value: string }[] = [];
  let deletedCoins: string[] = [];

  // Check for changed or new coins
  Object.keys(newCoins).forEach((key) => {
    if (oldCoins[key] !== newCoins[key]) {
      changedCoins.push({ coin: key, value: newCoins[key] });
    }
  });

  // Check for deleted coins
  Object.keys(oldCoins).forEach((key) => {
    if (!newCoins[key]) {
      deletedCoins.push(key);
    }
  });

  return { changedCoins, deletedCoins };
};

function getColorSchemeName(color: string): string {
  // Predefined color values in RGB format
  const colors : any = {
    dark: { r: 0, g: 0, b: 0 },         // Previously Black
    light: { r: 255, g: 255, b: 255 },   // Previously White
    gray: { r: 128, g: 128, b: 128 },
    red: { r: 255, g: 0, b: 0 },
    orange: { r: 255, g: 165, b: 0 },
    yellow: { r: 255, g: 255, b: 0 },
    green: { r: 0, g: 128, b: 0 },
    teal: { r: 0, g: 128, b: 128 },
    blue: { r: 0, g: 0, b: 255 },
    cyan: { r: 0, g: 255, b: 255 },
    purple: { r: 128, g: 0, b: 128 },
    pink: { r: 255, g: 192, b: 203 },
  };

  // Function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    // Remove # if present
    hex = hex.replace(/^#/, "");

    // Parse the string into the R, G, B values
    let bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  // Function to parse RGB from a string like "rgb(r, g, b)"
  const parseRgb = (rgb: string) => {
    const result = rgb
      .replace(/[^\d,]/g, "")
      .split(",")
      .map(Number);
    return {
      r: result[0],
      g: result[1],
      b: result[2],
    };
  };

  // Function to calculate color distance between two RGB colors
  const colorDistance = (rgb1: any, rgb2: any) => {
    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
  };

  // Determine if the input is hex or rgb and convert accordingly
  let inputColor: any;
  if (color.startsWith("#")) {
    inputColor = hexToRgb(color);
  } else if (color.startsWith("rgb")) {
    inputColor = parseRgb(color);
  } else {
    
    return color; // Invalid color format, return the input as is
  }

  // Compare the input color to each predefined color and find the closest match
  let closestColor = "";
  let minDistance = Infinity;

  Object.keys(colors).forEach((colorName) => {
    const distance = colorDistance(inputColor, colors[colorName]);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = colorName;
    }
  });

  return closestColor;
}


export {
  getColorSchemeName,
  detectCoinChanges,
  detectTextChanges,
  ipfsCheckedUrl,
  generateColorVariations,
  getBrightnessFromHex,
  checkGradientBrightness,
  getMimeType,
  formatDateDifference,
  withHttps,
  getCurrentDateUnix,
  base64ToBlob,
  truncAddress,
  sleep,
  isValidEmail,
  capFirstLetter,
  getUrl,
  arrayRemove,
  arrayRemoveDuplicates,
  isValidUsername,
  invalidUsernameMessage,
  getColor,
  getIconColor,
  getIconInButtonColor,
  getRandomNumber,
  isValidSignHash,
  openWindow,
  sumUint128,
};
