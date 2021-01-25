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
        console.log(currentWeather);
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

        var latitude = currentWeather.coord.lat
        console.log(latitude);

        var longitude = currentWeather.coord.lon
        console.log(longitude);

        var uvIndexURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=346f5b9d83ff18900a4fdcdbc47dcbde";
        // API 
        // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

        // Example API Inote &exclude is optional
        // https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=appid=346f5b9d83ff18900a4fdcdbc47dcbde

        $.ajax({
            url: uvIndexURL,
            method: "GET",
        });then(function (uvIndex) {
            console.log(uvIndex);
           
        
        });
    });


    $.ajax({
        url: forecastWeatherURL,
        method: "GET",
    }).then(function (forecast) {
        // console.log(forecast);
        for (let i = 4; i < forecast.list.length; i += 8) {
            // Noon is the hottest time of the year, starting at 4 index to display noon
            // Every 8 index score is a fulll day (3 * 8  = 24 hours)
            // Show noon forecast info at these items in the list 4, 12, 20, 28, 36
            var forecastEl = forecast.list[i];
            var forecastItems = (i + 4) / 8;
            // Populate 5-day forecast cards
            var futureDate = moment().add(forecastItems,"days").format("M/D/YYYY");

            $("#forecastDate" + forecastItems).text("");
            $("#forecastDate" + forecastItems).append(futureDate);
            $("#forecastTemp" + forecastItems).text("Temp: " + forecastEl.main.temp + "°F");
            $("#forecastHumid" + forecastItems).text("Humidity: " + forecastEl.main.humidity + "%");
            $("#forecastWind" + forecastItems).text("Wind Speed: " + forecastEl.wind.speed + "MPH");



        }

    });
});