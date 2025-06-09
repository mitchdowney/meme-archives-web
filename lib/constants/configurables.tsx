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
  defaultPreviewCropStyle: 'top' | 'middle' | 'bottom' | 'no-crop'
}

export const pageRules: PageRules = {
  // Enable or disable pages 
  gallery: true,
  memes: false,
  videos: false,
  artists: false,
  collections: false,
  stickers: false,
  whitepaper: false,
  roadmap: false,
  resources: false,
  memeMaker: false,
  admin: true,
  // If you'd like the home page to load the gallery instead of the splash page,
  // set homePageIsGallery to true, and rename the pages/art.tsx file to pages/index.tsx.
  homePageIsGallery: true,
  // Hide the image type dropdown filter in the gallery
  disableImageTypes: true,
  // Hide the radio buttons under the search bar
  disableFilterSelectors: true,
  // Hide all of the other buttons and center the ViewTypeSelector under the search bar
  centerViewTypeSelector: true,
  // Prevent border images from being uploaded or displayed
  disableBorderImages: true,
  // Set the default preview crop style
  defaultPreviewCropStyle: 'middle'
}

export const configImages = {
  useDeprecatedNoBorderImageName: false
}

// Set to empty string to disable
export const configCharts = {
  birdeyeUrl: '',
  coingeckoUrl: '',
  dexscreenerUrl: 'https://dexscreener.com/solana/4d1ldienf5rktjivgbvfbbuw4kpcnpyprpnnjk1at8z2',
  dextoolsUrl: ''
}

// Set to empty string to disable
export const configSocials = {
  farcasterUrl: '',
  telegramUrl: 'https://t.me/DANKCTO3',
  discordUrl: 'https://discord.com/invite/eFd5Sff7zM',
  twitterUrl: 'https://twitter.com/DANKMEMESCTO333',
  twitterHandle: '@DANKMEMESCTO333',
  instagramUrl: 'https://www.instagram.com/dankmemessolana/',
  youtubeUrl: 'https://www.youtube.com/@DANKMEMESCTO333',
  tiktokUrl: 'https://www.tiktok.com/@dank_memes_on_sol',
  linktreeUrl: ''
}

export const configText = {
  appName: 'Dank Memes Gallery',
  disclaimer: 'This website is for entertainment purposes only, not financial or investment advice.'
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
    metaTitle: `${configText.appName}`,
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

export const configStickerSets: ConfigStickerSet[] = []
