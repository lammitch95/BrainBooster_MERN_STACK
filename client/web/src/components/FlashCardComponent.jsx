import { useEffect, useState } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons'
import '../styles/flashCardStyles.css'



const FlashcardComponent = ({info}) =>{

  const [toggle, setToggle] = useState(false)
  const [isSpeechTerm, setIsSpeechTerm] = useState(false)
  const [isSpeechDef, setIsSpeechDef] = useState(false)
  const synthesis = window.speechSynthesis
  const [voice, setVoice] = useState(null)

 
  useEffect(()=>{
    const voice = synthesis.getVoices()
    setVoice(voice[6])

  },[synthesis,voice])
  const handleToggle = () =>{
    setToggle(prevState => !prevState)
  }

  const handleOnSpeechTerm = (cardText) =>{
    if(!isSpeechTerm){
      setIsSpeechTerm(true)
      const utterance = new SpeechSynthesisUtterance(cardText)
      utterance.voice = voice
      synthesis.speak(utterance)
      utterance.onend = () =>{
        setIsSpeechTerm(false)
      }
      
    }

    if(isSpeechTerm){
      setIsSpeechTerm(false)
      synthesis.cancel()
    
    }
    
  }

  const handleOnSpeechDef = (cardText) =>{
    if(!isSpeechDef){
      setIsSpeechDef(true)
      const utterance = new SpeechSynthesisUtterance(cardText)
      utterance.voice = voice
      synthesis.speak(utterance)
      utterance.onend = () =>{
        setIsSpeechDef(false)
      }
      
    }

    if(isSpeechDef){
      setIsSpeechDef(false)
      synthesis.cancel()
    }

    
  }

  return(
    <div  className={`card ${toggle ? 'isFlipped' : 'returnFlip'}`}>
      <div  className='frontCard'>
        <FontAwesomeIcon  icon={faVolumeHigh} className={`speech ${isSpeechTerm  ? 'onSpeech': ''}`} onClick={()=>{handleOnSpeechTerm(info.term)}}/>
        <p onClick={handleToggle} className='cardInfo'>{info.term}</p>
      </div>
      <div className="backCard">
        <FontAwesomeIcon icon={faVolumeHigh} className={`speech  ${isSpeechDef ? 'onSpeech': ''}`} onClick={()=>{handleOnSpeechDef(info.definition)}}/>
        <p onClick={handleToggle} className='cardInfo'>{info.definition}</p>
      </div>
    </div>
  )

}

export default FlashcardComponent