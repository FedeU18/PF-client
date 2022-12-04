import React, { useEffect, useState } from "react";
import * as actionsAlumno from "../../redux/Actions/Alumno.js";
import * as actionsPaises from "../../redux/Actions/Paises.js";/*NUEVO*/
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import imag from "./default user.png";
import "./alumnoPerfil.css";
import deleteFirestoreUser from "../../Authentication/functions/deleteFirestoreUser";
import deleteCurrentUser from "../../Authentication/functions/deleteCurretUser";
import logOut from "../../Authentication/functions/logOut";

export const AlumnoPerfil = (props) => {
  const [image, setImage] = useState(imag);
  const dispach = useDispatch();
  const navigate = useNavigate();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);
  let infoPaises = useSelector((state) => state.paises.paises);/*NUEVO */
  let flag = infoPaises.filter((e) => e.name === infoAlumno.country);/*NUEVO */
  useEffect(() => {
    dispach(actionsAlumno.getAlumnoFromAPI(props.id));
    dispach(actionsPaises.getPaises());/*NUEVO */
  }, []);

  const deleteAlumno = async () => {
    const deleteAccount = window.confirm(
      "esta seguro de eliminar su cuenta de alumno"
    );
    if (deleteAccount) {
      const UID = props.id;
      await deleteFirestoreUser(UID); // borra firestore
      dispach(actionsAlumno.deleteAlumno(UID)); // borra base de datos
      deleteCurrentUser(); // borra de firebase auth
      logOut(); // lo deslogea
      navigate("/"); // lo lleva al landing :)
      // NO CAMBIAR EL ORDEN ,no comete errores pero si hace que se vea feo , primero eliminamos los datos para que
      // se podria arreglar con un loader pero ya veremos :)
    }
  };

  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpeannw8c",
        uploadPreset: "w5okfspz",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage(result.info.url);
        }
      }
    );
    myWidget.open();
  }

  return (
    <div>
      {flag.length && infoAlumno && infoAlumno.name ? (
        <div className="divPrincipal">
          <div>
            <div className="containerTituloAndLogoPais">
              {/* NUEVO */}
              <img className="flagPais" src={flag[0].flag} alt="logo pais" /> 
            </div>

            <div className="containerImgPerfil">
              <h1 className="titleContainerPerfil">
                {infoAlumno.name} {infoAlumno.lastname}
              </h1>
              <div>
                <div className="containerPerfil">
                  <img src={image} alt={infoAlumno.picture} />
                  <div
                    className="containerLoadingImg"
                    onClick={() => handleOpenWidget()}
                  >
                    <img src={image} alt="" />
                  </div>
                </div>
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
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Nombre</th>
                  <td>{infoAlumno.name}</td>
                </tr>
                <tr>
                  <th scope="row">Apellido</th>
                  <td>{infoAlumno.lastname}</td>
                </tr>
                <tr>
                  <th scope="row">Edad</th>
                  <td colSpan="2">{infoAlumno.age}</td>
                </tr>
                <tr>
                  <th scope="row">Correo</th>
                  <td colSpan="2">{infoAlumno.email}</td>
                </tr>
                <tr>
                  <th scope="row">Pais</th>
                  <td colSpan="2">{infoAlumno.country}</td>
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
