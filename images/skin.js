(function ($) {
	var $body = $('body'),
		$cover = $('<div id="cover">'),
		$nav = $('#nav'),
		$side = $('#side'),
		$search = $('#search'),
		$page = $('#page'),
		$botbtn = $('#bot-btn'),
		blog_link = $(location).attr('protocol') + "//" + $(location).attr('host');

	$body.scrollable = function (can) {$body.toggleClass('scroll-hidden', !can);};

	$nav.scrollHandler = function () {
		if ($(window).scrollTop() >= 100 && $nav.hasClass('transparent')) {
			$nav.toggleClass('transparent', false);
		} else if ($(window).scrollTop() < 100 && !($nav.hasClass('transparent'))) {
			$nav.toggleClass('transparent', true);
		}
	};

	$(window).scroll($nav.scrollHandler);
	$nav.scrollHandler();

	$cover.animate = function (run) {
		if (run === true) {
			$body.scrollable(false);
			this.appendTo($body)
				.click(function () {$cover.animate(false);})
				.toggleClass('animate', true);

			var tmp = $('.floating-data.use');
			if (tmp.length > 0) {
				$cover.toggleClass('f', true);
				$cover.append('<div class="card floating">').find('.card.floating')
					.html(tmp.removeClass('use').clone().removeClass('floating-data'));
			}
		} else if (run === false) {
			$body.scrollable(true);
			$cover.toggleClass('animate f', false).find('.card.floating').remove();
			$side.toggleClass('animate', false);
			$body.find('#cover').remove();
		} else {
			console.log('Error while animte cover');
		}
	}

	$side.animate = function (run) {
		$side.toggleClass('animate', run);
		$cover.animate(run);
	};

	// toggle Side menu
	$nav.find('.icon').click(function () {
		return $side.animate(!($cover.hasClass('animate')));
	});

	// toggle Admin floating menu
	$('.admin .fa-bars').click(function () {
		$(this).parent().find('.floating-data').addClass('use');
		$cover.animate(true);
	});

	// Side menu init
	$side.ready(function () {
		$side.find('ul').addClass('list').find('a').addClass('item');
		$('.list > li > ul > li > ul').addClass('subcategory').find('a').addClass('subitem');
	});

	// Page init
	$page.ready(function () {
		if ($page.find('.num').length <= 1) {
			$page.remove();
		} else {
			var selected = $page.find('.selected'), parent = selected.parent();
			parent.after(selected.addClass('btn num selected'));
			parent.remove();
		}
	});

	$botbtn.find('.fa-arrow-up').click(function () {
		$('html, body').animate({'scrollTop': '0'}, 250);
	});

	$botbtn.scrollHandler = function () {
		if ($(window).scrollTop() !== 0 && $botbtn.hasClass('hidden')) {
			$botbtn.toggleClass('hidden', false);
		} else if ($(window).scrollTop() === 0 && !($botbtn.hasClass('hidden'))) {
			$botbtn.toggleClass('hidden', true);
		}
	};

	$(window).scroll($botbtn.scrollHandler);
	$botbtn.scrollHandler();

	$search.search = function () {
		var query = $('#query').val(),
			url = blog_link + '/search/' + query,
			pathname = decodeURI($(location).attr('pathname').replace(/^\//, '')).split('/');

		if (query === '') {return false;}

		if ((pathname === 'search') || (pathname === 'category') || (pathname === 'archive')) {
			$(location).attr('href', url);
		} else {
			$.ajax({
				url: url,
				success: function (data, a, b) {
					var $s_list = $(data).find('#search_list').clone(),
						$s_page = $(data).find('#page').clone();
					$('#search_list, #search_list ~ #page').remove();
					if ($s_list.find('.card-list a').length > 0) {
						$search.after($s_list, $s_page);
					}
				}
			});
		}
	};

	$search.find('#query').keypress(function (e) {
		(e.keyCode === 13) && $search.search();
	});
	$search.find('#query ~ .button').click($search.search);

	$side.ready(function () {
		var pathname = decodeURI($(location).attr('pathname').replace(/^\//, '')).split('/');

		if (pathname[0] === 'category' && pathname[1]) {
			var name = (pathname[2] || pathname[1]);
			$side.find('li a').each(function (index) {
				if (name === $(this).text().replace(/\s\(\d+\)$/g, '')) {
					$(this).addClass('accent');
				}
			});
		} else {$side.find('li a[href="/' + pathname[0] + '"]').addClass('accent');}
	});
	return true;
}(jQuery));
