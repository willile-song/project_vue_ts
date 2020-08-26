import Vue from 'vue'
import VueRouter from 'vue-router'


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
        path: '/',
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
                dir: 'organ-member/',
            }
        ]
    },

    {
        path: '*',
        name: 'notFound',
        component: () => import('../views/config/not-found.vue')
    }
]

// 对数据进行处理 src\views\login.vue
const handleRoutes = (list: RouteData[]): RouteData[] => {
    return list.map(item => {
        const { name, dir, children } = item;
        const path = `${dir || ''}${name}.vue`
        item.component = () => import(`@/views/${path}`);
        if (children) {
            item.children = handleRoutes(children);
        }
        return item;
    })
}

const _routes = handleRoutes(routesList)

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login.vue')
        },
        ..._routes,
    ]
})

export default router
