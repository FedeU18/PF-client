import { combineReducers } from "redux";
import profesoresReducer from "./profesoresReducer";
import alumnosReducer from "./alumnosReducer";

const rootReducer = combineReducers({
  profesores: profesoresReducer,
  alumnos: alumnosReducer
});

export default rootReducer;
