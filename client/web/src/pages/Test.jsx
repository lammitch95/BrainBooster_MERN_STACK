import { useEffect, useState } from "react"

import MultipleChoice from "../components/MultipleChoice"
import TrueAndFalse from '../components/TrueAndFalse'


import TestOptions from "../components/testOptions"

import { useStudyOptionsContext } from '../hooks/useStudyOptionsContext'
import { useTestOptionsContext } from "../hooks/useTestOptionsContext"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

import '../styles/testStyles.css'


const Test = () =>{

  const[testQuestions, setTestQuestions] = useState(null)
  const {cardSelect} = useStudyOptionsContext()
  const [qCount, setQCount] = useState(1)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isResult, setIsResult] = useState(false)
  const [score, setScore] = useState(null)
  const {tF, mC} = useTestOptionsContext()
  const [nextQuestion, setNextQuestion] = useState(false)
  const [message,setMessage] = useState(null)


  useEffect(()=>{
   
    if(tF){
      setTestQuestions(generateQuestionsTF(cardSelect.cardArr))
    }

    if(mC){
        setTestQuestions(generateQuestionsMC(cardSelect.cardArr))
    }

  },[tF, mC])

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


  /***********GENERATING MULTIPLE CHOICE************************************/
    const generateRandomChoices = (array, answer) =>{
      
        const choicesArr = [answer]
        while(choicesArr.length < 4){
          const randomChoice = array[Math.floor(Math.random()* array.length)]
          if(randomChoice.definition !== answer && !choicesArr.includes(randomChoice.definition)){
            choicesArr.push(randomChoice.definition)
          }
        }

        return shuffle(choicesArr)
    }

    const generateQuestionsMC = (array) => {
      
      const questions = array.map(item =>{
        const {term, definition} = item
        const  choices = generateRandomChoices(array, definition)
        return{
          question: term,
          choices: choices,
          answer: definition
        }

      })
      
      return shuffle(questions)
    }


   

    /********************************************************************************/

    /**********************TRUE AND FALSE FUNCTION****************************/
    const generateQuestionsTF = (array) =>{

      const questions = array.map(item =>{
        const {term, definition} = item
        const  {questionTF, answerTF} = randomQuestionsTF(item, array)
        return{
          question: questionTF,
          choices: ['true','false'],
          answer: answerTF
        }
      })
      return shuffle(questions)
    }

    const randomQuestionsTF = (item, array) => {

      const random = Math.random()
      let questionTF = null
      let answerTF = null

      if(random < 0.5){
        questionTF = `Is...${item.term} ;${item.definition}`
        answerTF = 'true'
        
      }else{
        let findQuestion = item.term
       
        while(findQuestion === item.term){
          findQuestion = array[Math.floor(Math.random() * array.length)].definition
        }

        questionTF = `Is...${item.term} ;${findQuestion}`
        answerTF = 'false'
      }

      return {questionTF, answerTF}
    }
    /************************************************/
  
    
  const handleStudyAgain = () =>{
        setIsResult(false)
        setQCount(1)
        setTotalCorrect(0)
        setDirection(0)
  }

  const handleChoiceSelected = (choice, answer) =>{
    if(choice === answer){
      setTotalCorrect(prevCount => prevCount + 1)
      setMessage('Correct')
    }else{
      setMessage('Incorrect')
    }

    if(testQuestions && qCount < testQuestions.length){
      setNextQuestion(true)
    }else{
      setTimeout(()=>{
        setMessage(null)
        setIsResult(true)
      },1000)
      
    }
  }
  
  useEffect(()=>{
    if(isResult){
      const result = (totalCorrect * 100)/ testQuestions.length
      setScore(result.toFixed(2))
    }
  },[isResult,totalCorrect,testQuestions])

  useEffect(()=>{
    console.log(message)
  },[message])

  return(
    <>
     <TestMessage message={message}/>
    <main className="testPage">
      <TestOptions/>
      {!isResult ? (
        <>
           <section className="qCountDiv">
              {testQuestions && <p >Question: {qCount} / {testQuestions.length}</p>}
           </section>
           <section className="qPagesDiv"> 
            {(testQuestions && mC) && testQuestions.map((item, index)=>(
              <div key={index} className="qPages" style={{transform: `translateX(${direction}%)`}} ><MultipleChoice  card={item} handleChoiceSelected={handleChoiceSelected}/></div>
            ))} 
            {(testQuestions && tF) && testQuestions.map((item, index) =>(
              <div key={index} className="qPages" style={{transform: `translateX(${direction}%)`}} ><TrueAndFalse card={item} handleChoiceSelected={handleChoiceSelected}/></div>
            ))} 
           </section>
           <button className={`nextQBtn ${nextQuestion ? 'showNextBtn' : '' }`} onClick={()=>{
            setDirection(prevDirection => prevDirection - 100)
            setQCount(prevCount => prevCount + 1)
            setNextQuestion(false)
            setMessage(null)
            }}>Next Question</button>
           
        </>
        ) : (
          <div className="resultsDiv">
              <h2 className="resultsLabel">Here are the Results...</h2>
              <p className="scoreLabel">Your Score: </p>
              <p className="scorePercent">{score}%</p>
              <div className="totalDiv">
                <label className="total c"><span>Correct: </span> {totalCorrect}</label>
                <label className="total i"><span>Incorrect: </span> {testQuestions.length - totalCorrect}</label>
              </div>
              <button className="submitBtn" onClick={handleStudyAgain}>Study Again?</button>
          </div>
        )}
       
        
    </main>
    </>
  )
}


const TestMessage = ({message}) => {
  return(
    <div className={`testMessage ${!message ? 'revertMessage': 'moveMessage'} ${message === 'Correct'? 'turnGreen' : 'turnRed'}`}>
      {message}{message === 'Correct' ? <FontAwesomeIcon className="correctSymbol" icon={faCheck}/> : <FontAwesomeIcon className="wrongSymbol" icon={faCircleXmark}/>}
    </div>
  )
}
export default Test