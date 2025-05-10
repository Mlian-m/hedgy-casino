// src\constants.ts
import { PublicKey } from "@solana/web3.js";

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │          PLATFORM FEES               │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

// Creator fee (in %)
export const PLATFORM_CREATOR_FEE = 0.05; // 5% !!max 5%!!

// Jackpot fee (in %)
export const PLATFORM_JACKPOT_FEE = 0.01; // 0.1%

// Referral fee (in %)
export const PLATFORM_REFERRAL_FEE = 0.0025; // 0.25%

// Toggle live toast events - (true = on, false = off)
export const LIVE_EVENT_TOAST = true;

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │          FOOTER LINKS                │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

// export const FOOTER_LINKS = [
//   {
//     href: "https://github.com/BankkRoll/Gamba-V2-Next.js",
//     title: "👨‍💻 Build your own",
//   },
//   {
//     href: "https://explorer.gamba.so/create",
//     title: "🚀 Create Pool",
//   },
//   {
//     href: "https://gamba.so/docs",
//     title: "📖 Gamba Docs",
//   },
//   {
//     href: "https://discord.com/invite/HSTtFFwR",
//     title: "💬 Join Discord",
//   },
// ];

// export const FOOTER_TWITTER_LINK = {
//   href: "https://twitter.com/bankkroll_eth",
//   title: "© 2024 Template made with ❤️ by Bankk",
// };

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │          METATAGS (SEO)              │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

export const BASE_SEO_CONFIG = {
  defaultTitle: "Double It Or Go Home",
  description:
    "The DIOGH is a decentralized casino on the Solana blockchain.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dioghgame.netlify.app/",
    title: "Double It Or Go Home",
    description:
      "The DIOGH is a decentralized casino on the Solana blockchain.",
    images: [
      {
        url: "https://dioghgame.netlify.app/seo.png",
        alt: "Double It Or Go Home",
      },
    ],
    site_name: "Double It Or Go Home",
  },
  twitter: {
    cardType: "summary_large_image",
    site: "https://x.com/DoublItOrGoHome",
    handle: "@oublItOrGoHome",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content: "casino, gaming, rewards, gambling, entertainment",
    },
    {
      name: "theme-color",
      content: "#000000",
    },
  ],
};

/******************************************
 * ┌──────────────────────────────────────┐ *
 * │      SUPPORTED PLATFORM TOKENS       │ *
 * └──────────────────────────────────────┘ *
 ******************************************/

export const TOKENLIST = [
  // DIOGH
  {
    mint: new PublicKey("CnJzTPbjFzpo5ogNPwRFjt2ade8s2NoBfJVhrFAt31X9"),
    name: "Double It Or Go Home",
    symbol: "DIOGH",
    image:
      "https://ipfs.io/ipfs/QmYvNuiuYqQEtDJV3VeoTAmnpFYoi6E2s8hGChJqRGFYyv",
    decimals: 6,
    baseWager: 100e6,
  },
  // SOL
  {
    mint: new PublicKey("So11111111111111111111111111111111111111112"),
    name: "Solana",
    symbol: "SOL",
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    decimals: 9,
    baseWager: 0.01e9,
  },
  // USDC
  {
    mint: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    name: "USD Coin",
    symbol: "USDC",
    image:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    decimals: 9,
    baseWager: 0.01e9,
  },


  // Add New Public pool
  // {
  //   mint: new PublicKey(""),
  //   name: "",
  //   symbol: "",
  //   image: "",
  //   decimals: 0,
  //   baseWager: 0,
  // },

  // Add New Private pool
  // {
  //   mint: new PublicKey(""),
  //   poolAuthority: new PublicKey(""), // REQUIRED FOR PRIVATE POOLS ONLY
  //   name: "",
  //   symbol: "",
  //   image: "",
  //   decimals: 0,
  //   baseWager: 0,
  // },
];
