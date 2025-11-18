import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { FaWind } from "react-icons/fa";
import { BsCloudSun } from "react-icons/bs";
import { FaSoundcloud } from "react-icons/fa";

import { WiHumidity } from "react-icons/wi";
import { WiDayWindy } from "react-icons/wi";
import { SlCalender } from "react-icons/sl";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";

function App() {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  async function handleClick() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=543892824a091a3efd2e39b4136b024c&units=metric`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="weather-app">
      <h2>Weather App</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleClick}>Find</button>

      {data && (
        <div className="weather-info">
         
          <p><SlCalender/>{new Date().toLocaleDateString()}</p>
          <ul>
            <li><FaTemperatureThreeQuarters/><strong>Temperature:</strong> {data.main?.temp} °C</li>
            <li><WiHumidity />
             <strong>Humidity:</strong> {data.main?.humidity} %</li>
            <li><WiDayWindy /><strong>Wind Speed:</strong> {data.wind?.speed} km/h</li>
            <li><FaWind />
<strong>Wind Direction:</strong> {data.wind?.deg}°</li>
            <li><BsCloudSun />
<strong>Cloud Cover:</strong> {data.clouds?.all} %</li>
            
            <li><FaSoundcloud />
<strong>Condition:</strong> {data.weather?.[0]?.description}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;