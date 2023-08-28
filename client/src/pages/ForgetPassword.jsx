import { useState } from "react"
import { useForgetpass } from "../hooks/useForgetpass"
import { useResetContext } from "../hooks/useResetContext"
import { Navigate } from "react-router-dom"

import '../styles/ForgotResetStyles.css'

const ForgetPassword = () =>{
  const[userInput, setUserInput] = useState('')
  const[userCodeInput,setUserCodeInput] = useState('')
  const {forgetPass, hasEmail, error, verifycode} = useForgetpass()
  const {reset, dispatch} = useResetContext()
  const[errorMessage, setErrorMessage] = useState(null)


  const handleSubmit = async(e) => {

    e.preventDefault()
    await forgetPass(userInput)

  }

  const handleSubmitCode = (e) =>{
    e.preventDefault()

 
    
    if(userCodeInput === verifycode){
      setErrorMessage(null)
      console.log('Verfication Sucessful')
      console.log('Here is email2; ' , hasEmail)
      dispatch({type: 'ACTIVATE_RESET',payload: true})
      
    } else{
      setErrorMessage(true)
    }
  }

  return(
    <div className="forgetPassDiv">
       {reset && <Navigate to="/reset-password" />}
      {!hasEmail ? (
      <form className='forgetPassForm' onSubmit={(e)=>{handleSubmit(e)}}>
        <h3 className="forgot-header">Forgot Password</h3>
        <label className="forgot-label">Enter Email for Verification</label>
        <input className='forgot-email' type="email" onChange={(e) =>{setUserInput(e.target.value)}} value={userInput} required/>
        <button className="forgot-submit">Submit</button>
        {error && <div className="errorMessage">{error}</div>}
      </form> 
      ): (
        <form className='forgetPassForm' onSubmit={(e) => {handleSubmitCode(e)}}>
          <h3  className="forgot-header">Enter Verfication Code</h3>
          <input  placeholder='Ex: 928374' className={`forgot-email ${errorMessage && 'errorBorder'}`} type='text' onChange={(e)=>{setUserCodeInput(e.target.value)}} value={userCodeInput} required/>
          <button className="forgot-submit">Submit Code</button>
          
        </form> 
       
      )}
    </div>
  )
}

export default ForgetPassword