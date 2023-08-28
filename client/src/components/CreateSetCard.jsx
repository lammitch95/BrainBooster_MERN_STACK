import {useState, useEffect} from 'react'
import { useCreateSetContext } from '../hooks/useCreateSetContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import '../styles/createSetStyles.css'

const CreateSetCard = ({studyCard}) =>{

  const [term, setTerm] = useState('')
  const [def, setDef] = useState('')
  const {dispatch} = useCreateSetContext()
  const [isDelete, setIsDelete] = useState(false)

  useEffect(()=>{
    setTerm(studyCard.term)
    setDef(studyCard.definition)
    setTimeout(()=>{
      autoResize({ target: document.getElementById(`term-${studyCard.cardNumber}`) })
      autoResize({ target: document.getElementById(`def-${studyCard.cardNumber}`) })
    },500)
  },[])

  useEffect(()=>{
    dispatch({type: 'UPDATE_TERM', payload: {term, studyCard}})
   
      autoResize({ target: document.getElementById(`term-${studyCard.cardNumber}`) })
    
   },[term])

   useEffect(()=>{
    dispatch({type: 'UPDATE_DEFINITION', payload: {def, studyCard}})
   
    
    
   },[def])


  const autoResize = (event) => {
    const textarea = event.target
    textarea.style.height ='1.7rem'
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  const deleteCard = (e, findNumber) =>{
    e.preventDefault()
    setIsDelete(true)
    setTimeout(()=>{
      dispatch({type: 'DELETE_CARD',payload: findNumber})
      setIsDelete(false)
    },500)
    
  }

  return(
    <section className={`study-card  ${studyCard.cardAdded && 'cardTransition'} ${isDelete && 'deleteCardAnimation'}`}>
        <div className="number-options">
          <label className="card-number">#{studyCard.cardNumber}</label>
          <button onClick={(e)=> {deleteCard(e,studyCard.cardNumber)}} className="cardOption"><FontAwesomeIcon icon={faTrash} /></button>
        </div>
        <div className="term-definition">
          <div className="term-div">
            <textarea  id={`term-${studyCard.cardNumber}`}  onInput={autoResize} onChange={(e)=> setTerm(e.target.value)} className="card-input" placeholder="Add Term"  value={studyCard.cardTerm} required></textarea>
            <label>TERM</label>
          </div>
          <div className="definition-div">
          <textarea id={`def-${studyCard.cardNumber}`} onInput={autoResize} onChange={(e) => setDef(e.target.value)}className="card-input" placeholder="Add Definition" value={studyCard.cardDefinition} required></textarea>
          <label>DEFINITION</label>
          </div>
        </div>
    </section>
  )
}

export default CreateSetCard