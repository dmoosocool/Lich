/**
 * Created by guoxin on 2017/8/14.
 */
+(function(global, $, undefined) {
    var test = Lich.extends({
        events: {
            'click .test': 'E_ClickBodyTest'
        },

        handlers: {
            'E_ClickBodyTest': function(events, el) {
                console.log(events, el);
            }
        },

        init: function() {
            console.log(this);
            console.log('this is index.js.');
        },

        requests: {
            queryUserInfo: function() {
                Lich.request({
                    service: 'USER_CENTER',
                    interface: 'GET_USER_INFO',
                    params: {

                    },
                })
            }
        }
    });

}(window, jQuery));