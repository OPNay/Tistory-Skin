(function ($) {
	"use strict";
	
	var prev_mode, mode = 0,
		html = $('html');

	$(window).on('resize', function () {
		var width = window.innerWidth;

		if ((width >= 768)) {
			mode = 1;
		} else if ((width < 768)) {
			mode = 0;
		}

		if (prev_mode !== mode) {
			html.removeClass('desktop mobile')
				.addClass(mode === 0 ? 'mobile' : 'desktop');
			prev_mode = mode;
		}

		if (mode === 1) {
			if ((width >= 1300) && !html.hasClass('wide')) {
				html.addClass('wide');
			} else if ((width < 1300) && html.hasClass('wide')) {
				html.removeClass('wide');
			}
		}
	}).trigger('resize');

}(jQuery));
