import { ResetContext } from "../context/ResetContext";
import { useContext } from "react";

export const useResetContext = () => {
  const context = useContext(ResetContext)

    if(!context){//error if we try to use context outside the scope of it
      throw Error('useResetContext must be used inside an ResetConextProvider')
    }
    
  return context
}
