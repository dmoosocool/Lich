/**
 * Created by guoxin on 2017/8/14.
 */

;(function (global, $, undefined) {

    var test = Lich.extends({
        events: {
            'click body .test': 'E_ClickBodyTest'
        },

        init: function () {
            console.log('this is Test.');
        }
    });

    console.log(test);
}(window, jQuery));