import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sidebarOncollapse: false,    // 侧边栏是否折叠，默认展开
        normalWidth: '207px',        // 侧边栏展开宽度初始值
        menuList: [
            {
                name: "首页",
                pid: 1,
                id: 1,
                url: "/home",
                icon: "el-icon-s-home",
            },
            {
                name: "文件",
                pid: 1,
                id: 2,
                url: "/file",
                icon: "el-icon-document",
                childNode: [
                    {
                        name: "电子签约",
                        pid: 2,
                        id: 3,
                        url: "/sign",
                    },
                    {
                        name: "文件统计",
                        pid: 2,
                        id: 4,
                        url: "/filecensus",
                    },
                ],
            },
            {
                name: "印控",
                pid: 1,
                id: 3,
                url: "/sealcontrol",
                icon: "el-icon-s-check",
                childNode: [
                    {
                        name: "电子签章",
                        pid: 3,
                        id: 5,
                        url: "/electronic-signature",
                    },
                ],
            },
            {
                name: "组织",
                pid: 1,
                id: 4,
                url: "/organization",
                icon: "el-icon-s-custom",
                childNode: [
                    {
                        name: "基本信息",
                        pid: 4,
                        id: 6,
                        url: "/info",
                    },
                    {
                        name: "组织和成员",
                        pid: 4,
                        id: 7,
                        url: "/organ-member",
                    },
                    {
                        name: "权限管理",
                        pid: 4,
                        id: 8,
                        url: "/power-management",
                    },
                    {
                        name: "费用中心",
                        pid: 4,
                        id: 9,
                        url: "/cost-center",
                    },
                ],
            },
            {
                name: "配置",
                pid: 1,
                id: 5,
                url: "/config",
                icon: "el-icon-s-tools",
                childNode: [
                    {
                        name: "模板库管理",
                        pid: 5,
                        id: 10,
                        url: "/template-library-management",
                    },
                    {
                        name: "业务流配置",
                        pid: 5,
                        id: 11,
                        url: "/business-flow-config",
                    },
                ],
            },
            {
                name: "审计",
                pid: 1,
                id: 6,
                url: "/audit",
                icon: "el-icon-document-copy",
            },
        ],
        userData: '',
        paddingDefault: '12px 15px',
        bgColorDefault: '#f7f8f8',
    },
    mutations: {
        toggleSidebarOncollapse(state,payload) {   
            state.sidebarOncollapse = !state.sidebarOncollapse;
        },
        getUserData(state, payload) {
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
