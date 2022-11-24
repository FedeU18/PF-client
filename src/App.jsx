import { Routes, Route } from 'react-router-dom'
import { useAuth } from './Authentication/context/AuthContext';
import { Home } from './view/Home/Home'
import { Landing } from './view/Landing/Landing';
import { Perfil } from './view/Perfil/Perfil'
import { Error } from "./view/Error/error";
import ProtectedRoute from './Authentication/protection/ProtectedRoute';

function App() {
  const authUser = useAuth();
  console.log(authUser.isAuth);
  console.log(authUser.dbDataUser);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route element={<ProtectedRoute user={authUser} />}>
          <Route path='/home' element={<Home />} />
          <Route path="/profile" element={<Perfil />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App