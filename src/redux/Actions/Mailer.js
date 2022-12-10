import { FINISH_RESERVA, GET_RESERVA, SET_RESERVA } from "../types/typesMailer";

export const setReservaProfe = (data) => {
  return {
    type: SET_RESERVA,
    payload: data,
  };
};

export const getReservaProfe = () => {
  return {
    type: GET_RESERVA,
  };
};

export const finishReservaProfe = () => {
  return {
    type: FINISH_RESERVA,
  };
};
