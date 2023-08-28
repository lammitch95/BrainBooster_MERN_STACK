import { useEffect, useState } from 'react'
import '../styles/testStyles.css'



const MultipleChoice = ({card, handleChoiceSelected}) => {



  return(
    <div className='multipleChoiceDiv'>
      <h3 className='question'>{card.question}</h3>
      <div className='answersDiv'>
        <button onClick={()=>{handleChoiceSelected(card.choices[0], card.answer)}} className='choice' >{card.choices[0]}</button>
        <button onClick={()=>{handleChoiceSelected(card.choices[1], card.answer)}} className='choice' >{card.choices[1]}</button>
        <button onClick={()=>{handleChoiceSelected(card.choices[2], card.answer)}} className='choice' >{card.choices[2]}</button>
        <button onClick={()=>{handleChoiceSelected(card.choices[3], card.answer)}} className='choice' >{card.choices[3]}</button>
      </div>
    </div>
  )
}

export default MultipleChoice