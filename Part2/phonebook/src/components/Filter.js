import Servercom from "../Servercom"

const Filter= (prop) =>{

    const handleDelete=(user)=>{

      if(window.confirm(`Delete ${user.name}?`))
      Servercom.deletePerson(user.id).then(response=>
      {
      const updatedPersons=prop.allPersons.filter(users=>users.id !== user.id)
      const updatedFilteredPersons=prop.persons.filter(users=>users.id !== user.id)
      prop.setPersons(updatedFilteredPersons)
      prop.setAllPersons(updatedPersons)
      console.log("deleted successfuly")
      prop.setNewNotification([`${user.name} Deleted successfully`,0])
      setTimeout(()=>{prop.setNewNotification([null,0])},2000)
      }).catch(error=>{
        prop.setNewNotification([` ${user.name} has already been deleted `,1])
        setTimeout(()=>{prop.setNewNotification([null,0])},2000)
      })
     
    }


    if (prop.persons.length === 0) {
      return (
        <>
          No Results found
        </>
      )
    } else {
      return (
        <>
          {prop.persons.map((person) =>
            <div>{person.name} {person.number} <button onClick={()=>handleDelete(person)}>delete</button> </div>
          )}
        </>
      )
    }
  }

  export default Filter