import { createContext, useReducer } from "react";

export const ResetContext = createContext()


export const resetReducer = (state, action) =>{
  switch(action.type){

    case 'ACTIVATE_RESET':
      return {
        ...state,
        reset: action.payload  
      }
    case 'DEACTIVATE_RESET':
      return{
        ...state,
        reset: action.payload
      }
    case 'UPDATE_USER':
      return{
        ...state,
        email: action.payload
      }
      case 'RESET_USER':
        return{
          ...state,
          email: action.payload
        }
  
    default:
      return state

  }
}

export const ResetContextProvider = ({children}) =>{

  const[state,dispatch] = useReducer(resetReducer,{
    reset: null,
    email: null
  })

  console.log('CURRENT EMAIL: ', state.email)

  return(
  
      <ResetContext.Provider value={{...state, dispatch}}>
        {children}
      </ResetContext.Provider>

  )
}