function t_search() {
	var query = $('#query').val();
	(query != '') && $(location).attr('href', blog_link + '/search/' + query);
}
$(document).ready(function () {
	$('#query').keypress(function (e) {(e.keyCode == 13) && t_search();});
	$('#query ~ .button').click(t_search);
});
