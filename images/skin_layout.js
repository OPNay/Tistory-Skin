function toggleActive(a,b) {
	$(a).toggleClass('active',b);
}
function isActive(a) {
	return $(a).hasClass('active');
}
function disableScroll(a) {
	$('body').toggleClass('scroll-hidden',a);
}

// Nav
function nav_transparent() {
	var nav = $('#nav');
	if (($(window).scrollTop() >= 100 && nav.hasClass('transparent'))
		|| ($(window).scrollTop() < 100 && !nav.hasClass('transparent'))
		&& !isActive('#side'))
		nav.toggleClass('transparent');
}
$(document).ready(function () {
	$(window).scroll(nav_transparent);
	nav_transparent();
});

function updateCover() {
	var cover = $('#cover')
	disableScroll(false);
	toggleActive('#cover, .icon, #side, .card.floating', false);
	$('.card.floating').html('');

	if($(window).scrollTop() < 100)
		$('#nav').toggleClass('transparent',true);

	switch(cover.data('active')) {
	case 'side':
		disableScroll(true);
		toggleActive('#cover, #side, .icon', true);
		cover.toggleClass('nav-over',false);
		$('#nav').toggleClass('transparent',false);
		break;
	case 'floating':
		disableScroll(true);
		toggleActive('#cover, .card.floating', true);
		cover.toggleClass('nav-over',true);
		$('.card.floating').html(cover.data('floating'));
		break;
	}
};

$(document).ready(function () {
// Nav menu
	var cover = $('#cover');
	$('#nav .icon').click(function () {
		if(cover.data('active') != 'side')
			cover.data('active','side') && updateCover();
		else
			cover.removeData('active') && updateCover();
	});
	cover.click(function () {
		$(this).removeData('active') && updateCover();
	});

	$('#side ul ~ ul').before('<hr>');

// Floating
	$('.admin .fa-bars').click(function () {
		if(cover.data('active') != 'floating')
			cover.data('active','floating')
				.data('floating',$(this).parent().find('.floating-data').clone().removeClass('floating-data'))
				&& updateCover();
		else
			cover.removeData('active') && updateCover();
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