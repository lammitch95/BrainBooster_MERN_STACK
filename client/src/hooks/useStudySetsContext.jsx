import { useContext } from "react";
import { StudySetsContext } from "../context/StudySetsContext";


export const useStudySetsContext = () =>{
  const context = useContext(StudySetsContext)

  if(!context){
   throw Error('useStudySetsContext must be used inside an StudySetsContextProvider')
  }

  return context
}