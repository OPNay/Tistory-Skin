$('#entry_protected').ready(function () {
    $(this).find('h2').text($('#entry_protected h2').text().replace(/\ 게시글입니다./g,''));
});

$('.article').ready(function () {
    // Image
    var img_block = $(this).find('.imageblock');
    img_block.removeAttr('style');
    img_block.find('img').removeAttr('height');
    img_block.find('img').removeAttr('width');
});