import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext)

    if(!context){//error if we try to use context outside the scope of it
      throw Error('useAuthContext must be used inside an AuthConextProvider')
    }
    
  return context
}
