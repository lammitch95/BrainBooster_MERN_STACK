import { useEffect, useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"
import '../styles/loginStyles.css'
import { useErrorContext } from "../hooks/useErrorContext"

const Login = () =>{

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, isLoading, error} = useLogin()
  const {dispatch} = useErrorContext()

  const handleSubmit = async (e) =>{
    e.preventDefault()

    await login(email,password)
  }

  useEffect(()=>{
    
    if(error){
      dispatch({type:'SET_ERROR', payload: error})
    }
    
  },[error])

  return(
    <div className="login-div">
      <div className="intro-div">
        <h2 className="intro-title">Welcome to <span>BrainBooster</span>!</h2>
        <p className="intro-welcome">A tool to help you excel in your exams and boost your subject knowledge. My platform is designed with a focus on helping you memorize and retain information effectively.</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-header">Sign in</h3>
        <label className="login-label">Email</label>
        <input className='signin-input' type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <div className="password-div">
          <label className="login-label">Password</label>
          <Link className='forget-pass-link' to='/forget-password'>forgot passsword?</Link>
        </div>
        <input className='signin-input' type="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
        
        <button className='submit-btn' disabled={isLoading}>Log In</button>
       
      </form>
    </div>
  )
}

export default Login