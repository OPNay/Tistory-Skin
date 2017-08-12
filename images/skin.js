(function ($) {
	let $win = $(window),
		$html = $('html'),
		$body = $('body'),
		$content = $('.content'),
		$nav = $('.nav'),
		$side = $('.side'),
		$search = $('.side .search'),
		$page = $('.page');

	//For debuging
	$('s_t3').contents().unwrap();

	function addScroll(a,b) {return a.scroll(b) && b();}

	/* Nav shadow */
	addScroll($win, function () {
		if ($win.scrollTop() === 0)
			$nav.toggleClass('shadow',false);
		else if (!$nav.hasClass('shadow'))
			$nav.toggleClass('shadow',true);
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
		let a = $('html');
		if (a.hasClass('desktop')) {$side.toggleClass('active',false);}
		else {$side.toggleClass('active');}

		if ($side.hasClass('active')) {
			createCover();
			$('.cover').click(function () {activeNav(false);});
		} else
			destroyCover();
	};
	$('.nav .menu, .side .close .btn').click(activeNav);

	// toggle Admin floating menu
	$('.admin .btn').click(function () {
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
		$search.find('#query ~ .btn').click($search.search);
	});
	
	$side.ready(function () {
		// side menu items
		$side.find('ul').addClass('list').find('a').addClass('item');
		$('.list > li > ul > li > ul a').addClass('subitem ft-black-sec');

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
		$(this).parent().find('.btn.secret').html(this.checked ? 'lock' : 'lock_open');
	});

	// Entry
	$('.entry').ready(function () {
		// Tags
		$tags = $('.tags');
		$tags.html($tags.html().replace(/\,/,'')).find('a').addClass('item');
	});

	// Auto Resize textarea
	$('.textarea').on('keyup keydown', function () {
		if (this.scrollHeight > 64)
			$(this).css('height','1px').css('height', this.scrollHeight + 'px');
	});

	// window size
	$win = $(window);
	function chkWindow() {
		let a = $('html');
		if (($win.width() >= 1024) && !a.hasClass('desktop')) {
			console.log('Change Window size to Desktop');
			a.addClass('desktop').removeClass('tablet mobile');
			activeNav();
			destroyCover();
		} else if (($win.width() >= 768) && ($win.width() < 1024) && !a.hasClass('tablet')) {
			console.log('Change Window size to Tablet');
			a.addClass('tablet').removeClass('desktop mobile');
		} else if (($win.width() < 768) && !a.hasClass('mobile')) {
			console.log('Change Window size to Mobile');
			a.addClass('mobile').removeClass('desktop tablet');
		}

		if (($win.width() >= 1300) && !a.hasClass('wide')) {
			a.addClass('wide');
		} else if (($win.width() < 1300) && a.hasClass('wide')) {
			a.removeClass('wide');
		}
	}
	$win.resize(chkWindow); chkWindow();

	return true;
}(jQuery));
