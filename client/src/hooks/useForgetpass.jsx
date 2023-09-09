import { useState } from "react"
import { useResetContext } from "./useResetContext"
import { useErrorContext } from "../hooks/useErrorContext"

export const useForgetpass = () =>{

  const[error, setError] = useState('')
  const[hasEmail, setHasEmail] = useState(null)
  const[isLoading, setLoading] = useState(null)
  const[verifycode, setVerifyCode] = useState('')
  const {dispatch} = useResetContext()
  const {dispatch: errorDispatch} = useErrorContext()

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
    console.log('Response not ok', data.error)
    errorDispatch({type:'SET_ERROR', payload: error})
  }

  if(response.ok){
    setHasEmail(email)
    console.log('Response is ok')
    setVerifyCode(data.code)
    console.log('Here is email; ' , email)
    dispatch({type: 'UPDATE_USER', payload: email})
    
  }
        setLoading(false)
  }

  return {forgetPass, hasEmail, error, verifycode, isLoading}

}