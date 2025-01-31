import "./App.css"

import searchIcon from "./assets/search.png.png";
import clearIcon from "./assets/clear.png.png";
import cloudIcon from "./assets/cloud.png.png";
import drizzleIcon from "./assets/drizzle.png.png";
import rainIcon from "./assets/rain.png.png";
import windIcon from "./assets/wind.png.png";
import snowIcon from "./assets/snow.png.png";
import humidityIcon from "./assets/humidity.png.png";
import { useEffect, useState } from "react";
const WeatherDetail=({icon, temp, city, country, lat, log, wind, humidity})=>{
  return(
  <>
    <div className="image">
      <img src={icon} alt="Image" />
    </div> 
    <div className="temp">{temp}*C</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">latitude</span>
        <span>{lat}</span>
      </div>
      <div>
        <span className="log">longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <img src={humidityIcon} alt="humidity" className="icon" />
        <div className="data">
          <div className="humidity-percent">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <img src={windIcon} alt="wind" className="icon" />
        <div className="data">
          <div className="wind-percent">{wind} km/h</div>
          <div className="text">Wind Speed</div>
        </div>
      </div>
    </div>
  </>
  )
} 

function App() {
  let api_key = "2d1a28cc9ed9109bf006055af16b364b";
  const [text, setText] = useState("London");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setlat] = useState(0)
  const [log, setlog] = useState(0)
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0)
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const weatherIconMap={
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": clearIcon,
    "02n": clearIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  }
  const search = async()=>{
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data);
      if (data.cod == "404") {
        console.error("City not found!")
        setCityNotFound(true)
        setLoading(false )
        return;
      }
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name)
      setCountry(data.sys.country)
      setlat(data.coord.lat)
      setlog(data.coord.lon)
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || clearIcon);
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally{
       setLoading(false)
    }
  };
  const handleCity=(e)=>{
    setText(e.target.value)
  }
  const handleKeyDown = (e) =>{
    if (e.key === "Enter") {
      search();
    }
  }
  useEffect(()=>{
    search()
  }, [])
  return (
    <>
      <div className="container">
         <div className="input-container">
            <input type="text" className="cityInput"
            placeholder="Search City" onChange={handleCity} value={text}
            onKeyDown={handleKeyDown}/>
            <div className="search-icon" onClick={()=> search()}>
              <img src={searchIcon} alt="Search" />
            </div>
         </div>
         <WeatherDetail icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind}/>
      </div>
    </>
  )
}

export default App
