import {
  GET_ALUMNO,
  DELETE_ALUMNO,
  GET_ALL_ALUMNOS,
  VACIAR_ESTADO,
} from "../types/typesAlumno";

const initialState = {
  alumno: [],
  alumnos: [],
};

const alumnosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALUMNO:
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
    case VACIAR_ESTADO:
      return {
        ...state,
        alumno: action.payload,
      };
      case "CLEAR":
        return {
          ...state,
          alumno: {},
        };
    default:
      return {
        ...state,
      };
  }
};

export default alumnosReducer;
