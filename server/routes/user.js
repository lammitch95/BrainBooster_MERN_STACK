const express = require('express')
const {loginUser, signupUser, forgotPassword, resetPassword} = require('../controllers/userController') 
const router = express.Router()



router.post('/login',  loginUser)

router.post('/signup', signupUser)

router.post('/forgotpassword', forgotPassword)

router.post('/resetpassword', resetPassword)

module.exports = router