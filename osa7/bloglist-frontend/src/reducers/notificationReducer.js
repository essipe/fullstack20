var timeoutid
export const notifChange = (notif, time) => {

  clearTimeout(timeoutid)
  console.log(notif)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notif
    })
    timeoutid = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        notif: null
      })
    }, time * 1000)
  }
}
const notificationReducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notif
  case 'RESET':
    return null
  default:
    return state
  }
}
export default notificationReducer