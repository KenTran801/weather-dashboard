// $("#forecastRow").empty();
$("#submitBtn").click(function (event) {
    event.preventDefault();

    var cityName = $("#citySearch").val().trim();
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
    var forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";

    $.ajax({
        url: currentWeatherURL,
        method: "GET",
    }).then(function (currentWeather) {
        // console.log(currentWeather);
        // console.log(currentWeather.name);
        // console.log(currentWeather.main.temp);
        // console.log(currentWeather.main.humidity);
        // console.log(currentWeather.wind.speed);
        var mainCardCityEl = currentWeather.name
        $("#mainCardCity").text("");
        $("#mainCardCity").append(mainCardCityEl);

        var currentDateEl = moment();
        // console.log(currentDate)
        $("#currentDate").text("");
        $("#currentDate").append(currentDateEl.format("M/D/YYYY"));

        var mainCardTempEl = currentWeather.main.temp;
        $("#mainCardTemp").text("Temperature: " + mainCardTempEl + "°F");

        var mainCardFeelsLikeEl = currentWeather.main.feels_like;
        $("#mainCardFeelsLike").text("Feels Like: " + mainCardFeelsLikeEl + "°F");

        var mainCardHumidEl = currentWeather.main.humidity;
        $("#mainCardHumid").text("Humidity: " + mainCardHumidEl + "%");

        var mainCardWindEl = currentWeather.wind.speed;
        $("#mainCardWind").text("Wind Speed: " + mainCardWindEl + "MPH");

        $("#forecastTitle").text("5-Day Forecast");

        var iconCode = currentWeather.weather[0].icon;
        // var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";

        var currentIconImg = $("<img>");
        currentIconImg.attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");
        $("#currentIcon").empty();
        $("#currentIcon").append(currentIconImg);

        var latitude = currentWeather.coord.lat
        // console.log(latitude);
        var longitude = currentWeather.coord.lon
        // console.log(longitude);
        var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";

        $.ajax({
            url: uvIndexURL,
            method: "GET",
        }).then(function (uvIndex) {
            // console.log(uvIndex);
            var uvDisplay = $("<button>");
            $("#mainCardIndex").text("UV Index: ")
            $("#mainCardIndex").append(uvDisplay.text(uvIndex.current.uvi))
            if (uvIndex.current.uvi <= 2) {
                uvDisplay.addClass("btn btn-success")
            } else if (uvIndex.current.uvi > 2 && uvIndex.current.uvi <= 6) {
                uvDisplay.addClass("btn btn-warning")
            } else if (uvIndex.current.uvi > 6) {
                uvDisplay.addClass("btn btn-danger")
            };
        });
    });
    $.ajax({
        url: forecastWeatherURL,
        method: "GET",
    }).then(function (forecast) {
        console.log(forecast);
        for (let i = 4; i < forecast.list.length; i += 8) {
            // Noon is the hottest time of the year, starting at 4 index to display noon
            // Every 8 index score is a fulll day (3 * 8  = 24 hours)
            // Show noon forecast info at these items in the list 4, 12, 20, 28, 36
            var forecastEl = forecast.list[i];
            var forecastItems = (i + 4) / 8;
            // Populate 5-day forecast cards
            var futureDate = moment().add(forecastItems, "days").format("M/D/YYYY");

            $("#forecastDate" + forecastItems).text("");
            $("#forecastDate" + forecastItems).append(futureDate);

            var forecastIconCode = forecastEl.weather[0].icon;
            var forecastIconImg = $("<img>");

            forecastIconImg.attr("src", "http://openweathermap.org/img/w/" + forecastIconCode + ".png");
            $("#forecastIcon" + forecastItems).empty();
            $("#forecastIcon" + forecastItems).append(forecastIconImg);

            $("#forecastTemp" + forecastItems).text("Temp: " + forecastEl.main.temp + "°F");
            $("#forecastHumid" + forecastItems).text("Humidity: " + forecastEl.main.humidity + "%");
            $("#forecastWind" + forecastItems).text("Wind Speed: " + forecastEl.wind.speed + "MPH");
            $("#forecastCards" + forecastItems).addClass("text-white bg-primary")

        }

    });
});