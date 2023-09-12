import { useStudySetsContext } from '../hooks/useStudySetsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"
import { useStudyOptionsContext } from '../hooks/useStudyOptionsContext'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisV} from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import '../styles/homeStyles.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StudySetCollections = ({cardSet, handleIsSelected}) =>{
  const [isMenu, setIsMenu] = useState(false)
  const {dispatch} = useStudySetsContext()
  const{dispatch: editDispatch, cardSelect, editStatus} = useStudyOptionsContext()
  const {user} = useAuthContext()
  const navigate = useNavigate()
  
  const handleDelete = async () =>{

    if(!user){
      return
    }
      const response = await fetch('http://localhost:4000/api/studysets/' + cardSet._id,{
        method: 'DELETE',
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })

      const data = await response.json()

      if(response.ok){
        dispatch({type: 'DELETE_STUDYSET', payload: data})
      }
  }

  const handleMenuClick = () =>{
    setIsMenu(prevState => !prevState)
  }

  const handleEdit = () =>{
    editDispatch({type: 'CARD_TYPE', payload: cardSet})
    editDispatch({type: 'EDIT_ACTIVE', payload: true})
  }

useEffect(()=>{
  if(editStatus && cardSelect){
    navigate(`/edit/${cardSelect._id}`)
  }
},[editStatus])


  return(
    <div className='outerStudyCard'>
      <div className='optionsDiv'>
        <FontAwesomeIcon onClick={handleMenuClick}className='set-options' icon={faEllipsisV}/>
      </div>
      <div onClick={()=>{handleIsSelected(cardSet)}}className="studyCard">
        <div className='details'>
          <h4 className='set-title'>{cardSet.title}</h4>
          <p className='set-cardLength'>{cardSet.cardArr.length} term</p>
          <p className='set-description'>{cardSet.description}</p>
          <p className='timeCreated'>{formatDistanceToNow(new Date(cardSet.updatedAt),{addSuffix:true})}...</p>
        </div>    
    </div>
        <div className={`flex-options ${isMenu ? 'isVisible' : 'isNotVisible'}`}>
          <div className="options-div">
            <FontAwesomeIcon className='deleteBtn' onClick={handleDelete} icon={faTrash}/>
            <FontAwesomeIcon onClick={handleEdit} icon={faPencil} className='editBtn'/>
          </div>
        </div>
  </div>
  )
}

export default StudySetCollections