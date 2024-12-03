import { useEffect, useState } from "react"
import Login from "./Login"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import User from "./User"
import Nav from "./Nav"
import {Bounce, ToastContainer} from "react-toastify"

const App=()=>{
  const[login,setLogin]=useState(false)
  const location=useLocation();
  const path=location.pathname;
  useEffect(()=>{
    const token=localStorage.getItem("token")
    token ? setLogin(true) : setLogin(false)
  },[path])
  return(
    <>
    <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
></ToastContainer>

    
    {
      login && <Nav/>
    }
    <Routes>
     
      {
        login ?(
          <>
          <Route path="/user" element={<User/>}/>
          <Route path="/" element={<Navigate to="/user"/>}/>
          <Route path="/login" element={<Navigate to="/"/>}/>
          </>
        )
        :(
          <>
          <Route path="/" element={<Navigate to="/login"/>}/>
          <Route path="/user" element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login/>}/>
          </>
        )
      }
    </Routes>
    </>
  )
}

export default App;