import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useCreateSetContext } from "../hooks/useCreateSetContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useStudyOptionsContext } from "../hooks/useStudyOptionsContext";
import { useErrorContext } from "../hooks/useErrorContext";

import CreatSetCard from '../components/CreateSetCard'


import '../styles/createSetStyles.css'

const EditSetForm = () =>{
   
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isAdded, setIsAdded] =useState(false)


    const {dispatch, cardArr} = useCreateSetContext()
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const {cardSelect, editStatus, dispatch: editDispatch} = useStudyOptionsContext()
    const {dispatch: errorDispatch} = useErrorContext()

  useEffect(()=>{
    
    if(cardSelect){
      setTitle(cardSelect.title)
      setDescription(cardSelect.description)
      dispatch({type: 'LOAD_EDITSET', payload: cardSelect.cardArr})
    }
    
  },[])
 
   useEffect(()=>{
    console.log('CARDARR: ', cardArr)
   },[cardArr])

   useEffect(()=>{
    setTimeout(()=>{
      dispatch({type:'CARD_ADDED_TRANSITION'})
      setIsAdded(false)
    },1000)
   },[isAdded])

   const addCard = (e) =>{
      e.preventDefault()
      dispatch({type: 'ADD_CARD'})
      setIsAdded(true)
   }

    const autoResize = (e) => {
      const textarea = e.target
      textarea.style.height ='1.7rem'
      textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const handleDuplicate = (array) => {
      
      const handleTerm= new Set()
      const handleDef= new Set()
      

      for(let item of array){
        if(handleTerm.has(item.cardTerm) || handleTerm.has(item.cardDefinition) || handleDef.has(item.cardTerm) || handleDef.has(item.cardDefinition)){
          return true
        }

        handleTerm.add(item.cardTerm)
        handleDef.add(item.cardDefinition)
      }

      return false
    }

    const handleSubmitForm =  async(e) =>{
      e.preventDefault()
      console.log('handleSubmit Edit Form called')
      
      if(!user){
        errorDispatch({type: 'SET_ERROR', payload: 'Must Be Logged In to access this page'})
        return
      }

      const checkForDup = handleDuplicate(cardArr)

      if(checkForDup){
        errorDispatch({type: 'SET_ERROR', payload: 'There are duplicate values in your study set'})
        return
      }
   
      if(cardArr.length < 5){
        errorDispatch({type: 'SET_ERROR', payload: 'Create Study Set minimum length of 5 not met'})
        return
      }

      const updatedCardArr = cardArr.map((card) => ({
        term: card.cardTerm,
        definition: card.cardDefinition,
        cardNumber: card.cardNumber,
      }));

      const studySet = {title,description,cardArr: updatedCardArr}
      const response = await fetch('http://localhost:4000/api/studysets/' + cardSelect._id ,{
        method: 'PATCH',
        body: JSON.stringify(studySet),
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      const data= await response.json()

      if(!response.ok){
        console.log(data.error)
        setError(data.error)
      }

      if(response.ok){
        console.log('Form has SUCESSFULY SUBMITTED')
        console.log('FORM THAT YOU SUBMITTED', data)
        editDispatch({type: 'EDIT_DEACTIVATE', payload: false})
        editDispatch({type: 'CARD_TYPE', payload: null})
        dispatch({type: 'SET_CARDARR'})
      }
     
    }

    const handleBackBtn = () => {
      editDispatch({type: 'EDIT_DEACTIVATE', payload: false})
      editDispatch({type: 'CARD_TYPE', payload: null})
      dispatch({type: 'SET_CARDARR'})
    }
     
    useEffect(()=>{
      if(!editStatus && cardArr.length === 0 && !cardSelect){
        navigate('/home')
      }
    },[editStatus, cardArr, cardSelect])
  return(
    
      <form className="createSetForm" onSubmit={handleSubmitForm}>
        <div className="createSet-bar">
          <div className="groupCreateBtn ">
            <button  onClick={handleBackBtn} className="createSetBackBtn">Back</button>
            <button id='submitBtn' type='submit' className="createNewSetBtn">Save</button>
          </div>
        </div>
        <label className="titleLabel">TITLE</label>
        <input onChange={(e)=>{setTitle(e.target.value)}} value={title} className="createSet-title" type="text" placeholder="Enter title of study set here..." autoComplete="off" required/>
        <label className="descriptionLabel">DESCRIPTION</label>
        <textarea onInput={autoResize} onChange={(e)=>{setDescription(e.target.value)}} value ={description} className="createSet-description" placeholder="Add description here..." required></textarea>
        <div className='studyCardsContainer'>
        {cardArr.map((card) => (
          <CreatSetCard key={card.cardNumber} studyCard={card} />
        ))}
        </div>
        <button className="newCardBtn" onClick={(e)=>addCard(e)}>+ Add Card</button>
      </form> 
    
  )
}

export default EditSetForm