function disableScroll(a) {
	$('body').toggleClass('scroll-hidden',a);
}

var body = $('body');
var cover = $('#cover');
var nav = $('#nav');

function nav_transparent() {
	if (($(window).scrollTop() >= 100 && nav.hasClass('transparent'))
		|| ($(window).scrollTop() < 100 && !nav.hasClass('transparent')))
		nav.toggleClass('transparent');
}

function updateCover(a) {
	disableScroll(false);
	body.toggleClass('active side floating', false);
	cover.toggleClass('active nav-over', false);

	if($(window).scrollTop() < 100)
		nav.toggleClass('transparent',true);
		
	switch(a) {
	case 'side':
		disableScroll(true);
		body.toggleClass('active side',true);
		cover.toggleClass('active',true);
		nav.toggleClass('transparent',false);
		break;
	case 'floating':
		disableScroll(true);
		body.toggleClass('active floating',true);
		cover.toggleClass('active nav-over',true);
		$('.card.floating').html($('.floating-data.use').clone().removeClass('floating-data'));
		break;
	default:
		$('.card.floating').html('');
		$('.floating-data.use').removeClass('use');
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
$(document).ready(function () {
	var page = $('#page'), num = page.find('.num');
	if(num.length <= 1) { page.remove(); return; }
	else {
		var selected = page.find('.selected'), parent = selected.parent();
		parent.after(selected.addClass('btn num'));
		parent.remove();
	}
});

// Bottom button
function buttom_btn_toggle() {
	var bottom_btn = $('#bot-btn');
	if (($(window).scrollTop() != 0 && bottom_btn.hasClass('hidden'))
		|| $(window).scrollTop() == 0 && !bottom_btn.hasClass('hidden'))
		bottom_btn.toggleClass('hidden');
}

$(document).ready(function () {
	var b_arrow_up = $('#bot-btn').find('.fa-arrow-up');
	b_arrow_up.click(function () {$('html, body').animate({'scrollTop':'0'}, 250); return false;});
	$(window).scroll(buttom_btn_toggle);
	buttom_btn_toggle();
});

// List no-style
$(document).ready(function () {
	$('#nav ul, .module.category ul').addClass('no-style');
});