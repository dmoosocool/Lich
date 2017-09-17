/**
 * Created by guoxin on 2017/8/11.
 */
+(function (window, $, undefined) {
    var Lich = {
        init: function () {
            // 事件解析.
            Utils.bindEvents(Lich.events, Lich.handlers);
        },

        request: function (options) {
            var callback = this.callbacks[options.callback],
                emptyCallback = function emptyCallback() { console.log(arguments); },
                url = Utils.getRequestUrl(options.service, options.interface),
                params = {
                    type: options.type || 'POST',
                    header: options.header || {},
                    url: url,
                    params: options.params,
                    dataType: 'json'
                };

            // 发送前,
            params.beforeSend = function (xhr, status) {
                var userBeforeSend = callback.beforeSend || emptyCallback;
                userBeforeSend(xhr, status);
            };

            // 成功,
            params.success = function (data, status, xhr) {
                var userSuccess = callback.success || emptyCallback;
                // 将处理完成的数据返回给前端.
                data = Utils.runFilter(data, options.filters);
                userSuccess(data, status, xhr);
            };

            // 失败,
            params.error = function (xhr, errorType, error) {
                var userError = callback.error || emptyCallback;
                userError(xhr, errorType, error);
            };

            // 完成回调,
            params.complete = function (xhr, status) {
                var userComplete = callback.complete || emptyCallback;
                userComplete(xhr, status);
            };

            $.ajax(params);
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