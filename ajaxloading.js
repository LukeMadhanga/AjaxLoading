(function ($, count) {
    
    "use strict";
    
    var methods = {
        init: function (opts) {
            var T = this;
            if (T.length > 1) {
                // If the length is more than one, apply this function to all objects
                T.each(function() {
                    $(this).ajaxLoading(opts);
                });
                return T;
            } else if (!T.length || T.data('ajaxloading')) {
                // We have no objects return
                return T;
            }
            var data = {
                instanceid: ++count,
                s: $.extend({
                    animateSpeed: 200,
                    animateEase: 'swing'
                }, opts)
            };
            T.append('<div class="ajax-loading-bg"></div><div class="ajaxloading-loader"></div>').addClass('ajaxloading');
            T.data({ajaxloading: data});
        },
        /**
         * Show the loader
         */
        show: function () {
            var T = this;
            if (T.length > 1) {
                T.each(function () {
                    $(this).ajaxLoading('show');
                });
            }
            var data = T.data('ajaxloading');
            T.show().animate({opacity: 1}, data.s.animationSpeed, data.s.animateEase);
        },
        /**
         * Hide the loader
         */
        hide: function () {
            var T = this;
            if (T.length > 1) {
                T.each(function () {
                    $(this).ajaxLoading('hide');
                });
            }
            var data = T.data('ajaxloading');
            T.animate({opacity: 0}, data.s.animateSpeed, data.s.animateEase, function () {
                T.hide();
            });
        }
    };
    
    $(function () {
        // Auto initialise
        $('.ajaxloading').ajaxLoading();
    });

    $.fn.ajaxLoading = function(methodOrOpts) {
        if (methods[methodOrOpts]) {
            // The first option passed is a method, therefore call this method
            var aldata = this.data('ajaxloading');
            if (!aldata) {
                $.error('InvalidInstanceError: AjaxLoading - Cannot run ' + methodOrOpts + ' on an uninitialized object');
            }
            return methods[methodOrOpts].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (Object.prototype.toString.call(methodOrOpts) === '[object Object]' || !methodOrOpts) {
            // The default action is to call the init function
            return methods.init.apply(this, arguments);
        } else {
            // The user has passed us something dodgy, throw an error
            $.error(['The method ', methodOrOpts, ' does not exist'].join(''));
        }
    };
    
})(jQuery,0);
