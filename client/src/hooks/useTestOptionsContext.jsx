import { useContext } from "react";
import { TestOptionsContext } from "../context/TestOptionsContext";


export const useTestOptionsContext = () =>{
  const context = useContext(TestOptionsContext)

  if(!context){
   throw Error('useTestOptionsContext must be used inside an TestOptionsContextProvider')
  }

  return context
}