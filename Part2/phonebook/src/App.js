import axios from 'axios'
import { useState,useEffect } from 'react'


const Filter= (prop) =>{
  console.log(prop.persons.length)
  if (prop.persons.length === 0) {
    return (
      <>
        {prop.allPersons.map((person) =>
         <div>{person.name} {person.number}</div>
        )}
      </>
    )
  } else {
    return (
      <>
        {prop.persons.map((person) =>
          <div>{person.name} {person.number}</div>
        )}
      </>
    )
  }
}

const Input= (prop)=>{
  return (
    <>
    {prop.name} <input value={prop.value} onChange={prop.onChange}/>
    </>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [allPersons, setAllPersons]=useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [newFilter,setNewFilter]=useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(response=>{setPersons(response.data)})
  },[])

  const handleClick=(event)=>{
    event.preventDefault()
    
    if(((persons.filter(guy=> (guy.name)===newName)).length)===0)
   { const newPerson= {name:newName,number:newNumber}
    setPersons(persons.concat(newPerson))
    setAllPersons(allPersons.concat(newPerson))
    setNewName('')
    setNewNumber('')
   }
   else
   alert(`${newName} is already added to the phonebook`)
  }

  const handleNChange=(event)=>{
    setNewName(event.target.value)
  }

  const handlePChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilter=(event)=>{
    setNewFilter(event.target.value)
    const regex= new RegExp(newFilter, 'i')
    console.log(regex)
    const filteredPersons= allPersons.filter(guy=> guy.name.match(regex))
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      Filter show with <input value={newFilter} onChange={handleFilter} />
      <form>
        <div>
          <h2>Add a new</h2>
          <Input name="name:" value={newName} onChange={handleNChange}/>
        </div>
        <div>
          <Input name="number:" value={newNumber} onChange={handlePChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter persons={persons} allPersons={allPersons}/>
    </div>
  )
}

export default App