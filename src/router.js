import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Discover from './views/navs/Discover.vue'
import Follows from './views/navs/Follows.vue'
import Square from './views/navs/Square.vue'
import Me from './views/navs/Me.vue'

import Lover from './views/user/Lover.vue'
import Message from './views/user/Message.vue'
import PerZone from './views/user/PerZone.vue'
import Popularity from './views/user/Popularity.vue'
import SignIn from './views/user/SignIn.vue'

import Login from './views/login/Login.vue'
import Register from './views/login/Register.vue'


import localStore from "./Utils/localStore"


Vue.use(Router)

const router = new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        redirect: '/discover'
    }, {
        path: '/discover',
        name: 'discover',
        component: Discover,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/follows',
        name: 'follows',
        component: Follows,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/square',
        name: 'square',
        component: Square,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/me',
        name: 'me',
        component: Me,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/lover',
        name: 'lover',
        component: Lover,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/message',
        name: 'message',
        component: Message,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/perZone',
        name: 'perZone',
        component: PerZone,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/signIn',
        name: 'signIn',
        component: SignIn,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/popularity',
        name: 'popularity',
        component: Popularity,
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/register',
        name: 'register',
        component: Register
    }]
})

/**
 * 对路由进行拦截
 */
router.beforeEach((to, from, next) => {
    if (to.path === '/tab-more') return;
    if (to.path === '/login' && localStore.isLogin() || to.path === '/register' && localStore.isLogin()) {
        // console.log('已经登录！', from.path)
        if (from.path === '/') return router.push('/')
        else return;
    }
    if (to.meta.requiresAuth) {
        if (!localStore.isLogin()) {
            return router.push('/login')
        }
    }
    // console.log(typeof(localStore.isLogin()))
    console.log('next')
    next()
});

export default router