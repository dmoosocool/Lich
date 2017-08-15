/**
 * Created by guoxin on 2017/8/14.
 */

;(function (global, $, undefined) {

    var test = Lich.extends({
        events: {
            'click body .hhhh': 'E_ClickBodyTestasd'
        },

        handlers: {
            'E_ClickBodyTestasd': function (data) {
                console.log(data);
            }
        },

        init: function () {
            // console.log('this is Test.');
        }
    });

    // console.log(test);
}(window, jQuery));