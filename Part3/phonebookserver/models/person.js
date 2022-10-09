const mongoose = require('mongoose')
require('dotenv').config()
const URL = process.env.MONGODB_URL


mongoose.connect(URL).then(result=>{
    console.log("connected to ",URL)
}).catch((error)=>{
    console.log("Error",error.message)
})


const personSchema = new mongoose.Schema({
    name : {
        type : String,
        minLength: 3,
        required : true
    },
    number : {
        type : String,
        minLength : 8,
        validate : {
            validator : function(check)
            {
                return /\d{2}-\d{6}/.test(check) || /\d{3}-\d{5}/.test(check)
            },message : props=> `${props.value} is not a valid phone number format`
        },
        required : true
    }
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })  

  module.exports = mongoose.model('Person',personSchema)