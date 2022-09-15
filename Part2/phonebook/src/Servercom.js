import axios from 'axios'
const URL = 'http://localhost:3001/persons'

const getPersons = () =>{
    return axios.get(URL)
}

const addPerson = (newPerson) =>{
    return axios.post(URL,newPerson)
}

const deletePerson=(id)=>{
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

const updatePerson=(id,newPerson)=>{
    return axios.put(`http://localhost:3001/persons/${id}`,newPerson)
}

export default {getPersons,addPerson,deletePerson,updatePerson}