import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        username: '',
        hasLogin: false,
        states: 'turn-on',
        isDisabled: false, //是否禁用页面刷新
    },
    mutations: {
        setTransition(state, states) {
            state.states = states
        }
    },
    actions: {

    }
})