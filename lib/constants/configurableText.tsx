export const configText = {
  charts: {
    birdeyeUrl: 'https://birdeye.so/token/8x9c5qa4nvakKo5wHPbPa5xvTVMKmS26w4DRpCQLCLk3?chain=solana',
    coingeckoUrl: 'https://www.coingecko.com/en/coins/ms-paint/usd',
    dexscreenerUrl: 'https://dexscreener.com/solana/8x9c5qa4nvakKo5wHPbPa5xvTVMKmS26w4DRpCQLCLk3',
    dextoolsUrl: 'https://www.dextools.io/app/en/solana/pair-explorer/NniGZMgEpXL9jTmEATcKMxUbmH5cSNALngJKAQLTXzB'
  },
  socials: {
    farcasterUrl: 'https://warpcast.com/paintsol',
    telegramUrl: 'https://t.co/OjMn6rdbaU',
    twitterUrl: 'https://twitter.com/mspaintsol',
    twitterHandle: '@mspaintsol'
  },
  text: {
    appName: '$PAINT',
    disclaimer: 'This website is for entertainment and informational purposes only, not financial or investment advice. \$PAINT, this website, and its related social media accounts are not affiliated with, sponsored by, or endorsed by Microsoft.'
  }
}

export const configPageText = {
  admin: {
    metaTitle: `${configText.text.appName} - Admin Panel`,
    metaDescription: `The ${configText.text.appName} Admin Panel`
  },
  adminCollection: {
    metaTitle: `${configText.text.appName} - Admin Collection`,
    metaDescription: `The ${configText.text.appName} Admin Collection page`
  },
  art: {
    metaTitle: `${configText.text.appName} - Art Gallery`,
    metaDescription: `The ${configText.text.appName} art gallery. Showcasing the art of the ${configText.text.appName} community.`
  },
  artist: {
    metaTitle: (artistName: string) => `${configText.text.appName} - ${artistName}`,
    metaDescription: (artistName: string) => `Paintings by ${artistName}`
  },
  artists: {
    metaTitle: `${configText.text.appName} - Artists`,
    metaDescription: `The ${configText.text.appName} community artists page.`
  },
  collection: {
    metaTitle: (collectionTitle: string) => `${configText.text.appName} - Collection - ${collectionTitle}`,
    metaDescription: (collectionTitle: string) => `The ${collectionTitle} collection on the ${configText.text.appName} community website.`
  },
  collections: {
    metaTitle: `${configText.text.appName} - Collections`,
    metaDescription: `Collections by the ${configText.text.appName} community.`
  },
  home: {
    metaTitle: `${configText.text.appName}`,
    metaDescription: `${configText.text.appName}`
  },
  resources: {
    metaTitle: `${configText.text.appName} - Resources`,
    metaDescription: `Resources for ${configText.text.appName}.`
  },
  roadmap: {
    metaTitle: `${configText.text.appName} - Roadmap`,
    metaDescription: `The ${configText.text.appName} roadmap.`
  },
  stickers: {
    metaTitle: `${configText.text.appName} - Stickers`,
    metaDescription: `Sticker sets by the ${configText.text.appName} community.`
  },
  updateArtist: {
    metaTitle: `${configText.text.appName} - Update Artist`,
    metaDescription: `The ${configText.text.appName} Update Artist page`
  },
  uploadImage: {
    metaTitle: `${configText.text.appName} - Upload Image`,
    metaDescription: `The ${configText.text.appName} Upload Image page`
  },
  whitepaper: {
    metaTitle: `${configText.text.appName} - Whitepaper`,
    metaDescription: `The ${configText.text.appName} whitepaper`
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