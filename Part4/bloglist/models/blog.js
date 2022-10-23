const mongoose = require('mongoose')
const Config = require('../utils/config')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

  mongoose.connect(Config.URL).then(res=>console.log('connected to mongoDB'))

module.exports = mongoose.model('Blog', blogSchema)