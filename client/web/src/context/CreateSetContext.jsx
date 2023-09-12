import { createContext, useReducer } from "react"

export const CreateSetContext = createContext()



export const createSetReducer = (state, action) =>{

  

  const createStudyCard = (uniqueNum) =>{

   
   

    return{
      cardNumber: uniqueNum, 
      cardTerm:'', 
      cardDefinition:'',
      cardAdded: true,
    }
  }

  switch(action.type){

    case 'LOAD_EDITSET':
      return{
        ...state,
        cardArr: action.payload
      }

    case 'SET_CARDARR':
      return{
        ...state,
        cardArr: []
      }

    case 'ACTIVATE_CREATE':
      return {
        ...state,
        create: action.payload
      }

    case 'DEACTIVATE_CREATE':
      return{
        ...state,
        create: action.payload
      }

    case 'ADD_CARD':
      return{
        ...state,
        cardArr: [...state.cardArr, createStudyCard(state.cardArr.length + 1)]
      }

    case 'DEFAULT_CARDS':
      
      const defaultCards = []
      for(let i = 1; i <= 5; i++){
        defaultCards.push(createStudyCard(i))
      }

      return{
        ...state,
        cardArr: defaultCards
      }

    
    case 'UPDATE_TERM':
      const updateTerm = state.cardArr.map(card => {
        if(card.cardNumber === action.payload.studyCard.cardNumber){
          return {...card, cardTerm: action.payload.term}
        }
        return card
      })

      return{
        ...state,
        cardArr: updateTerm
      }

    case 'UPDATE_DEFINITION':
      const updateDef = state.cardArr.map(card => {
        if(card.cardNumber === action.payload.studyCard.cardNumber){
          return {...card, cardDefinition: action.payload.def}
        }
        return card
      })

      return{
        ...state,
        cardArr: updateDef
      }

    case 'DELETE_CARD':
      const deleteCard = state.cardArr.filter(card => card.cardNumber !== action.payload)

      const updateCardNum = deleteCard.map((card,index) =>({
        ...card,
        cardNumber: index + 1,
      }))

      return{
        ...state,
        cardArr: updateCardNum
      }

    
    case 'CARD_ADDED_TRANSITION':
      const changeAddProp = state.cardArr.map(card=>{
        if(card.cardAdded === true){
          return{...card, cardAdded: false}
        }

        return card
      })

      return{
        ...state,
        cardArr: changeAddProp
      }

    
    default:
      return state

  }
}

export const CreateSetContextProvider = ({children}) =>{

  const[state,dispatch] = useReducer(createSetReducer,{
    create: null,
    cardArr: [],
    
  })

  

  return(
  
      <CreateSetContext.Provider value={{...state, dispatch}}>
        {children}
      </CreateSetContext.Provider>

  )
}