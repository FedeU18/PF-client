import React, { useEffect, useState } from "react";
import EditarProfesor from "../editarProfesor/editarProfesor";
import { AiOutlineEdit } from "react-icons/ai";
import * as actionsProfesor from "../../redux/Actions/Profesor";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./PerfilProfesor.css";
import Carousel from "react-bootstrap/Carousel";
import { clear } from "../../redux/Actions/Profesor";
import { EditarProfeCerti } from "../EditarProfesorCertificados/EditarProfeCerti";
import { AñadirCerificado } from "../AñadirCertificado/AñadirCertificado";
import { IoMdAddCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import Alert from "react-bootstrap/Alert";
import { deleteCertificado } from "../../redux/Actions/Certificado";

export const PerfilProfesor = ({ id }) => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [modalShowAdd, setModalShowAdd] = useState(false);
  const [alert, setAlert] = useState(false);
  const [pict, setPict] = useState("");
  let valorImagen = "";

  let info = useSelector((state) => state.profesores.detail);
  useEffect(() => {
    dispatch(actionsProfesor.getProfesorById(id));
    return () => {
      dispatch(clear());
    };
  }, []);

  function valor() {
    if (pict != "") {
      valorImagen = pict;
    } else {
      valorImagen = info.imagen;
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
          dispatch(
            actionsProfesor.putProfesor(id, { imagen: result.info.url })
          );
          setPict(result.info.url);
        }
      }
    );
    myWidget.open();
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleOtherPer = () => {
    navigate(`/profesores/${id}`);
  };

  const handleDeleteCertificado = (id) => {
    dispatch(deleteCertificado(id, info.id));
  };
  return (
    <div>
      {Object.entries(info).length > 0 ? (
        <div className="divPrincipalProf">
          <EditarProfesor
            show={show}
            profesor={info}
            handleClose={handleClose}
          />
          <AñadirCerificado
            show={modalShow}
            profesorId={info.id}
            onHide={() => setModalShow(false)}
          />

          <div className={`ContMyPerfilFavoritesProf`}>
            <Link to="/home">
              <button className="goBackBtn">
                <img className="gobackArrowProf" src={"/retro.png"} />
              </button>
            </Link>

            <div>
              <div
                className={`myperfilContProf  ${
                  theme === "dark" ? "mi_perfil_profe_dark" : null
                }`}
              >
                <div className="FotoPerfilAContProf">
                  <img src={valor()} className="ProfilePictureAlumProf" />

                  <div className="usernameProfePEr"> {info.username} </div>
                  <button
                    className="button-17"
                    role="button"
                    onClick={() => handleOpenWidget()}
                  >
                    Profesor
                  </button>

                  <button
                    className="button-62"
                    role="button"
                    onClick={handleOtherPer}
                  >
                    Ir a Mi Perfil Comercial
                  </button>
                </div>
                <div className="InFoAlumnoPErfContProf">
                  <div className="titleMyPRofileProf">
                    <span>Mi Perfil</span>
                    <button className="btnEditProAluProf">
                      <AiOutlineEdit onClick={handleShow} />
                    </button>
                  </div>

                  <div className="contInfoPErfAlumProf">
                    <div>
                      <div className="miniContinfoPErfAluProf">
                        <div className="eachInfoIputPErProfe">
                          <div className="nameInfoPErAluProf">Nombre:</div>
                          <div
                            className={`lainfoPErAluProf ${
                              theme === "dark"
                                ? "mi_perfil_profe_dark_words"
                                : null
                            }`}
                          >
                            {info.nombre}
                          </div>
                        </div>
                        <div className="eachInfoIputPErProfe">
                          <div className="nameInfoPErAluProf">Apellido:</div>
                          <div
                            className={`lainfoPErAluProf ${
                              theme === "dark"
                                ? "mi_perfil_profe_dark_words"
                                : null
                            }`}
                          >
                            {info.apellido}
                          </div>
                        </div>
                        <div className="eachInfoIputPErProfe">
                          <div className="nameInfoPErAluProf">Precio:</div>
                          <div
                            className={`lainfoPErAluProf ${
                              theme === "dark"
                                ? "mi_perfil_profe_dark_words"
                                : null
                            }`}
                          >
                            {info.precio} $ por hora.
                          </div>
                        </div>
                        <div className="eachInfoIputPErProfe">
                          <div className="nameInfoPErAluProf">Pais:</div>
                          <div
                            className={`lainfoPErAluProf ${
                              theme === "dark"
                                ? "mi_perfil_profe_dark_words"
                                : null
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
                      <div className="nameInfoPErAluProf plusnipaProf">
                        Email:
                      </div>
                      <div
                        className={`plusnipa2Prof ${
                          theme === "dark" ? "mi_perfil_profe_dark_words" : null
                        }`}
                      >
                        {info.email}
                      </div>
                      <br></br>
                      <div className="nameInfoPErAluProf plusnipaProf">
                        Descripción:
                      </div>
                      <div
                        className={`plusnipa2Prof ${
                          theme === "dark" ? "mi_perfil_profe_dark_words" : null
                        }`}
                      >
                        {info.descripcion}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`myFavContProf ${
                theme === "dark" ? "mi_perfil_profe_dark" : null
              }`}
            >
              {info.descripcion2 === null || info.descripcion2 === "" ? (
                <div className="justPorqueDEbEleg">
                  ¿Porque deberian elegirme?
                  <button
                    className="btnEditProAluProf btnEditprofOTher "
                    onClick={handleShow}
                  >
                    <AiOutlineEdit />
                  </button>
                </div>
              ) : (
                <div className="siporquDEvEle">
                  <div className="myFavHeaderPerFal">
                    <span>¿Porque deberian elegirme?</span>
                  </div>
                  <div className="desc2profPEr">{info.descripcion2}</div>
                </div>
              )}
            </div>
          </div>

          <div className={`SEcondcontProper`}>
            <div
              className={`myMAteriasProfper ${
                theme === "dark" ? "mi_perfil_profe_dark" : null
              }`}
            >
              <div className="myFavHeaderPerFal">
                <span className={`${
                theme === "dark" ? "mi_perfil_profe_dark" : null
              }`}>
                  Mis Materias 
                  <button className="btnEditProAluProf btnEditprofOTher ">
                  </button>
                </span>
                <div className="materiasContProfPEr">
                  {info.materias?.length > 0 &&
                    info.materias.map((m) => (
                      <div className="nameLogoMaDeCont">
                        <div className="logoMaDeContDo">
                          <div className="logoMaDeCont">
                            <img src={`/${m.name}.png`} className="logoMaDe" />
                          </div>
                        </div>
                        <div className="nameMaDeCont">{m.name}</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div
              className={`MisCertificadosPRofePEr ${
                theme === "dark" ? "mi_perfil_profe_dark" : null
              }`}
            >
              <div className={`myFavHeaderPerFal`}>
                <span
                  className={`${
                    theme === "dark" ? "mi_perfil_profe_dark_words" : null
                  }`}
                >
                  Mis Certificados
                  <button className="btnEditProAluProf btnEditprofOTher"></button>
                </span>
                {info.certificados.length === 0 ? (
                  <div className="aunNoCertBanner">
                    Aun no añades ningún Certificado.
                    <div className="centeraddbtn">
                      <IoMdAddCircleOutline
                        onClick={() => setModalShow(true)}
                        size={80}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="fotoContProPro">
                    {info.certificados.map((c) => (
                      <div
                        className="fotoCertificadoDeco fotoCertificadoDecoplus"
                        style={{ backgroundImage: `url(${c.foto})` }}
                      >
                        <EditarProfeCerti
                          show={modalShowEdit}
                          onShowalert={() => setAlert(true)}
                          profesorId={info.id}
                          certificadoId={c.id}
                          nombre={c.nombre}
                          foto={c.foto}
                          onHide={() => setModalShowEdit(false)}
                        />

                        <div className="btnsCertisProfePErf">
                          <div
                            className="btnEditEliCErti"
                            onClick={() => setModalShowEdit(true)}
                          >
                            <AiOutlineEdit />
                          </div>
                          <div
                            className="btnEditEliCErti"
                            onClick={() => {
                              handleDeleteCertificado(c.id);
                            }}
                          >
                            <RiDeleteBin6Line />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="centeraddbtn">
                      <IoMdAddCircleOutline
                        onClick={() => setModalShow(true)}
                        size={80}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoaderProfePerfil />
      )}
    </div>
  );
};

export default PerfilProfesor;
