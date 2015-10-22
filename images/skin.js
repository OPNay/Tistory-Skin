var body = $('body'),
	cover = $('#cover'),
	nav = $('#nav'),
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
	body.toggleClass('active side floating', false);
	cover.toggleClass('active', false);

	switch(a) {
	case 'side':
		disableScroll(true);
		body.toggleClass('active side',true);
		cover.toggleClass('active',true);
		break;
	case 'floating':
		disableScroll(true);
		body.toggleClass('active floating',true);
		cover.toggleClass('active',true);
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
		if(!body.hasClass('active side'))
			updateCover('side');
		else
			updateCover('off');
	});
	cover.click(function () {updateCover('off')});

// Floating
	$('.admin .fa-bars').click(function () {
		if(!body.hasClass('active floating')) {
			$(this).parent().find('.floating-data').addClass('use')
			updateCover('floating');
		} else
			updateCover('off');
	});
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
	switch(pathname[0]) {
		case 'category':
			if(pathname [1]) {
			var name = pathname[2] ? pathname[2] : pathname[1];
			$('#side a').each(function (index) {
				if(name == $(this).text().replace(/\s\(\d+\)/g,''))
					$(this).addClass('accent');
			});
			} else
				$('#side a[href="/category"]').addClass('accent');
			break;
		default:
			$('#side a[href="/'+pathname[0]+'"]').addClass('accent');
			break;
	}
}

$('#side').ready(highlightSide);
