import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AuthContext } from './Authentication/context/AuthContext';
import { Home } from './view/Home/Home'
import { Landing } from './view/Landing/Landing';
import { Perfil } from './view/Perfil/Perfil'
import {Error} from "./view/Error/error";

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
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/> 
        <Route path="/profile" element={<Perfil/>}  /> 
        <Route path= "*" element={<Error/>} />
      </Routes>        
    </div>
  )
}

export default App
