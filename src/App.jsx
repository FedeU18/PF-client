import { Detalle } from "./view/PerfilProfesor/Detalle";
import Registro from "./view/Registro/Registro";
import { Routes, Route } from "react-router-dom";
import { Home } from "./view/Home/Home";
import { Landing } from "./view/Landing/Landing";
import { Perfil } from "./view/Perfil/Perfil";
import { Error } from "./view/Error/error";
import { About } from "./view/About/About";

import ProfesoresList from "./view/Home/ProfesoresList";

import { TodasNotificaciones } from "./view/Notificaciones/Notificaciones";

import ProtectedRoute from "./Authentication/protection/ProtectedRoute";
import PublicRoutes from "./Authentication/protection/PublicRoutes";
import ForgotPassword from "./view/ForgotPassword/ForgotPassword";
import PerfilProfesor from "./components/PerfilProfesor/PerfilProfesor";
import TypeOfProcessPay from "./Payments/TypeOfProcessPay";
import ProtectedPayments from "./Authentication/protection/ProtectedPayments";

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
          <Route path="/home/:id" element={<ProfesoresList />} />
          <Route path="/profile" element={<Perfil />} />
          <Route path="/about" element={<About />} />
          <Route path="/notificaciones" element={<TodasNotificaciones />} />
          <Route path="/profesores/:id" element={<Detalle />} />
          <Route path="/editar/:id" element={<PerfilProfesor />} />
          {/* <Route path="/payments" element={<StripePagos />} /> */}
          <Route
            path="/payments/:type"
            element={
              <ProtectedPayments>
                <TypeOfProcessPay />
              </ProtectedPayments>
            }
          />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
