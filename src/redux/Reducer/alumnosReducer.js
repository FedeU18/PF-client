import {
  GET_ALUMNO,
  DELETE_ALUMNO,
  GET_ALL_ALUMNOS,
} from "../types/typesAlumno";

const initialState = {
  alumno: [],
  alumnos: [],
};

const alumnosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALUMNO:
      console.log(state.alumno);
      return {
        ...state,
        alumno: action.payload,
      };
    case DELETE_ALUMNO:
      return {
        ...state,
        alumno: action.payload,
      };
    case DELETE_ALUMNO:
      return {
        ...state,
        alumno: [],
      };
    case GET_ALL_ALUMNOS:
      return {
        ...state,
        alumnos: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default alumnosReducer;
