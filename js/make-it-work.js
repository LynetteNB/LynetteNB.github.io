$('.heading h1').hide();
$('.name').hide();
$('code').hide();

$(window).on("scroll", () => {
    if($('.computer').visible(true)) {
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
    if($('.computer').visible(true)) {
        $('code').slideDown(1500);
    }
    else {
        $('code').slideUp(500);
    }
});

$("#simonImg").click(() => {
    $("#simonModal.modal").css("display", "block");
    let colorsArray = ["blue", "yellow", "green", "red"];
    let simonArray = [];
    let simonCheck = [];
    let counter = 0;
    let timer;
    let red = $("#red");
    let blue = $("#blue");
    let green = $("#green");
    let yellow = $("#yellow");
    $("#overAnimation").hide();

    let getRandomColor = () => colorsArray[Math.floor((Math.random()*4))];
    let upClickety = (color) => {
        simonCheck.push(color);
        $(`#${color}`).toggleClass(`mute${color[0].toUpperCase()}${color.substring(1, color.length)} ${color}`);
        $(`#${color}Sound`)[0].play();
        checkSimon();
    };
    let clicks = () => {
        red.mousedown(() => red.toggleClass("muteRed red"));
        blue.mousedown(() => blue.toggleClass("muteBlue blue"));
        yellow.mousedown(() => yellow.toggleClass("muteYellow yellow"));
        green.mousedown(() => green.toggleClass("muteGreen green"));
        red.mouseup(() => upClickety("red"));
        blue.mouseup(() => upClickety("blue"));
        yellow.mouseup(() => upClickety("yellow"));
        green.mouseup(() => upClickety("green"));
    };
    let offClicks = () => {
        red.off();
        yellow.off();
        blue.off();
        green.off();
    };
    let startGame = () => {
        $(".top, .bottom").show();
        randomColor = getRandomColor();
        simonArray.push(randomColor);
        $("#html").text(counter);
        if (counter >= 10) {
            $("#html").css("left", "22.5vw");
        } else {
            $("#html").css("left", "23.7vw");
        }
        counter++;
        if (counter <= 5) {
            showSimonArray(700);
        } else if (counter <= 10) {
            showSimonArray(650);
        } else if (counter <= 15) {
            showSimonArray(550);
        } else if (counter <= 20) {
            showSimonArray(500);
        }
    };
    let colorChange = color => {
        setTimeout(() => $(`#${color}`).toggleClass(`mute${color[0].toUpperCase()}${color.substring(1, color.length)} ${color}`),400);
        $(`#${color}Sound`)[0].play();
        $(`#${color}`).toggleClass(`mute${color[0].toUpperCase()}${color.substring(1, color.length)} ${color}`);
    };
    let simonGame = (color) => {
        console.log(simonArray);
        switch (color) {
            case "red":
                colorChange(color);
                break;
            case "blue":
                colorChange(color);
                break;
            case "yellow":
                colorChange(color);
                break;
            case "green":
                colorChange(color);
                break;
        }
    };
    let showSimonArray = (time) => {
            let i = 0;
            timer = setInterval(function () {
                simonGame(simonArray[i]);
                offClicks();
                i++;
                if (i >= simonArray.length) {
                    clearInterval(timer);
                    clicks();
                }
            }, time);
    };
    let checkSimon = () => {
        let randomColor = "";
        $("#startSimon").hide();
        if (simonArray.length === 0){
            startGame();
            $("#html").css("top", "16vw");
        }
        for(let i = 0; i < simonCheck.length; i++) {
            if(simonCheck[i] !== simonArray[i]){
                $("#html").hide().css("left", "13.2vw").css("top", "10vw").fadeIn(3000).html("Game Over!<br><button>Play Again?</button>");
                $("button").click(() => {
                    simonCheck = [];
                    simonArray = [];
                    $("button").hide();
                    counter = 0;
                    checkSimon();
                });
                $("#overAnimation").show().addClass("overAnimation");
                setTimeout(() => {$(".top, .bottom").hide();}, 10);
                setTimeout(() => {$("#overAnimation").hide();}, 900);
                $("#lose")[0].play();
                offClicks();
                break;
            }
            if((simonCheck[simonCheck.length-1] === simonArray[simonArray.length-1] && simonCheck.length === simonArray.length)){
                simonCheck = [];
                startGame();
            }
        }
    };
    $("#startSimon").click(checkSimon);
    $(".close").click(() => {
        $(".modal").css("display", "none");
        $("#html").html("<button id=\"startSimon\">Start</button>");
        clearInterval(timer);
    });
});






//--------------------------------------------------------------------------------------------
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