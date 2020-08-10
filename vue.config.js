import url_config from './urlconfigs'

// 代理数据到本地服务器，解决跨域
module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: url_config.loginUrl
            }
        }
    }
}