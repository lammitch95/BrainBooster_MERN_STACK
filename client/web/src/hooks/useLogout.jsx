import { useAuthContext } from "./useAuthContext"
import { useStudySetsContext } from "./useStudySetsContext"

export const useLogout = () =>{

  const{dispatch} = useAuthContext()
  const{dispatch: studySetDispatch} = useStudySetsContext()

  const logout = () =>{
    //remove user from local storage
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({type: 'LOGOUT'})
    studySetDispatch({type: 'SET_STUDYSETS', payload: null})
  }

  return {logout}

}