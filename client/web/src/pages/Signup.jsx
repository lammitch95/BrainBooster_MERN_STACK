import { useEffect, useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { useErrorContext } from "../hooks/useErrorContext"
import '../styles/loginStyles.css'

const Signup = () =>{

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error} = useSignup()
  const {dispatch} = useErrorContext()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    await signup(email,password)
  }

  useEffect(()=>{
    if(error){
      dispatch({type: 'SET_ERROR', payload: error})
    }
  },[error])

  return(
    <div className='login-div'>
    <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-header">Sign up Today</h3>
        <label className="login-label">Email</label>
        <input className='signin-input' type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <div className="password-div">
          <label className="login-label">Password</label>
        </div>
        <input className='signin-input' type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        <button className='submit-btn' disabled={isLoading}>Sign up</button>
      
      </form>
    </div>
  )
}

export default Signup