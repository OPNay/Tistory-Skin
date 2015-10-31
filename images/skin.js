var body = $('body'),
	cover = $('#cover'),
	nav = $('#nav'),
	side = $('#side'),
	search = $('#search'),
	page = $('#page'),
	botbtn = $('#bot-btn');

function disableScroll(a) {
	body.toggleClass('scroll-hidden',a);
}

function nav_transparent() {
	if (($(window).scrollTop() >= 100 && nav.hasClass('transparent'))
		|| ($(window).scrollTop() < 100 && !nav.hasClass('transparent')))
		nav.toggleClass('transparent');
}

function updateCover(a) {
	disableScroll(false);
	cover.toggleClass('active f', false);
	side.toggleClass('active',false);

	switch(a) {
	case 'side':
		disableScroll(true);
		cover.toggleClass('active',true);
		side.toggleClass('active',true);
		break;
	case 'floating':
		disableScroll(true);
		cover.toggleClass('active f',true);
		cover.find('.card.floating')
			.html($('.floating-data.use').removeClass('use').clone().removeClass('floating-data'));
		break;
	default:
		cover.find('.card.floating').html('');
	}
};

$(document).ready(function () {
// nav
	$(window).scroll(nav_transparent);
	nav_transparent();
// Nav menu
	$('#nav .icon').click(function () {
		if(!cover.hasClass('active'))
			updateCover('side');
		else
			updateCover('off');
	});
	cover.click(function () {updateCover('off')});

// Floating
	$('.admin .fa-bars').click(function () {
		if(!cover.hasClass('active')) {
			$(this).parent().find('.floating-data').addClass('use');
			updateCover('floating');
		} else
			updateCover('off');
	});
});

side.ready(function() {
	side.find('li[class*="t_menu"]').parent().addClass('blogmenu');
	side.find('a[href="/category"]').parent().parent().addClass('category');
	$('.blogmenu a, .category a').addClass('item');
	
	$('.category > li > ul > li > ul').addClass('subcategory')
		.find('a').addClass('subitem');
});


// Page
function f_page(a) {
	var num = a.find('.num');
	if(num.length <= 1) { a.remove(); return; }
	else {
		var selected = a.find('.selected'), parent = selected.parent();
		parent.after(selected.addClass('btn num'));
		parent.remove();
	}
}

page.ready(function() {f_page(page)});

// Bottom button
function buttom_btn_toggle() {
	if (($(window).scrollTop() != 0 && botbtn.hasClass('hidden'))
		|| $(window).scrollTop() == 0 && !botbtn.hasClass('hidden'))
		botbtn.toggleClass('hidden');
}

botbtn.ready(function () {
	var b_arrow_up = botbtn.find('.fa-arrow-up');
	b_arrow_up.click(function () {$('html, body').animate({'scrollTop':'0'}, 250); return false;});
	$(window).scroll(buttom_btn_toggle);
	buttom_btn_toggle();
});

function t_search() {
	var query = $('#query').val(),
		url = blog_link + '/search/' + query;
	var pathname = decodeURI($(location).attr('pathname').replace(/^\//,'')).split('/')[0];
	
	if(query == '')
		return;

	if ((pathname == 'search') || (pathname == 'category') || (pathname == 'archive'))
		$(location).attr('href',url);
	else {
		$.ajax({
			url: url,
			success: function(data, textStatus, jqXHR) {
				var list = $(data).find('#search_list, #page').clone();
				$('#search_list, #search_list + #page').remove();
				f_page(list.filter('#page'));
				if(list.find('.card-list a').length > 0) {
					search.after(list);
				}
			}
		});
	}
}

search.ready(function () {
	$('#query').keypress(function (e) {(e.keyCode == 13) && t_search();});
	$('#query ~ .button').click(t_search);
});

function highlightSide() {
	var pathname = decodeURI($(location).attr('pathname').replace(/^\//,'')).split('/');
	
	if(pathname[0] == 'category' && pathname[1]) {
		var name = pathname[2] ? pathname[2] : pathname[1];
		side.find('li a').each(function (index) {
			if(name == $(this).text().replace(/\s\(\d+\)$/g,''))
				$(this).addClass('accent');
		});
	} else {
		side.find('li a[href="/'+pathname[0]+'"]').addClass('accent');
	}
}

side.ready(highlightSide);
