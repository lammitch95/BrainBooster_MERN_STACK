import { useEffect } from 'react'
import {useErrorContext} from '../hooks/useErrorContext'

import '../styles/index.css'


const ErrorMessage = () =>{

  const {error,dispatch} = useErrorContext()

  useEffect(()=>{
    console.log('ERROR MESSAGE FILE ERROR: ', error)
    if(error){
      setTimeout(()=>{
        dispatch({type: 'SET_ERROR', payload: null})
        
      },1000)
    }
  },[error])

 
  return(
    <div className={`errorMssg ${error ? 'showError': 'hideError'}`}>
      <p>[ERROR: {error}...]</p>
    </div>
  )
}

export default ErrorMessage