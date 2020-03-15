import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import BlogForm from './components/blogform'
import LoginForm from './components/loginform'
import Notification from './components/Notification'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import { notifChange } from './reducers/notificationReducer'
import { connect } from 'react-redux'
import { createNewBlog, like } from './reducers/blogReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    userService.getAllUsers().then(users =>
      setUsers(users)
    )

  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
  const removeBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete blog: ${blog.title}`)) {
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }
  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(id, likedBlog)
    setBlogs(blogs.map(b => b.id === id ? { ...blogToLike, likes: blogToLike.likes + 1 } : b))
    dispatch(notifChange(`you liked '${likedBlog.title}'`, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(notifChange(`welcome back ${user.name}!`, 5))
    } catch (exception) {
      dispatch(notifChange('wrong credentials', 5))
    }
  }
  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }
  const Menu = () => {
    const padding = {
      paddingRight: 5
    }
    return (
      <div>
        <div>
          <div>
            <Link style={padding} to="/">blogs</Link>
            <Link style={padding} to="/users">users</Link>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
        </div>
      </div>
    )
  }
  const Users = () => (
    <div>
      <h2>Users</h2>
      {users.map(u =>
        < li key={u.id} >
          <Link to={`/users/${u.id}`}>{u.name} </Link>blogs created {u.blogs.length}
        </li>
      )
      }
    </div >
  )

  const ListBlogs = () => (
    <div>
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title}
                </Link>
              </td>
              <td>
                {blog.user.name}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
  const User = ({ u }) => {
    if (!u) {
      return null
    }
    return (
      < div >
        <h2>{u.name}</h2>
        <h3>added blogs</h3>
        {
          u.blogs.map(b =>
            <li key={b.id}>{b.title}</li>)
        }
      </div >
    )

  }
  const ShowBlog = ({ b }) => {
    if (!b) {
      return null
    }
    return (
      <div>
        <h2>{b.title}</h2>
        <div>{b.url}</div>
        <div>likes {b.likes} </div> <button onClick={() => handleLike(b.id)}>like</button>
        <div>added by {b.user.name}</div>
        {b.user.name === user.name && <button onClick={() => removeBlog(b)}>remove blog</button>}
      </div>
    )
  }
  const userById = (id) =>
    users.find(a => a.id === id)
  const blogById = (id) =>
    blogs.find(a => a.id === id)
  //
  return (
    <div className="container">
      <Router>
        <h1>Blogs</h1>

        {user === null ?
          loginForm() :
          <div>
            <Menu />
            <Route exact path="/" render={() => <BlogForm />} />
            <Notification />
            <Route exact path="/" render={() => <ListBlogs />} />
            <Route exact path="/users" render={() => <Users />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <User u={userById(match.params.id)} />
            } />
            <Route exact path="/blogs/:id" render={({ match }) =>
              <ShowBlog b={blogById(match.params.id)} />
            } />
          </div>
        }
      </Router>
    </div>
  )
}
export default connect(
  null, { notifChange, createNewBlog, like }
)(App)