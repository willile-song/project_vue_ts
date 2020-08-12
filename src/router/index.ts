import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/login.vue'
import System from '../views/system.vue'
import Home from '../components/home.vue'
import Audit from '../views/audit.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/login',
        name: 'login',
        // meta:{
        //     fullscreen: true
        // },
        component: Login
    },
    {
        path: '/',
        name: 'system',
        redirect:'/home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: System,
        children: [
            {
                path:'/audit',
                name: 'audit',
                component: Audit,
            },
            {
                path:'/home',
                name:'home',
                component: Home
            },
        ]
    },
    
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
