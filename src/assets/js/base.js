import $ from "jquery" //加载jQuery
import { Toast, ImagePreview } from "vant"
import store from '@/store'
import common from '@/Utils/common'

export default {
    toggle() {
        // console.log('toggle menu success')
        let _$container = $('.main-container'),
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
    },
    showLoading(time) { //封装加载
        let _time = time | 500;
        let _toast = Toast.loading({
            duration: _time,
            mask: true,
            message: "加载中..."
        });
        // setTimeout(()=>{
        //   _toast.clear()
        // },5000)
    },
    back($this) { //页面返回事件
        $this.$store.commit("setTransition", "turn-off");
        $this.$router.back(-1);
    },
    init_app_content($isMain) {
        let _contentH = 0;
        if ($isMain === undefined) {
            // _contentH = window.screen.availHeight;
            // $('.mitu-router').height(_contentH)
            $('.mitu-router').height(document.body.clientHeight)
                // console.log("1：" + $isMain + "   " + _contentH)
        } else {
            // _contentH = window.screen.availHeight - 44 - 50;
            // $('.mitu-router').height(_contentH)
            $('.mitu-router').height(document.body.clientHeight - 44 - 50)
                // console.log("2：" + $isMain + "   " + _contentH)
        }
    },
    /** 使用mescroll后弃用*/
    isScrollTop($ele) {
        let _ele = $ele === undefined ? $('.content') : $ele;
        console.log(_ele)
        _ele.scroll(() => {
            let _contentH = 0,
                _children = _ele.children();
            console.log(_children);
            $.each(_children, function(index, item) {
                _contentH += $(item).height()
            })
            if (_ele.scrollTop() === 0) {
                console.log("到顶了")
                store.state.isDisabled = false;
            } else {
                store.state.isDisabled = true;
            }
            console.log("store.state.isDisabled", store.state.isDisabled)
                // console.log("_ele.scrollTop", _ele.scrollTop())
                // console.log("_contentH=>", _contentH);
        })
    },
    /**节流函数 method：执行的函数 delay：延迟  duration：间隔时长*/
    throttle(method, delay, duration) {
        var timer = null;
        var begin = new Date();
        return function() {
            var context = this,
                args = arguments;
            var current = new Date();
            clearTimeout(timer);
            if (current - begin >= duration) {
                method.apply(context, args);
                begin = current;
            } else {
                timer = setTimeout(function() {
                    method.apply(context, args);
                }, delay);
            }
        }
    },
    onHandleRight($dom) {
        let _this = this;
        let _dom = $dom === undefined ? document.querySelector(".main-container") : $dom;
        common.bindEvent(_dom, "swiperight", _this.toggle);
        console.log("绑定事件成功=>onHandleRight")
    },
    removeHandleRight($dom) {
        let _this = this;
        let _dom = $dom === undefined ? document.querySelector(".main-container") : $dom;
        common.removeEvent(_dom, "swiperight", _this.toggle);
        console.log("解除事件成功=>removeHandleRight")
    },
    /**图片预览  $images图片数组*/
    showImagePreview($this, $url, $parm, $images) {
        console.log('into showImagePreview')
        let _images = $images,
            _this = $this,
            _url = $url,
            _parm = $parm;
        if (_images === undefined) {
            if (_this === undefined) {
                console.log('Vue this 对象未加载！');
                Toast('Vue this 对象未加载！');
                return;
            }
            if (_url === undefined) {
                console.log('url 参数未配置！');
                Toast('url 参数未配置！');
                return;
            }
            _this.$axios.get(_url, _parm).then((res) => {
                console.log(res)
                _images = res.data.data;
                console.log("2=>", _images)
                ImagePreview({
                    images: _images,
                    startPosition: 0,
                });
            })
        } else {
            if (_images === undefined || _images === null) {
                console.log('预览图片数组空');
                Toast('预览图片数组空！');
                return;
            }
            ImagePreview({
                images: _images,
                startPosition: 0,
            });
        }
    },
    discover: {
        /**（临时函数）设置点赞和收藏按钮的状态  $dom  */
        setState($parm) {
            let _parm = $parm;
            if (_parm.dom === undefined) return console.log("dom 元素参数未设置");
            if ($(_parm.dom).hasClass("d-like-active")) {
                $(_parm.dom).removeClass("d-like-active");
                console.log(_parm.cancelText)
                Toast(_parm.cancelText);
            } else {
                $(_parm.dom).addClass("d-like-active");
                console.log(_parm.successText)
                Toast(_parm.successText);
            }
        }
    }
}