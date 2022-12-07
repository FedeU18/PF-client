import { FINISH_RESERVA, GET_RESERVA, SET_RESERVA } from "../types/typesMailer";

const emailState = {
  data: {},
};

const sendEmailReducer = (state = emailState, action) => {
  switch (action.type) {
    case SET_RESERVA:
      return {
        ...state,
        data: action.payload,
      };
    case GET_RESERVA:
      return {
        ...state,
      };
    case FINISH_RESERVA: {
      return {
        ...state,
        data: {},
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default sendEmailReducer;
