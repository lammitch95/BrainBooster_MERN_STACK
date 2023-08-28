import { CreateSetContext } from "../context/CreateSetContext";
import { useContext } from "react";

export const useCreateSetContext = () => {
  const context = useContext(CreateSetContext)

    if(!context){//error if we try to use context outside the scope of it
      throw Error('useCreateSetContext must be used inside an CreateSetContextProvider')
    }
    
  return context
}
