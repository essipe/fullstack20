import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  //const notification = useSelector(state => state.notif)
  //console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (!props.notif) {
    return null
  }
  return (
    <div style={style}>
      {props.notif}
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    notif: state.notif,
  }
}

const Notifications = connect(mapStateToProps)(Notification)
export default Notifications