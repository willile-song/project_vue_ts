module.exports = {
    devServer: {
        proxy: {
            '/': {
                target: 'http://app11.qiyuesuo.net'
            }
        }
    }
}