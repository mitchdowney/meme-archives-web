import { Tag } from '@/lib/types'
import { apiRequest } from './apiRequest'
import { ImageType } from './image'

export const getAllTags = async () => {
  const response = await apiRequest({
    method: 'GET',
    url: '/tags/all'
  })

  return response?.data as Tag[]
}

export const getAllTagsWithImages = async (imageType: ImageType, isServerSideReq?: boolean) => {
  const response = await apiRequest({
    method: 'GET',
    url: '/tags/all-with-images',
    params: {
      imageType
    }
  }, isServerSideReq)

  return response?.data as Tag[]
}

export const getTagById = async (id: number, isServerSideReq?: boolean) => {
  const response = await apiRequest({
    method: 'GET',
    url: `/tag/${id}`
  }, isServerSideReq)

  return response?.data as Tag
}