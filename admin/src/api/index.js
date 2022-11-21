import request from './request'

// 登陆接口
export function login(data) {
    return request({
        url: '/admin/user/login',
        method: 'post',
        data
    })
}

// 博客接口
export function findBlog(params) {
    return request.get(`/admin/blog/find`, { params })
}

export function getBlogDetail(params) {
    return request.get(`/admin/blog/detail`, { params })
}

export function blogDelete(params) {
    return request.post('/admin/blog/delete', params)
}

export function blogAdd(params) {
    return request.post('/admin/blog/add', params)
}
export function blogUpdate(params) {
    return request.post('/admin/blog/update', params)
}

// 用户接口
export function userDelete(params) {
    return request.post('/admin/user/delete', params)
}
export function findUser(params) {
    return request.get('/admin/user/find', { params })
}
export function userAdd(params) {
    return request.post('/admin/user/add', params)
}
export function deleteUser(params) {
    return request.post('/admin/user/delete',  params )
}

// 标签接口

export function tagFind(params) {
    return request.get('/admin/tag/find', { params })
}

export function tagAdd(params) {
    return request.post('/admin/tag/add', params)
}

export function tagUpdate(params) {
    return request.post('./admin/tag/update', params)
}

export function tagDelete(params) {
    return request.post('/admin/tag/delete', params)
}

// 音乐接口
export function musicGet(params){
    return request.get('/admin/music/getMusic',{params})
}
export function musicAdd(params){
    return request.post('/admin/music/addMusic',params)
}
export function musicDelete(params){
    return request.post('/admin/music/deleteMusic',params)
}


// 兴趣接口

export function introductionGet(params){
    return request.get('/admin/introduction/getIntroduction',{params})
}
export function introductionAdd(params){
    return request.post('/admin/introduction/addIntroduction',params)
}
export function introductionDelete(params){
    return request.post('/admin/introduction/deleteIntroduction',params)
}

// 图片接口
export function imagesGet(){
    return request.get('/admin/images/getImages')
}

export function imagesPost(params){
    return request.post('/admin/images/postImages',params)
}

export function imagesDelete(params){
    return request.post('/admin/images/deleteImages',params)
}