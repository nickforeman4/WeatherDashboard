var apiKey = "2422f6965c042a20db1b9331662013d7"

$("#getWeather").on("click", function() {
    var cityName = $("#citySearchField").val()
    console.log("cityName", cityName)
    currentForecast(cityName)
    weeklyForecast(cityName)
})

function currentForecast(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    $.ajax({method: "GET", url: queryURL})
    .then(function(response) {
        console.log("response", response)
        $("#currentForecast").prepend(`<div class="card">
            <h5>${cityName}</h5>
            <p>Temperature: ${response.main.temp} °F</p>
            <p>Humidity: ${response.main.humidity}%</p>
            <p>Wind Speed: ${response.wind.speed} MPH</p>
            <p>Description: ${response.weather[0].main}</p>
            <img src="https://openweathermap.org/img/wn/${response.weather[0].icon}.png"/>
        </div>`)
    })
}

function weeklyForecast(cityName) {
    var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
    $.ajax({method: "GET", url: queryURL})
    .then(function(response) {
        console.log("response", response.list, response.list.length)
        for(var i = 0; i < response.list.length; i=i+8) {
            $("#fiveDayForecast").append(`${response.list[i]}`)
            console.log(response.list[i])
            console.log(response.list[i].main.temp, response.list[i].wind.speed,response.list[i].main.humidity, response.list[i].weather[0].main,response.list[i].weather[0].icon)
            $("#fiveDayForecast").append(`<div class="card">
                <h5>${response.list[i].dt_txt}</h5>
                <p>Temperature: ${response.list[i].main.temp} °F</p>
                <p>Humidity: ${response.list[i].main.humidity}%</p>
                <img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}.png" />
            </div>`)
        }
    })
}