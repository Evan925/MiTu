/**
 *  api接口地址统一管理
 */
let _baseUrl = 'https://www.easy-mock.com/mock/5ca9739169174002aed71e97/api/';
export default {
    baseUrl: _baseUrl,
    discover: {
        //公告
        notice: _baseUrl + 'GetNotice',
        //轮播图数据
        banner: _baseUrl + 'GetBanners',
        //列表数据
        list: _baseUrl + 'GetDiscoverList',
    },
    common: {
        images: _baseUrl + 'GetImages'
    }
}