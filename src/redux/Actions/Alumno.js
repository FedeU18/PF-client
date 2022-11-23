import axios from "axios";
import {
  GET_ALUMNO,
 } from "../types/typesAlumno";




  export function getAlumnoFromAPI(id) {
    return function (dispatch) {
      axios
        .get(`http://localhost:3001/alumnos/${id}`)
        .then((alumno) => {
          dispatch(setAlumno(alumno.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }
  
  function setAlumno(payload) {
    return {
      type: GET_ALUMNO,
      payload,
    };
  }