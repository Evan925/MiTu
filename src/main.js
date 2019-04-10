import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font/iconfont.css'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'

// import Mint from 'mint-ui'
// import $ from 'jquery'
// import './plugins/element.js'
import './plugins/iview.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/mui/dist/css/mui.css'
import '@/assets/css/base.scss'
//引入mescroll.min.js和mescroll.min.css

import 'mescroll.js/mescroll.min.css'
// import '@/assets/mescroll/option/mescroll-option.css'

// Vue.use(ElementUI)
// Vue.use(iView)
Vue.use(Vant)
Vue.use(MintUi)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')