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
  const[timer, setTimer] = useState(0)
  const[badAttempts, setBadAttempts] = useState(0)
  const [accuracy, setAccuracy] = useState(null)
  



  useEffect(()=>{

    if(cardSelect && !start){
      setIsMatch(shuffle(createMatchSet(cardSelect.cardArr)))
      setStart(false)
    }

  },[cardSelect,start])

  useEffect(()=>{
    console.log('WHERE IS THE MATCH: ', isMatch)
  },[isMatch])

  const shuffle = (array) =>{
    const shuffledArr = [...array]
    for(let i = shuffledArr.length-1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1))

      const temp = shuffledArr[i]
      shuffledArr[i] = shuffledArr[j]
      shuffledArr[j] = temp
    }

    return shuffledArr

  }

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
      
      setIsCorrect(true)
      setCorrectCounter(prevCount => prevCount + 1)
    }else if((firstChoice && secondChoice) && firstChoice.show !== secondChoice.answer){
      
      setIsWrong(true)
      setBadAttempts(prevState => prevState + 1)

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
        setResult(true)
        setAccuracy((correctCounter/(correctCounter+badAttempts)) * 100)
    }
   
  },[correctCounter,isMatch])

 

  const handlePlayAgain = () =>{

    if(start){
      setStart(false)
      return
    }
    setResult(false)
    setTimer(0)
    setCorrectCounter(0)
    setAccuracy(null)
    setBadAttempts(0)
    if(cardSelect.cardArr){
      
      setIsMatch(shuffle(createMatchSet(cardSelect.cardArr)))
    }

  }

  useEffect(()=>{

    let interval

    if((!result  && isMatch && !start)){
        interval = setInterval(() => {
          setTimer(prevTime => prevTime + 10)
        }, 10)
    }else{
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  },[result,isMatch,!start])

  return(
    <div className='matchPage'>
      <MatchTimer timer={timer} result={result} start={start}/>
      {(result || start) ? (
         <div className={`resultDiv ${result ? 'showResult': ''}`}>
          {start ? (
            <>
              <h3 className='matchTitle'>Matching Game</h3>
              <p className='matchDescript'>Unleash the power of your memory and cognitive skills as you engage in a captivating and brain-stimulating matching game. This game takes the classic concept of matching pairs and infuses it with the educational value of your very own study set.</p>
            </>
          ):(
            <>
              <h3 className='timeLabel'>Time</h3>
              <h3 className='accuracyLabel'>Accuracy</h3>
              <p className='accuracyP'>{accuracy && accuracy.toFixed(2)}%</p>
            </>
          )}
          <button className='playAgainBtn' onClick={handlePlayAgain} >{start ? 'Start' : 'Play Again?'}</button>
       </div>
      ):(
          <div className='matchDiv'>
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

const MatchTimer = ({timer, result, start}) =>{

  return(
    <div className={`timerDiv ${result ? 'centerTime' : ''} ${start ? 'hideMatch': ''}`}>
      {timer >= 60000 && <span>{("0" + Math.floor((timer / 60000) % 60)).slice(-2)}<span className='timeLbl'> min</span></span>
      }
      <span>{("0" + Math.floor((timer / 1000) % 60)).slice(-2)}<span className='timeLbl'> sec</span></span>
      <span className='millisec'>{("0" + ((timer / 10) % 100)).slice(-2)}<span className='timeLbl'> ms</span></span>
    </div>
  )
}

export default Match