import React, { useState } from 'react'
import { notifChange } from '../reducers/notificationReducer'
import { createNewBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'

const BlogForm = () => {

  const [title, setTitle] = useState([''])
  const [author, setAuthor] = useState([''])
  const [url, setUrl] = useState([''])
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()


  const addBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    console.log(title)
    const url = event.target.url.value
    const author = event.target.author.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    console.log(newBlog.title)
    dispatch(createNewBlog(newBlog))
    dispatch(notifChange(`a new blog '${newBlog.title}' by ${newBlog.author} added!`, 5))
    window.location.reload()
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }


  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">save</button>

      </form>
    </Togglable>
  )


}
export default BlogForm