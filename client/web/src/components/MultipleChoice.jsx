import { useEffect, useState } from 'react'
import '../styles/testStyles.css'



const MultipleChoice = ({card, handleChoiceSelected}) => {

  const [answer, setAnswer] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  const [userSelect, setUserSelect] = useState(false)
  
  const userChoice = (choice,answer,handleChoiceSelected) =>{
    setAnswer(answer)
    setUserSelect(choice)
    setIsDisabled(true)
    handleChoiceSelected(choice,answer)

  }


  return(
    <div className='multipleChoiceDiv'>
      <h3 className='question'>{card.question}</h3>
      <div className='answersDiv'>
        <button onClick={()=>{userChoice( card.choices[0], card.answer, handleChoiceSelected)}} className={`choice ${answer && answer === card.choices[0] ? 'turnGreen' : answer ? 'turnRed': ''} ${userSelect
        === card.choices[0] ? 'selectBorder': ''}`} disabled={isDisabled}>{card.choices[0]}</button>
        <button onClick={()=>{userChoice(card.choices[1], card.answer, handleChoiceSelected)}}className={`choice ${answer && answer === card.choices[1] ? 'turnGreen' : answer ? 'turnRed': ''} ${userSelect
        === card.choices[1] ? 'selectBorder': ''}`} disabled={isDisabled}>{card.choices[1]}</button>
        <button onClick={()=>{userChoice(card.choices[2], card.answer, handleChoiceSelected)}}className={`choice ${answer && answer === card.choices[2] ? 'turnGreen' : answer ? 'turnRed': ''} ${userSelect
        === card.choices[2] ? 'selectBorder': ''}`} disabled={isDisabled}>{card.choices[2]}</button>
        <button onClick={()=>{userChoice(card.choices[3], card.answer, handleChoiceSelected)}}className={`choice ${answer && answer === card.choices[3] ? 'turnGreen' : answer ? 'turnRed': ''} ${userSelect
        === card.choices[3] ? 'selectBorder': ''} `} disabled={isDisabled}>{card.choices[3]}</button>
      </div>
    </div>
  )
}

export default MultipleChoice