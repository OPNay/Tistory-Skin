(function ($) {
	"use strict";
	
	var prev = 0, size = 0,
		html = $('html');

// Header Image
	if (html.data('images-random')) {
		$(window).on('load', function () {
			var images = html.data('images');
			$('.s_head').css('background-image', 'url(images/' + images[$.now() % images.length] + ')');
		});
	}

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

		$('.s_cover .s_cat').css('max-height', window.innerHeight - 84);
	}).trigger('resize');

	$('.s_btn.search').on('click', function () {
		html.toggleClass('func_search');
		$('.s_input').focus();
	});
	
	$('.s_input').on('keypress', function (e) {
		var query = $(this).val().trim();
		if (e.keyCode === 13 && query !== '') {
			location.href = encodeURI(location.origin + '/search/' + query);
		}
	});
	
	$('.s_btn.menu').on('click', function () {
		html.toggleClass('func_menu');
	});
	
	$('.s_cover').on('click', function (e) {
		if (e.target === e.currentTarget) {
			html.toggleClass('func_menu');
		}
	});
//	
//	if (window.location.pathname !== "/" || $('.post').length > 0) {
//		var url = $('meta[property="og:image"]').attr('content').replace(/image/g, "original");
//		if (url.indexOf('uf.tistory.com') > 0) {
//			$('.s_head').css('background-image', "url('" + url + "')");
//		}
//	}

}(jQuery));
