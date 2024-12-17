import {useState } from 'react'

import '../styles/testStyles.css'

const TrueAndFalse = ({card, handleChoiceSelected}) =>{

  const [selectedChoice, setSelectedChoice] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)
  
  const userChoice = (choice,answer,handleChoiceSelected) =>{
    setSelectedChoice(answer)
    setIsDisabled(true)
    handleChoiceSelected(choice,answer)

  }

  return(
    <div className='multipleChoiceDiv'>
    <h3 className='question'>{card.question}</h3>
    <div className='answersDiv fortF'>
      <button onClick={()=>{userChoice( card.choices[0], card.answer, handleChoiceSelected)}} className={`choice choiceTF ${selectedChoice && selectedChoice == card.choices[0] ? 'turnGreen' : selectedChoice ? 'turnRed': ''} `} disabled={isDisabled}>{card.choices[0]}</button>
      <label className='splitLabel'>or</label>
      <button onClick={()=>{userChoice( card.choices[1], card.answer, handleChoiceSelected)}} className={`choice choiceTF ${selectedChoice && selectedChoice == card.choices[1] ? 'turnGreen' : selectedChoice ? 'turnRed': ''} `} disabled={isDisabled} >{card.choices[1]}</button>
    </div>
  </div>
  )

}

export default TrueAndFalse