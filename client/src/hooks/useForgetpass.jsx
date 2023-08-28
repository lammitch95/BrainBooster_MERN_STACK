import { useState } from "react"
import { useResetContext } from "./useResetContext"

export const useForgetpass = () =>{

  const[error, setError] = useState('')
  const[hasEmail, setHasEmail] = useState(null)
  const[verifycode, setVerifyCode] = useState('')
  const {dispatch} = useResetContext()

  const forgetPass = async (email) =>{
    const response = await fetch('http://localhost:4000/api/user/forgotpassword',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email})
  })
  

  const data = await response.json()

  if(!response.ok){
    setHasEmail(null)
    setError(data.error)
    console.log('Response not ok')
  }

  if(response.ok){
    setHasEmail(email)
    console.log('Response is ok')
    setVerifyCode(data.code)
    console.log('Here is email; ' , email)
    dispatch({type: 'UPDATE_USER', payload: email})
  }

  }

  return {forgetPass, hasEmail, error, verifycode}

}