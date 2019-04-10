import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

//主要导航页面
import Discover from './views/navs/Discover.vue'
import Follows from './views/navs/Follows.vue'
import Square from './views/navs/Square.vue'
import Me from './views/navs/Me.vue'
//副导航页面
// TODO

//各类子页面
import LoverTime from './views/user/LoverTime.vue' //相恋时光
import Message from './views/user/Message.vue' //消息
import PerZone from './views/user/PerZone.vue' //个人空间
import Popularity from './views/user/Popularity.vue' //人气榜单
import SignIn from './views/user/SignIn.vue' //签到中心

//详情页面
import DDetail from './views/children/DDetail.vue' //发现页面：用户表白详情

// 注册登录
import Login from './views/login/Login.vue'
import Register from './views/login/Register.vue'

//工具
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
            name: '发现',
            component: Discover,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/dDetail/:id',
            name: 'DDetail',
            component: DDetail,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/follows',
            name: '关注',
            component: Follows,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/square',
            name: '广场',
            component: Square,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/me',
            name: '我',
            component: Me,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/loverTime',
            name: '相恋时光',
            component: LoverTime,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/message',
            name: '消息',
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
            name: '签到',
            component: SignIn,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/popularity',
            name: '人气榜',
            component: Popularity,
            meta: {
                requiresAuth: true
            }
        }, {
            path: '/login',
            name: '登录',
            component: Login
        }, {
            path: '/register',
            name: '注册',
            component: Register
        }
    ]
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
    // console.log('next')
    next()
});

export default router