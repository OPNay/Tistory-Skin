(function ($) {
	var $body = $('body'),
		$cover = $('.cover'),
		$content = $('.content'),
		$nav = $('.nav'),
		$side = $('.side'),
		$search = $('.side .search'),
		$page = $('.page');

	//For debuging
	$('s_t3').contents().unwrap();

	function addScroll(a,b) {a.scroll(b), b();}

	addScroll($content, function () {
		if ($content.scrollTop() >= 86 && !$nav.hasClass('active')) {
			$nav.toggleClass('active', true);
		} else if ($content.scrollTop() < 86 && ($nav.hasClass('active'))) {
			$nav.toggleClass('active', false);
		}
	});

	$cover.active = function (a, b) {
		$cover.toggleClass('active', a);
		if(a) {
			$cover.click(function () {b(false);});
		} else {
			$cover.find('.card').html('');
		}
	};

	$cover.addFloating = function (a) {
		$cover.append($cover.find('.card').html(a.clone().removeClass('floating-data')));
	};

	// Toggle side menu
	$side_btn = $('.nav .menu, .side .close .button');
	activeNav = function (a) {
		console.log(a);
		$side.toggleClass('active', a);
		$side.hasClass('active') ? (function () {$side.after("<div class=\"cover\"></div>"), $('.cover').click(activeNav);})() : $('.cover').remove();
	};
	$side_btn.click(function () {activeNav(!$side.hasClass('active'));});

	// toggle Admin floating menu
	$('.admin.icon').click(function () {
		$cover.active(true,$cover.active);
		$cover.addFloating($(this).parent().find('.floating-data'));
	});

	// Page init
	$page.ready(function () {
		if ($page.find('.num').length <= 1) {
			$page.remove();
		} else {
			$page.find('.selected').unwrap().addClass('btn num selected');
		}
	});

	// Search
	$search.ready(function () {
		$search.search = function () {
			var query = $('#query').val();
			if (query !== '') {location.href = encodeURI(location.origin + '/search/' + query);}
		};

		$search.find('#query').keypress(function (e) {
			if (e.keyCode === 13) {$search.search();}
		});
		$search.find('#query ~ .button').click($search.search);
	});
	
	$side.ready(function () {
		// side menu items
		$side.find('ul').addClass('list').find('a').addClass('item');
		$('.list > li > ul > li > ul a').addClass('subitem');

		var pathname = decodeURI(location.pathname.replace(/^\//, '')).split('/');
		$('.side .item').each(function () {$(this).html($(this).html().trim().replace(/\t/g,''));});

		if (pathname[0] === 'category' && pathname[1]) {
			var name = (pathname[2] || pathname[1]);
			$side.find('li a').each(function (index) {
				if (name === $(this).text().replace(/\s+\(\d+\)$/g, '')) {
					$(this).addClass('accent');
				}
			});
		} else {$side.find('.item[href="/' + pathname[0] + '"]').addClass('accent');}
	});
	
	$('#secret').change(function() {
		$(this).parent().find('.icon.secret').html(this.checked ? 'lock' : 'lock_open');
	});

	// window size
	$win = $(window);
	function chkWindow() {
		if (($win.width() >= 1024) && !$body.hasClass('desktop')) {
			console.log('Change Window size to Desktop');
			$body.addClass('desktop').removeClass('tablet mobile');
			$side.active(false);
		} else if (($win.width() >= 768) && ($win.width() < 1024) && !$body.hasClass('tablet')) {
			console.log('Change Window size to Tablet');
			$body.addClass('tablet').removeClass('desktop mobile');
		} else if (($win.width() < 768) && !$body.hasClass('mobile')) {
			console.log('Change Window size to Mobile');
			$body.addClass('mobile').removeClass('desktop tablet');
		}
	}
	$win.resize(chkWindow), chkWindow();

	return true;
}(jQuery));
