import '../styles/testStyles.css'

const TrueAndFalse = ({card, handleChoiceSelected}) =>{

  return(
    <div className='multipleChoiceDiv'>
    <h3 className='question'>{card.question}</h3>
    <div className='answersDiv fortF'>
      <button onClick={()=>{handleChoiceSelected(card.choices[0], card.answer)}} className='choice choiceTF' >{card.choices[0]}</button>
      <label className='splitLabel'>or</label>
      <button onClick={()=>{handleChoiceSelected(card.choices[1], card.answer)}} className='choice choiceTF' >{card.choices[1]}</button>
    </div>
  </div>
  )

}

export default TrueAndFalse