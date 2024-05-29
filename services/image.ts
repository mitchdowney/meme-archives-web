import { Image, QuerySort } from '@/lib/types'
import { apiRequest } from './apiRequest'
import { configImages } from '@/lib/constants/configurables'

export type ImageVersion = 'animation' | 'border' | 'no-border' | 'preview' | 'video'
export type ImageType = 'painting' | 'meme' | 'painting-and-meme'

export const getPreferredImagePageUrl = (image: Image) => {
  if (image?.slug) {
    return `/${image.slug}`
  } else {
    return `/${image.id}`
  }
}

export const getAvailableImageUrl = (preferredVersion: ImageVersion | null, image: Image | null, showVideo?: boolean) => {
  if (!image) return ''
  const isVideo = image.has_video
  if (isVideo && !showVideo) {
    preferredVersion = 'preview'
  }
  const availableImageVersion = getAvailableImageVersion(preferredVersion, image)
  return getImageUrl(image.id, availableImageVersion)
}

export const getImageUrl = (id: number, imageVersion: ImageVersion) => {
  if (imageVersion === 'video') {
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${id}-video.mp4`
  } else if (imageVersion === 'animation') {
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${id}-animation.gif`
  } else if (imageVersion === 'no-border') {
    const imageNameEnding = configImages.useDeprecatedNoBorderImageName ? '-no-border' : ''
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${id}${imageNameEnding}.png`
  } else if (imageVersion === 'preview') {
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${id}-preview.png`
  } else {
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${id}-border.png`
  }
}

const getAvailableImageVersion = (origVersion: ImageVersion | null, image: Image) => {
  const versionMap = {
    'video': image.has_video,
    'animation': image.has_animation,
    'border': image.has_border,
    'no-border': image.has_no_border,
    'preview': true
  } as any

  if (origVersion && versionMap[origVersion]) {
    return origVersion
  }

  return (['border', 'no-border', 'animation', 'video'].find(version => versionMap[version]) || 'border') as ImageVersion
}

export const checkIfImageUrlIsVideo = (url: string) => {
  return url.endsWith('.mp4')
}

export const convertImagesToImageCardItems = (preferredVersion: ImageVersion, images: Image[]) => {
  return images?.map((image) => {
    const imageVersion = getAvailableImageVersion(preferredVersion, image)
    const imageUrl = getImageUrl(image.id, imageVersion)
    return {
      imageSrc: imageUrl,
      tags: image.tags,
      title: image.title
    }
  })
}

export const createImage = async (formData: FormData) => {
  const response = await apiRequest({
    method: 'POST',
    url: '/image',
    withCredentials: true,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response?.data
}

export const updateImage = async (id: number, formData: FormData) => {
  formData.append('id', id.toString())

  const response = await apiRequest({
    method: 'POST',
    url: '/image/update',
    withCredentials: true,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response?.data
}

export const deleteImage = async (id: number) => {
  const response = await apiRequest({
    method: 'POST',
    url: `/image/delete/${id}`,
    withCredentials: true
  })

  return response?.data
}

export const getImage = async (idOrSlug: number | string, isServerSideReq?: boolean) => {
  const response = await apiRequest({
    method: 'GET',
    url: `/image/${idOrSlug}`
  }, isServerSideReq)

  return response?.data
}

type GetImages = {
  page: number
  imageType: ImageType
  sort: QuerySort
}

export const getImages = async ({ page = 1, imageType, sort = 'random' }: GetImages) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/images',
    params: {
      page,
      imageType,
      sort
    }
  })

  return response?.data
}

type GetImagesByArtistId = {
  page: number
  artistId: number
}

export const getImagesByArtistId = async ({ page = 1, artistId }: GetImagesByArtistId) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/images/by-artist',
    params: {
      page,
      id: artistId
    }
  })

  return response?.data
}

type GetImagesWithoutArtists = {
  page: number
}

export const getImagesWithoutArtists = async ({ page = 1 }: GetImagesWithoutArtists) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/images/no-artist',
    params: {
      page
    }
  })

  return response?.data
}

type GetImagesByTagId = {
  page: number
  tagId: number,
  imageType: ImageType
}

export const getImagesByTagId = async ({ page = 1, tagId, imageType }: GetImagesByTagId) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/images/by-tag',
    params: {
      page,
      id: tagId,
      imageType
    }
  })

  return response?.data
}

type GetImagesByCollectionId = {
  page?: number
  collection_id: number
}

export const getImagesAllByCollectionId = async ({ collection_id }: GetImagesByCollectionId) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/images/by-collection/all',
    params: {
      id: collection_id
    }
  })

  return response?.data
}

export const getImagesByCollectionId = async ({ page = 1, collection_id }: GetImagesByCollectionId) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/images/by-collection',
    params: {
      page,
      id: collection_id
    }
  })

  return response?.data
}
