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
  videos: true,
  artists: true,
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
  dexscreenerUrl: 'https://dexscreener.com/solana/cyncsecwzylwrx8zwq6ivj7ca6pl2csfatfi238wcqu5',
  dextoolsUrl: ''
}

// Set to empty string to disable
export const configSocials = {
  farcasterUrl: '',
  telegramUrl: 'https://t.me/CrocCat69',
  discordUrl: '',
  twitterUrl: 'https://twitter.com/croccatofficial',
  twitterHandle: '@croccatofficial',
  instagramUrl: '',
  youtubeUrl: '',
  tiktokUrl: '',
  linktreeUrl: ''
}

export const configText = {
  appName: 'croc',
  disclaimer: 'This website is for entertainment and informational purposes only, not financial or investment advice.'
}

export const configMemeMaker = {
  name: 'Meme Maker',
  urlPath: '/meme-maker.html',
  defaultImageId: 6 // 78
}

export const configPageText = {
  admin: {
    metaTitle: `${configText.appName} admin panel`,
    metaDescription: ''
  },
  adminCollection: {
    metaTitle: `${configText.appName} admin collection`,
    metaDescription: ''
  },
  art: {
    metaTitle: `${configText.appName} gallery`,
    metaDescription: ''
  },
  artist: {
    metaTitle: (artistName: string) => `${configText.appName} - ${artistName}'s artist page`,
    metaDescription: (artistName: string) => ''
  },
  artists: {
    metaTitle: `${configText.appName} artists`,
    metaDescription: ''
  },
  collection: {
    metaTitle: (collectionTitle: string) => `${configText.appName} - ${collectionTitle} collection`,
    metaDescription: (collectionTitle: string) => ''
  },
  collections: {
    metaTitle: `${configText.appName} collections`,
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
    metaTitle: `${configText.appName} resources`,
    metaDescription: ''
  },
  roadmap: {
    metaTitle: `${configText.appName} roadmap`,
    metaDescription: ''
  },
  stickers: {
    metaTitle: `${configText.appName} stickers`,
    metaDescription: ''
  },
  updateArtist: {
    metaTitle: `${configText.appName} update artist`,
    metaDescription: ''
  },
  uploadImage: {
    metaTitle: `${configText.appName} upload image`,
    metaDescription: ''
  },
  videos: {
    metaTitle: `${configText.appName} videos`,
    metaDescription: ''
  },
  whitepaper: {
    metaTitle: `${configText.appName} whitepaper`,
    metaDescription: ''
  }
}

export type ConfigStickerSet = {
  href: string
  title: string
}

export const configStickerSets: ConfigStickerSet[] = []
