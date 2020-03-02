import { createStore, combineReducers, applyMiddleware } from 'redux'
import AnecdoteReducer from './reducers/anecdoteReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import FilterReducer from './reducers/filterReducer'
import notifReducer from './reducers/notifReducer'

const reducer = combineReducers({
    anecdotes: AnecdoteReducer,
    filter: FilterReducer,
    notif: notifReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store