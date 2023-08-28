import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

import '../styles/loginStyles.css'

const Signup = () =>{

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error} = useSignup()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    await signup(email,password)
  }

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
        <button className='submit-btn' disabled={isLoading}>Log In</button>
        {error && <div className="errorMessage">{error}...</div>}
      </form>
    </div>
  )
}

export default Signup