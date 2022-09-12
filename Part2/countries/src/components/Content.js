import WeatherData from "./WeatherData"


const Content=({country})=>{
    return(
  <>
    <h2>{country.name.common}</h2>
    <div>capital:{country.capital}</div>
    <div>area :{country.area}</div>
    <div>
      <h3>languages:</h3>
     <>{Object.keys(country.languages).map(function(key, index) {
        return(
      <p>{(country.languages[key])}</p>
        )
      })}</> 
    </div>
    <img src={country.flags.png} alt="country flag"></img>
    <WeatherData country={country}/>
    </>
    )
  }

  export default Content;