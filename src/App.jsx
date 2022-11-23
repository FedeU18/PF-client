import { Routes, Route } from 'react-router-dom'
import { Home } from './view/Home/Home'
import Landing from './view/Landing/Landing';
import { Perfil } from './view/Perfil/Perfil'

function App() {

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
