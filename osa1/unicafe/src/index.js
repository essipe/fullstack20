import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
      
    <div>
      <h1>Give feedback</h1>
      <Button name='good' value={good} setvalue={setGood}/>
      <Button name='neutral' value={neutral} setvalue={setNeutral}/>
      <Button name='bad' value={bad} setvalue={setBad}/>

      <h1>Stats</h1>

        <Statistics good = {good} neutral={neutral} bad={bad}/>
    </div>
  )
}
const Button = ({name, value, setvalue}) => {
    return (
        <>
            <button onClick={() => setvalue(value+1)}>{name}</button>
        </>
    )
}
const StatisticLine = ({name, value, pr}) => {
    return (

            <tr>
            <td>{name}</td>
            <td>{value} {pr}</td>
            </tr>

    )
}
const Statistics = ({good, neutral, bad}) => {
    if (good+neutral+bad < 1) {
        return (
            <p>No feedback</p>
        )
    }
    return (
    <tbody>
          <table>
            <StatisticLine name='good' value={good}/>
            <StatisticLine name='neutral' value={neutral}/>
            <StatisticLine name='bad' value={bad}/>
            <StatisticLine name='all' value={good+neutral+bad}/>
            <StatisticLine name='average' value={(good-bad) /(good+neutral+bad)}/>
            <StatisticLine name='positive' value={100*(good/(good+bad+neutral))} pr='%'/>

          </table>
    </tbody>


    )
    
    
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)