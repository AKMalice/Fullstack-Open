const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const PORT = process.env.PORT || 3001
app.use(cors())
app.use(express.json())

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') { 
    return response.status(400).json({ error: error.message }) 
  }

  next(error)
}

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/',(request,response) => {
  response.send('<h1>Server Running</h1>')
})

app.get('/api/persons',(request,response)=>{
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/info',(request,response)=>{
  const date = new Date()
  Person.find({}).then(persons=>{
    response.send(
      `  <div>  
       <p>Phonebook has info for ${persons.length} people</p> 
       <p> ${date} </p>
      </div>`
    )}
  )
})

app.get('/api/persons/:id',(request,response,next)=>{
   
  Person.findById(request.params.id).then(result=>{
    if(result)
      response.json(result)
    else
      response.status(404).end()
  }).catch(error=> next(error))
})

app.delete('/api/persons/:id',(request,response,next)=>{
  Person.findByIdAndRemove(request.params.id).then(()=>{
    response.status(204).end()
  }).catch(error=>next(error))
})

app.post('/api/persons', (request, response,next) => {
  const body = request.body

  const person = new Person( {
    name :body.name,
    number : body.number,
  })
   
  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error=> next(error))
})

app.put('/api/persons/:id',(request,response,next)=>{
  const body= request.body
  const person = {
    name : body.name,
    number : body.number
  }
  Person.findByIdAndUpdate(request.params.id,person, { new: true })
    .then(result=> response.json(result)).catch(error=>next(error))
})

app.use(errorHandler)
app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`)
})
