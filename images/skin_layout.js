// Nav
function nav_transparent() {
	var nav = $('#nav');
	if (($(window).scrollTop() >= 100 && nav.hasClass('transparent'))
		|| ($(window).scrollTop() < 100 && !nav.hasClass('transparent'))
		&& !$('#side').hasClass('active'))
		nav.toggleClass('transparent');
}
$(document).ready(function () {
	$(window).scroll(nav_transparent);
	nav_transparent();
});

// Nav menu
$(document).ready(function () {
	$('.icon, #cover').click(function () {
		$('.icon, #side, #cover').toggleClass('active');
		$('body').toggleClass('scroll-hidden');
		if($(window).scrollTop() < 100)
			$('#nav').toggleClass('transparent');
	});
	$('#side ul ~ ul').before('<hr>');
});

// Article Admin
$(document).ready(function () {
	$('.admin .fa-bars').click(function () {
		$('.card.floating').html($(this).parent().find('.floating-data').clone().removeClass('floating-data'));
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