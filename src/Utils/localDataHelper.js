/**本地数据存储工具类 */

export default {
    get(key) {
        return localStorage.getItem(key)
    },
    set(key, value) {
        return localStorage.setItem(key, value);
    },
    remove(key) {
        return localStorage.removeItem(key);
    }
}