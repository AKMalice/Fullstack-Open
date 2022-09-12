import React from 'react'

function Icon({wet}) {

  return (
    <img src={`http://openweathermap.org/img/wn/${wet.weather[0].icon}@2x.png`}/>
  )
}

export default Icon