import anecdoteService from '../services/anecdotes'


export const vote = (a) => {
  //console.log(content)
  return async dispatch => {
    const changeda= {...a, votes: a.votes +1}
    const votedAnecdote = await anecdoteService.update(a.id, changeda)
    const id = votedAnecdote.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecs,
    })
  }
}
//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
      case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }

}

export default reducer