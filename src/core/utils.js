/**
 * Lich工具类.
 */
+(function (window, $, undefined) {
    var Utils = {
        /**
         * 绑定事件.
         *
         * @param  {[type]} bindObj     [Lich.events 需要绑定事件的集合]
         * @param  {[type]} callbackObj [Lich.handlers 绑定事件回调的集合]
         * @return {[null]}             [description]
         */
        bindEvents: function (bindObj, callbackObj) {
            $.each(bindObj, function (eventEl, eventCallback) {
                // 空格所在的位置.
                var spacePosition = eventEl.indexOf(' '),
                    // 事件名称.
                    eventName = '',
                    // 需要绑定事件的元素.
                    el = '';

                // 格式校验. 如果没有空格. 则证明开发人员输入的格式错误.
                if (-1 === spacePosition) {
                    throw new Error('绑定事件的字符串格式有误:' + eventEl + ':' + eventCallback + ' 请参照: http://www.baidu.com/bindstring');
                }

                // 绑定事件回调检验. 
                if (!callbackObj.hasOwnProperty(eventCallback)) {
                    throw new Error('绑定事件的字符串格式有误: \n 元素事件:' + eventEl + '的' + eventCallback + '回调方法不存在. \n 请参照: http://www.baidu.com/bindstring');
                }

                // 校验事件回调有没有写.
                eventName = eventEl.substring(0, spacePosition);
                el = eventEl.substring(spacePosition + 1, eventEl.length);

                /**
                 * 绑定元素事件分2种情况.
                 * 1. 如果页面初始化时元素已存在则直接可以为元素绑定事件.
                 * 2. 如果页面初始化时元素不存在则需要通过事件代理的方式来为元素绑定事件.
                 */
                if ($(el).length > 0) {
                    $(el).on(eventName, function (event) {
                        callbackObj[eventCallback](event, $(el));
                    });
                } else {
                    $('body').on(eventName, el, function (event) {
                        callbackObj[eventCallback](event, $(el));
                    });
                }
            });
        },

        /**
         * 根据服务和接口返回完整的服务器接口地址
         *
         * @param service       {string}    [服务器]
         * @param interface     {string}    [接口名]
         * @return              {string}    [完整的接口地址]
         */
        getRequestUrl: function (service, interface) {
            // 简单处理, 如果service最后一位有'/'字符的话就去掉.
            service = window.KH_SERVICE.SERVICE[service];
            interface = window.KH_SERVICE.INTERFACE[interface];
            // 如果service最后一位有'/'字符的话就去掉.
            service = ('/' !== service.charAt(service.length - 1)) ? service : service.slice(0, service.length - 1);
            // 如果interface第一位有'/'字符的话就去掉.
            interface = ('/' !== interface.charAt(0)) ? interface : interface.slice(1, interface.length);
            // 使用服务器地址加上接口地址拼接成完整的请求地址.
            return [service, interface].join('/');
        },

        /**
         * 获取Filter
         */
        getFilter: function (filters) {
            var queue = [];
            filters.forEach(function (item) {
                var filterKey = item.split('.')[0],
                    filterFunc = item.split('.')[1];

                queue.push(window.KH_FILTER[filterKey][filterFunc]);
            });
            return queue;
        },

        /**
         * 获取公共Filter.
         */
        getCommonFilter: function () {
            var commonFilter = window.KH_FILTER['common'],
                resultArr = [];
            for (var i in commonFilter) {
                resultArr.push(['common', i].join('.'));
            }
            return resultArr;
        },

        /**
         * 执行Filter.
         * @description 默认执行 KH_FILTER中common里面的Filter.
         * @param data          {JSONObject}                [Ajax results.]
         * @param filters       {array}                 [Filter队列.]
         * @return              {JSONObject}         [返回处理完成的数据]
         */
        runFilter: function (data, filters) {
            var filterQueue = [],
                commonFilter = Utils.getFilter(Utils.getCommonFilter()),
                userFilter = Utils.getFilter(filters);

            // 将commonFilter 添加到FilterQueue队列中.
            filterQueue.push.apply(filterQueue, commonFilter);

            // 将userFilter 添加到FilterQueue队列中.
            filterQueue.push.apply(filterQueue, userFilter);

            // 执行filter队列.并将filter处理过后的数据返回.
            filterQueue.forEach(function (filter) {
                data = filter(data);
            });

            // 处理完成的数据.
            return data;
        }
    };
    window.Utils = Utils;
}(window, Zepto));