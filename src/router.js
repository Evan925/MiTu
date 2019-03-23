import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Discover from './views/navs/Discover.vue'
import Follows from './views/navs/Follows.vue'
import Message from './views/navs/Message.vue'
import Me from './views/navs/Me.vue'
import Login from './views/login/Login.vue'

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
        path: '/message',
        name: 'message',
        component: Message,
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
        path: '/login',
        name: 'login',
        component: Login
    }]
})

/**
 * 对路由进行拦截
 */
router.beforeEach((to, from, next) => {
    console.log(to.path)
    console.log(store.state.token)
    console.log(store.state.hasLogin)
    if (to.path === '/login' && store.state.token && store.state.hasLogin) {
        return false;
    }
    if (to.meta.requiresAuth) {
        if (!store.state.token) {
            router.push('/login')
            return false;
        }
    }

    next()
});

export default router