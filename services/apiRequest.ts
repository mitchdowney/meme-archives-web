import axios, { AxiosRequestConfig } from 'axios'

export const apiRequest = (config: AxiosRequestConfig<any>, isServerSideReq?: boolean) => {
  return axios.request({
    baseURL: isServerSideReq
      ? `http://${process.env.NEXT_PUBLIC_INTERNAL_API_BASE_URL}:${process.env.NEXT_PUBLIC_INTERNAL_API_PORT}`
      : process.env.NEXT_PUBLIC_API_BASE_URL,
    ...config
  })
}

export const parseQuerySortParam = (sortParam: string) => {
  switch (sortParam) {
  case 'alphabetical':
    return 'alphabetical'
  case 'reverse-alphabetical':
    return 'reverse-alphabetical'
  case 'newest':
    return 'newest'
  case 'oldest':
    return 'oldest'
  default:
    return 'random'
  }
}
