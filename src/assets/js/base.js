import $ from "jquery" //加载jQuery
export default {
    toggle() {
        console.log('toggle menu success')
        let _$container = $('#is-login-container'),
            _$offCanvasSide = $('#offCanvasSide'),
            _$content = $('#main-inner-content'),
            _leftW = 0;

        if (_$container.hasClass('mui-active')) { //已经激活
            _$container.removeClass('mui-active')
            _$offCanvasSide.removeClass('mui-active')
            _$content.css({
                transform: 'translate3d(0px, 0px, 0px)',
            })
        } else { //未激活
            _$container.addClass('mui-active')
            _$offCanvasSide.addClass('mui-active')
            _leftW = _$offCanvasSide.width()
            _$content.css({
                transform: 'translate3d(' + _leftW + 'px, 0px, 0px)',
            })
        }
    },
    toggleMenu() {
        // console.log('toggleMenu 绑定成功')
        let _this = this;
        // $('.toggle-menu-btn').off('tap').on('tap',function(){ //移动设备
        $('.toggle-menu-btn').off('click').on('click', function() { //pc 浏览器调试
            _this.toggle()
        })
    },
    maskToggleMenu() {
        // console.log('maskToggleMenu 绑定成功')
        let _this = this;
        // $('.mui-off-canvas-backdrop').off('tap').on('tap', function() { //移动设备下
        $('.mui-off-canvas-backdrop').off('click').on('click', function() { //浏览器调试
            _this.toggle()
        })
    },
    initToggleMenu() {
        // console.log('initToggleMenu 绑定成功')
        this.toggleMenu()
        this.maskToggleMenu()
    }
}