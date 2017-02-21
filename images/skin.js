(function ($) {
	var $body = $('body'),
		$cover = $('.cover'),
		$wrap = $('.wrap'),
		$nav = $('.nav'),
		$side = $('.side'),
		$search = $('.side .search'),
		$page = $('.page'),
		$action = $('.action'),
		blog_link = $(location).attr('protocol') + "//" + $(location).attr('host');

	//For debuging
	$('s_t3').contents().unwrap();

	function addScroll(a,b) {a.scroll(b), b();}

	addScroll($wrap, $nav.scrollHandler = function () {
		if ($wrap.scrollTop() >= 86 && !$nav.hasClass('active')) {
			$nav.toggleClass('active', true);
		} else if ($wrap.scrollTop() < 86 && ($nav.hasClass('active'))) {
			$nav.toggleClass('active', false);
		}
	});

	$cover.active = function (a, b) {
		if(a) {
			$cover.click(function () {b(false);}).addClass('active', true);
		} else {
			$cover.removeClass('active').find('.card').html('');
		}
	};

	$cover.addFloating = function (a) {
		$cover.append($cover.find('.card').append(a.clone().removeClass('floating-data')));
	};

	// toggle Side menu
	$side.active = function (a) {
		$side.toggleClass('active', a);
		$cover.active(a,$side.active);
	};

	$('.nav .icon, .side .close').click(function () {
		$side.active(!($side.hasClass('active')));
	});

	// toggle Admin floating menu
	$('.admin.icon').click(function () {
		$cover.active(true,$cover.active);
		$cover.addFloating($(this).parent().find('.floating-data'));
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

	$action.click(function () {
		$('.wrap').animate({'scrollTop': '0'}, 250);
	});

	addScroll($wrap, $action.scrollHandler = function () {
		if ($wrap.scrollTop() !== 0 && $action.hasClass('hidden')) {
			$action.toggleClass('hidden', false);
		} else if ($wrap.scrollTop() === 0 && !($action.hasClass('hidden'))) {
			$action.toggleClass('hidden', true);
		}
	});

	$search.search = function () {
		var query = $('#query').val(),
			url = blog_link + '/search/' + query;

		if (query !== '') {$(location).attr('href', url);}
	};

	$search.find('#query').keypress(function (e) {
		if (e.keyCode === 13) {$search.search();}
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
	
	$('#secret').change(function() {
		if(this.checked){
			$(this).parent().find('.icon.secret').html('lock');
		}else{
			$(this).parent().find('.icon.secret').html('lock_open');
		}
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
