//
// Replace the images in the /public/images folder with your own images
//

type PageRules = {
  gallery: boolean
  memes: boolean
  artists: boolean
  collections: boolean
  stickers: boolean
  whitepaper: boolean
  roadmap: boolean
  resources: boolean
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
  artists: true,
  collections: false,
  stickers: false,
  whitepaper: false,
  roadmap: false,
  resources: false,
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
  appName: 'Daumen Gallery',
  disclaimer: 'This website is for entertainment and informational purposes only, not financial or investment advice.'
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
    metaDescription: (artistName: string) => `by ${artistName}`
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

export const configStickerSets: ConfigStickerSet[] = []
