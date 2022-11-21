import axios from 'axios'
const request = axios.create({
  baseURL: 'http://localhost:3002',
  timeout: 5000
})

request.interceptors.request.use(config => {

  return config
}, err => {
  console.log('请求拦截');
  return Promise.reject(err)
})

// 添加响应拦截器
request.interceptors.response.use(res => {

  return res.data
}, err => {
  // 对响应错误做点什么

  return Promise.reject(err);
});


export default request