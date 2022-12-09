import {
  POST_CERTIFICADO,
  EDIT_CERTIFICADO,
  DELETE_CERTIFICADO,
} from "../types/typesCertificado";

const initialState = {};

const certificadosReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CERTIFICADO:
      return {
        ...state,
      };

    case EDIT_CERTIFICADO:
      return {
        ...state,
      };
    case DELETE_CERTIFICADO:
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default certificadosReducer;
