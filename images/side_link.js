var link_data =
[
/*	{"name": 이름, "fa": 아이콘 이름, "color": 링크 색상, "link":링크주소}, */
/* 아이콘 이름은 http://fortawesome.github.io/Font-Awesome/icons 이곳을 참조하세요. */
/* 색상은 RGB코드(#RRGGBB) 또는 CSS컬러 이름(black, white, gray)을 이용해주시면됩니다. */
/* 각각 들어가는 글자들을 "로 꼭 묶어주세요. */
	{"name":"Github", "fa":"github-alt", "color":"gray", "link":"https://github.com/OPNay"},
	{"name":"RSS", "fa":"rss", "color":"orange", "link":rss_url},
];

$('#sidebar .module.link').ready(function () {
	var side_link = $('.module.link'), side_link_style = side_link.find('style');
	$.each(link_data, function (index, data) {
		var link = $('<a>');
		link.attr({
				class: 's_l_' + data.name.toLowerCase(),
				href: data.link,
				target: '_new'
		}).append($('<i>').attr('class','fa fa-' + data.fa)).append(data.name);
		side_link.append(link);
		
		side_link_style.append('#sidebar .link .s_l_' + data.name.toLowerCase() + ' {color:' + data.color + ';}\n');
		side_link_style.append('#sidebar .link .s_l_' + data.name.toLowerCase() + ':hover {background-color:' + data.color + ';}\n');
	});
});