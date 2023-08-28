import { useState } from "react"
import { useResetContext } from "../hooks/useResetContext"
import '../styles/ForgotResetStyles.css'


const ResetPassword = () =>{
  
  const[newPassword,setNewPassword] = useState('')
  const[reenterPass,setReenterPass] = useState('')
  const {email, dispatch} = useResetContext()
 

  const handleSubmit = async (e) =>{
    e.preventDefault()

    if(reenterPass === newPassword){
      console.log('check email:', email)
      const response = await fetch('http://localhost:4000/api/user/resetpassword',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email,newPassword})
      })
      
    
      const data = await response.json()

      if(!response.ok){
        console.log(data.error)
      }

      if(response.ok){
          console.log(data.message)
          console.log(data.updateDocument)
          dispatch({type: 'DEACTIVATE_RESET',payload: false})
          
         
      }
      
    
    }else{
      console.log('Re-entered password doesnt match with new password')
    }
  }
  

  return(
    <div className="forgetPassDiv">
    <form className='forgetPassForm' onSubmit={(e)=>{handleSubmit(e)}}>
      <h3 className="forgot-header">Reset Password</h3>
      <label className="forgot-label">Enter New Password</label>
      <input className='forgot-email' required type="password" onChange={(e)=>{setNewPassword(e.target.value)}} value={newPassword}/>
      <label className="forgot-label margin">Re-enter New Password</label>
      <input className='forgot-email' required type="password" onChange={(e)=>{setReenterPass(e.target.value)}} value={reenterPass}/>
      <button className="forgot-submit">Submit</button>
      {console.log('checker email:', email)}
    </form>
    </div>
  )
}


export default ResetPassword