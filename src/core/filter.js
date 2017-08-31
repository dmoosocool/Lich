/**
 * 处理ajax成功回调返回值.
 * 默认执行common中的Filter.
 *
 * 建议其中的key值按照业务逻辑来命名.
 */
+(function (window, $, undefined) {
    var filter = {
        common: {
            commonFilter: function (data) {
                data.commonFilter = 'this is commonFilter added.';
                return data;
            },

            common2Filter: function (data) {
                data.common2Filter = 'this is common2Filter added.';
                return data;
            }
        },

        other: {
            otherFilter: function (data) {
                data.otherFilter = 'this is otherFilter added.';
                return data;
            }
        }
    };

    window.KH_FILTER = filter;
}(window, Zepto));