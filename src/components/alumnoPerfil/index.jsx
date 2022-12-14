import React, { useEffect, useState } from "react";
import * as actions from "../../redux/Actions/Alumno.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import imag from "./default user.png";
import cloud from "./upload-cloud.png";
import "./alumnoPerfil.css";
import deleteFirestoreUser from "../../Authentication/functions/deleteFirestoreUser";
import deleteCurrentUser from "../../Authentication/functions/deleteCurretUser";
import Carousel from "react-bootstrap/Carousel";
import logOut from "../../Authentication/functions/logOut";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { EditarAlumno } from "../EditarAlumno/EditarAlumno.jsx";
import { clearAlumno } from "../../redux/Actions/Alumno.js";
import { ProfeCard } from "../ProfeCard/Profecard.jsx";
import LoaderPerfilStudent from "./LoaderPerfilStudent.jsx";
import Table from "react-bootstrap/Table";
import { allProfes } from "../../redux/Actions/Profesor.js";

export const AlumnoPerfil = (props) => {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [pict, setPict] = useState("");
  const [myFavProfe, setMyFavProfe] = useState([]);
  let valorImagen = "";
  let info = useSelector((state) => state.alumnos.alumno);
  const profes = useSelector((state) => state.profesores.allProfesores);

  useEffect(() => {
    dispatch(allProfes());
    dispatch(actions.getAlumnoFromAPI(props.id));
    return () => {
      dispatch(clearAlumno());
    };
  }, []);

  useEffect(() => {
    console.log(info.favourites);
    console.log(profes);
    if (info.favourites &&  info.favourites.length > 0 && profes.length > 0) {
      // info.favourites?.map((f) => {
      //   profes.map((p) => {
      //     if (p.id === f) {
      //       setMyFavProfe((prev) => [...prev, p]);
      //     }
      //   });
      // });

      const profesFavoritos = [];
      if (profes.length > 0) {
        for (const profesor of profes) {
          if (info.favourites.includes(profesor.id)) {
            profesFavoritos.push(profesor);
          }
        }
        console.log(profesFavoritos);
        setMyFavProfe(profesFavoritos);
        console.log(myFavProfe)
      }
    }
  }, [profes.length]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const deleteOwnAlumno = async () => {
  //   const deleteAccount = window.confirm(
  //     "esta seguro de eliminar su cuenta de alumno"
  //   );
  //   if (deleteAccount) {
  //     const UID = props.id;
  //     await deleteFirestoreUser(UID); // borra firestore
  //     dispatch(actions.deleteAlumno(UID)); // borra base de datos
  //     deleteCurrentUser(); // borra de firebase auth
  //     logOut(); // lo deslogea
  //     navigate("/"); // lo lleva al landing :)
  //     // NO CAMBIAR EL ORDEN ,no comete errores pero si hace que se vea feo , primero eliminamos los datos para que
  //     // se podria arreglar con un loader pero ya veremos :)
  //   }
  // };

  function valor() {
    if (pict !== "") {
      valorImagen = pict;
    } else {
      valorImagen = info.picture;
    }
    return valorImagen;
  }

  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpeannw8c",
        uploadPreset: "w5okfspz",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          dispatch(actions.editAlumno({ picture: result.info.url }, props.id));

          setPict(result.info.url);
        }
      }
    );
    myWidget.open();
  }

  return (
    <div>
      {info && info.name ? (
        <div className={`divPrincipal`}>
          <EditarAlumno show={show} alumno={info} handleClose={handleClose} />
          <div className={`ContMyPerfilFavorites`}>
            <Link to="/home">
              <button className="goBackBtn">
                <img className="gobackArrow" src={"/retro.png"} />
              </button>
            </Link>
            <div>
              <div
                className={`myperfilCont  ${
                  theme === "dark" ? "dark_mi_perfil_alumno" : null
                }`}
              >
                <div className="FotoPerfilACont">
                  <img src={valor()} className="ProfilePictureAlum" />

                  <button
                    className="button-17"
                    role="button"
                    onClick={() => handleOpenWidget()}
                  >
                    Alumno
                  </button>
                </div>

                <div className={`InFoAlumnoPErfCont`}>
                  <div className="titleMyPRofile">
                    <span
                      className={theme === "dark" ? "info_student_dark" : null}
                    >
                      Mi Perfil
                    </span>
                    <button className="btnEditProAlu">
                      <AiOutlineEdit onClick={handleShow} />
                    </button>
                  </div>

                  <div className={`contInfoPErfAlum`}>
                    <div>
                      <div className="miniContinfoPErfAlu">
                        <div className="eachInfoIputPErProfe">
                          <div className="nameInfoPErAlu">Nombre:</div>
                          <div
                            className={`lainfoPErAlu ${
                              theme === "dark" ? "info_student_dark" : null
                            }`}
                          >
                            {info.name}
                          </div>
                        </div>
                        <div className="eachInfoIputPErProfe">
                          <div className="nameInfoPErAlu">Apellido:</div>

                          <div
                            className={`lainfoPErAlu ${
                              theme === "dark" ? "info_student_dark" : null
                            }`}
                          >
                            {info.lastname}
                          </div>
                        </div>
                        <div className="eachInfoIputPErProfe">
                          <div className="nameInfoPErAlu">Edad:</div>

                          <div
                            className={`lainfoPErAlu ${
                              theme === "dark" ? "info_student_dark" : null
                            }`}
                          >
                            {info.age} años
                          </div>
                        </div>
                        <div className="eachInfoIputPErProfe">
                          <div className="nameInfoPErAlu">Pais:</div>

                          <div
                            className={`lainfoPErAlu ${
                              theme === "dark" ? "info_student_dark" : null
                            }`}
                          >
                            <img
                              src={info.country.flag}
                              className="flagalumPro"
                            />
                            {info.country.name}
                          </div>
                        </div>
                      </div>
                      <div className="nameInfoPErAlu plusnipa">Email:</div>
                      <div
                        className={`plusnipa2 ${
                          theme === "dark" ? "info_student_dark" : null
                        }`}
                      >
                        {info.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`pendientesContperfAlum ${
                  theme === "dark" ? "dark_mi_perfil_alumno" : null
                }`}
              >
                <div className="myPEndHeaderPerFal">
                  <span
                    className={`mispenSpan ${
                      theme === "dark" ? "info_student_dark" : null
                    }`}
                  >
                    Mis Pendientes
                  </span>
                  <MdOutlinePendingActions
                    style={{ color: "rgb(151, 140, 140,0.8)" }}
                    size={24}
                  />
                </div>
                <div className="tabla-reservas position-absolute">
                  <Table striped hover variant="light">
                    <thead>
                      <tr className="text-center">
                        <th>Día</th>
                        <th>Hora</th>
                        <th>Profesor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {info.fechas?.map((f) => {
                        return f.profesors.map((p, index) => {
                          return (
                            <tr key={index}>
                              <th>{f.fecha}</th>
                              <th>{f.hora}</th>
                              <th>
                                <Link
                                  className="link-hacia-el-profe"
                                  to={"/profesores/" + p.id}
                                >
                                  {p.nombre + " " + p.apellido}
                                </Link>
                              </th>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            <div
              className={`myFavCont ${
                theme === "dark" ? "dark_mi_perfil_alumno" : null
              }`}
            >
              <div className="myFavHeaderPerFal">
                <span className={theme === "dark" ? "info_student_dark" : null}>
                  Mis Favoritos
                </span>
                <MdOutlineFavorite
                  size={30}
                  style={{ color: "rgb(253, 17, 49)" }}
                />
              </div>
              <div>
                {myFavProfe.length === 0 ? (
                  <div className="aunnofavCont">
                    Aún no agregas nada a favoritos.
                  </div>
                ) : (
                  <div>
                    <Carousel>
                      {myFavProfe.map((f, index) => (
                        <Carousel.Item key={index} style={{marginLeft: "4rem", paddingBottom:" 3rem", marginTop:"4rem"}}>
                          <div className="centerProfCardsFavAL">
                            <ProfeCard
                              id={f.id}
                              username={f.username}
                              nombre={f.nombre}
                              imagen={f.imagen}
                              pais={f.country?.flag}
                              descripcion={f.descripcion}
                              materias={f.materias}
                              puntuacion={f.puntuacions}
                              precio={f.precio}
                            />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoaderPerfilStudent />
      )}
    </div>
  );
};
