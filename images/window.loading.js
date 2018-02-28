(function ($) {
    'use strict';
    var cdiv = function (cname) { return $('<div>', {'class': cname}); };
    $('body').append(cdiv('loader-bg').append(cdiv('loader-wrap').append(cdiv('loader'))));
    window.onload = function () { $('.loader-bg').addClass('done'); };
}(jQuery));