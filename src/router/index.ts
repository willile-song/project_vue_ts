import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'


Vue.use(VueRouter)

interface RouteData {
    path: string;
    name: string;
    redirect?: string;
    component?: any;
    meta?: any;
    children?: RouteData[];
    dir?: any;
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
                dir: 'audit/'
            },
            {
                path: '/home',
                name: 'home-page',
                component: '',
                dir: 'home/'
            },
            {
                path: '/organ-member',
                name: 'organ-member',
                component: '',
                dir:'organ-member',
            }
        ]
    },

    {
        path: '/',
        name: 'home-page',
        dir: 'home/'
    },
    {
        path: '/login',
        name: 'login'
    },
]

// 对数据进行处理
const handleRoutes = (list: RouteData[]): RouteData[] => {
    return list.map(item => {
        const { name, dir, children } = item;
        const path = `../views/${dir || ''}${name}.vue`
        console.log(path)
        item.component = () => import(path);
        if (children) {
            item.children = handleRoutes(children);
        }
        return item;
    })
}

const _routes = handleRoutes(routesList)
console.log(_routes)

const routes: Array<RouteData> = [
    ..._routes,
    {
        path: '*',
        name: 'notFound',
        component: () => import('../views/config/not-found.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
