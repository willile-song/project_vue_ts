import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import VueCookies from 'vue-cookies'
import 'element-ui/lib/theme-chalk/index.css';
import axios from '@/utils/axios'
import '@/styles/common.less'


Vue.use(VueCookies);

Vue.use(Element);

Vue.prototype.axios = axios;


Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h: (arg0: any) => any) => h(App)
}).$mount('#app')
