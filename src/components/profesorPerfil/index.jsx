
import React, { useEffect, useState } from "react";
import  actions from "../../redux/Actions/Alumno.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteProfesor } from "../../redux/Actions/Profesor";
import { allProfes } from "../../redux/Actions/Profesor";

export const AlumnoPerfil = (props) => {
  const dispach = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("me monte al useEfect alumnoperfil");
    dispach(getProfesorById(props.id));
  }, []);
  let info = useSelector((state) => state.profesores.profesores);
  

  const deleteProfe = () => {
    alert("esta seguro de eliminar su cuenta de alumno");
    dispach(actions.deleteProfesor(props.id));
    navigate("/profile/1");
  };
  return (
    <div>
      {info.name ? (
        <div>
          <p>{info.id}</p>
          <div>
            <img src="./concluido.png" alt={info.picture} />
          </div>

          <br />
          <br />
          <div>
            <h2>Informacion del Alumno</h2>
            <table className="table">
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
                  <td colspan="2">{info.country}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={deleteAlumno}>Eliminar Cuenta</button>
        </div>
      ) : (
        <h1 className="4">Cargando...</h1>
      )}
    </div>
  );
};
