import blogService from '../services/blogs'

export const createNewBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}
export const like = (b) => {
  //console.log(content)
  return async dispatch => {
    const changedb = { ...b, likes: b.likes + 1 }
    const likedblog = await blogService.update(b.id, changedb)

    dispatch({
      type: 'LIKE',
      likedblog
    })
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}
const byVotes = (a1, a2) => a2.votes - a1.votes
const reducer = (state = [], action) => {
  switch (action.type) {
  case 'LIKE':
    const liked = action.data
    return state.map(a => a.id === liked.id ? liked : a).sort(byVotes)
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }

}

export default reducer