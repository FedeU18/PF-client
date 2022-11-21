import { GET_PROFESORES } from "../types/typesProfesor";

const initialState = {
  profesores: [],
};

const profesoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFESORES:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default profesoresReducer;
