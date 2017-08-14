/**
 * Created by guoxin on 2017/8/11.
 */
;(function (window, $, undefined) {
    var Lich = {
        init: function () {
            console.log('this is Lich');
        },

        extends: function (subClass) {
            var parentInit = this.init;
            // 深拷贝
            $.extend(true, this, subClass);
            // 执行父类初始化函数.
            parentInit();
            // 执行子类初始化函数.
            this.init();
            return this;
        },

        events: {
            a: 'E_Body_Click',
            b: '2'
        },

        handlers: {
            E_Body_Click: function (event, el) {
                console.log(el);
                console.log(event);
            }
        },

        requests: {},

        callbacks: {}

    };

    window.Lich = Lich;
}(window, jQuery));