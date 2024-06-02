
import React, { createContext, useEffect, useState } from 'react'
import Navbar from './assets/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './assets/Login'
import Upload from './assets/Upload'
import Products from './assets/Products'


export const passwordContext = createContext()


function App() {
  const [password, setPassword] = useState("")
  
  useEffect(() => {
    const pass = localStorage.getItem("password")
    if (pass) {
      setPassword(pass)
       
    }
  }, [password])

  return (
    <>

      <passwordContext.Provider value={[password, setPassword]}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Upload/>} />
            <Route path='/students' element={<Products/>} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </BrowserRouter>

      </passwordContext.Provider>
    </>
  )
}

export default App
