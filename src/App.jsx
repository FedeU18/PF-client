import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from './Authentication/context/AuthContext';
import { Home } from './view/Home/Home'
import Landing from './view/Landing/Landing';
import { Perfil } from './view/Perfil/Perfil'

function App() {
  const user = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/home")
    } else {
      navigate("/")
    }
  }, [user])


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path="/profile" element={<Perfil />} />
      </Routes>
    </div>
  )
}

export default App
