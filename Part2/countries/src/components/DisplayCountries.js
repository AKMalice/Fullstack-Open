import Content from "./Content"
  
  const DisplayCountries =(prop)=>{
    console.log(prop.data.length)
    console.log(prop.data[0])
  
    if(prop.data.length>10)
   return(
    <div>Too many matches, specify another filter</div>
   )
   else if(prop.data.length === 1)
  
   return (
    <Content country={prop.data[0]}/>
   )
   else
  
   return (
    <ul>
    {prop.data.map(country=>{
      return(
      <li>{country.name.common} <button onClick={()=>{prop.change([country])}}>show</button></li>
      )
    })}
    </ul>
   )
  }

  export default DisplayCountries;