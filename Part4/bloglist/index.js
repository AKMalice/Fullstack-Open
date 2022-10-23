const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')
const Config = require('./utils/config')
require('express-async-errors')
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const url = Config.URL
logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('succeffully connected to MongoDB')
  }).catch((error) => {
    logger.info('error when connecting to MongoDB:', error.message)
  })

morgan.token('body', function (req) { return JSON.stringify(req.body) })

app.use(bodyParser.json())
app.use(cors())
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.tokenExtractor)
app.use(middleware.tokenValidator)
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)

app.listen(Config.PORT, () => {
  console.log(`Server running on port ${Config.PORT}`)
})