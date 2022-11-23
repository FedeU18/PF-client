import { GET_ALUMNO, DELETE_ALUMNO } from "../types/typesAlumno";

const initialState = {
  alumnos: [],
};

const alumnosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALUMNO:
      return {
        ...state,
        alumnos: action.payload,
      };
    default:
      return {
        ...state,
      };
      case DELETE_ALUMNO:
      return {
        ...state,
        alumnos: alumnos.filter(a => a.id !== action.payload),
      };
  }
};

export default alumnosReducer;
