import { useState } from 'react'
import '../styles/flashCardStyles.css'

const FlashcardComponent = ({info}) =>{

  const [toggle, setToggle] = useState(false)

  const handleToggle = () =>{
    setToggle(prevState => !prevState)
  }

  return(
    <div onClick={handleToggle} className={`card ${toggle ? 'isFlipped' : 'returnFlip'}`}>
      <div className='frontCard'><p>{info.term}</p></div>
      <div className="backCard"><p>{info.definition}</p></div>
    </div>
  )

}

export default FlashcardComponent