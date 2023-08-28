import { useEffect } from 'react'
import {useErrorContext} from '../hooks/useErrorContext'

import '../styles/index.css'


const ErrorMessage = () =>{

  const {error,dispatch} = useErrorContext()

  useEffect(()=>{

    if(error){
      setTimeout(()=>{
        dispatch({type: 'SET_ERROR', payload: null})
      },2000)
    }
  },[error])

 
  return(
    <div className={`errorMssg ${error ? 'showError': 'hideError'}`}>
      <p>[ERROR: {error}...]</p>
    </div>
  )
}

export default ErrorMessage