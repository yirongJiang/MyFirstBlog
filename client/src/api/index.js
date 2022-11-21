import request from './request'

export function findBlog(params) {
  return request.get(`/client/blog/findAll`, { params })
}

export function getBlogDetail(params) {
  return request.get(`/client/blog/detail`, { params })
}

export function getCommentList() {
  return request.get('/client/comment/getComments')
}

export function postComments(params) {
  return request.post('/client/comment/postComment', params)
}
export function postCommentsToBlogSchema(params) {
  return request.post('/client/blog/postComment', params)
}

export function postLike(params) {
  return request.post('/client/blog/postLike', params)
}

export function getLike(params) {
  return request.get('/client/blog/getLike', { params })
}

export function getAllTags() {
  return request.get('/client/tag/getAllTags')
}

export function getBlogWithTag(params){
  return request.get('/client/blog/getBlogWithTag',{params})
}

export function getNewestBlog(params){
  return request.get('/client/blog/getNewestBlog',{params})
}

// 音乐
export function getMusic(params){
  return request.get('/client/music/getAllMusic',{params})
}

// 简介
export function getIntroduction(){
  return request.get('/client/introduction/getIntroduction')
}

// 图片
export function getImages(){
  return request.get('/client/images/getAllImages')
}