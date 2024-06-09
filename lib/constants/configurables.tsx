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
  memeMaker: true,
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
  defaultPreviewCropStyle: 'no-crop'
}

export const configImages = {
  useDeprecatedNoBorderImageName: false
}

// Set to empty string to disable
export const configCharts = {
  birdeyeUrl: '',
  coingeckoUrl: '',
  dexscreenerUrl: '',
  dextoolsUrl: ''
}

// Set to empty string to disable
export const configSocials = {
  farcasterUrl: '',
  telegramUrl: '',
  twitterUrl: '',
  twitterHandle: ''
}

export const configText = {
  appName: 'Daumen',
  disclaimer: 'This website is for entertainment and informational purposes only, not financial or investment advice.'
}

export const configMemeMaker = {
  name: 'Daumenizer',
  urlPath: '/daumenizer',
  defaultImageId: 78
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
    metaTitle: `${configText.appName} Gallery`,
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
    metaTitle: `${configMemeMaker.name}`,
    metaDescription: 'Make your own memes with the Daumenizer'
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
