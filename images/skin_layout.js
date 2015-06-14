// Nav
function nav_transparent() {
	var nav = $('#nav');
	if (($(window).scrollTop() != 0 && nav.hasClass('transparent')) || ($(window).scrollTop() == 0 && !nav.hasClass('transparent')))
		nav.toggleClass('transparent');
}
$(document).ready(function () {
	$(window).scroll(nav_transparent);
	nav_transparent();
});

// Nav menu
$(document).ready(function () {
	// Mobile
	var menu = $('.menu');
	var menuIcon = $('.icon');
	menuIcon.click(function () {
		if (menu.hasClass('active')) {
			menu.removeClass('active');
			setTimeout(function () {menu.removeClass('show');}, 300);
		} else {
			menu.addClass('show');
			setTimeout(function () {menu.addClass('active');}, 100);
		}
	});
});

$(document).ready(function () {
	var entry = $('#entry'), admin = entry.find('.admin');
	admin.find('.fa-bars').click(function () {admin.find('.a_list').toggleClass('active');});
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