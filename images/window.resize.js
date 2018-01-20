(function ($) {
    "use strict";
	var prev_mode = 0,
        mode = 0, // 0: mobile, 1: tablet, 2: desktop
        resizeWin = function () {
			var a = $('html'), width = window.innerWidth;
			if ((width >= 1024)) {
                mode = 2;
			} else if ((width >= 768) && (width < 1024)) {
                mode = 1;
			} else if ((width < 768)) {
                mode = 0;
			}

            if (prev_mode !== mode) {
                a.removeClass('desktop tablet mobile')
                    .addClass(mode === 0 ? 'mobile' : (mode === 1 ? 'tablet' : 'desktop'));
                if (mode === 2) {
				    // side always show
				    $('.side').toggleClass('active', false);
                    $('.cover').remove();

                    if ((width >= 1300) && !a.hasClass('wide')) {
                        a.addClass('wide');
                    } else if ((width < 1300) && a.hasClass('wide')) {
                        a.removeClass('wide');
                    }
                }
                prev_mode = mode;
            }
		};

	// Add resize trigger and Run when load document
	$(window).resize(resizeWin);
    resizeWin();
})(jQuery);
