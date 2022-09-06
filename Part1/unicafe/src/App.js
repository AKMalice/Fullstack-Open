import { useState } from 'react'

const Button = (prop) =>{
  return(
    <button onClick={prop.func}>{prop.name}</button>
  )
}

const StatisticLine = (prop)=>{
  return(
   <tr> <td>{prop.txt}</td> <td>{prop.val}</td></tr>
  )
}

const Statistics = (prop)=>{

  if( prop.good+prop.bad+prop.neutral === 0)
  {
    return(
      <div>
      <h2>Statistics</h2>
      <p>
        No results gathered
      </p>
      </div>
    )
  }
  return(
    <div>
      <h2>Statistics</h2>
      <StatisticLine txt="good" val={prop.good}/>
      <StatisticLine txt="neutral" val={prop.neutral}/>
      <StatisticLine txt="bad" val={prop.bad}/>
      <StatisticLine txt="all" val={prop.good+prop.neutral+prop.bad}/>
      <StatisticLine txt="average" val={(prop.good-prop.bad)/prop.good+prop.neutral+prop.bad}/>
      <StatisticLine txt="positive" val={prop.good*100/(prop.good+prop.neutral+prop.bad)}/>
    </div>
  )
}

const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button name="good" func={()=>setGood(good+1)}/>
      <Button name = "neutral" func={()=>setNeutral(neutral+1)}/>
      <Button name = "bad" func={()=>setBad(bad+1)}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App