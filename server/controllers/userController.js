const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

const createToken = (_id) =>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
}

const generateForgetPassCode = () =>{
  const code = Math.floor(100000 + Math.random() * 900000).toString()
  return code
}

const loginUser = async (req,res) =>{
  const{email, password} = req.body
  try{
    const user = await User.login(email,password)

  //creating a token
  const token = createToken(user._id)

  res.status(200).json({email,token})
}catch(error){
  res.status(400).json({error: error.message})
}

}

const signupUser = async (req,res) =>{
  const {email, password} = req.body
  try{
    const user = await User.signup(email,password)

    //creating a token
    const token = createToken(user._id)

    res.status(200).json({email,token})
  }catch(error){
    res.status(400).json({error: error.message})
  }

}



const forgotPassword = async (req,res) =>{
  const{email} = req.body
  try{

    const user = await User.forgotPass(email)

    const code = generateForgetPassCode()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS
      }
    })
   
    const mailOptions = {
      from: process.env.USER,
      to: user.email,
      subject: 'RESET PASSWORD VERFICATION CODE - BRAINBOOSTER',
      text: `Code: ${code}`,
      
    }

    transporter.sendMail(mailOptions, (error)=>{
      if(error){
        console.error(error)
        res.status(500).json({error: 'Error sending email.'})
      }else{
        res.status(200).json({mssg: 'Verfication code sent', code})
      }
    })

  }catch(error){
    res.status(400).json({error: error.message})
  }

}

const resetPassword = async (req,res) =>{

  const{email: userEmail,newPassword} = req.body
  
  try{

    const query =  {email: userEmail}

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)

    const update = { $set: { password: hash} }

    const updateDocument = await User.findOneAndUpdate(query, update, { new: true })
    
    if(!updateDocument){
      return res.status(500).json({error: 'Document not found'})
    }

    return res.status(200).json({message: `Sucessfully update password for account: ${userEmail}`, updateDocument})

    
  
  }catch(error){
    res.status(400).json({error: error.message})
  }

}

module.exports ={
  loginUser,
  signupUser,
  forgotPassword, 
  resetPassword
}