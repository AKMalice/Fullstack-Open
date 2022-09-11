const Header = (prop) => {
    return(

        <h3>{prop.course}</h3>

    )
}

const Total = (prop) => {

const sum = prop.course.reduce(function(a,cv){return a+cv.exercises},0)

    return (
       <h5>Total of {sum} exercises</h5>
    )
}

const Part = (prop) =>{
    return(
        <p>{prop.course.name} {prop.course.exercises}</p>
    )
}

const Content = (prop) =>{

    return (
    <>
    {prop.course.map(item=><Part course={item}/>)}
    </>
    )
}

const Course = (prop) => {
 
  return (
    <>
    <Header course={prop.course.name}/>
    <Content course={prop.course.parts}/>
    <Total course={prop.course.parts}/>
    </>
     )
  }

  export default Course;