/**
 * Created by guoxin on 2017/8/11.
 */
;(function (window, $, undefined) {
    var Lich = {
        init: function () {

            Utils.bindEvents(Lich.events, Lich.handlers);
        },

        extends: function (subClass) {
            var parentInit = this.init;
            // 深拷贝
            $.extend(true, this, subClass);
            console.log(this.handlers);
            // 执行父类初始化函数.
            parentInit();
            // 执行子类初始化函数.
            this.init();
            return this;
        },

        events: {
            'click body .test': 'E_Body_Click',
            'click body .test2': 'E_Body2_Click'
        },

        handlers: {
            E_Body_Click: function (event, el) {
                console.log(el);
                console.log(event);
            },
            E_Body2_Click: function (event, el) {

            }
        },

        requests: {},

        callbacks: {}

    };

    window.Lich = Lich;
}(window, jQuery));