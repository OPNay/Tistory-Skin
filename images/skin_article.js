$('.article').ready(function () {
    // Image
    var img_block = $(this).find('.imageblock');
    img_block.removeAttr('style');
    img_block.find('.cap1').attr('style','display: block;');
});