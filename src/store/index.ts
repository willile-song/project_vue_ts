import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sidebarOncollapse: false,    // 侧边栏是否折叠，默认展开
        normalWidth: '207px',        // 侧边栏展开宽度初始值  
        userData: '',
        paddingDefault: '12px 15px',
        bgColorDefault: '#f7f8f8',
    },
    mutations: {
        toggleSidebarOncollapse(state,payload) {   
            state.sidebarOncollapse = !state.sidebarOncollapse;
        },
        setUserData(state, payload) {
            state.userData = payload  
        },
        removeUserInfo(state,payload) {
            state.userData = ''
        },
        changePadding(state, payload) {
            state.paddingDefault = payload.padding
        },
        changeBgColor(state, payload) {
            state.bgColorDefault = payload.bgColor
        }
    },
    getters: {
        sidebarWidth(state) {
            return state.sidebarOncollapse ? '0px' : state.normalWidth
        },
        getPadding(state) {
            return state.paddingDefault
        },
        getBgColor(state) {
            return state.bgColorDefault
        }
    },
    actions: {
    },
    modules: {
    }
})
