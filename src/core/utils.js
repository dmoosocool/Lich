//@formatter:off
/**
 * Lich工具类.
 */
+(function (window, $, undefined) {
    var Utils = {
        /**
         * 绑定事件.
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
        }
    };
    window.Utils = Utils;
}(window, jQuery));
//@formatter:on