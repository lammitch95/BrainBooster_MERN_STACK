require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//creates express app
const userRoutes = require('./routes/user')
const studySetRoutes = require('./routes/studySet')
const app = express()



app.use(cors())
//check for data and attaches to request
app.use(express.json())
//middlware | prints out request path/method
app.use((req, res, next)=>{
  console.log(req.path, req.method)
  next()
})


//routes
app.use('/api/user', userRoutes)
app.use('/api/studysets', studySetRoutes)

//routes
app.get('/', (req,res) =>{
  res.json({mssg: 'Welcome to the app'})
})



//connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
      //listening for request
      app.listen(process.env.PORT, () =>{
      console.log('Connected to databse and Listening port', process.env.PORT)
    })
  })
  .catch(err =>{
    console.log(error)
  })


