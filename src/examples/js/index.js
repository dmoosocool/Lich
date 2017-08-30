/**
 * 
 * @author guoxin
 * @date 2017-08-30 16:27
 * @description
 */
+(function (global, $, undefined) {
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
            console.log(this.requests.queryUserInfo());
            console.log('this is index.js.');
        },

        callbacks: {
            queryUserInfo: {
                // 发送前,
                beforeSend: function (xhr, status) {

                },

                // 成功回调.
                success: function (data, status, xhr) {
                    console.log(resp);
                },

                // 失败回调.
                error: function (xhr, errorType, error) {
                    console.log(resp);
                },

                // 完成回调.
                complete: function (xhr, status) {

                }
            }
        },

        requests: {
            queryUserInfo: function () {

                var common_filter = function common_filter(resp) {

                };
                /**
                 *
                 * filter: 是一个数组可以自动将接口返回的数据进行处理.
                 * service: 使用的后台系统.
                 * interface: 接口名.
                 *
                 * 通用回调处理.
                 */
                Lich.request({
                    filter: [
                    ],
                    service: 'USER-CENTER',
                    interface: 'USER-INFO',
                    params: {}
                });
            }
        }
    });
}(window, Zepto));