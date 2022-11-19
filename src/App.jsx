
import './App.css'
import {Routes,Route} from 'react-router-dom'
import {Home} from './view/Home/Home'
import {Landing} from './view/Landing/Landing';

function App() {

  return (
    <div className="App">
     <Routes>
        <Route  path='/' element={<Landing/>}/>
        <Route path='/home' element={<Home/>}/>        
      </Routes>
        
    </div>
  )
}

export default App
