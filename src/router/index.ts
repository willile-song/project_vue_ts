import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/login.vue'
import System from '../views/system.vue'
import Home from '../views/home.vue'
import Audit from '../views/audit.vue'
import OrganMember from '../views/organ-member.vue'

Vue.use(VueRouter)

interface RouteData {
    path: string;
    name: string;
    redirect?: string;
    component: any;
    children?: RouteData[];
}
// 后台路由数据
const routesList: Array<RouteData> = [
    
    {
        path: '/system',
        name: 'system',
        redirect: '/home',
        component: '',
        children: [
            {
                path: '/audit',
                name: 'audit',
                component: '',
            },
            {
                path: '/home',
                name: 'home',
                component: '',
            },
            {
                path: '/organ-member',
                name: 'organ-member',
                component: '',
            }
        ]
    }
]

// 对数据进行处理
const handleRoutes = (list: RouteData[]): RouteData[] => {
    return list.map(item => {
        item.component = () => import(`../views/${item.name}.vue`)
        if(item.children && item.children.length) {
            item.children = handleRoutes(item.children);
        }
        return item
    })
    
}

const _routes = handleRoutes(routesList)

const routes: Array<RouteData> = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    ..._routes,
    {
        path: '*',
        name: 'notFound',
        component: () => import('../views/notFound.vue')
    }
]



const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
