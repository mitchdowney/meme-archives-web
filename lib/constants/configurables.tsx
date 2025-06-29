//
// Replace the images in the /public/images folder with your own images
//

type PageRules = {
  gallery: boolean
  memes: boolean
  videos: boolean
  artists: boolean
  collections: boolean
  stickers: boolean
  whitepaper: boolean
  roadmap: boolean
  resources: boolean
  memeMaker: boolean
  admin: boolean
  homePageIsGallery: boolean
  disableImageTypes: boolean
  disableFilterSelectors: boolean
  centerViewTypeSelector: boolean
  disableBorderImages: boolean
  allowPreviewBorderImages: boolean
  defaultPreviewCropStyle: 'top' | 'middle' | 'bottom' | 'no-crop'
}

export const pageRules: PageRules = {
  // Enable or disable pages 
  gallery: true,
  memes: false,
  videos: false,
  artists: true,
  collections: false,
  stickers: false,
  whitepaper: true,
  roadmap: true,
  resources: true,
  memeMaker: true,
  admin: true,
  // If you'd like the home page to load the gallery instead of the splash page,
  // set homePageIsGallery to true, and rename the pages/art.tsx file to pages/index.tsx.
  homePageIsGallery: false,
  // Hide the image type dropdown filter in the gallery
  disableImageTypes: true,
  // Hide the radio buttons under the search bar
  disableFilterSelectors: true,
  // Hide all of the other buttons and center the ViewTypeSelector under the search bar
  centerViewTypeSelector: true,
  // Prevent border images from being uploaded or displayed
  disableBorderImages: false,
  // Allow the preview border images to be uploaded
  allowPreviewBorderImages: false,
  // Set the default preview crop style
  defaultPreviewCropStyle: 'middle'
}

export const configImages = {
  useDeprecatedNoBorderImageName: true
}

// Set to empty string to disable
export const configCharts = {
  birdeyeUrl: '',
  coingeckoUrl: '',
  dexscreenerUrl: 'https://dexscreener.com/solana/8x9c5qa4nvakKo5wHPbPa5xvTVMKmS26w4DRpCQLCLk3',
  dextoolsUrl: ''
}

// Set to empty string to disable
export const configSocials = {
  farcasterUrl: '',
  telegramUrl: 'https://t.co/OjMn6rdbaU',
  discordUrl: '',
  twitterUrl: 'https://twitter.com/mspaintsol',
  twitterHandle: '@mspaintsol',
  instagramUrl: '',
  youtubeUrl: '',
  tiktokUrl: '',
  linktreeUrl: ''
}

export const configText = {
  appName: '$PAINT',
  disclaimer: 'This website is for entertainment and informational purposes only, not financial or investment advice. \$PAINT, this website, and its related social media accounts are not affiliated with, sponsored by, or endorsed by Microsoft.'
}

export const configMemeMaker = {
  name: 'Meme Maker',
  urlPath: '/meme-maker.html',
  defaultImageId: 6 // 78
}

export const configPageText = {
  admin: {
    metaTitle: `${configText.appName} - Admin Panel`,
    metaDescription: ''
  },
  adminCollection: {
    metaTitle: `${configText.appName} - Admin Collection`,
    metaDescription: ''
  },
  art: {
    metaTitle: `${configText.appName} - Art Gallery`,
    metaDescription: ''
  },
  artist: {
    metaTitle: (artistName: string) => `${configText.appName} - ${artistName}'s artist page`,
    metaDescription: (artistName: string) => ''
  },
  artists: {
    metaTitle: `${configText.appName} - Artists`,
    metaDescription: ''
  },
  collection: {
    metaTitle: (collectionTitle: string) => `${configText.appName} - ${collectionTitle} collection`,
    metaDescription: (collectionTitle: string) => ''
  },
  collections: {
    metaTitle: `${configText.appName} - Collections`,
    metaDescription: ''
  },
  home: {
    metaTitle: `${configText.appName} community `,
    metaDescription: ''
  },
  memeMaker: {
    metaTitle: `${configText.appName} - ${configMemeMaker.name}`,
    metaDescription: ''
  },
  resources: {
    metaTitle: `${configText.appName} - Resources`,
    metaDescription: ''
  },
  roadmap: {
    metaTitle: `${configText.appName} - Roadmap`,
    metaDescription: ''
  },
  stickers: {
    metaTitle: `${configText.appName} - Stickers`,
    metaDescription: ''
  },
  updateArtist: {
    metaTitle: `${configText.appName} - Update Artist`,
    metaDescription: ''
  },
  uploadImage: {
    metaTitle: `${configText.appName} - Upload Image`,
    metaDescription: ''
  },
  videos: {
    metaTitle: `${configText.appName} - Videos`,
    metaDescription: ''
  },
  whitepaper: {
    metaTitle: `${configText.appName} - Whitepaper`,
    metaDescription: ''
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
