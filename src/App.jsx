
import Registro from "./view/Registro/Registro";
import { Routes, Route } from "react-router-dom";
import { Home } from "./view/Home/Home";
import { Landing } from "./view/Landing/Landing";
import { Perfil } from "./view/Perfil/Perfil";
import { Error } from "./view/Error/error";
import {About} from "./view/About/About"
import ProtectedRoute from "./Authentication/protection/ProtectedRoute";
import PublicRoutes from "./Authentication/protection/PublicRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Registro />} />
          <Route path='/about' element ={<About/> }/>
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Perfil />} />
          
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>

    </div>
  );
}

export default App;
