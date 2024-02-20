import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [city, setCity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [description, setDescription] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [icon, setIcon] = useState(null);

  function searchCity(event) {
    event.preventDefault();
  }
  function showCity(event) {
    setCity(event.target.value);
  }
  function showTemperature(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(response.data.weather[0].icon);

    console.log(response.data.main.temp);
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eb9542c65e739e0fb25ade97c749e2aa&units=metric`;
  axios.get(url).then(showTemperature);

  return (
    <>
      <div className="App">
        <h1>Weather App</h1>
        <form onSubmit={searchCity}>
          <input
            type="text"
            placeholder="Enter city..."
            onChange={showCity}
          ></input>
          <input type="submit" value="search"></input>
        </form>
        <h1>{city}</h1>
        <ul>
          <li>Temperature: {Math.round(temperature)}℃</li>
          <li>Description: {description}</li>
          <li>Humidity: {humidity}%</li>
          <li>Wind: {Math.round(wind)}km/h</li>
          <li>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="icon"
            ></img>
          </li>
        </ul>
      </div>
    </>
  );
}
