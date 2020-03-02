import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notifChange } from '../reducers/notifReducer'

const Anecdote = ({ anecdote, voteanecdote }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={voteanecdote}>vote</button>
            </div>
        </div>
    )
}

const Anecdotes = () => {
    const filteredanecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === 'ALL') {
            return anecdotes
        }
        console.log(filter)
        return anecdotes.filter(anec => anec.content.toLowerCase().includes(filter.toLowerCase()))
    })
    const dispatch = useDispatch()
    const newVote = anecdote => {
        dispatch(vote(anecdote))
        dispatch(notifChange(`you voted '${anecdote.content}'`, 5))
    }
    return (
        <div>
            {filteredanecdotes.sort((a, b) => {
                return b.votes - a.votes
            }).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    voteanecdote={() => newVote(anecdote)}
                />
                /*<div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => newVote(anecdote)}>vote</button>
                    </div>
                </div>*/
            )}
        </div>
    )
}
export default Anecdotes
