import { useEffect, useState } from "react"

import MultipleChoice from "../components/MultipleChoice"
import { useStudyOptionsContext } from '../hooks/useStudyOptionsContext'
import '../styles/testStyles.css'

const Test = () =>{

  const[testQuestions, setTestQuestions] = useState(null)
  const {cardSelect} = useStudyOptionsContext()
  const [qCount, setQCount] = useState(1)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isResult, setIsResult] = useState(false)
  const [score, setScore] = useState(null)

  
  

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

    const generateQuestions = (array) => {
      
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

    const handleChoiceSelected = (choice, answer) =>{
      if(choice === answer){
        setTotalCorrect(prevCount => prevCount + 1)
      }

      if(testQuestions && qCount < testQuestions.length){
        setDirection(prevDirection => prevDirection - 100)
        setQCount(prevCount => prevCount + 1)
      }else{
        setIsResult(true)
      }
    }
  
    useEffect(()=>{
      if(isResult){
        const result = (totalCorrect * 100)/ testQuestions.length
        setScore(result.toFixed(2))
      }
    },[isResult,totalCorrect,testQuestions])
    
    useEffect(()=>{
      if(!isResult && qCount === 1 && totalCorrect === 0 && direction === 0){
        const cardArr = cardSelect.cardArr
        setTestQuestions(generateQuestions(cardArr))
      }
      
  },[isResult,setQCount,setTotalCorrect,setDirection])
    
  const handleStudyAgain = () =>{
        setIsResult(false)
        setQCount(1)
        setTotalCorrect(0)
        setDirection(0)
  }

  
  return(
    <main className="testPage">
     
      {!isResult? (
        <>
           <section className="qCountDiv">
              {testQuestions && <p >Question: {qCount} / {testQuestions.length}</p>}
           </section>
           <section className="qPagesDiv"> 
            {testQuestions && testQuestions.map((item, index)=>(
              <div key={index} className="qPages" style={{transform: `translateX(${direction}%)`}} ><MultipleChoice  card={item} handleChoiceSelected={handleChoiceSelected}/></div>
            ))}  
           </section>
           
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
  )
}

export default Test