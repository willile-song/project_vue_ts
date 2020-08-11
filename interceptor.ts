import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL:'',
    timeout:5000,
    withCredentials: true
})
instance.interceptors.request.use((config: AxiosRequestConfig): any => {
    config = Object.assign(config, {
        params: {
            cb: Date.now()  // 添加时间戳
        },
        headers: {
            'X-Requested-With': 'XMLHttpRequest'   // 区分同步请求和异步请求（ajax）
        }
    })
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response: AxiosResponse): any => {
    return response
}, err => {
    return Promise.reject(err)
})

export default instance