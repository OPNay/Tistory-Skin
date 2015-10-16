$('#sidebar .module.link').ready(function () {
	var side_link = $('.module.link'), side_link_style = $('<style>');
	$.each(side_link_data, function (index, data) {
		var link = $('<a>');
		link.attr({
				class: 's_l_' + data.name.toLowerCase(),
				href: data.link,
				target: '_new'
		}).append($('<i>').attr('class','fa fa-' + data.fa)).append(data.name);
		side_link.append(link);
		
		side_link_style.append('#sidebar .link .s_l_' + data.name.toLowerCase() + ' {color:' + data.color + ';}\n');
		side_link_style.append('#sidebar .link .s_l_' + data.name.toLowerCase() + ':hover {background-color:' + data.color + ';}\n');
		side_link.append(side_link_style);
	});
});