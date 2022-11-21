import { combineReducers } from "redux";
import profesoresReducer from "./profesoresReducer";

const rootReducer = combineReducers({
  profesores: profesoresReducer,
});

export default rootReducer;
