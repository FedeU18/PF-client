import React, { useEffect, useState } from "react";
import * as actions from "../../redux/Actions/Alumno.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import imag from "./default user.png";
import "./alumnoPerfil.css";
import deleteFirestoreUser from "../../Authentication/functions/deleteFirestoreUser";
import deleteCurrentUser from "../../Authentication/functions/deleteCurretUser";
import logOut from "../../Authentication/functions/logOut";

export const AlumnoPerfil = (props) => {
  console.log("desde alumno perfil ", props.id);
  const dispach = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(imag);
  let info = useSelector((state) => state.alumnos.alumno);

  useEffect(() => {
    dispach(actions.getAlumnoFromAPI(props.id));
  }, []);

  const deleteAlumno = async () => {
    const deleteAccount = window.confirm(
      "esta seguro de eliminar su cuenta de alumno"
    );
    if (deleteAccount) {
      const UID = props.id;
      await deleteFirestoreUser(UID); // borra firestore
      dispach(actions.deleteAlumno(UID)); // borra base de datos
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
      {info && info.name ? (
        <div className="divPrincipal">
          <div>
            <h4 className="nameCountry">{info.country}</h4>
            <div className="containerImgPerfil">
              <h1 className="titleContainerPerfil">
                {info.name} {info.lastname}
              </h1>
              <div>
                <div className="containerPerfil">
                  <img src={image} alt={info.picture} />
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
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
  );
};
