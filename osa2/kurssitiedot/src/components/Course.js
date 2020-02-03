import React from 'react'


const Course = ({ course }) => {
    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }
  const Header = ({ course }) => {
    return <h2>{course.name}</h2>
  }
  const Content = ({ course }) => {
    return (
      <Part course={course} />
    )
  }
  const Total = ({ course }) => {
    const arr = course.parts
    const reducer = (acc, current) => acc + current.exercises
  
    return (
      <div>
        <p>Number of exercises {arr.reduce(reducer,0)} </p>
      </div>
    )
  }
  const Part = ({ course }) => {
    return (
      <div>
        {course.parts.map(part =>
          <li key={part.id}>{part.name} {part.exercises}</li>
        )}
      </div>
    )
  }

export default Course