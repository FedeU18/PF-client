import React, { useEffect, useState } from "react";
import * as actions from "../../redux/Actions/Alumno.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import image from "./concluido.png";
import "./alumnoPerfil.css";

export const AlumnoPerfil = (props) => {
  console.log("desde alumno perfil ", props.id);
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispach(actions.getAlumnoFromAPI(props.id));
  }, []);
  let info = useSelector((state) => state.alumnos.alumno);
  const deleteAlumno = () => {
    alert("esta seguro de eliminar su cuenta de alumno");
    dispach(actions.deleteAlumno(props.id));
    navigate("/home");
  };
  return (
    <div>
      {info.name ? (
        <div className="divPrincipal">
          <div>
            <h4 className="nameCountry">{info.country}</h4>
            <div className="containerImgPerfil">
              <div className="containerPerfil">
                <img src={image} alt={info.picture} />
              </div>
              <div className="containerBtns">
                <div>
                  <button
                    onClick={() => props.open()}
                    type="button"
                    className="btnEditarCuenta btn btn-secondary"
                  >
                    Editar cuenta
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btnEliminar"
                    onClick={deleteAlumno}
                  >
                    Eliminar Cuenta
                  </button>
                </div>
                <button
                  onClick={() => navigate("/home")}
                  className="btnVolverInicio"
                >
                  ↖
                </button>
              </div>
            </div>
          </div>

          <div className="tbInfoAlumno">
            <h2>Informacion del Alumno</h2>
            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">Nombre</th>
                  <td>{info.name}</td>
                </tr>
                <tr>
                  <th scope="row">Apellido</th>
                  <td>{info.lastname}</td>
                </tr>
                <tr>
                  <th scope="row">Edad</th>
                  <td colspan="2">{info.age}</td>
                </tr>
                <tr>
                  <th scope="row">Correo</th>
                  <td colspan="2">{info.email}</td>
                </tr>
                <tr>
                  <th scope="row">Pais</th>
                  <td colspan="2">{info.country.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
  );
};
