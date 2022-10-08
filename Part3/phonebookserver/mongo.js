const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

const password = process.argv[2]

const URL = `mongodb+srv://admin123:${password}@cluster0.kpibhfu.mongodb.net/Persons?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name : String,
    number : String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 5)
{
    const Name = process.argv[3]
    const Number = process.argv[4]
mongoose.connect(URL).then((result)=>{
    console.log('connected')

    const person = new Person({
        name : Name,
        number : Number
    })

    return person.save()
}).then(()=>{
    console.log(`${Name} Added`)
    return mongoose.connection.close()
}).catch((err)=>console.log(err))

}

else if(process.argv.length === 3)
{
    console.log('Phonebook :')
    
    mongoose.connect(URL).then(()=>{
        Person.find({}).then(result => {
            result.forEach(person => {
              console.log(person.name+" "+person.number)
              mongoose.connection.close()
            })
    }) })
       
   

      
}