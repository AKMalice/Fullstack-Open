
const Header = (prop)=>{
  return (
    <div>
      <h1>
        {prop.course.name}
      </h1>
    </div>
  )
}

const Part=(prop)=>{
  return (
    <p>
      {prop.part.name} {prop.part.exercises}
    </p>
  )
}

const Content = (prop)=>{
  return (
    <div>
    <Part part={prop.part[0]} />
    <Part part={prop.part[1]}  />
    <Part part={prop.part[2]}  />
  </div>
  )
}

const Total =(prop)=>{
  return (
    <p>
      Number of excercises {prop.total[0].exercises+prop.total[1].exercises+prop.total[2].exercises}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content part={course.parts}/>
      <Total total={course.parts} />
    </div>
  )
}


export default App