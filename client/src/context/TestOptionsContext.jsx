import { createContext, useReducer } from "react";

export const TestOptionsContext = createContext()

export const testOptionsReducer = (state,action) =>{
  switch(action.type){

    case 'MULTIPLE_CHOICE':
      return{
        ...state,
        mC: action.payload
      }
    
    case 'TRUE_AND_FALSE':
      return{
        ...state,
        tF: action.payload
      }
      
    case 'MATCHING':
      return{
        ...state,
        matching: action.payload
      }
    
  }
}

export const TestOptionsContextProvider = ({children}) =>{
  const [state,dispatch] = useReducer(testOptionsReducer,{
    mC: true,
    tF: false,
    matching: false
  })

  return(
    <TestOptionsContext.Provider value={{...state,dispatch}}>
      {children}
    </TestOptionsContext.Provider>
  )
}