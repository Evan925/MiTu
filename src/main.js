import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import iView from 'iview'
// import 'iview/dist/styles/iview.css'

import store from './store'
import './plugins/element.js'
import './plugins/iview.js'
// Vue.use(ElementUI)
// Vue.use(iView)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')