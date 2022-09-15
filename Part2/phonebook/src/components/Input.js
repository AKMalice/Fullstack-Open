const Input= (prop)=>{
    return (
      <>
      {prop.name} <input value={prop.value} onChange={prop.onChange}/>
      </>
    )
  }

  export default Input