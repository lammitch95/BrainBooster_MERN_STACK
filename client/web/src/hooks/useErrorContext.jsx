import { ErrorContext } from "../context/ErrorContext";
import { useContext } from "react";

export const useErrorContext = () =>{
    const context = useContext(ErrorContext)

    if(!context){
      throw Error('Must use useErrorContext inside ErrorContextProvider')
    }

    return context
}