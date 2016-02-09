/*!
 * jumpAndEqualizeHeight v0.6
 * by Yury Ka
 *
 * More info:
 * ....later....
 *
 * Copyright 2015, 2016 Yury Karpov
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 */

(function( $ ) {
        $.fn.jumpAndEqualizeHeight = function(arrayElem, options) {


            options = $.extend({
                directParent: true
            }, options);

        var $wrap = this;

        $(arrayElem).each(function (index, elem){

            var $elem = $wrap.find(elem);
            var maxHeight = 0;

            var widthWrap = $wrap.outerWidth();

            var widthFirstLine = 0;
            var numberElemLine = 0;
            var firstLineElem = 0;
            var lastLineElem = 0;
            var numberLine = 0;

            if(options.directParent) {

                $elem.each(function (index, el) {
                    var $parentsArray = $(el).parentsUntil($wrap);
                    var $lastElement = $($parentsArray[$parentsArray.length - 1]);
                    widthFirstLine += $lastElement.innerWidth();

                    if (widthWrap < widthFirstLine) {
                        numberElemLine = index;

                        return false;
                    }

                });

            } else {
                console.log('TODO: function not yet implemented');
                return false;
            }

            lastLineElem = numberElemLine;
            numberLine = $elem.length / numberElemLine;

            var funAlignLine = function () {

                for (var i = firstLineElem; i < lastLineElem; i++) {
                    var itemHeight = $($elem[i]).height();

                    maxHeight = itemHeight > maxHeight ? itemHeight : maxHeight;
                }

                if ($elem[0].tagName === 'IMG') {
                    //если это картинка
                    for (var i = firstLineElem; i < lastLineElem; i++) {
                        var itemHeight = $($elem[i]).height();
                        if (itemHeight < maxHeight) {
                            var margin = maxHeight - itemHeight;
                            $($elem[i]).css('margin-bottom', margin);
                        }
                    }

                } else {
                    //что-то другое
                    for (var i = firstLineElem; i < lastLineElem; i++) {

                        $($elem[i]).height(maxHeight);
                    }
                }

                maxHeight = 0;
                firstLineElem += numberElemLine;

                if ((lastLineElem + numberElemLine) < $elem.length) {
                    lastLineElem += numberElemLine;
                } else {
                    lastLineElem = $elem.length;
                }


            };
            $elem.height('');
            for (var i = 0; i < numberLine; i++) {
                funAlignLine();
            }


        });
    }

})(jQuery);
