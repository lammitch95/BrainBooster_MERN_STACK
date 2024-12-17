import { useEffect, useState} from "react"

import StudySetCollections from "../components/StudySetCollections.jsx"
import StudyOptions from "../components/StudyOptions.jsx"

import { useAuthContext} from "../hooks/useAuthContext.jsx"
import {useStudySetsContext} from '../hooks/useStudySetsContext.jsx'
import { useStudyOptionsContext } from "../hooks/useStudyOptionsContext.jsx"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGreaterThan,faLessThan } from "@fortawesome/free-solid-svg-icons"



import '../styles/homeStyles.css'


const Home = () =>{

  const {studySet, dispatch} = useStudySetsContext()
  const {user} = useAuthContext()
  const {dispatch: optionDispatch} = useStudyOptionsContext()

  const [pageCount, setPageCount] = useState(1)
  const [pagesArr, setPagesArr] = useState([])
  const [direction, setDirection] =useState(0)
  const [isSelected, setIsSelected] = useState(null)

  useEffect(()=>{
    optionDispatch({type: 'CARD_TYPE', payload: null})
  },[])
  
 
  useEffect(()=>{
    const fetchStudySets = async () => {

      const response = await fetch('http://localhost:4000/api/studysets',{
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const data = await response.json()

      if(response.ok){
        dispatch({type: 'SET_STUDYSETS',payload: data})
      }

    }

    if(user){
      fetchStudySets()
    }

  },[dispatch, user])

  useEffect(()=>{
    if(studySet && studySet.length > 0){
      const itemsPerPage = 8
      let pages = []
      let currentPage = []
      for(let i = 0; i < studySet.length; ++i){
        currentPage.push(studySet[i])

        if(currentPage.length === itemsPerPage || i === studySet.length-1){
          pages.push(currentPage)
          currentPage = []
        }
      }
      setPagesArr(pages)
    }
  },[studySet])

  const handlePageTurn = (direction) =>{
    switch(direction){
      case 'right':
        if(pageCount < pagesArr.length){
          setDirection(prevState => prevState - 100)
          setPageCount(prevPage => prevPage + 1)
        }
        break
      case 'left':
        if(pageCount > 1){
          setDirection(prevState => prevState + 100)
          setPageCount(prevPage => prevPage - 1)
        }
        break
      
      default:
        console.log('DIRECTION ERROR BTN DOESNT EXIST')
        break

    }
  }

  const handleIsSelected = (card) =>{
    
    setIsSelected(card)
  }

  const handleBack = () =>{
    setIsSelected(false)
  }

  return(
    <>
    {isSelected && <StudyOptions card={isSelected} handleBack={handleBack}/>}
    <main className="home-page">
      <label className="recent-label">Recents</label>
      {studySet && studySet.length > 0 ? (
      <section className="studySet-div">
        {pagesArr.map((page,pageIndex)=>(
            <div key={pageIndex} className='page' style={{transform: `translateX(${direction}%)`}} >
              {page.map((cards) =>(
                <StudySetCollections key={cards._id} cardSet={cards} handleIsSelected={handleIsSelected}/>
              ))}
            </div>
        ))}
      </section>
      ): (
        <div className="emptySets">Recents is empty...</div>
      )}
      <section className='pageNumDiv'>
        <FontAwesomeIcon onClick={()=>{handlePageTurn('left')}} className='leftArrowHome' icon={faLessThan}/>
        <label className="pageNum">{!studySet || studySet.length === 0 ? 0 : pageCount} / {pagesArr.length}</label>
        <FontAwesomeIcon onClick={()=>{handlePageTurn('right')}} className='rightArrowHome' icon={faGreaterThan}/>
      </section>
    </main>
    </>
  )
}

export default Home