import axios from "axios";

import {
  GET_PROFESORES,
  GET_PROFESOR_ID,
  PUT_PROFESORES,
  POST_PROFESORES,
  DELETE_PROFESORES,
  FILTER_PRECIO,
  FILTER_PUNTUACION,
  SET_PROFE_FILTERED,
} from "../types/typesProfesor";

export const getUsersByPais=()=>dispatch=>{
    
  return axios.get("/profesores/paises")
  .then((d)=>{ 
      dispatch({ type:"GET_USERBYPAIS", payload: d.data }) 
     
     })
   .catch ((e) =>{console.log(e)})       
  } 

  export const getProfesorsBYMateria=()=>dispatch=>{
    
    return axios.get("/profesores/materias")
    .then((d)=>{ 
        dispatch({ type:"GET_PROFEBYMATERIA", payload: d.data }) 
       
       })
     .catch ((e) =>{console.log(e)})       
    } 

export function getProfesorById(id) {
  return async function (dispatch) {
    try {
      const prof = await axios.get(`/profesores/${id}`);
      return dispatch({
        type: GET_PROFESOR_ID,
        payload: prof.data,
      });
    } catch (error) {
      console.log("hubo un error al solicitar el profesor", error);
    }
  };
}

export function postProfesor(payload) {
  return function (dispatch) {
    axios
      .post(`/profesores`, payload)
      .then((res) => {
        dispatch({ type: POST_PROFESORES, payload: res });
        console.log(res)
        dispatch(allProfes());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function putProfesor(id, payload) {
  return function (dispatch) {
    axios
      .patch(`/profesores/${id}`, payload)

      .then((res) => {
        console.log("Profesor editado con exito");
        dispatch(getProfesorById(id));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function deleteProfesor(id) {
  return async function (dispatch) {
    try {
      const prof = await axios.delete(`/profesores/${id}`);
      return dispatch({
        type: DELETE_PROFESORES,
        payload: prof,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function filterPrecio(payload) {
  return {
    type: FILTER_PRECIO,
    payload,
  };
}

export function setProfeFiltered(payload) {
  return {
    type: SET_PROFE_FILTERED,
    payload,
  };
}

export function filterPuntuacion(payload) {
  return {
    type: FILTER_PUNTUACION,
    payload,
  };
}

export function allProfes() {
  return async function (dispatch) {
    let info = await axios.get("/profesores");

    return dispatch({
      type: GET_PROFESORES,
      payload: info.data,
    });
  };
}

export function filterProfes(filtros) {
  return {
    type: "FILTER_ORDER",
    payload: filtros,
  };
}

export function clear() {
  return {
    type: "CLEAR",
  };
}

export function desmontajeProfesores() {
  return {
    type: "DESMONTAJE",
  };
}
