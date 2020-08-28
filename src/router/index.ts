import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/views/config/not-found.vue'
import PlaceHolder from '@/components/placeholder-common.vue'


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
        dir: 'system/',
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
            },
        ]
    },
]

/// 通用页面，占位
const commonPages = [
    {
        path: '/power-management',
        name: 'power-management',
        component: PlaceHolder,
        meta: '权限管理',
    },
    {
        path: '/electronic-signature',
        name: 'electronic-signature',
        component: PlaceHolder,
        meta: '印章管理',
    },
    {
        path: '/filecensus',
        name: 'filecensus',
        component: PlaceHolder,
        meta: '模板管理',
    },
    {
        path: '/sign',
        name: 'sign',
        component: PlaceHolder,
        meta: '电子签约',
    },
    {
        path: '/info',
        name: 'info',
        component: PlaceHolder,
        meta: '基本信息',
    },
    {
        path: '/cost-center',
        name: 'cost-center',
        component: PlaceHolder,
        meta: '费用中心',
    },
    {
        path: '/template-library-management',
        name: 'template-library-management',
        component: PlaceHolder,
        meta: '模板库管理',
    },
    {
        path: '/business-flow-config',
        name: 'business-flow-config',
        component: PlaceHolder,
        meta: '业务流配置',
    },
]

// 对数据进行处理 
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
// 将数据公共页面的路由添加到system的子路由上
commonPages.map(item => {
    _routes[0].children?.push(item);
})

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
        {
            path: '*',
            name: 'notFound',
            component: NotFound,
        }
    ]
})

export default router
