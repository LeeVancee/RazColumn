import type { ListReqType } from '@/types'
import request from '../utils/request'
import type { PostProps } from '@/stores/post'

export const fetchPostsAPI = ({ cid, currentPage, pageSize }: ListReqType) => {
  return request({
    url: `/columns/${cid}/posts?currentPage=${currentPage}&pageSize=${pageSize}`,
    method: 'get'
  })
}

export const fetchPostAPI = (id: string) => {
  return request({
    url: `/posts/${id}`,
    method: 'get'
  })
}

export const updatePostAPI = (id: string, payload: PostProps) => {
  return request({
    url: `/posts/${id}`,
    method: 'patch',
    data: payload
  })
}

export const createPostAPI = (payload: PostProps) => {
  return request({
    url: '/posts/',
    method: 'post',
    data: payload
  })
}

export const deletePostAPI = (id: string) => {
  return request({
    url: `/posts/${id}`,
    method: 'delete'
  })
}

export const uploadAPI = (id: string) => {
  return request({
    url: `/posts/${id}`,
    method: 'delete'
  })
}
