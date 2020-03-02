import React from 'react'
//import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifChange } from '../reducers/notifReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    //const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.notifChange(`new anecdote added: '${content}'`, 5)
    }
    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}
export default connect(
    null, {createAnecdote, notifChange}
)(AnecdoteForm)