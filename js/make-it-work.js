$('.heading h1').hide();
$('.name').hide();
$('code').hide();

$(window).on("scroll", () => {
    if($('.about p').visible(true)) {
        $('.heading h1').addClass("type").show();
    } else {
        $('.heading h1').removeClass("type").hide();
    }
});
$(window).on("scroll", () => {
    if($('.banner-inner h1').visible(true) === false) {
        $('.name').fadeIn();
    } else {
        $('.name').fadeOut();
    }
});
$(window).on("scroll", () => {
    if($('.about p').visible(true)) {
        $('code').show(1500);
    }
    else {
        $('code').hide(1000);
    }
});
// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
        // On-page links
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
            &&
            location.hostname === this.hostname
        ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 750, function() {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });