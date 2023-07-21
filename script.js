// Get API
function getWeatherData(location) {
    const apiKey = "2254cc26003e03a0b9a25cb5a3066195";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    return fetch(url)
}