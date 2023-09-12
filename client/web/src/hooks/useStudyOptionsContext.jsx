import { useContext } from "react";
import { StudyOptionsContext } from "../context/StudyOptionsContext";

export const useStudyOptionsContext = () =>{
  const context = useContext(StudyOptionsContext)

  if(!context){
    throw Error('useStudyOptionsContext must be used inside an StudyOptionsContext')

  }

  return context
}