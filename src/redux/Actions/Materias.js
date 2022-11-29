import axios from "axios";
import {
  GET_MATERIAS,
  GET_OP_SELECTED,
  ADD_OP_SELECTED,
} from "../types/typesMaterias";

export const getMaterias = () => (dispatch) => {
  console.log("entro en cations");
  return axios
    .get(`/materias`)
    .then((d) => {
      console.log(d);
      dispatch({ type: GET_MATERIAS, payload: d.data });
    })
    .catch((e) => console.log(e));
};
export const getOpSelected = () => (dispatch) => {};

export const addOPSelected = (array) => {
  return { type: ADD_OP_SELECTED, payload: array };
};
