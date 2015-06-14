$('.article').ready(function () {
    // Image
    var img_block = $(this).find('.imageblock');
    img_block.removeAttr('style');
    img_block.find('img').removeAttr('height');
    img_block.find('img').removeAttr('width');
});