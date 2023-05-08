import axios from 'axios'

//新建个axios对象
const httpClient = axios.create({
    validateStatus(status) {
        return status >= 200 && status < 504 //设置默认的合法状态码，不合法的话不接受response
    },
    timeout: 10000 //超时时间10秒
})

httpClient.defaults.retry = 3 // 请求重试次数
httpClient.defaults.retryDelay = 1000 //请求重试时间间隔
httpClient.defaults.shouldRetry = true //是否重试

//添加请求拦截器
httpClient.interceptors.request.use(
    config => {
        //添加header
        config.headers['Content-Type'] = 'application/json'
        config.headers['Accept-Language'] = 'zh-CN'
        config.headers['Authorization'] = localStorage.getItem("token")
        //处理post请求
        if(config.method == 'post') {
            if (!config.data) {
                config.data = {}
            }
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

//添加响应拦截器
httpClient.interceptors.response.use(
    response => {
        //处理状态码
        if (response.status !== 200) {
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    err => {
        return Promise.reject(err)
    }
)

export default httpClient
