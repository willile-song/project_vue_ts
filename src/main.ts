import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from '../src/interceptor'

Vue.use(Element)
Vue.prototype.axios = axios      // 将封装过的axios实例挂载到Vue的prototype上

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
