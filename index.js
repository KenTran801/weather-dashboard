$("#submitBtn").click(function (event) {
    event.preventDefault();

    var cityName = $("#citySearch").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=346f5b9d83ff18900a4fdcdbc47dcbde";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response);


        
    });

});