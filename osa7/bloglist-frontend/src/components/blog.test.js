import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const user = {
  username: 'essi',
  name: 'essi',
  password: 'essi'
}
const blog = {
  title: 'blogin otsikko',
  author: 'essipessi',
  url: 'ww.jee.fi',
  user: {
    username: 'essi',
    name: 'essi',
    password: 'essi'
  },
  likes: 0
}


test('renders title and author and not url or likes', () => {


  const component = render(
    <Blog blog={blog} user={user}/>
  )

  expect(component.container).toHaveTextContent(
    'blogin otsikko'  )
  expect(component.container).toHaveTextContent(
    'essipessi'  )
})
test('renders url and likes after clicking button', () => {
  const component = render(
    <Blog blog={blog} user={user}/>
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')
})
test('clicking the button twice calls event handler twice', async () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler}/>
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})