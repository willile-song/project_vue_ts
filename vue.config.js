
// 代理数据到本地服务器，解决跨域
module.exports = {
    devServer: {
        proxy: 'http://192.168.62.155:9180/'  
    },
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
      ]
}