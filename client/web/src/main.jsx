import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { AuthContextProvider} from './context/AuthContext.jsx'
import { ResetContextProvider } from './context/ResetContext.jsx'
import { CreateSetContextProvider } from './context/CreateSetContext.jsx'
import { StudySetsProvider } from './context/StudySetsContext.jsx'
import { StudyOptionsProvider } from './context/StudyOptionsContext.jsx'
import { ErrorContextProvider } from './context/ErrorContext.jsx'
import { TestOptionsContextProvider } from './context/TestOptionsContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ErrorContextProvider>
      <ResetContextProvider>
        <AuthContextProvider>
          <CreateSetContextProvider>
            <StudySetsProvider>
              <StudyOptionsProvider> 
              <TestOptionsContextProvider>
                  <App />
              </TestOptionsContextProvider>  
              </StudyOptionsProvider>
            </StudySetsProvider>
          </CreateSetContextProvider>
        </AuthContextProvider>
      </ResetContextProvider> 
    </ErrorContextProvider>
  </React.StrictMode>,
)
