import axios from "axios";
import { GET_FECHA, POST_FECHA } from "../types/typesFecha";

export const getFecha = () => {
  return async function (dispatch) {
    const fechas = await axios.get("/fechas");
    return dispatch({
      type: GET_FECHA,
      payload: fechas.data,
    });
  };
};

export const postFecha = (payload) => {
  return async function (dispatch) {
    try {
      const post = axios.post("/fechas", payload);
      return dispatch({
        type: POST_FECHA,
        payload: post.data,
      });
    } catch (error) {
      console.log("hubo un error al reservar una fecha", error);
    }
  };
};
