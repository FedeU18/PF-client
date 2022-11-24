import { Routes, Route } from 'react-router-dom'
import { Home } from './view/Home/Home'
import { Landing } from './view/Landing/Landing';
import { Perfil } from './view/Perfil/Perfil'
import { Error } from "./view/Error/error";
import ProtectedRoute from './Authentication/protection/ProtectedRoute';
import PublicRoutes from "./Authentication/protection/PublicRoutes"

function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path='/' element={<Landing />} />
        </Route>

        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/home' element={<Home />} />
          <Route path="/profile" element={<Perfil />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App