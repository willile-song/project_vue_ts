import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const instance = axios.create({
    baseURL:'',
    timeout:5000,
    withCredentials: true,
})
instance.interceptors.request.use((config: AxiosRequestConfig): any => {
    config.params = {
        ...config.params,
        cb: Date.now()
    }

    config.headers = {
        ...config.headers,
        'X-Requested-With': 'XMLHttpRequest'
    }
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use((response: AxiosResponse): any => {
    console.log(response)
    return response
}, err => {
    return Promise.reject(err)
})

export default instance