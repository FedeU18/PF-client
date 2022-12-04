import React, { useEffect, useState } from "react";
import * as actionsAlumno from "../../redux/Actions/Alumno.js";
import * as actionsPaises from "../../redux/Actions/Paises";
import { useDispatch, useSelector } from "react-redux";

import "./edit.css";
import { useNavigate } from "react-router-dom";

export const EditaAlumno = (props) => {
  const [actualizar, setActualizar] = useState({});
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("me monte al useEffect");
    dispatch(actionsAlumno.getAlumnoFromAPI(props.id));
    dispatch(actionsPaises.getPaises());
  }, []);
  const info = useSelector((state) => state.alumnos.alumno);
  console.log(info);
  const infoPaises = useSelector((state) => state.paises.paises);
  // console.log("informacion de paises ", infoPaises);

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
    dispatch(actionsAlumno.editAlumno(actualizar, info.id));
    navigate("/home");
  };


/** AGREGUE FUNCION PARA TOMAR EL PAIS SEGUN EL QUE SELECCIONEN Y ESE PAIS SE GUARDE EN UN ESTADO. ESA VARIABLE DE ESTADO LA INSERTO COMO VALOR PARA EL INPUT DEL PAIS QUE TIENE AL LADO EL SELECT EN LA "PARTE VISUAL" */
  const añadirPais = (e) => {  
    e.preventDefault();
    let select = e.target;
    let pais = select.options[select.selectedIndex].text;
    setCountry(pais);
    if (pais !== "------") {
      setActualizar({
        ...actualizar,
        country: pais,
      });
    } else {
      setActualizar({
        ...actualizar,
        country: info.country,
      });
    }

    console.log(actualizar);
  };

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

              <div className="containerInputPais">
                <div className="input-container">
                  <input
                    className="inputEditAlumno"
                    type="text"
                    name="country"
                    placeholder={info.country}
                    value={country !== "" ? country : info.country}
                    onChange={(e) => objActualizarAlumno(e)}
                    onBlur={(e) => objActualizarAlumno(e)}
                  />
                  <label className="nombre" htmlFor="health_score">
                    Pais
                  </label>
                </div>


                <div className="inputSelectPais">
                  <select className="selectPais" onChange={añadirPais}>
                    <option value="">------</option>
                    {infoPaises.map((e) => (
                      <option value="">{e.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="divBtn">
              <button type="submit" className="button">
                Actualizar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
  );
};
