import axios from "axios";
import {
  GET_ALUMNO,
  GET_ALL_ALUMNOS,
  DELETE_ALUMNO,
} from "../types/typesAlumno";

export function getAlumnoFromAPI(id) {
  console.log("ME EJECUTE CREATOR");
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/alumnos/${id}`)
      .then((alumno) => {
        console.log(alumno);
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

export function getAllAlumnos() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/alumnos")
      .then((alumnos) => {
        dispatch(setAlumnos(alumnos.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function setAlumnos(payload) {
  return {
    type: GET_ALL_ALUMNOS,
    payload,
  };
}

export function deleteAlumno(id) {
  return function (dispatch) {
    axios
      .delete(`http://localhost:3001/alumnos/${id}`)
      .then(() => {
        dispatch(destroyAlumno());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

function destroyAlumno() {
  return {
    type: DELETE_ALUMNO,
  };
}

export function postAlumno(alumno) {
  return function (dispatch) {
    axios
      .post("http://localhost:3001/alumnos", alumno)
      .then(() => {
        dispatch(getAlumnoFromAPI());
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function editAlumno(obj, id) {
  return function (dispatch) {
    axios
      .patch(`http://localhost:3001/alumnos/${id}`, obj)

      .then((res) => console.log("Alumno editado con exito"))
      .catch((error) => {
        console.log(error);
      });
  };
}
