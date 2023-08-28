const StudySet = require('../models/studySetModel')
const mongoose = require('mongoose')


const getAllStudySet = async (req,res) =>{
  const user_id = req.user._id
  const studySets = await StudySet.find({user_id}).sort({updatedAt: -1})

  res.status(200).json(studySets)

}

const getStudySet = async(req,res) =>{
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such studySet'})
  }

  const studySet = await StudySet.findById(id)

  if (!studySet) {
    return res.status(404).json({error: 'studyset id doesnt exist'})
  }

  res.status(200).json(studySet)
}

const createStudySets = async (req,res) =>{

  const{title, description, cardArr} = req.body

  let emptyFields = []

  if(!title){
    emptyFields.push('no title')
  }

  if(!description){
    emptyFields.push('no description')
  }

  if(!cardArr){
    emptyFields.push('no card Array')
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  try {
    const user_id = req.user._id
    const studySet = await StudySet.create({title, description, user_id, cardArr})
    res.status(200).json(studySet)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteStudySet = async (req,res) =>{

  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such studySet exists'})
  }

  const studySet = await StudySet.findOneAndDelete({_id: id})

  if(!studySet) {
    return res.status(400).json({error: 'studyset id doesnt exist'})
  }

  res.status(200).json(studySet)

}

const updateStudySet = async (req,res) =>{
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such studySet exists'})
  }

  const studySet = await StudySet.findOneAndUpdate({_id: id}, {...req.body})

  if (!studySet) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(studySet)
}

module.exports={
  getAllStudySet, 
  getStudySet,
  createStudySets,
  deleteStudySet,
  updateStudySet
}