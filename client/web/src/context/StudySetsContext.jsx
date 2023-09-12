import {createContext, useReducer} from 'react'

export const StudySetsContext = createContext()

export const studySetsReducer = (state, action) =>{

  switch(action.type){
    
    case 'SET_STUDYSETS':
    return{
      ...state,
      studySet: action.payload
    }

    case 'DELETE_STUDYSET':
      return{
        ...state,
        studySet: state.studySet.filter((set) => set._id != action.payload._id)  
      }

      default:
        return state
  }

}

export const StudySetsProvider = ({children}) =>{

    const [state,dispatch] = useReducer(studySetsReducer,{
      studySet: null,
     
    })

    return(
      <StudySetsContext.Provider value={{...state,dispatch}}>
        {children}
      </StudySetsContext.Provider>
    )
}
