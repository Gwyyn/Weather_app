const apiKey = '132568a4e47fb5f6230ca4f3549c8c7e';
export async function fetchWeather(cityName) {

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.list;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

