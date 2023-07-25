// Get API
function getWeatherData(location) {
    const apiKey = "2254cc26003e03a0b9a25cb5a3066195";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${apiKey}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = {
                temperature: data.list[0].main.temp,
                wind: data.list[0].wind.speed,
                humidity: data.list[0].main.humidity,
                location: data.city.name,
                icon: data.list[0].weather[0].icon
            };
            const temperature = document.querySelector(".temperature");
            const wind = document.querySelector(".wind");
            const humidity = document.querySelector(".humdity");
            const location = document.querySelector("#location");
            const icon = document.querySelector(".weathericon");
            const weatherUrl = `https://openweathermap.org/img/w/${weatherData.icon}.png`
            const weatherImage = `<img src= "${weatherUrl}">`
            icon.innerHTML = weatherImage
            temperature.textContent = `${weatherData.temperature}°F`;
            wind.textContent = weatherData.wind;
            humidity.textContent = weatherData.humidity;
            location.textContent = weatherData.location;

            const fivedayData = data.list
            let fivedayContainer = document.querySelector(".fiveContainer")
            fivedayForcast = " "
            for (var i = 0; i <= 4; i++) {
                console.log(fivedayData[i]);
                const date = fivedayData[i].dt * 1000
                const currentdates = new Date(date).toLocaleDateString()
                const fiveweatherUrl = `https://openweathermap.org/img/w/${fivedayData[i].weather[0].icon}.png`
                const fiveweatherImage = `<img src= "${fiveweatherUrl}">`
                fivedayForcast += `
        <div class = "fivedayCard">
    <div class = "weathericon"> ${fiveweatherImage}</div>
    <div class = "dayCardDay" id="monday"> Date: ${currentdates}</div>
    <div class="temperature"> Temperture: ${fivedayData[i].main.temp}</div>
    <div clas="wind"> Wind: ${fivedayData[i].wind.speed}</div>
    <div clas="humdity">Humdity: ${fivedayData[i].main.humidity}</div>
</div>
        `;
                fivedayContainer.innerHTML = fivedayForcast


            }
            recentCities()

        })
}
// update data from API
function weatherApp(weatherData) {
}

// update API to buttons
const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");


searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const location = searchBar.value.trim();
    getWeatherData(location)

});
// Local storage (still confused about how to set up local storage)
var cities = document.getElementById("#cities");

function recentCities() {
    var citytoSave = searchBar.value.trim();
    var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || []
    cityHistory.push(citytoSave)

    localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    renderRecentCities(cityHistory)
}
function renderRecentCities(cityHistory) {
    for (var i = 0; i < cityHistory.length; i++) {
        console.log(cityHistory)
        var li = document.createElement("button")
        li.textContent = cityHistory[i]
        li.className += "historyBtn"
        var historyContainer = document.querySelector(".searchSearch")
        historyContainer.appendChild(li)
    }

};
// Ciites history search button ( Cant get it to work)
//    when we click on the history btn then it loads to the city clicked data

// const historyBtn = document.querySelector(".historyBtn");
// historyBtn.addEventListener("click", function (event) {
//     event.preventDefault();
//     const location = historyBtn.value();
//     getWeatherData(location)

// });
