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
	let cover = $("<div class='cover'>");
	createCover = function (a) {
		if (typeof a == 'undefined') a = function () {destroyCover(true)};
		cover.click(a);
		$drawer.after(cover);
	};
	
	appendCard = function (a) {
		cover.append($("<div  class='card'>").html(a.clone().removeClass('card-data')));
	}

	destroyCover = function (a) {
		a ? cover.html('').remove() : cover.html('');
	};
	
	/**********
	 * Toggle Drawer
	 **********/
	toggleDrawer = function (a) {
		$drawer.toggleClass('active',a);

		if ($drawer.hasClass('active')) {
			createCover(function () {toggleDrawer(false);});
		} else
			destroyCover(true);
	};
	$('.nav .menu, .drawer .close .btn').click(toggleDrawer);

	/**********
	 * Toggle Admin Menu
	 **********/
	$('.admin .btn').click(function () {
		createCover(); appendCard($(this).parent().find('.card-data'));
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
    search = function (ei) {
        var query = $(ei).val().trim(); // Trim will remove space of start and end position
        
        // Tistory search function. (http://blog.tistory.com/search/value%20to%20search)
		if (query !== '') {location.href = encodeURI(location.origin + '/search/' + query);}
    };
    
    $('.search .btn').click(function () {
        has = $('.search').hasClass('active');
        $('.search').toggleClass('active', !has);
        if (!has) {
            $('.search .input').focus().keypress(function (e) {
                if (e.keyCode === 13) {search(this);}
            });
        }
        if ($h.hasClass('mobile')) {
            $('.nav .title').toggleClass('none', !has);
        }
    });
	
	/**********
	 * Drawer Menu
	 **********/
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
	
	/**********
	 * Comment
	 **********/
	$('#secret').change(function() {
		$(this).parent().find('.btn.secret').html(this.checked ? 'lock' : 'lock_open');
	});

	$('.comment .textarea').on('keyup keydown', function () {
		if (this.scrollHeight > 64)
			$(this).css('height','1px').css('height', this.scrollHeight + 'px');
	});

	/**********
	 * Entry
	 **********/
	$('.entry').ready(function () {
		// Tags
		let $tags = $('.tag');
		$tags.html($tags.html().replace(/\,/g,'')).find('a').addClass('item');
	});

	/**********
	 * Window
	 **********/
	function chkWindow() {
		if (($w.width() >= 1024) && !$h.hasClass('desktop')) {
			console.log('Change Window size to Desktop');
			$h.addClass('desktop').removeClass('tablet mobile');
			toggleDrawer(false);
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

	return true;
}(jQuery));
