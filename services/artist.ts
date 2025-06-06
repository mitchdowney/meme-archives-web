import { Artist } from '@/lib/types'
import { apiRequest } from './apiRequest'

export type ArtistProfilePictureVersion = 'original' | 'preview'

export const getAllArtists = async () => {
  const response = await apiRequest({
    method: 'GET',
    url: '/artists/all'
  })

  return response?.data as Artist[]
}

export const getAllArtistsWithImages = async (isServerSideReq?: boolean) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/artists/all-with-images'
  }, isServerSideReq)

  return response?.data as Artist[]
}

type GetArtists = {
  page: number
}

export const getArtists = async ({ page }: GetArtists, isServerSideReq?: boolean) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/artists',
    params: {
      page
    }
  }, isServerSideReq)

  return response?.data
}

export const getArtist = async (idOrSlug: number | string, isServerSideReq?: boolean) => {
  const response = await apiRequest({
    method: 'GET',
    url: `/artist/${idOrSlug}`
  }, isServerSideReq)

  return response?.data as Artist
}


export const getArtistProfilePictureUrl = (id: number, artistVersion: ArtistProfilePictureVersion) => {
  if (artistVersion === 'preview') {
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/artists/${id}-preview.png`
  } else if (artistVersion === 'original') {
    return `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/artists/${id}-original.png`
  } else {
    return ''
  }
}

export const updateArtist = async (id: number, formData: FormData) => {
  formData.append('id', id.toString())

  const response = await apiRequest({
    method: 'POST',
    url: '/artist/update',
    withCredentials: true,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response?.data
}

export const getPreferredArtistPageUrl = (artist: Artist) => {
  if (artist?.slug) {
    return `/artist/${artist.slug}`
  } else {
    return `/artist/${artist.id}`
  }
}
