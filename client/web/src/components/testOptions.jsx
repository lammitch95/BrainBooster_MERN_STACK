import '../styles/testStyles.css'
import {useTestOptionsContext} from '../hooks/useTestOptionsContext'
import { useEffect, useState } from 'react'

const TestOptions = () => {

  const [isToggle, setIsToggle] = useState(false)
  const {dispatch, tF, mC} = useTestOptionsContext()


  const handleToggle = (option) => {

    switch(option){

      case 1:
        if(tF){
          dispatch({type: 'TRUE_AND_FALSE', payload: false})

        }else{
          dispatch({type: 'TRUE_AND_FALSE', payload: true})
          dispatch({type: 'MULTIPLE_CHOICE', payload: false})
         
        }
        break

        case 2:
          if(mC){
            dispatch({type: 'MULTIPLE_CHOICE', payload: false})
  
          }else{
            dispatch({type: 'MULTIPLE_CHOICE', payload: true})
            dispatch({type: 'TRUE_AND_FALSE', payload: false})
          }
          break
        
        case 4:
          setIsToggle(prevToggle => !prevToggle)
          break


        default:
          console.log('No test Option Exist')
          break
    }
    
  }



  return(
    <>
      <div className='selectOptionsDiv'>
          <button onClick={()=>{handleToggle(4)}} className="selectOptionsBtn">Select Options</button> 
      </div>
      <div className={`testOptionDiv  `}>
        <div className={`selectOptions ${!isToggle ? 'selectOptionsHide': ''}`}>
        <button className={`testChoices ${mC ? 'optionToggle' : ''}`} onClick={()=>{handleToggle(2)}} >Multiple Choice</button>
        <button className={`testChoices ${tF ? 'optionToggle' : ''}`}   onClick={()=>{handleToggle(1)}}>True / False</button>
      </div>
    </div>
  </>

  )

}

export default TestOptions