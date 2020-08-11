const urlConfig =  require('./url.config.js')

// 代理数据到本地服务器，解决跨域
module.exports = {
    devServer: {
        // proxy: {
        //     '/': {   // 代表本地8080端口的服务器    请求 ---> localhost:8080/  --- 服务器请求服务器，没有跨域情况  ---> 目标地址
        //         target: urlConfig.loginUrl
        //     }
        // }
        proxy:urlConfig.loginUrl
    }
}