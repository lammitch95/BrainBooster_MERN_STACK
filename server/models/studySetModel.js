const mongoose = require('mongoose')

const studyCardSchema = new mongoose.Schema({
  term:{
    type: String,
    required: true
  },
  definition:{
    type: String,
    required: true
  },
  cardNumber:{
    type: Number,
    require: true
  }
})

const studySetSchema = new mongoose.Schema({
  user_id:{
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cardArr: [studyCardSchema]
  
  
},{timestamps: true})//tells us when document is created and when it was last updated

module.exports = mongoose.model('StudySet', studySetSchema)

