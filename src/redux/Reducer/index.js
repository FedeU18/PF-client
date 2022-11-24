
import { combineReducers } from "redux";
import profesoresReducer from "./profesoresReducer";
import materiasReducer from "./materiasReducer";
import paisesReducer from "./paisesReducer";

const rootReducer = combineReducers({
  profesores: profesoresReducer,
  materias: materiasReducer,
  paises:paisesReducer


});

export default rootReducer;

