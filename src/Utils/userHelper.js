/**
 * 有关用户的数据操作 以及设置 
 */

import $ from "jquery" //加载jQuery
import store from '@/store'
import localStorage from '@/Utils/localStorage'

export default {
    login() { //TOTO：设置登录状态、保存登录身份、保存token、保存用户信息
        localStorage.set('userId', 'mitu123456')
    },
    /**获取当前登录用户的Id */
    currentUserId() {
        return localStorage.get('userId')
    }

}