(function ($) {
	"use strict";
	
	var prev = 0, size = 0,
		html = $('html');

// Header Image
// Want to use this, Set 'data-images-random' as "true" on skin.html
	if (html.data('images-random')) {
		$(window).on('load', function () {
			var images = html.data('images');
			$('.s_head').css('background-image', 'url(' + resURL + 'images/' + images[$.now() % images.length] + ')');
		});
	}

// Resize page width
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

// Search button func
	$('.blog_link .search').on('click', function () {
		html.toggleClass('func_search');
		$('.s_input').focus();
	});

// Search input func
	$('.s_input').on('keypress', function (e) {
		var query = $(this).val().trim();
		if (e.keyCode === 13 && query !== '') {
			location.href = encodeURI(location.origin + '/search/' + query);
		}
	});

// Category menu func
	$('.blog_link .menu').on('click', function () {
		html.toggleClass('func_menu');
	});
	
	$('.s_cover').on('click', function (e) {
		if (e.target === e.currentTarget) {
			html.toggleClass('func_menu');
		}
	});
	
	$('.s_more').on('click', function (e) {
		$(this).toggleClass('less');
		$('.s_v_list').toggleClass('more', $(this).hasClass('less'));
	});
//	
//	if (window.location.pathname !== "/" || $('.post').length > 0) {
//		var url = $('meta[property="og:image"]').attr('content').replace(/image/g, "original");
//		if (url.indexOf('uf.tistory.com') > 0) {
//			$('.s_head').css('background-image', "url('" + url + "')");
//		}
//	}

}(jQuery));
