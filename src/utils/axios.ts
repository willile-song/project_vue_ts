import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import router from '@/router/'

// 创建axios实例
const instance = axios.create({
    baseURL:'',
    timeout:5000,
    withCredentials: true,
})
instance.interceptors.request.use((config: AxiosRequestConfig): any => {
    
    config.params = {
        ...config.params,
        cb:Date.now(),    // 电子签署平台的时间戳
        _: Date.now(),   // 为每次请求添加时间戳（达梦）
        
    }   

    config.headers = {
        ...config.headers,
        'X-Requested-With': 'XMLHttpRequest'     // 表明请求异步
    }
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response: AxiosResponse): any => {
    // console.log(response.data.code)
    if(response.data.code === 403) {            // 会话失效跳转到login
        router.push('/login')
    }
    return response
}, err => {
    return Promise.reject(err)
})

export default instance                       // 导出实例


