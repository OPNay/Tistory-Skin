(function ($) {
	let $w = $(window), $h = $('html'), $b = $('body'),
		$content = $('.content'),
		$nav = $('.nav'),
		$drawer = $('.drawer'),
		$search = $('.drawer .search'),
		$page = $('.page');

	//For debuging
	$('s_t3').contents().unwrap();

	function addScroll(a,b) {return a.scroll(b) && b();}

	/**********
	 * Toolbar Shadow
	 **********/
	addScroll($w, function () {
		if ($w.scrollTop() === 0)
			$nav.toggleClass('shadow',false);
		else if (!$nav.hasClass('shadow'))
			$nav.toggleClass('shadow',true);
	});
	
	/**********
	 * Cover
	 **********/
	createCover = function () {
		let ea = $("<div class='cover'>");
		ea.click(function () {destroyCover(true);});
		$drawer.after(ea);
	};
	
	appendCard = function (a) {
		let ea = $('.cover');
		ea.append($("<div  class='card'>").html(a.clone().removeClass('floating-data')));
	}

	destroyCover = function (a) {
		$(a ? '.cover' : '.cover .card').remove();
	};
	
	/**********
	 * Toggle Drawer
	 **********/
	activeDrawer = function () {
		if ($h.hasClass('desktop')) {$drawer.toggleClass('active',false);}
		else {$drawer.toggleClass('active');}

		if ($drawer.hasClass('active')) {
			createCover();
			$('.cover').click(function () {activeDrawer(false);});
		} else
			destroyCover(true);
	};
	$('.nav .menu, .drawer .close .btn').click(activeDrawer);

	// toggle Admin floating menu
	$('.admin .btn').click(function () {
		createCover(); appendCard($(this).parent().find('.floating-data'));
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
	
	$drawer.ready(function () {
		// side menu items
		$drawer.find('ul').addClass('list').find('a').addClass('item');
		$('.list > li > ul > li > ul a').addClass('subitem ft-black-sec');

		var pathname = decodeURI(location.pathname.replace(/^\//, '')).split('/');
		$('.drawer .item').each(function () {$(this).html($(this).html().trim().replace(/\t/g,''));});

		if (pathname[0] === 'category' && pathname[1]) {
			var name = (pathname[2] || pathname[1]);
			$drawer.find('li a').each(function (index) {
				if (name === $(this).text().replace(/\s+\(\d+\)$/g, '')) {
					$(this).addClass('accent');
				}
			});
		} else {$drawer.find('.item[href="/' + pathname[0] + '"]').addClass('accent');}
	});
	
	$('#secret').change(function() {
		$(this).parent().find('.btn.secret').html(this.checked ? 'lock' : 'lock_open');
	});

	// Entry
	$('.entry').ready(function () {
		// Tags
		let $tags = $('.tag');
		$tags.html($tags.html().replace(/\,/g,'')).find('a').addClass('item');
	});

	// Auto Resize textarea
	$('.textarea').on('keyup keydown', function () {
		if (this.scrollHeight > 64)
			$(this).css('height','1px').css('height', this.scrollHeight + 'px');
	});

	// window size
	function chkWindow() {
		if (($w.width() >= 1024) && !$h.hasClass('desktop')) {
			console.log('Change Window size to Desktop');
			$h.addClass('desktop').removeClass('tablet mobile');
			activeDrawer();
			destroyCover();
		} else if (($w.width() >= 768) && ($w.width() < 1024) && !$h.hasClass('tablet')) {
			console.log('Change Window size to Tablet');
			$h.addClass('tablet').removeClass('desktop mobile');
		} else if (($w.width() < 768) && !$h.hasClass('mobile')) {
			console.log('Change Window size to Mobile');
			$h.addClass('mobile').removeClass('desktop tablet');
		}

		if (($w.width() >= 1300) && !$h.hasClass('wide')) {
			$h.addClass('wide');
		} else if (($w.width() < 1300) && $h.hasClass('wide')) {
			$h.removeClass('wide');
		}
	}
	$w.resize(chkWindow); chkWindow();

	function init() {
		$.getScript('window.resize.js', function () {
			
		});
	}
	window.skin = this;

	return true;
}(jQuery));
