import { createContext, useReducer } from "react";

export const ErrorContext = createContext();

export const errorContextReducer =(state,action) =>{

    switch(action.type){
      case 'SET_ERROR':
        return{error: action.payload}
      
      default:
        return state
    }
}

export const ErrorContextProvider = ({children}) =>{

  const [state,dispatch] = useReducer(errorContextReducer,{
    error: null
  })

  return(
    <ErrorContext.Provider value={{...state,dispatch}}>
      ({children})
    </ErrorContext.Provider>
  )

}
