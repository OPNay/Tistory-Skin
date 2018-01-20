(function ($) {
	'use strict';
	var $w = $(window), $h = $('html'), $b = $('body'),
		$content = $('.content'),
		$nav = $('.nav'),
		$side = $('.side'),
		$search = $('.side .search'),
		$page = $('.page'),
		$tag = $('.tag'),
		cdiv = function (cname) { return $('<div>', {'class' : cname}); };

	//For debuging
	$('s_t3').contents().unwrap();

	function addScroll(a, b) { return a.scroll(b) && b(); }

	/**********
	 * Toolbar Shadow
	 **********/
	addScroll($w, function () {
		if ($w.scrollTop() === 0) {
			$nav.toggleClass('shadow', false);
		} else if (!$nav.hasClass('shadow')) {
			$nav.toggleClass('shadow', true);
		}
	});
	
	/**********
	 * Cover
	 **********/
	var cover = $("<div class='cover'>"),
		destroyCover = function (a) {
			return a ? cover.html('').remove() : cover.html('');
		},
		createCover = function (a) {
			if (typeof a === 'undefined') { a = function () { destroyCover(true); }; }
			cover.click(a);
			$side.after(cover);
		},
		appendCard = function (a) {
			cover.append($("<div  class='card'>").html(a.clone().removeClass('card-data')));
		};
	
	/**********
	 * Toggle Drawer
	 **********/
	var toggleDrawer = function (a) {
		$side.toggleClass('active', a);

		if ($side.hasClass('active')) {
			createCover(function () { toggleDrawer(false); });
		} else {
			destroyCover(true);
		}
	};
	$('.nav .menu, .side .close .btn').click(toggleDrawer);

	/**********
	 * Toggle Admin Menu
	 **********/
	$('.admin .btn').click(function () {
		createCover();
		appendCard($(this).parent().find('.card-data'));
	});

	/**********
	 * Page Indicator
	 **********/
	$page.ready(function () {
		if ($page.find('.num').length <= 1) {
			$page.remove();
		} else {
			$page.find('.selected').unwrap().addClass('btn num selected');
		}
	});

	/**********
	 * Search Function
	 **********/
	var search = function (ei) {
		var query = $(ei).val().trim(); // Trim will remove space of start and end position
		
		// Tistory search function. (http://blog.tistory.com/search/value%20to%20search)
		if (query !== '') { location.href = encodeURI(location.origin + '/search/' + query); }
	};
	
	$('.search .btn').click(function () {
		var has = $('.search').hasClass('active');
		$('.search').toggleClass('active', !has);
		if (!has) {
			$('.search .input').focus().keypress(function (e) {
				if (e.keyCode === 13) { search(this); }
			});
		}
		if ($h.hasClass('mobile')) {
			$('.nav .title').toggleClass('none', !has);
		}
	});
	
	/**********
	 * Drawer Menu
	 **********/
	$side.ready(function () {
		// side menu items
		$side.find('ul').addClass('list').find('a').addClass('item ft-black');
		$('.list > li > ul > li > ul a').addClass('subitem ft-black-sec');

		var pathname = decodeURI(location.pathname.replace(/^\//, '')).split('/');
		$('.side .item').each(function () { $(this).html($(this).html().trim().replace(/\t/g, '')); });

		if (pathname[0] === 'category' && pathname[1]) {
			var name = (pathname[2] || pathname[1]);
			$side.find('li a').each(function (index) {
				if (name === $(this).text().replace(/\s+\(\d+\)$/g, '')) {
					$(this).addClass('accent');
				}
			});
		} else { $side.find('.item[href="/' + pathname[0] + '"]').addClass('accent'); }
	});
	
	/**********
	 * Comment
	 **********/
	$('#secret').change(function () {
		$(this).parent().find('.btn.secret').html(this.checked ? 'lock' : 'lock_open');
	});

	$('.comment .textarea').on('keyup keydown', function () {
		if (this.scrollHeight > 64) { $(this).css('height', '1px').css('height', this.scrollHeight + 'px'); }
	});

	/**********
	 * Entry
	 **********/
	$('.entry').ready(function () {
		$tag.html($tag.html().replace(/\,/g, ''));
	});

	return true;
}(jQuery));
