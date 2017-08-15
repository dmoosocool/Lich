;(function (window, $, undefined) {
    var Utils = {
        bindEvents: function (bindObj, callbackObj) {
            $.each(bindObj, function (eventEl, eventCallback) {
                if (-1 === eventEl.indexOf(' ')) {
                    console.error('绑定事件的字符串格式有误.' + eventEl + ':' + eventCallback+ ' 请参照: http://www.baidu.com/bindstring');
                    return false;
                }
                // console.log(eventCallback, callbackObj);
            });
        }
    };
    window.Utils = Utils;
}(window, jQuery));