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
				var list = $(data).find('#search_list, #page');
				$('#search_list, #search_list + #page').remove();
				if(list.find('.card-list a').length > 0)
					$('#search').after(list.clone());
			}
		});
	}
}

$('#search').ready(function () {
	$('#query').keypress(function (e) {(e.keyCode == 13) && t_search();});
	$('#query ~ .button').click(t_search);
});
