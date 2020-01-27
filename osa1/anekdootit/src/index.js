import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  
  const [votes, setVotes] = useState([0,0,0,0,0,0])
  const [selected, setSelected] = useState(0)
  console.log(selected);
  console.log(votes);
  const Vote = () => {

  const copy = [...votes]
  copy[selected] += 1
  setVotes(copy)
  if (votes[selected] > most) {
    most=votes[selected]
    mostvoted = selected
  }
}
  return (
    <div>
      <h1>Anecdote:</h1>
      {props.anecdotes[selected]}
    
    
      <p>
        <button onClick={Vote}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random()*6))}>next anecdote</button></p>
        <h1>most voted anecdote:</h1>

        {props.anecdotes[mostvoted]}
    <p>has {most} votes</p>
    </div>
  )
}
let mostvoted = 0;
let most = 0
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)