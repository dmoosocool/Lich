/**
 * 
 * @author guoxin
 * @date 2017-08-30 16:27
 * @description
 */
+(function (global, $, _, undefined) {
    var test = Lich.extends({
        events: {
            'click .test': 'E_ClickBodyTest'
        },

        handlers: {
            'E_ClickBodyTest': function (events, el) {
                console.log(events, el);
            }
        },

        init: function () {
            this.requests.queryUserInfo();
            console.log('this is index.js.');
        },

        callbacks: {
            C_queryUserInfo: {
                // 发送前,
                beforeSend: function (xhr, status) {

                },

                // 成功回调.
                success: function (data, status, xhr) {

                    var el = $('#testTplContainer'),
                        tpl = _.template($('#testTpl').html())
                    el.html(tpl({ data: data }));
                },

                // 失败回调.
                error: function (xhr, errorType, error) {

                },

                // 完成回调.
                complete: function (xhr, status) {

                }
            }
        },

        requests: {
            queryUserInfo: function () {
                /**
                 *
                 * filter: 是一个数组可以自动将接口返回的数据进行处理.
                 * service: 使用的后台系统.
                 * interface: 接口名.
                 *
                 * 通用回调处理.
                 */
                Lich.request({
                    filters: [
                        'other.otherFilter'
                    ],
                    service: 'YIYAN',
                    interface: 'ANIME',
                    type: 'GET',
                    callback: 'C_queryUserInfo'
                });
            }
        }
    });
}(window, Zepto, _));