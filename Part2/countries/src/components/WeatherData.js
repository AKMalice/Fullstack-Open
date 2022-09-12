import { useState,useEffect } from "react";
import Icon from "./Icon";
import axios from "axios";

const WeatherData = ({country})=>{
    const [isLoading, setLoading] = useState(true);
    const [weather,setWeather]=useState({})
    useEffect(() => {
      
     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
    .then(response=>{
      console.log(response.data)
      setWeather(response.data)
      setLoading(false);
    })
  
    }, [])
    if (isLoading) {
      return <div className="App">Loading...</div>;
    }
  
    return (
      <>
      <h3>Weather in {country.capital}:</h3>
      <p>Temperature: {weather.main.temp} C </p>
      <Icon wet={weather}/>
      <p>Wind : {weather.wind.speed} m/s</p>
      </>
    )
    
  }

  export default WeatherData;