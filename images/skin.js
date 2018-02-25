(function ($) {
	"use strict";
	
	var prev = 0, size = 0,
		html = $('html');

	$(window).on('resize', function () {
		var width = window.innerWidth;

		if (width >= 1300) {
			size = 'normal wide';
		} else if (width >= 768) {
			size = 'normal';
		} else {
			size = 'small';
		}

		if (prev !== size) {
			html.removeClass('small normal wide')
				.addClass(size.toString());
			prev = size;
		}

	}).trigger('resize');

	$('.s_search .s_btn').on('click', function () {
		html.toggleClass('func_search');
	});
	
	$('#s_post_search').on('keypress', function (e) {
		var query = $(this).val().trim();
		if (e.keyCode === 13 && query !== '') {
			location.href = encodeURI(location.origin + '/search/' + query);
		}
	});

}(jQuery));
