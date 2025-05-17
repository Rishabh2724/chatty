import React, { useEffect } from 'react'
import Homepage from "./pages/Homepage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import Profile from "./pages/Profile"
import Navbar from './components/Navbar'
import {Toaster} from "react-hot-toast"
import {Routes ,Route, Navigate } from "react-router-dom"
import {Loader } from "lucide-react"
import {useAuthStore} from "./Store/useAuthStore"
import { useThemeStore } from './Store/useThemeStore'


const App = () => {

  const {theme} = useThemeStore;

  const {authUser ,  checkAuth , isCheckingAuth, onlineUsers} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  }, [checkAuth])
  

  console.log({onlineUsers});

  if(isCheckingAuth && !authUser) return (
    <>
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-20 animate-spin'></Loader>
    </div>
    </>
  )
  
  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path= "/" element = {authUser ? <Homepage/> : <Navigate to='/login'/>}/>
        <Route path= "/signup" element = {!authUser ?<SignUp/> : <Navigate to= '/'/>}/>
        <Route path= "/login" element = {!authUser ?<Login/> : <Navigate to= '/'/>}/>
        <Route path= "/settings" element = {<Settings/>}/>
        <Route path= "/profile" element = {authUser ? <Profile/> : <Navigate to= '/login'/>}/>
      </Routes>
      <div><Toaster></Toaster></div>
    </div>
  )
}

export default App
