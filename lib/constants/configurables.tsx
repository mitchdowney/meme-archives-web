//
// Replace the images in the /public/images folder with your own images
//

// Enable or disable pages 
export const pageRules = {
  gallery: true,
  memes: true,
  artists: true,
  collections: true,
  stickers: true,
  whitepaper: true,
  roadmap: true,
  resources: false,
  admin: true,
  // If you'd like the home page to load the gallery instead of the splash page,
  // set homePageIsGallery to true, and rename the pages/art.tsx file to pages/index.tsx.
  homePageIsGallery: false,
  // This will hide the image type dropdown filter in the gallery
  disableImageTypes: false,
  // This will hide the radio buttons under the search bar
  disableFilterSelectors: false,
  // This will hide all of the other buttons
  // and center the ViewTypeSelector under the search bar
  centerViewTypeSelector: false
}

// Set to empty string to disable
export const configCharts = {
  birdeyeUrl: 'https://birdeye.so/token/8x9c5qa4nvakKo5wHPbPa5xvTVMKmS26w4DRpCQLCLk3?chain=solana',
  coingeckoUrl: 'https://www.coingecko.com/en/coins/ms-paint/usd',
  dexscreenerUrl: 'https://dexscreener.com/solana/8x9c5qa4nvakKo5wHPbPa5xvTVMKmS26w4DRpCQLCLk3',
  dextoolsUrl: 'https://www.dextools.io/app/en/solana/pair-explorer/NniGZMgEpXL9jTmEATcKMxUbmH5cSNALngJKAQLTXzB'
}

// Set to empty string to disable
export const configSocials = {
  farcasterUrl: 'https://warpcast.com/paintsol',
  telegramUrl: 'https://t.co/OjMn6rdbaU',
  twitterUrl: 'https://twitter.com/mspaintsol',
  twitterHandle: '@mspaintsol'
}

export const configText = {
  appName: '$PAINT',
  disclaimer: 'This website is for entertainment and informational purposes only, not financial or investment advice. \$PAINT, this website, and its related social media accounts are not affiliated with, sponsored by, or endorsed by Microsoft.'
}

export const configPageText = {
  admin: {
    metaTitle: `${configText.appName} - Admin Panel`,
    metaDescription: `The ${configText.appName} Admin Panel`
  },
  adminCollection: {
    metaTitle: `${configText.appName} - Admin Collection`,
    metaDescription: `The ${configText.appName} Admin Collection page`
  },
  art: {
    metaTitle: `${configText.appName} - Art Gallery`,
    metaDescription: `The ${configText.appName} art gallery. Showcasing the art of the ${configText.appName} community.`
  },
  artist: {
    metaTitle: (artistName: string) => `${configText.appName} - ${artistName}`,
    metaDescription: (artistName: string) => `Paintings by ${artistName}`
  },
  artists: {
    metaTitle: `${configText.appName} - Artists`,
    metaDescription: `The ${configText.appName} community artists page.`
  },
  collection: {
    metaTitle: (collectionTitle: string) => `${configText.appName} - Collection - ${collectionTitle}`,
    metaDescription: (collectionTitle: string) => `The ${collectionTitle} collection on the ${configText.appName} community website.`
  },
  collections: {
    metaTitle: `${configText.appName} - Collections`,
    metaDescription: `Collections by the ${configText.appName} community.`
  },
  home: {
    metaTitle: `${configText.appName}`,
    metaDescription: `${configText.appName}`
  },
  resources: {
    metaTitle: `${configText.appName} - Resources`,
    metaDescription: `Resources for ${configText.appName}.`
  },
  roadmap: {
    metaTitle: `${configText.appName} - Roadmap`,
    metaDescription: `The ${configText.appName} roadmap.`
  },
  stickers: {
    metaTitle: `${configText.appName} - Stickers`,
    metaDescription: `Sticker sets by the ${configText.appName} community.`
  },
  updateArtist: {
    metaTitle: `${configText.appName} - Update Artist`,
    metaDescription: `The ${configText.appName} Update Artist page`
  },
  uploadImage: {
    metaTitle: `${configText.appName} - Upload Image`,
    metaDescription: `The ${configText.appName} Upload Image page`
  },
  whitepaper: {
    metaTitle: `${configText.appName} - Whitepaper`,
    metaDescription: `The ${configText.appName} whitepaper`
  }
}

export type ConfigStickerSet = {
  href: string
  title: string
}

export const configStickerSets: ConfigStickerSet[] = [
  {
    href: 'https://t.me/addstickers/PAINTmojiPACK',
    title: '$PAINT-mojis'
  },
  {
    href: 'https://t.me/addstickers/TICKERISPAINT',
    title: '$PAINT Set #1'
  },
  {
    href: 'https://t.me/addstickers/TICKERISPAINT2',
    title: '$PAINT Set #2'
  },
  {
    href: 'https://t.me/addstickers/TICKERISPAINT3',
    title: '$PAINT Set #3'
  },
  {
    href: 'https://t.me/addstickers/TICKERISPAINT4',
    title: '$PAINT Set #4'
  },
  {
    href: 'https://t.me/addstickers/TICKERISPAINT5',
    title: '$PAINT Set #5'
  },
  {
    href: 'https://t.me/addstickers/AnnoyingPaintPack',
    title: 'Annoying $PAINT Pack'
  },
  {
    href: 'https://t.me/addstickers/PAINTHASLEGS',
    title: '$PAINT Has Legs'
  }
]
