import { useEffect, useState } from 'react'
import { useStudyOptionsContext } from '../hooks/useStudyOptionsContext'

import '../styles/matchStyles.css'



const Match = () =>{

  const {cardSelect} = useStudyOptionsContext()
  const [isMatch, setIsMatch] = useState(null)
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [start, setStart] = useState(true)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isWrong, setIsWrong] = useState(false)
  const [correctCounter, setCorrectCounter] = useState(0)
  const [result, setResult] = useState(false)



  useEffect(()=>{

    if(cardSelect && !start){
      setIsMatch(createMatchSet(cardSelect.cardArr))
      setStart(false)
    }

  },[cardSelect,start])

  useEffect(()=>{
    console.log('WHERE IS THE MATCH: ', isMatch)
  },[isMatch])

  const createMatchSet = (array) => {

    const cardsTerm = array.map(item =>{

      const {term,definition} = item

      return{
          show: term,
          answer: definition
      }
    })

    const cardsDef = array.map(item =>{
      const {term,definition} = item

      return{
        show: definition,
        answer: term
      }
    })

    return [...cardsTerm, ...cardsDef]
  }

  const handleSelected = (info) =>{
    
    console.log('CHECKING VALUE', info.show)
    if(!firstChoice){
      setFirstChoice(info)
    }else if(!secondChoice){
      setSecondChoice(info)
    }  
  }

  useEffect(()=>{

    if(cardSelect && firstChoice){
      console.log('FIRST CHOICE: ' + firstChoice.show )
    }

    if(cardSelect && secondChoice){
      console.log('SECOND CHOICE: ' + secondChoice.show )
    }

  },[firstChoice,secondChoice, cardSelect])

  useEffect(()=>{

    if((firstChoice && secondChoice) && firstChoice.show === secondChoice.answer){
      console.log("HOLY SHIT THEY MATCH")
      setIsCorrect(true)
      setCorrectCounter(prevCount => prevCount + 1)
    }else if((firstChoice && secondChoice) && firstChoice.show !== secondChoice.answer){
      console.log("YOU DUMB")
      setIsWrong(true)

    }

    if(isWrong || isCorrect){
      setTimeout(()=>{
        setFirstChoice(null)
        setSecondChoice(null)
        setIsWrong(false)
        setIsCorrect(false)
  
      },300)

     
    }
   

  },[firstChoice, secondChoice, isCorrect, isWrong])


  useEffect(()=>{
    if(isMatch){
      console.log('CORRECTCOUNTER: ' + correctCounter + ' CARDSELECT.LENGTH: ' + isMatch.length )
    }
    
    if(isMatch && (correctCounter === isMatch.length)){
      setTimeout(()=>{
        setResult(true)
        setCorrectCounter(0)
      },500) 
    }

  },[correctCounter,isMatch])

  const matchCardStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridGap: '10px',
    height: '25rem',
    width: '100%',
    justifyContent: 'center'
  }

  const handlePlayAgain = () =>{

    if(start){
      setStart(false)
      return
    }
    setResult(false)
    if(cardSelect.cardArr){
      
      setIsMatch(createMatchSet(cardSelect.cardArr))
    }

  }

  return(
    <div className='matchPage'>
      {(result || start) ? (
         <div className='resultDiv'>
         <button className='playAgainBtn' onClick={handlePlayAgain} >{start ? 'Start' : 'Play Again?'}</button>
       </div>
      ):(
        <div className='matchDiv' style={matchCardStyles}>
        {isMatch && isMatch.map((item,index)=>(
          <MatchCardComponent key={index} info={item} handleSelected={handleSelected} isSelected={(firstChoice && item.show === firstChoice.show) || (secondChoice && item.show === secondChoice.show)} isCorrect={isCorrect} isWrong={isWrong}/>
        ))}
      </div>
     
      )}
    </div>
  )
}


const MatchCardComponent = ({info, handleSelected, isSelected, isCorrect, isWrong}) =>{

  const [cardMatch, setCardMatch] = useState(false)

  useEffect(()=>{
    if(isSelected && isCorrect){
      setCardMatch(true)
    }

  },[isSelected,isCorrect])

  return(
    <div onClick={()=>{
      if(!isSelected && !cardMatch){
        handleSelected(info)
      }
    }} className={`cardForMatch ${isSelected ? 'cardSelected': ''}  ${cardMatch ? 'isCorrect': ''} ${isSelected && isWrong ? 'isWrong' : ''} `}>
      <p>{info.show}</p>
    </div>
  )

}

export default Match