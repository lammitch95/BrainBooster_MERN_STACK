import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useStudyOptionsContext } from '../hooks/useStudyOptionsContext'

import '../styles/homeStyles.css'

const StudyOptions = ({card, handleBack, isMenu}) =>{

  const {dispatch,cardSelect} = useStudyOptionsContext()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch({type:'CARD_TYPE', payload: card})
  },[])

  const handleSelectOptions = (choice) =>{

    if(cardSelect){
      switch(choice){

        case 'flashcards':
            navigate(`/flashcards/${cardSelect._id}`)
            break
        case 'test':
            navigate(`/test/${cardSelect._id}`)
            break
        case 'match':
            navigate(`/match/${cardSelect._id}`)
            break
        case 'word search':
          console.log('CROSS WORD SEARCH COMING SOON')
       
          break

        case 'cross words':
          console.log('CROSS WORDS COMING SOON')
          break

        default:
          console.log('Study Option does not exist')
          break
      }

    }

      

  }
  
  
  return(
    <div className={`studyOptionsDiv ${card && !isMenu ? 'selected': ''}`}>
      <div className="studyOptionsFlex">
        <button onClick={()=>{handleSelectOptions('flashcards')}} className="optionBtn studyFlashBtn">Flashcards</button>
        <button  onClick={()=>{handleSelectOptions('test')}} className="optionBtn studyExamsBtn">Test</button>
        <button  onClick={()=>{handleSelectOptions('match')}} className="optionBtn studyMatch">Match</button>
        <button  onClick={()=>{handleSelectOptions('wordsearch')}} className="optionBtn studyWordSearch">Word Search Coming Soon</button>
        <button  onClick={()=>{handleSelectOptions('cross words')}} className="optionBtn studyCrossWord">Cross Words Coming Soon</button>
        <button onClick={handleBack} className="optionBtn studyBackBtn">Back</button>
      </div>
        <div className='displayDiv'>
            <div className="studyCardDisplay">
              <div className='details details2'>
                <h4 className='set-title'>{card.title}</h4>
                <p className='set-cardLength'>{card.cardArr.length} term</p>
                <p className='set-description'>{card.description}</p>
                <p className='timeCreated'>{formatDistanceToNow(new Date(card.createdAt),{addSuffix:true})}...</p>
              </div>
              <p className='select-label'>Card Selected</p>
          </div>
      </div>
    </div>
  )

}

export default StudyOptions