/**
 * Created by guoxin on 2017/8/11.
 */
+(function (window, $, undefined) {
    var Lich = {
        init: function () {
            // 事件解析.
            Utils.bindEvents(Lich.events, Lich.handlers);
        },

        request: function () {

        },

        /**
         * 继承
         * @param  {[object]} subClass [子类]
         * @return {[object]}          [继承类]
         */
        extends: function (subClass) {
            var parentInit = Lich.init;
            // 深拷贝
            $.extend(true, Lich, subClass);

            // 默认执行父类初始化函数.
            parentInit();
            // 然后执行子类初始化函数.
            Lich.init();

            return Lich;
        },
        // 事件集合.
        events: {},
        // 事件回调集合.
        handlers: {},
        // 请求集合.
        requests: {},
        // 请求回调集合.
        callbacks: {}
    };

    window.Lich = Lich;
}(window, Zepto));