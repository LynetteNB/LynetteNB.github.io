$('.heading h1').hide();
$('.name').hide();
$(window).on("scroll", function(){
    // Determine if the element is in the viewport
    if($('.screen').visible(true)) {
        $('.heading h1').addClass("type").show();
    } else {
        $('.heading h1').removeClass("type").hide();
    }
});
$(window).on("scroll", function(){
    // Determine if the element is in the viewport
    if($('.banner-inner h1').visible(true) == false) {
        $('.name').fadeIn();
    } else {
        $('.name').fadeOut();
    }
});