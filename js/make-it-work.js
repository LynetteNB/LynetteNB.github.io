(function () {
$('.heading h1').hide();
$('.name').hide();
$('code').hide();
$('.paper p, .paper dl, .paper h4, .paper ul').hide();
$('.projects .column').hide();
$('.contactIcons').hide();
$('.menu ul').hide();

$(window).on("scroll", () => {

    if ($('.contact a').visible(true, true, 'vertical')) {
        $("#aboutNav").css("background", "#5D737E");
        $("#resumeNav").css("background", "#5D737E");
        $("#projectsNav").css("background", "#5D737E");
        $("#contactNav").css("background", "#FBD5DB");
    } else if ($('.gray h3').visible(true, true, 'vertical') || $('.projectsSecond').visible(true, true, 'vertical')) {
        $("#aboutNav").css("background", "#5D737E");
        $("#resumeNav").css("background", "#5D737E");
        $("#projectsNav").css("background", "#FBD5DB");
        $("#contactNav").css("background", "#5D737E");
    } else if ($('.pink h2').visible(true, true, 'vertical')) {
        $("#aboutNav").css("background", "#FBD5DB");
        $("#resumeNav").css("background", "#5D737E");
        $("#projectsNav").css("background", "#5D737E");
        $("#contactNav").css("background", "#5D737E");
    } else if ($('.banner-inner h1').visible(true, true, 'vertical')) {
        $("#aboutNav").css("background", "#5D737E");
        $("#resumeNav").css("background", "#5D737E");
        $("#projectsNav").css("background", "#5D737E");
        $("#contactNav").css("background", "#5D737E");
    } else {
        $("#aboutNav").css("background", "#5D737E");
        $("#resumeNav").css("background", "#FBD5DB");
        $("#projectsNav").css("background", "#5D737E");
        $("#contactNav").css("background", "#5D737E");
    }

    if ($('.banner-inner h1').visible(true) === false) {
        $('.name').fadeIn();
    } else {
        $('.name').fadeOut();
    }
    if ($('.computer').visible(true)) {
        $('.heading h1').addClass("type").show();
        $('code').slideDown(1500);
    }
    if ($('.paper').visible(true)) {
        $('.paper p, .paper dl, .paper h4, .paper ul').slideDown(1500);
    }
    if ($('.gray .row').visible()) {
        $('.projects .column').slideDown(1500);
    }
    if ($('.contact h2').visible(true)) {
        $('.contactIcons').slideDown(1500);
    }
});
$('.menu').click(() => {
    $('.menu ul').slideToggle(500);
});
$(".power").click(() => {
    $(".screenOn").toggleClass("screenOff");
    $(".compEyes").fadeToggle(500);
    $(".heading").fadeToggle(500);
});

//------------------------------------------------KINCURRENTLY----------------------------------------------------------
$("#kincurrentlyImg").click(() => {
        $("#kincurrentlyModal").removeClass("popDown").css("display", "block").addClass("popUp");
    });

//------------------------------------------------GAMELISTER------------------------------------------------------------
    $("#gamelisterImg").click(() => {
        $("#gamelisterModal").removeClass("popDown").css("display", "block").addClass("popUp");
    });

//------------------------------------------------POMODORO CLOCK--------------------------------------------------------
$("#timer").hide();
$("#statusIcon").hide();
$("#updateClock").attr("disabled", "disabled");
let pomodoroIntervalID;
$("#pomodoroImg").click(() => {
    $("#pomodoroModal").removeClass("popDown").css("display", "block").addClass("popUp");
    $("#warning").hide();
});
$("#startClock").click((e)=>{
    e.preventDefault();
    if(timerCheck("workIntervals") && timerCheck("shortBreakDuration") && timerCheck("longBreakDuration")) {
        $("#updateClock").removeAttr("disabled");
        $("#startClock").attr("disabled", "disabled");
        $("#warning").slideUp();
        $("#smile").removeClass("smile").addClass("bigSmile");
        let minutes = $("#workIntervals").val();
        let seconds = 0;
        let shortBreak = $("#shortBreakDuration").val();
        let longBreak = $("#longBreakDuration").val();
        let counter = 1;
        let status = "work";
        pomodoroIntervalID = setInterval(() => {
            if(counter % 4 === 0 && status === "work" && minutes === 0 && seconds === 0){
                $("#timer").text(minutes + ":0" + seconds);
                minutes = longBreak;
                status = "break";
                $("#statusIcon").hide().removeClass().addClass("fas fa-coffee").text("+").fadeIn(500);
                $("#longBreak")[0].play();
            } else if(counter % 4 === 0 && status === "break" && minutes === 0 && seconds === 0){
                $("#timer").text(minutes + ":0" + seconds);
                minutes = $("#workIntervals").val();
                status = "work";
                counter += 1;
                $("#statusIcon").hide().removeClass().addClass("fas fa-code").text("").fadeIn(500);
                $("#longBreak")[0].play();
            } else if (minutes === 0 && seconds === 0 && status === "work") {
                $("#timer").text(minutes + ":0" + seconds);
                minutes = shortBreak;
                status = "break";
                $("#statusIcon").hide().removeClass().addClass("fas fa-coffee").fadeIn(500);
                $("#shortBreak")[0].play();
            } else if (minutes === 0 && seconds === 0 && status === "break") {
                $("#timer").text(minutes + ":0" + seconds);
                minutes = $("#workIntervals").val();
                status = "work";
                counter += 1;
                $("#statusIcon").hide().removeClass().addClass("fas fa-code").fadeIn(500);
                $("#shortBreak")[0].play();
            } else if (seconds === 0) {
                $("#timer").text(minutes + ":0" + seconds);
                seconds = 59;
                minutes -= 1;
            } else if (seconds < 10) {
                $("#timer").text(minutes + ":0" + seconds);
                seconds -=1;
            } else if (seconds >= 10 && seconds < 60){
                $("#timer").text(minutes + ":" + seconds);
                seconds -= 1;
            }
            $("#statusIcon").fadeIn(1000);
            $("#timer").fadeIn(1000);
        }, 1000);
    }
    else{
        $("#warning").slideDown();
    }
});
let timerCheck = (id) => {
    return Number($(`#${id}`).val())%1 === 0 && Number($(`#${id}`).val()) > 0 && !isNaN(Number($(`#${id}`).val())) && Number($(`#${id}`).val()) <= 60;
};
$("#updateClock").click((e) =>{
    e.preventDefault();
    $("#timer").hide();
    $("#statusIcon").hide();
    $("#smile").removeClass("bigSmile").addClass("smileAnimation");
    clearInterval(pomodoroIntervalID);
    $("#startClock").removeAttr("disabled");
    $("#updateClock").attr("disabled", "disabled");
});


//-----------------------------------------------SIMON SAYS GAME--------------------------------------------------------
let timer;
$("#simonImg").click(() => {
    $("#simonModal").removeClass("popDown").css("display", "block").addClass("popUp");
    let colorsArray = ["blue", "yellow", "green", "red"];
    let simonArray = [];
    let simonCheck = [];
    let counter = 0;
    let red = $("#red");
    let blue = $("#blue");
    let green = $("#green");
    let yellow = $("#yellow");
    $("#overAnimation").hide();
    if($(window).width() > 425){
        $("#html").css({
            top: "16vw",
            left: "23.7vw"
        });
    } else {
        $("#html").css({
            top: "34.7vw",
            left: "33.5vw"
        });
    }

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
            if($(window).width() > 425){
                $("#html").css("left", "22.5vw");
            } else {
                $("#html").css("left", "32.9vw");
            }
        } else {
            if($(window).width() > 425){
                $("#html").css("left", "23.7vw");
            } else {
                $("#html").css("left", "36.9vw");
            }
        }
        counter++;
        if (counter <= 5) {
            showSimonArray(700);
        } else if (counter <= 10) {
            showSimonArray(650);
        } else if (counter <= 15) {
            showSimonArray(600);
        } else if (counter <= 50) {
            showSimonArray(550);
        }
    };
    let colorChange = color => {
        setTimeout(() => $(`#${color}`).toggleClass(`mute${color[0].toUpperCase()}${color.substring(1, color.length)} ${color}`),400);
        $(`#${color}Sound`)[0].play();
        $(`#${color}`).toggleClass(`mute${color[0].toUpperCase()}${color.substring(1, color.length)} ${color}`);
    };
    let simonGame = (color) => {
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
        if (simonArray.length === 0) {
            startGame();
            if ($(window).width() > 425) {
                $("#html").css("top", "16vw");
            } else {
                $("#html").css("top", "30.7vw");
            }
        }
        for(let i = 0; i < simonCheck.length; i++) {
            if(simonCheck[i] !== simonArray[i]){
                if($(window).width() > 425){
                    $("#html").hide().css("left", "13.2vw").css("top", "10vw").fadeIn(3000).html("Game Over!<br><button>Play Again?</button>");
                } else {
                    $("#html").hide().css("left", "6.2vw").css("top", "20vw").fadeIn(3000).html("Game Over!<br><button>Play Again?</button>");
                }
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
});
$(".close").click(() => {
    $(".modal").addClass("popDown").removeClass("popUp");
    setTimeout(() => {
        $(".modal").css("display", "none");
        $("#html").html("<button id=\"startSimon\">Start</button>");
        $(".top, .bottom").show();
        if($(window).width() > 425){
            $("#html").css({
                top: "16vw",
                left: "23.7vw"
            });
        } else {
            $("#html").css({
                top: "34.7vw",
                left: "33.5vw"
            });
        }

        if($("#updateClock").attr("disabled")){
            $("#smile").removeClass().addClass("smile");
        }
    }, 240);
    clearInterval(timer);
});
window.onclick = function(event) {
    if (event.target == $(".modal")) {
        modal.style.display = "none";
    }
}


//-------------------------------------------------WEATHER MAP----------------------------------------------------------
$("#weatherImg").click(() => {
    $("#weatherModal").removeClass("popDown").css("display", "block").addClass("popUp");
});
$("document").ready(function() {
    var markers = [];
    var geoLat = 29.4241;
    var geoLon = -98.4936;
    $.get('https://ipapi.co/json/').done( function(data) {
        geoLat = data.latitude;
        geoLon = data.longitude;
        map.setCenter({lat: geoLat, lng: geoLon});
        clickMarker({lat: geoLat, lng: geoLon}, map);
    }).fail(function(){
        clickMarker({lat: geoLat, lng: geoLon}, map);
    });
    var infoWindow = new google.maps.InfoWindow({content: ""});
    var map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: geoLat, lng: geoLon},
        zoom: 10
    });
    google.maps.event.addListener(map, 'click', function (event) {
        map.setCenter(event.latLng);
        geoLat = event.latLng.lat();
        geoLon = event.latLng.lng();
        clickMarker(event.latLng, map);
    });
    $("#daysNumber").on("change", update);
    $(".checkboxes").on("click", update);
    $("#address").on("keypress", function(e){
        if(e.keyCode === 13){
            geoCode();
        }
    });
    $("#searchPlace").on("click", function(e){
        e.preventDefault();
        geoCode();
    });
    function geoCode() {
        var geocoder = new google.maps.Geocoder();
        var geoAddress = $("#address").val();
        geocoder.geocode({"address": geoAddress}, function (results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                map.setZoom(8);
                geoLat = results[0].geometry.location.lat();
                geoLon = results[0].geometry.location.lng();
                clickMarker(results[0].geometry.location, map);
                $("#address").val("");
            } else {
                alert("That is an invalid address. Please enter a different address.")
            }
        });
    }
    function clickMarker(location, map) {
        clearMarkers();
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: 'img/weather-sun.png'
        });
        update();
        marker.addListener("mouseover", function(){
            infoWindow.open(map, marker);
        });
        markers.push(marker);
    }
    function clearMarkers() {
        setMapOnAll(null);
    }
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }
    function update() {
        $.get("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast", {
            APPID: "7c66dda135d5bd2e458cb66254bd830b",
            lat: geoLat,
            lon: geoLon,
            units: "imperial"
        }).done(function (weather) {
            var html = "";
            var htmlheaders = "";
            var city = "";
            var tempMaxArray = [];
            var tempMinArray = [];
            var humidityArray = [];
            var windArray = [];
            var pressureArray = [];
            var dateArray = [];
            var counter = 0;
            weather.list.forEach(function(temp){
                var date = new Date((temp.dt * 1000)-18000);
                dateArray.push(date.getDay());
                tempMaxArray.push(Math.round(temp.main.temp_max));
                tempMinArray.push(Math.round(temp.main.temp_min));
                humidityArray.push(temp.main.humidity);
                windArray.push(temp.wind.speed);
                pressureArray.push(temp.main.grnd_level);
            });
            for(var l = 0; l <dateArray.length; l++){
                if(dateArray[0] === dateArray[l]){
                    counter++;
                }
            }
            for (var i = 0; i <= (($("#daysNumber").val()-1)*8); i += 8) {
                var weatherGif = "";
                var daysArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var tempMin, tempMax, humidity, wind, pressure;
                if(weather.list[i].weather[0].icon === "01d" ||weather.list[i].weather[0].icon === "01n") {
                    weatherGif = "https://media.giphy.com/media/kZLVxluTyw32U/giphy.gif";
                } else if (weather.list[i].weather[0].icon === "02d" || weather.list[i].weather[0].icon === "02n") {
                    weatherGif = "https://media.giphy.com/media/3ov9jLYWb4zCjGfqIE/giphy.gif";
                } else if (weather.list[i].weather[0].icon === "03d" || weather.list[i].weather[0].icon === "03n") {
                    weatherGif = "https://media.giphy.com/media/1iPwXyVKrKf0dNmM/giphy.gif";
                } else if (weather.list[i].weather[0].icon === "04d" || weather.list[i].weather[0].icon === "04n") {
                    weatherGif = "https://media.giphy.com/media/3ohhwsupwJyzktdgS4/giphy.gif";
                } else if (weather.list[i].weather[0].icon === "09d" || weather.list[i].weather[0].icon === "09n") {
                    weatherGif = "https://media.giphy.com/media/EEFEyXLO9E0YE/giphy.gif";
                } else if (weather.list[i].weather[0].icon === "10d" || weather.list[i].weather[0].icon === "10n") {
                    weatherGif = "https://media.giphy.com/media/88wGX2Yfl6Z7q/giphy.gif";
                } else if (weather.list[i].weather[0].icon === "11d" || weather.list[i].weather[0].icon === "11n") {
                    weatherGif = "https://media.giphy.com/media/3ohhwHGift6jATwg4o/giphy.gif";
                } else if (weather.list[i].weather[0].icon === "13d" || weather.list[i].weather[0].icon === "13n") {
                    weatherGif = "https://media.giphy.com/media/3o6gDS7g6M4WpszMhq/giphy.gif";
                } else if (weather.list[i].weather[0].icon === "50d" || weather.list[i].weather[0].icon === "50n") {
                    weatherGif = "https://media.giphy.com/media/xEjTM5COAKyNa/giphy.gif";
                }
                if (i === 0) {
                    htmlheaders += "<div class='header'>Current</div>";
                    html += "<div class='headerSmall header'>Current</div>";
                    tempMax = Math.max(...tempMaxArray.slice(i, counter));
                    tempMin = Math.min(...tempMinArray.slice(i, counter));
                    humidity = humidityArray.slice(i, counter).reduce((a,b) => a+b)/counter;
                    wind = windArray.slice(i, counter).reduce((a,b) => a+b)/counter;
                    pressure = pressureArray.slice(i, counter).reduce((a,b) => a+b)/counter;
                } else {
                    htmlheaders += "<div class='header'>" + daysArray[dateArray[i]] + "</div>";
                    html += "<div class='headerSmall header'>" + daysArray[dateArray[i]] + "</div>";
                    tempMax = Math.max(...tempMaxArray.slice(i, i+8));
                    tempMin = Math.min(...tempMinArray.slice(i, i+8));
                    humidity = humidityArray.slice(i, i+8).reduce((a,b) => a+b)/8;
                    wind = windArray.slice(i, i+8).reduce((a,b) => a+b)/8;
                    pressure = pressureArray.slice(i, i+8).reduce((a,b) => a+b)/8;
                }
                html += "<div class='day'><h4>" + tempMax + "°/" + tempMin + "°F" + "</h4>";
                if($("#iconShow").prop('checked')) {
                    html += "<img class='gifSize' src='" + weatherGif + "'>";
                }
                if($("#descriptionShow").prop('checked')) {
                    html += "<p>" + weather.list[i].weather[0].main + ": " + weather.list[i].weather[0].description + "</p>";
                }
                if($("#humidityShow").prop('checked')) {
                    html += "<p>Humidity: " + Math.round(humidity) + "%</p>";
                }
                if($("#windShow").prop('checked')) {
                    html += "<p>Wind: " + Math.round(wind) + " mph</p>";
                }
                if($("#pressureShow").prop('checked')) {
                    html += "<p>Pressure: " + Math.round(pressure) + " hPa</p>";
                }
                html += "</div></div>";
                if(i === 0){
                    i = counter-8;
                }
            }
            if (weather.city.name) {
                city = weather.city.name;
            } else {
                city = "Somewhere in the World";
            }
            infoWindow = new google.maps.InfoWindow({content: "<h4 class='header'>" + city + "</h4><div><h4>" +  Math.round(weather.list[0].main.temp) + "°F</h4><p>" + weather.list[0].weather[0].main + ": " + weather.list[0].weather[0].description + "</p><p>Humidity: " + Math.round(weather.list[0].main.humidity) + "%</p>"});
            $(".city").html(city);
            $(".headers").html(htmlheaders);
            $(".weather").html(html);
        }).fail(function () {
            $(".city").html("Currently Unavailable");
            $(".weather").html("<p>Please try again later!</p>");
        });
    }
});
})();