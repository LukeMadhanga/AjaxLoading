(function ($, count) {
    
    var methods = {
        init: function (opts) {
            var T = this;
            if (T.length > 1) {
                // If the length is more than one, apply this function to all objects
                T.each(function() {
                    $(this).ajaxLoading(opts);
                });
                return T;
            } else if (!T.length || T.data('ajaxloadingdata')) {
                // There are no objects or
                // This object has already been instantiated
                return T;
            }
            var data = {
                instancecount: ++count,
                s: $.extend({
                    fadespeed: 500,
                    updateprogress: false
                }, opts)
            };
            
            T.append('<div class="ajloader"></div><div class="ajloader-overlay"></div>');
            
            T.data('ajaxloadingdata', data).addClass('ajloaderparent');
            return T;
        },
        show: function () {
            var data = this.data('ajaxloadingdata');
            if (!data) {
                throw new ex('InstanceError', 'This object has not been initialised');
            }
            if (!this.is(':visible')) {
                this.show().animate({opacity: 1}, data.s.fadespeed);
            }
        },
        hide: function () {
            var T = this,
            data = this.data('ajaxloadingdata');
            if (!data) {
                throw new ex('InstanceError', 'This object has not been initialised');
            }
            if (this.is(':visible')) {
                this.animate({opacity: 0}, data.s.fadespeed, 'swing', function () {
                    T.hide();
                });
            }
        },
        updateProgress: function (e) {
            var T = this;
//            if (!T.s.showProgress) {
//                console.warn('Did not set the option showProgress to true');
//            }
            if (e.lengthComputable) {
                var pct = e.loaded / e.total;
                $('.ajax-loading-progress', T).css({width: 0});
                $('.ajax-loading-progress', T).css({width: Math.round(pct * 100) + "%"});
            } else {
                $('.ajax-loading-progress', T).css({width: 0});
            }
        }
    };
    
    /**
     * Exception Object
     * @param {string} exceptiontype The name of the exception to replace xxx in the string "Uncaught AjaxLoading::xxx - message"
     * @param {string} message The exception message
     * @returns {AjaxLoading::Exception}
     */
    function ex(exceptiontype, message) {
        return {
            name: 'CarregForm::' + exceptiontype,
            level: "Cannot continue",
            message: message,
            htmlMessage: message,
            toString: function() {
                return ['Error: CarregForm::', exceptiontype, ' - ', message].join('');
            }
        };
    }

    $.fn.ajaxLoading = function(methodOrOpts) {
        if (methods[methodOrOpts]) {
            // The first option passed is a method, therefore call this method
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