import FlashcardComponent from "../components/FlashCardComponent"
import '../styles/flashCardStyles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLessThan,faGreaterThan} from '@fortawesome/free-solid-svg-icons'


import { useEffect, useState } from "react"
import { useStudyOptionsContext } from '../hooks/useStudyOptionsContext'

const FlashCards = () =>{

  const [pageCount, setPageCount] = useState(1)
  const [direction, setDirection] =useState(0)

  const {cardSelect} = useStudyOptionsContext()
  

  const handlePageTurn = (direction) =>{
    
    switch(direction){
      case 'right':
        if(pageCount < cardSelect.cardArr.length){
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

  return(
    <main className="fcPage">
      <FontAwesomeIcon onClick={()=>{handlePageTurn('left')}} className='leftArrow' icon={faLessThan}/>
        <div className="pageContainer" >
          {cardSelect && cardSelect.cardArr.map((item,index)=>(
              <div key={index} className="cards" style={{transform: `translateX(${direction}%)`}} ><FlashcardComponent  info={item} /></div>
          ))}
        </div>
        <FontAwesomeIcon onClick={()=>{handlePageTurn('right')}} className='rightArrow' icon={faGreaterThan}/>
    </main>
  )
  
}
export default FlashCards