import { useState } from 'react'
var x= 0

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'Brooks Law: "Adding manpower to a late software project makes it later!"',
    ' Premature optimization is the root of all evil in programming.',
    ' Good judgment comes from experience, and experience comes from bad judgment. '
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]= useState([0,0,0,0,0,0,0,0,0,0])
  const [maximum,setMaximum]= useState({v:0,anc:0})
  

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>  <p>votes {votes[x]}</p>
      <button onClick={()=> {x=Math.floor(Math.random()*10);setSelected(x)}}>next anecdote</button>
      <button onClick={()=>{const cpy = [...votes]
                             cpy[x]+=1;const maxobj ={...maximum}
                             if(cpy[x]>maximum.v){maxobj.v=cpy[x] ;maxobj.anc=x} 
                             setMaximum(maxobj)
                             setVotes(cpy)}}>Vote </button>

      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[maximum.anc]}</p>
      <p>votes {maximum.v}</p>
    </div>
  )
}

export default App