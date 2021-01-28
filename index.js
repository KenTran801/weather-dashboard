
$("#submitBtn").click(function (event) {
    event.preventDefault();
    // created variable for search input
    var cityName = $("#citySearch").val().trim();
    // url variaables for current/forecast weather
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
    var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
    // current weather card and API 
    $.ajax({
        url: currentWeatherURL,
        method: "GET",
    }).then(function (currentWeather) {
        // City name
        var mainCardCityEl = currentWeather.name
        $("#mainCardCity").text("").addClass("text-white").append(mainCardCityEl);
        // Current date
        var currentDateEl = moment();
        $("#currentDate").text("").addClass("text-white").append(currentDateEl.format("M/D/YYYY"));
        // Current temp
        var mainCardTempEl = currentWeather.main.temp;
        $("#mainCardTemp").text("Temperature: " + Math.floor(mainCardTempEl) + "°F");
        //  Current feels like temp
        var mainCardFeelsLikeEl = currentWeather.main.feels_like;
        $("#mainCardFeelsLike").text("Feels Like: " + Math.floor(mainCardFeelsLikeEl) + "°F");
        // Current humidity
        var mainCardHumidEl = currentWeather.main.humidity;
        $("#mainCardHumid").text("Humidity: " + mainCardHumidEl + "%");
        // Current wind speed
        var mainCardWindEl = currentWeather.wind.speed;
        $("#mainCardWind").text("Wind Speed: " + Math.floor(mainCardWindEl) + " MPH");
        // Header for 5-Day forecast
        $("#forecastTitle").text("5-Day Forecast").addClass("text-white");
        // adding icon image
        // credit to Kelly Cook in posting the icon URL in Slack as reference
        var iconCode = currentWeather.weather[0].icon;
        var currentIconImg = $("<img>");
        currentIconImg.attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");
        $("#currentIcon").empty().append(currentIconImg);
        // longitude & latitude variables for index score api
        var latitude = currentWeather.coord.lat
        var longitude = currentWeather.coord.lon
        var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
        $.ajax({
            url: uvIndexURL,
            method: "GET",
        }).then(function (uvIndex) {
            // console.log(uvIndex);
            var uvDisplay = $("<button>");
            $("#mainCardIndex").text("UV Index: ").append(uvDisplay.text(uvIndex.current.uvi))
            if (uvIndex.current.uvi <= 2) {
                uvDisplay.addClass("btn btn-success")
            } else if (uvIndex.current.uvi > 2 && uvIndex.current.uvi <= 6) {
                uvDisplay.addClass("btn btn-warning")
            } else if (uvIndex.current.uvi > 6) {
                uvDisplay.addClass("btn btn-danger")
            };
        });
    });
    // forecast cards and API info
    $.ajax({
        url: forecastWeatherURL,
        method: "GET",
    }).then(function (forecast) {
        console.log(forecast);
        for (let i = 4; i < forecast.list.length; i += 8) {
            // Starting at 4 index to display noon
            // Every 8 index score is a fulll day (3 * 8  = 24 hours)
            // Show noon forecast info at these items in the list 4, 12, 20, 28, 36
            var forecastEl = forecast.list[i];
            // i needs to equal 1,2,3,4,5 to populate the cards
            var forecastItems = (i + 4) / 8;
            // Populate 5-day forecast cards
            var futureDate = moment().add(forecastItems, "days").format("M/D/YYYY");
            // date
            $("#forecastDate" + forecastItems).text("").append(futureDate);
            // icons
            // credit to Kelly Cook in posting the icon URL in Slack as reference
            var forecastIconCode = forecastEl.weather[0].icon;
            var forecastIconImg = $("<img>");
            forecastIconImg.attr("src", "http://openweathermap.org/img/w/" + forecastIconCode + ".png");
            $("#forecastIcon" + forecastItems).empty().append(forecastIconImg);
            // temperature
            $("#forecastTemp" + forecastItems).text("Temp: " + Math.floor(forecastEl.main.temp) + "°F");
            // humidity
            $("#forecastHumid" + forecastItems).text("Humidity: " + forecastEl.main.humidity + "%");
            // blue background color
            $("#forecastCards" + forecastItems).addClass("text-white bg-primary card")
        }
    });
    // creating list button based upon users search
    var cityListEl = $("<button>");
    // var clearBtn = $("<button>");
    // clearBtn.addClass("btn btn-warning");
    // clearBtn.text("Clear");
    // $("#formID").append(clearBtn);
    if (cityName === "") {
        alert("Field cannot be blank!")
        return false;
    } else {
        cityListEl.addClass("list-group-item list-group-item-action list-group-item-dark");
        cityListEl.attr("id", "cityListBtn");
        cityListEl.attr("data-value", cityName);
        cityListEl.text(cityName);
        $("#cityList").append(cityListEl);
    }
    // Local storage still working on this logic will need assistance from TA or tutor
    var storeCity = JSON.parse(localStorage.getItem("storeCity")) || [];
    storeCity.push(cityName);
    localStorage.setItem("storeCity", JSON.stringify(storeCity));
    $("#cityListEl").click(function () {
        var recentCity = $(this).attr("data-value");
        $("#citySearch").text(recentCity);
    });
});
