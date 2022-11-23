import { GET_ALUMNO } from "../types/typesAlumno";

const initialState = {
  alumno: [],
};

const alumnosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALUMNO:
      return {
        ...state,
        alumno: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default alumnosReducer;
