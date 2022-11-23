
import './App.css'
import {Routes,Route} from 'react-router-dom';
import {Home} from './view/Home/Home';
import {Landing} from './view/Landing/Landing';
import {Perfil} from './view/Perfil/Perfil';
import {Error} from "./view/Error/error";





function App() {

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
