import React, { useEffect, useState } from "react";
import * as actions from "../../redux/Actions/Alumno.js";
import { useDispatch, useSelector } from "react-redux";

import "./edit.css";
import { useNavigate } from "react-router-dom";

export const EditaAlumno = (props) => {
  const [actualizar, setActualizar] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("me monte al useEffect");
    dispatch(actions.getAlumnoFromAPI(props.id));
  }, []);
  const info = useSelector((state) => state.alumnos.alumno);
  console.log(info);

  const objActualizarAlumno = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setActualizar({
        ...actualizar,
        [e.target.name]: e.target.value,
      });
    } else {
      setActualizar({
        ...actualizar,
        [e.target.name]: info[e.target.name],
      });
    }
    console.log("hola soy el obj ", actualizar);
  };

  const updateAlumno = (e) => {
    e.preventDefault();
    dispatch(actions.editAlumno(actualizar, info.id));
  };

  ///funciona imput desde commit 12

  return (
    <div className={props.open ? "abicuaso" : "closecuaso"}>
      {info && info.name ? (
        <div className="conatinerFormEditAlumno">
          <form
            onSubmit={(e) => updateAlumno(e)}
            className="formEditAlumno"
            action=""
            autoComplete="off"
          >
            <div className="container_inputs">
              <button
                className="btnVolver"
                onClick={() => {
                  props.close(false);
                }}
              >
                X
              </button>
              <h1 className="tituloFormulario">
                Editar usuario {info.name} {info.lastname}
              </h1>
              <div className="input-container">
                <input
                  className="inputEditAlumno"
                  type="string"
                  placeholder={info.picture}
                  name="picture"
                  onChange={(e) => objActualizarAlumno(e)}
                  onBlur={(e) => objActualizarAlumno(e)}
                />
                <label htmlFor="name" className="nombre">
                  Foto
                </label>
              </div>
              <div className="input-container">
                <input
                  className="inputEditAlumno"
                  type="string"
                  placeholder={info.name}
                  name="name"
                  onChange={(e) => objActualizarAlumno(e)}
                  onBlur={(e) => objActualizarAlumno(e)}
                />
                <label htmlFor="name" className="nombre">
                  Nombre
                </label>
              </div>

              <div className="input-container">
                <input
                  className="inputEditAlumno"
                  type="text"
                  placeholder={info.lastname}
                  name="lastname"
                  onChange={(e) => objActualizarAlumno(e)}
                  onBlur={(e) => objActualizarAlumno(e)}
                />
                <label className="nombre" htmlFor="dishtypes">
                  Apellido
                </label>
              </div>

              <div className="input-container">
                <input
                  className="inputEditAlumno"
                  placeholder={info.age}
                  onBlur={(e) => objActualizarAlumno(e)}
                  type="number"
                  name="age"
                  onChange={(e) => objActualizarAlumno(e)}
                />
                <label className="nombre" htmlFor="health_score">
                  Edad
                </label>
              </div>
              <div className="input-container">
                <input
                  className="inputEditAlumno"
                  type="text"
                  name="email"
                  placeholder={info.email}
                  value={info.email}
                  onChange={(e) => objActualizarAlumno(e)}
                  onBlur={(e) => objActualizarAlumno(e)}
                />
                <label className="nombre" htmlFor="health_score">
                  Correo
                </label>
              </div>
              <div className="input-container">
                <input
                  className="inputEditAlumno"
                  type="text"
                  name="country"
                  onChange={(e) => objActualizarAlumno(e)}
                  placeholder={info.country}
                  onBlur={(e) => objActualizarAlumno(e)}
                />
                <label className="nombre" htmlFor="health_score">
                  Pais
                </label>
              </div>

              {/* <div className="input-container">
                <select
                  className="selectDiets"
                  onChange={(e) => añadirDieta(e)}
                  name=""
                  id=""
                >
                  <option value="">Select diets</option>
                  {info.map((e) => (
                    <option value="">{e}</option>
                  ))}
                </select>
                <div className="contenedorDiets">
                  {obj.diets.map((e) => (
                    <Lista dieta={e} eliminarDieta={eliminarDieta} />
                  ))}
                </div>
              </div> */}
            </div>
            <div className="divBtn">
              <button type="submit" className="button">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1 className="1">Cargando...</h1>
      )}
    </div>
  );
};
