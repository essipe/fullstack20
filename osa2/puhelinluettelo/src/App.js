import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ Filter, setFilter] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })

  }, [])

  

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,

    }
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewNumber('')
        setNewName('')
      })

  }
  const handlePerson = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(Filter.toLowerCase()))


  return (
    
    <div>
      <h2>Phonebook</h2>
      <div>
        filter by: <input filter={Filter} onChange={handleFilter}/>
      </div>

        <div>
          <h3>Add a new contact</h3>
          <form onSubmit={addPerson}>
            <div>name: <input value={newName} onChange={handlePerson}/></div>
            <div>number: <input value={newNumber} onChange={handleNumber}/></div>
          <button type="submit">add</button>
          </form>
        </div>
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}> 
            {person.name} {person.number}
          </li>)}
      </ul>
    </div>
  )

}

export default App