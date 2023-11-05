import { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "f71c26f8e39ecc81961a43ce3d7125e6";

function Weather() {
  const [city, setCity] = useState("Nairobi");
  const [weatherData, setWeatherData] = useState(null);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );
            const userCity = response.data.address.city;
            setCity(userCity);
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [city]);

  if (!weatherData) {
    return (
      <div className="text-center mt-4 text-gray-700">
        Loading weather data...
      </div>
    );
  }

  const weatherIconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;

  return (
    <div className="rounded-lg p-4 border border-gray-300 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 flex justify-between">
        <span> Current Weather in {city}</span>
        <button
          className="py-1 px-3 rounded-2xl border-2 "
          onClick={getLocation}
        >
          Update Location
        </button>
      </h2>
      <div className="flex items-center mt-2">
        <img src={weatherIconUrl} alt="Weather Icon" className="w-16 h-16" />
        <div className="ml-4">
          <p className="text-xl text-gray-700">{weatherData.main.temp}°C</p>
          <p className="text-md text-gray-600">
            Conditions: {weatherData.weather[0].description}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-600">Humidity: {weatherData.main.humidity}%</p>
        <p className="text-gray-600">
          Pressure: {weatherData.main.pressure} hPa
        </p>
        <p className="text-gray-600">
          Visibility: {weatherData.visibility} meters
        </p>
        <p className="text-gray-600">
          Wind Speed: {weatherData.wind.speed} m/s
        </p>
        <p className="text-gray-600">Cloud Cover: {weatherData.clouds.all}%</p>
        <p className="text-gray-600">Country: {weatherData.sys.country}</p>
        <p className="text-gray-600">
          Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
        </p>
        <p className="text-gray-600">
          Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export default Weather;
