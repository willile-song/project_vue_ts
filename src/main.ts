import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios, { AxiosResponse } from 'axios';

axios.interceptors.request.use(function (config): any {
  
  config = Object.assign(config, {
    params: {
      cb: new Date().getTime()
    },
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
  return config;
}, function (err) {
  return Promise.reject(err)
})

axios.interceptors.response.use(function (response: AxiosResponse): any {
  return response
})
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
