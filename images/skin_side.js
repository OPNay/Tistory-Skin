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