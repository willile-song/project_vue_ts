import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sidebarOncollapse:false,    // 侧边栏是否折叠，默认展开
    normalWidth: '207px'
  },
  mutations: {
    changeSidebarOncollapse(state) {
      state.sidebarOncollapse = !state.sidebarOncollapse
    }
  },
  getters: {
    sidebarWidth(state) {
      return state.sidebarOncollapse ? '0px' : state.normalWidth
    }
  },
  actions: {
  },
  modules: {
  }
})
