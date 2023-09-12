import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain } from '@fortawesome/free-solid-svg-icons'
import { faBoltLightning } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import '../styles/navBar.css'
//context
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { useCreateSetContext} from '../hooks/useCreateSetContext'
import { useStudyOptionsContext } from '../hooks/useStudyOptionsContext'

const NavBar = () =>{

  const {logout} = useLogout()
  const {user} = useAuthContext()
  const {dispatch, create} = useCreateSetContext()
  const location = useLocation()
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const [settingBtn, setSettingBtn] = useState(false)
  const [notifyBtn, setNotifyBtn] = useState(false)
  const [createBtn, setCreateBtn] = useState(false)
  const navigate = useNavigate()
  const {dispatch: cardDispatch, cardSelect} = useStudyOptionsContext()

  useEffect(()=>{
    
      setSettingBtn(false)
      setNotifyBtn(false)
      setCreateBtn(false)
    
  },[])

  const handleClick = () =>{
    setSettingBtn(false)
    setNotifyBtn(false)
    setCreateBtn(false)
    logout()
  }

  const handleNavBtn = (select) =>{

      switch(select){
        case 'create':
          setSettingBtn(false)
          setNotifyBtn(false)
          setCreateBtn((prevState) => !prevState)
          break;
        case 'notify':
          setSettingBtn(false)
          setNotifyBtn((prevState) => !prevState)
          setCreateBtn(false)
          break;
        case 'setting':
          setSettingBtn((prevState) => !prevState)
          setNotifyBtn(false)
          setCreateBtn(false)
          break;
        default:
          console.log('No button in nav bar exists')
          break;

      }

  }


   const handleCreateSetBtn = () => {

      setSettingBtn(false)
      setNotifyBtn(false)
      setCreateBtn(false)
      dispatch({type: 'ACTIVATE_CREATE', payload: true})
      

    
   }

   useEffect(()=>{

    if(create){
      navigate('/create-set')
    }
   },[create])


  useEffect(()=>{
    const loginPathName = '/login'

    switch(location.pathname){
      case '/login':
        setShowLogin(false)
        setShowSignup(true)
        break
      case '/signup':
        setShowLogin(true)
        setShowSignup(false)
        break
      default:
        console.log('login/signup button doesnt exists')
        break

    }
  },[location.pathname])

    const handleRemove = () =>{
      cardDispatch({type:'CARD_TYPE',payload: null})
    }

    useEffect(()=>{
      if(!cardSelect){
        navigate('/home')
      }
    },[cardSelect])
  return(
    <header>
        <div className="nav-bar">
          <div className='nav-logo-title-div'>
            <div className='nav-logo'> 
              <FontAwesomeIcon className="logo-brain" icon={faBrain}/>
              <FontAwesomeIcon className="logo-lightning" icon={faBoltLightning}/>
            </div>
              {user ? <h1 className='brand-title' onClick={handleRemove}>BrainBooster</h1>
              : <h1 className='brand-title'>BrainBooster</h1>}
          </div>
          
          <nav className='nav-div'>
          
            {location.pathname === '/home' && <div className='nav-items-div'>
            <div onClick={()=>{handleNavBtn('create')}} className={`group-create ${createBtn && 'colorChange'}`}>
              <FontAwesomeIcon className='plus' icon={faPlus}/><label className='create-label'>create</label>
             </div>
              <FontAwesomeIcon onClick={()=>{handleNavBtn('notify')}} className={`nav-items ${notifyBtn && 'colorChange'}`} icon={faBell}/>
              <FontAwesomeIcon onClick={()=>{handleNavBtn('setting')}} className={`nav-items ${settingBtn && 'colorChange'}`} icon={faBars}/>
            </div>}
            {!user &&(
            <div className='login-signup-div'>
              {showLogin && <Link className='login-btn' to='/login'>Log in</Link>}
              {showSignup && <label className='signup-label'>Dont have an Account? <Link className='signup-btn' to='/signup'>Sign up</Link></label>}
            </div>
            )}
          </nav>
        </div>
        {location.pathname === '/home' && <div className='menu-div'>
          <div className={`settingMenu ${settingBtn ? 'activeSlide' : 'deactivateSlide'} `}>
            {user && (<div className='user-logout-div'>
                <div className='user-email'>{user.email}</div>
                <button className='logoutBtn' onClick={handleClick}>Log out</button>
              </div>
            )}
          </div>
          <div className={`notifyMenu ${notifyBtn ? 'activeSlide' : 'deactivateSlide'}`}></div>
          <div className={`createSetMenu ${create ? 'onCreateBtn deactivateSlide' : createBtn ? 'activeSlide' : 'deactivateSlide'}`}>
            <button onClick={handleCreateSetBtn} className={`createItem`}><FontAwesomeIcon  className='createItemIcon' icon={faLayerGroup}/><label className='createLabel'>Study Set</label></button>
            <button className={`createItem`}><FontAwesomeIcon className='createItemIcon' icon={faFolderOpen}/><label className='createLabel folder'>Folder</label></button>
          </div>

        </div>}
    </header>


  )
}

export default NavBar