$("#submitBtn").click(function (event) {
    event.preventDefault();

    var cityName = $("#citySearch").val().trim();
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";

    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=346f5b9d83ff18900a4fdcdbc47dcbde";

    $.ajax({
        url: queryURL1,
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
        $("#mainCardTemp").text("Temperature: " + mainCardTempEl);
 
        var mainCardHumidEl = currentWeather.main.humidity;
        $("#mainCardHumid").text("Humidity: " + mainCardHumidEl);

        var mainCardWindEl = currentWeather.wind.speed;
        $("#mainCardWind").text("Humidity: " + mainCardWindEl);

        $("#forecastTitle").text("5-Day Forecast");
    });

    $.ajax({
        url: queryURL2,
        method: "GET",
    }).then(function (forecast) {
        console.log(forecast);
        for (let i = 0; i < forecast.list.length; i+= 8) {
            // const element = array[index];
            var forecastWeather = forecast.list[i];
            console.log(forecastWeather)
        }

    });
});