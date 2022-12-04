import { combineReducers } from "redux";
import profesoresReducer from "./profesoresReducer";
import materiasReducer from "./materiasReducer";
import paisesReducer from "./paisesReducer";
import alumnosReducer from "./alumnosReducer";
import comentariosReducer from "./comentariosReducer";
import certificadosReducer from "./certificadosReducer"
const rootReducer = combineReducers({
  profesores: profesoresReducer,
  materias: materiasReducer,
  paises:paisesReducer,
  alumnos: alumnosReducer,
  comentarios:comentariosReducer,
  certificados:certificadosReducer,
});

export default rootReducer;
