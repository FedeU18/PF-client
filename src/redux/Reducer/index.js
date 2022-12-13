import { combineReducers } from "redux";
import profesoresReducer from "./profesoresReducer";
import materiasReducer from "./materiasReducer";
import paisesReducer from "./paisesReducer";
import alumnosReducer from "./alumnosReducer";
import comentariosReducer from "./comentariosReducer";
import fechasReducer from "./fechaReducer";
import certificadosReducer from "./certificadosReducer";
import sendEmailReducer from "./mailerReducer";
import notificacionesReducer from "./notificacionesReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  email: sendEmailReducer,
  profesores: profesoresReducer,
  materias: materiasReducer,
  paises: paisesReducer,
  alumnos: alumnosReducer,
  comentarios: comentariosReducer,
  fechas: fechasReducer,
  certificados: certificadosReducer,
  notificaciones: notificacionesReducer,
  theme: themeReducer,
});

export default rootReducer;
