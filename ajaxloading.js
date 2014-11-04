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
            } else if (!T.length) {
                // We have no objects return
                return T;
            }
            if (T.data('ajaxloadingid')) {
                // We have already been initialised
                return T;
            }
            T.s = $.extend({
                backgroundCSS: {},
                loadingGif: 'data:image/gif;base64,R0lGODlhEAALAPQAAP///83Nzfj4+Pb29vv7+87Ozs3NzdbW1ufn5+Dg4PLy8tTU1Nzc3Ojo6OHh4fLy8tXV1c7Oztzc3Pr6+vf39/39/djY2Pj4+Pz8/PHx8ezs7PX19fz8/M3Nzc3Nzc3NzSH5BAkLAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7',
                loadingImageCSS: {},
                showProgress: false,
                progressCSS: {}
            }, opts);
            T.append('<img src="' + T.s.loadingGif + '"/><div class="ajax-loading-bg"></div>');
            if (T.s.showProgress) {
                T.append("<div class='ajax-loading-progress'></div>");
                $('.ajax-loading-progress', T).css($.extend({
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    height: '10px',
                    background: '#000'
                }, T.s.progressCSS));
            }
            T.css({
                display: 'none',
                position: 'fixed',
                left: 0,
                top: 0,
                margin: 0,
                width: '100%',
                height: '100%'
            });
            $('#ajax-loading-bg', T).css($.extend({
                width: '100%',
                height: '100%',
                background: T.s.backgroundColor,
                opacity: T.s.backgroundOpacity
            }, T.s.backgroundCSS));
            $('img', T).css($.extend({
                position: 'absolute',
                padding: '20px 40px',
                'border-radius': '2px',
                background: '#000000',
                top: '50%',
                left: '50%',
                margin: '-10px -20px'
            }, T.s.loadingImageCSS));
            var alid = ++count;
            T.attr({'data-ajaxloadingid': alid});
            cache[alid] = T;
        },
        show: function () {
            this.show();
        },
        hide: function () {
            this.hide();
        },
        updateProgress: function (e) {
            var T = this;
            if (!T.s.showProgress) {
                console.warn('Did not set the option showProgress to true');
            }
            if (e.lengthComputable) {
                var pct = e.loaded / e.total;
                $('.ajax-loading-progress', T).css({width: 0});
                $('.ajax-loading-progress', T).css({width: Math.round(pct * 100) + "%"});
            } else {
                $('.ajax-loading-progress', T).css({width: 0});
            }
        }
    };
    var cache = {};
    
    /**
     * Get this object from the cache
     * @param {object(jQuery)} elem The object to test
     * @returns {object(jQuery)} Either the jQuery object from the cache, or elem if a cache entry does not exist
     */
    function getThis(elem) {
        var index = elem.data('ajaxloadingid');
        return index||index===0 ? cache[index] : elem;
    }

    $.fn.ajaxLoading = function(methodOrOpts) {
        var T = getThis(this);
        if (methods[methodOrOpts]) {
            // The first option passed is a method, therefore call this method
            return methods[methodOrOpts].apply(T, Array.prototype.slice.call(arguments, 1));
        } else if (Object.prototype.toString.call(methodOrOpts) === '[object Object]' || !methodOrOpts) {
            // The default action is to call the init function
            return methods.init.apply(T, arguments);
        } else {
            // The user has passed us something dodgy, throw an error
            $.error(['The method ', methodOrOpts, ' does not exist'].join(''));
        }
    };
    
})(jQuery,0);