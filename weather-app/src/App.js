// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // OpenWeather API key
  const API_KEY = process.env.REACT_APP_API_KEY; // Use the .env file for the API key

  // Fetch weather data based on city or coordinates
  const fetchWeather = async (city = null, lat = null, lon = null) => {
    setLoading(true);
    setError('');

    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

    // If we have a city, fetch by city name
    if (city) {
      url += `&q=${city}`;
    }

    // If we have coordinates, fetch by latitude and longitude
    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    }

    try {
      const response = await axios.get(url);
      setWeather(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name or try again.');
      setLoading(false);
    }
  };

  // Handle city input change
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  // Handle form submit for city search
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  // Get current geolocation weather
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(null, latitude, longitude); // Fetch weather by coords
        },
        (error) => {
          setError('Unable to retrieve location. Please allow geolocation access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []); // Only run once on initial mount

  return (
    <div className="App">
      <h1>Weather App</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {weather && !loading && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
