import { Detalle } from "./view/PerfilProfesor/Detalle.jsx";
import Registro from "./view/Registro/Registro.jsx";
import { Routes, Route } from "react-router-dom";
import { Home } from "./view/Home/Home.jsx";
import { Landing } from "./view/Landing/Landing.jsx";
import { Perfil } from "./view/Perfil/Perfil.jsx";
import { Error } from "./view/Error/error.jsx";
import { About } from "./view/About/About.jsx";
import ProtectedRoute from "./Authentication/protection/ProtectedRoute.jsx";
import PublicRoutes from "./Authentication/protection/PublicRoutes.jsx";
import ForgotPassword from "./view/ForgotPassword/ForgotPassword.jsx";
import PerfilProfesor from "./components/PerfilProfesor/PerfilProfesor.jsx";
import StripePagos from "./Payments/StripePagos.jsx";
import TypeOfProcessPay from "./Payments/TypeOfProcessPay.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Perfil />} />
          <Route path="/about" element={<About />} />
          <Route path="/profesores/:id" element={<Detalle />} />
          <Route path="/editar/:id" element={<PerfilProfesor />} />
          <Route path="/payments" element={<StripePagos />} />
          <Route path="/payments/:type" element={<TypeOfProcessPay />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
