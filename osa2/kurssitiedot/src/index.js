import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'New course',
      id: 3,
      parts: [
        {
          name: 'Part 1',
          exercises: 2,
          id: 1
        },
        {
          name: 'Part 2',
          exercises: 6,
          id: 2
        },
        {
          name: 'Part 3',
          exercises: 5,
          id: 3
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course =>
      <Course key={course.id} course={course}/>
      )}
      
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))