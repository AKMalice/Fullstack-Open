import axios from 'axios'
import {useState} from 'react'
import { useEffect } from 'react'
import DisplayCountries from './components/DisplayCountries'

//($env:REACT_APP_API_KEY="2934fa5342a320f23fc5ad9927649bfd") -and (npm start)

function App() {

 const [query,setQuery]=useState('')
 const [countries,setCountries]=useState([])
 const [allCountries, setAllCountries] = useState([])

 useEffect(() => {
  axios.get('https://restcountries.com/v3.1/all').then(response=>{
    setAllCountries(response.data)
  })
 }, [])

 useEffect(() => {
  axios.get('https://restcountries.com/v3.1/all').then(response=>{
    setCountries(response.data)
  })
 }, [])
 


 const handleQueryChange = (event)=>{
   const filter = new RegExp(event.target.value,'i')
   console.log(filter)
   const filteredCountries = allCountries.filter((country)=>country.name.common.match(filter))
   setCountries(filteredCountries)
   setQuery(event.target.value)
 }

  return (
    <div className="App">
     <div>find countries : <input onChange={handleQueryChange}/> </div>
     <DisplayCountries data={countries} change={setCountries}/>
    </div>
  );
}

export default App;
