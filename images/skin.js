(function ($) {
	var $body = $('body'),
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
	
	createCover = function (a) {
		$side.after("<div class=\"cover\"></div>"), $('.cover').click(destroyCover);
		console.log(a);
		if (a) {
				$('.cover').append($('<div class=\"card\"></div>').html(a.clone().removeClass('floating-data')));
		}
	};

	destroyCover = function () {
		$('.cover').remove();
	};
	
	// Toggle side menu
	activeNav = function () {
		$side.toggleClass('active');
		if ($side.hasClass('active')) {
			createCover();
			$('.cover').click(function () {activeNav(false);});
		} else
			destroyCover();
	};
	$('.nav .menu, .side .close .button').click(activeNav);

	// toggle Admin floating menu
	$('.admin.icon').click(function () {
		createCover($(this).parent().find('.floating-data'));
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
