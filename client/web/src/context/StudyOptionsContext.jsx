import { createContext, useReducer } from "react";

export const StudyOptionsContext = createContext()

export const studyOptionsReducer = (state,action) =>{

    switch(action.type){

      case 'CARD_TYPE':
        return{
          ...state,
          cardSelect: action.payload
        }

      case 'EDIT_ACTIVE':
      return{
        ...state,
        editStatus: action.payload
      }

    case 'EDIT_DEACTIVATE':
      return{
        ...state,
        editStatus: action.payload
      }

      default:
        return state


    }
}

export const StudyOptionsProvider = ({children}) =>{
  const [state,dispatch] = useReducer(studyOptionsReducer,{
    cardSelect: null,
    editStatus: false
  })

  return(
    <StudyOptionsContext.Provider value = {{...state,dispatch}}>
      {children}
    </StudyOptionsContext.Provider>
  )
}