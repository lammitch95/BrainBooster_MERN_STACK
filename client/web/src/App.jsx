import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'


import { useAuthContext } from './hooks/useAuthContext.jsx'
import { useResetContext } from './hooks/useResetContext.jsx'
import { useCreateSetContext } from './hooks/useCreateSetContext.jsx'
import { useStudyOptionsContext } from './hooks/useStudyOptionsContext.jsx'

import Home from './pages/Home.jsx'
import NavBar from './components/NavBar.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Create from './pages/Create.jsx'
import Test from './pages/Test.jsx'
import FlashCards from './pages/FlashCards.jsx'
import NoPage from './pages/NoPage.jsx'
import Edit from './pages/Edit.jsx'
import ErrorMessage from './components/ErrorMessage.jsx'
import Match from './pages/Match.jsx'

import './styles/index.css'

function App() {

  const{user} = useAuthContext()
  const{reset} = useResetContext()
  const{create} = useCreateSetContext()
  const{cardSelect,editStatus} = useStudyOptionsContext()
  const defaultPath = user ? '/home' : '/login'
 
  
  return(
    
    <div className='App'>
      <BrowserRouter>
          <ErrorMessage/>
           <NavBar/>
          <div className='pages'>
            <Routes>
              <Route path="/" element={<Navigate to={defaultPath} />}/>
              <Route path="/home" element={user ? <Home />: <Navigate to="/login"/>} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/home"/>}/>
              <Route path="/signup" element={!user ? <Signup />: <Navigate to="/home"/> }/>
              <Route path="/forget-password" element={<ForgetPassword/>}/>
              <Route path="/reset-password" element={reset ? <ResetPassword/> : <Navigate to="/login"/>}/>
              <Route path="/create-set" element={user && create ? <Create/>: <Navigate to="/home"/>}/>
              <Route path="/test/:id" element={user && cardSelect ? <Test/> : <Navigate to='/home'/>} />
              <Route path="/flashcards/:id" element={user && cardSelect ? <FlashCards/> : <Navigate to='/home'/>}/>
              <Route path="/match/:id" element={user && cardSelect ? <Match/> : <Navigate to='/home'/> } />
              <Route path="/edit/:id" element={user && editStatus ? <Edit/> : <Navigate to='/home'/> } />
             
              <Route path="*" element={<NoPage/>}/>
            </Routes>
          </div>
          </BrowserRouter>
    </div>
    
  )
}

export default App


