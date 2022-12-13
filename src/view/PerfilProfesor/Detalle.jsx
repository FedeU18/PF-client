import io from "socket.io-client";
const socket = io("http://localhost:3001");
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Detalle.css";
import Button from "react-bootstrap/Button";
import { clear, getProfesorById } from "../../redux/Actions/Profesor";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { NavBar } from "../../components/Nav/Nav";
import { Certificados } from "../../components/Certificados/Certificados";
import { Reseñas } from "../../components/Reseñas/Reseñas";
import { Comentarios } from "../../components/Comentarios/Comentarios";
import { AddComent } from "../../components/AddComent/AddComent";

import { GrAdd } from "react-icons/gr";
import userAuthentication from "../../Authentication/functions/user";
import * as actionsAlumno from "../../redux/Actions/Alumno";
import Calendario from "../../components/Calendario/Calendario";
import { ChatAlumno } from "../../components/chat/chatAlumno";

export const Detalle = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  let details = useSelector((state) => state.profesores.detail);
  let infoAlumno = useSelector((state) => state.alumnos.alumno);
  // holaa nooooo
  console.log("soy detalles---->", details);

  const [current, setCurrent] = useState("Información");
  const [openFotos, setOpenFotos] = useState(false);
  const [show, setShow] = useState(false);
  const [alerta, setAlerta] = useState([]);
  const { userData } = userAuthentication();
  let msgUsuariosAlumno = [];

  if (alerta.length) {
    alerta.forEach((e) => {
      if (
        userData.rol === "student" &&
        e.receptor === userData.name &&
        !msgUsuariosAlumno.includes(e.remitente)
      ) {
        msgUsuariosAlumno.push(e.remitente);
      }
    });
  }

  console.log("soy alerta desde detalles", msgUsuariosAlumno);

  useEffect(() => {
    socket.emit("solicitarMSG_pendientes");

    dispatch(actionsAlumno.getAlumnoFromAPI(userData.id));
    dispatch(getProfesorById(id));

    socket.on("alerta_mensajes", (data) => {
      setAlerta([...data]);
    });

    return () => dispatch(clear());
  }, []);

  const handleChangeOp = (e) => {
    setCurrent(e.target.name);
  };

  const handleChatOp = (e) => {
    socket.emit("chat_abierto", details.nombre);
    socket.emit("mensajes_antiguos", userData.name, details.nombre);
    setCurrent(e.target.name);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleOpenFotos = () => {
    console.log("ulal");
    setOpenFotos(true);
  };

  const handleCloseFotos = () => {
    setOpenFotos(false);
  };
  return (
    <div className={`detalleProfeContainer`}>
      <Certificados
        fotos={details.certificados}
        close={handleCloseFotos}
        open={openFotos}
      />

      <Link to="/home">
        <button className="goBackBtn">
          <img className="gobackArrow" src={"/retro.png"} />
        </button>
      </Link>

      <div className="ContainerProfeDe" key={details.id}>
        <div className="opPerfilDesProfe">
          <div className="profeUserna">
            <span>{details.username}</span>
          </div>

          <div className="profeNameCont">
            {details.imagen === "" ? (
              <div className="AvatarNameAluPerProf">
                <div>{details.username[0].toUpperCase()}</div>
              </div>
            ) : (
              <img src={details.imagen} className={"perfilFotoDesc"} />
            )}
            <br></br>
            <span className="nomApeDe">
              {details.nombre} {details.apellido}
            </span>
            <br></br>
            <span className="emailDe">{details.email}</span>
            <br></br>
            <span>{details.descripcion}</span>
          </div>

          <div className="opcContainer">
            <button
              className={`${
                current === "Información" ? "opcionEleDe" : "opnoEleDe"
              } ${
                theme === "dark" && current === "Información"
                  ? "dark_casilla_de_datos"
                  : null
              }`}
              name={"Información"}
              onClick={handleChangeOp}
            >
              Información
            </button>
            <br></br>
            <button
              className={`${
                current === "Calendario" ? "opcionEleDe" : "opnoEleDe"
              }`}
              name={"Calendario"}
              onClick={handleChangeOp}
            >
              Reservar
            </button>
            <br></br>
            <button
              className={`${
                current === "Reseña" ? "opcionEleDe" : "opnoEleDe"
              }`}
              name={"Reseña"}
              onClick={handleChangeOp}
            >
              Reseñas
            </button>
            <br></br>

            <button
              className={`${current === "Chat" ? "opcionEleDe" : "opnoEleDe"}`}
              name={"Chat"}
              onClick={handleChatOp}
            >
              Chatear
              {msgUsuariosAlumno.includes(details.nombre) && (
                <div className="btnmsg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    class="bi bi-chat-right-text-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                  </svg>
                </div>
              )}
            </button>

            <br></br>
          </div>
        </div>

        <div className={`infoConteiner`}>
          {current === "Información" && (
            <div
              className={`subContDe ${
                theme === "dark" ? "detalle_comercial_dark" : null
              }`}
            >
              <div className="porqueEleContDes">
                <div className="porqueEleDes">
                  <span className="subTitleDe">Por qué elegirme:</span>
                  {details.descripcion2 === null ||
                  details.descripcion2 === "" ? (
                    <div
                      className={`certiNoCont ${
                        theme === "dark" ? "detalle_description_profesor" : null
                      }`}
                    >
                      <span>Este author aun no añade una descripción.</span>
                    </div>
                  ) : (
                    <div>{details.descripcion2}</div>
                  )}
                </div>

                <div>
                  <div className="precioboxDes">
                    <div className="preporH">Precio por Hora</div>
                    {details.precio} $
                  </div>
                </div>
              </div>

              <div className="certiMateCont">
                <div className="certiContDe">
                  <span className="subTitleDe">Estudios y Certificados:</span>
                  {details.certificados?.length === 0 && (
                    <div
                      className={`certiNoCont ${
                        theme === "dark" ? "detalle_description_profesor" : null
                      }`}
                    >
                      <span className="">
                        Este author aun no tiene certificados que mostrar.
                      </span>
                    </div>
                  )}

                  {details.certificados?.length > 0 &&
                    details.certificados?.length < 7 && (
                      <div className="certiSiCont">
                        {details.certificados.map((c, index) => (
                          <div
                            key={index}
                            className="fotoCertificadoDeco"
                            onClick={handleOpenFotos}
                          >
                            <img src={c.foto} className="fotoCertificadoDe" />
                          </div>
                        ))}
                      </div>
                    )}
                  {details.certificados?.length > 6 && (
                    <div className="certiSiCont">
                      {details.certificados.map((c, index) => (
                        <>
                          {i < 5 && (
                            <div
                              key={index}
                              className="fotoCertificadoDeco"
                              onClick={handleOpenFotos}
                            >
                              <img src={c.foto} className="fotoCertificadoDe" />
                            </div>
                          )}
                        </>
                      ))}
                      <div
                        className="fotoCertificadoDeco fcdcPlus"
                        onClick={handleOpenFotos}
                      >
                        +{details.certificados.length - 5}
                      </div>
                    </div>
                  )}
                </div>

                <div className="materiasContDe">
                  <span className="subTitleDe">Materias:</span>
                  {details.materias?.length > 0 &&
                    details.materias.map((m, index) => (
                      <div key={index} className="nameLogoMaDeCont">
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
          )}
          {current === "Calendario" && (
            <div className="subContDe">
              <Calendario profe={details} />
            </div>
          )}
          {current === "Reseña" && (
            <div className="subContDe">
              <Reseñas puntajes={details.puntuacions} />
              <br></br>
              <div className="comentsBtnAddCont">
                <Comentarios
                  myId={userData.id}
                  profileOwner={details.id}
                  coments={details.coments}
                />
                {userData.id !== details.id && infoAlumno.tipo && (
                  <button className="btnAddComOp" onClick={handleShow}>
                    +
                  </button>
                )}
              </div>

              <AddComent
                alumnoId={infoAlumno.id}
                myId={userData.id}
                profesorId={details.id}
                show={show}
                handleClose={handleClose}
              />
            </div>
          )}
          {current === "Chat" && (
            <div className="subContDe">
              {userData.rol === "student" && (
                <ChatAlumno
                  socket={socket}
                  userLogin={userData.name}
                  canal={details.id}
                  receptor={details.nombre}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
