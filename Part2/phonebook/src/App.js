import Servercom from './Servercom'
import { useState,useEffect } from 'react'
import Filter from './components/Filter'
import Input from './components/Input'
import './App.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [allPersons, setAllPersons]=useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [newFilter,setNewFilter]=useState('')
  const [newNotification,setNewNotification]=useState([null,0])

  useEffect(()=>{
    Servercom.getPersons().then(response=>{setAllPersons(response.data);setPersons(response.data)})
  },[])

  const handleClick=(event)=>{
    event.preventDefault()
    
    if(((allPersons.filter(guy=> (guy.name)===newName)).length)!==0)
   { 
    if(window.confirm(`${newName} already exists in the phonebook, Replace the old number with the new one?`))
    {
      const findPerson = allPersons.filter(guy=> (guy.name)===newName)
      const newPerson= {name:newName,number:newNumber}
      Servercom.updatePerson(findPerson[0].id,newPerson).then(response=>{
        setAllPersons(allPersons.map(person => person.id !== findPerson[0].id ? person : response.data))
        setPersons(persons.map(person => person.id !== findPerson[0].id ? person : response.data))
        setNewName('')
        setNewNumber('')
        console.log("updated successfully")
        setNewNotification([`${response.data.name} Updated successfully`,0])
        setTimeout(()=>{setNewNotification([null,0])},2000)
      })
    }
   }
   else
  { 
    const newPerson= {name:newName,number:newNumber}
   Servercom.addPerson(newPerson)
   .then(response => {
   setAllPersons(allPersons.concat(response.data))
   setPersons(persons.concat(response.data))
    setNewName('')
    setNewNumber('')
    console.log("saved successfully")
    setNewNotification([`${response.data.name} Added successfully`,0])
    setTimeout(()=>{setNewNotification([null,0])},2000)
  })
  }
  }

  const handleNChange=(event)=>{
    setNewName(event.target.value)
  }

  const handlePChange=(event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilter=(event)=>{
    setNewFilter(event.target.value)
    const regex= new RegExp(event.target.value, 'i')
    console.log(regex)
    const filteredPersons= allPersons.filter(guy=> guy.name.match(regex))
    setPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newNotification}/>
     <Input name="Filter show with :" value={newFilter} onChange={handleFilter} />
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
      <Filter persons={persons} allPersons={allPersons} setAllPersons={setAllPersons} setPersons={setPersons} setNewNotification={setNewNotification}/>
    </div>
  )
}

export default App