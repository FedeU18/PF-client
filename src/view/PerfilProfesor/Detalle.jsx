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
import { ChatProfesor } from "../../components/chat/chatProfesor";

export const Detalle = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let details = useSelector((state) => state.profesores.detail);
  let infoAlumno = useSelector((state) => state.alumnos.alumno);

  const [current, setCurrent] = useState("Información");
  const [openFotos, setOpenFotos] = useState(false);
  const [show, setShow] = useState(false);
  const { userData } = userAuthentication();
  console.log(infoAlumno);

  useEffect(() => {
    dispatch(actionsAlumno.getAlumnoFromAPI(userData.id));

    dispatch(getProfesorById(id));
    return () => dispatch(clear());
  }, []);

  const handleChangeOp = (e) => {
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
    <div className="detalleProfeContainer">
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
              onClick={handleChangeOp}
            >
              Contactar
            </button>
         
            <br></br>
          </div>
        </div>

        <div className="infoConteiner">
          {current === "Información" && (
            <div className="subContDe">
              <div className="porqueEleContDes">
                <div className="porqueEleDes">
                  <span className="subTitleDe">Por qué elegirme:</span>
                  {details.descripcion2 === null ||
                  details.descripcion2 === "" ? (
                    <div className="certiNoCont">
                      <span className="">
                        Este author aun no añade una descripción.
                      </span>
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
                    <div className="certiNoCont">
                      <span className="">
                        Este author aun no tiene certificados que mostrar.
                      </span>
                    </div>
                  )}

                  {details.certificados?.length > 0 &&
                    details.certificados?.length < 7 && (
                      <div className="certiSiCont">
                        {details.certificados.map((c) => (
                          <div
                            key={c}
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
                      {details.certificados.map((c, i) => (
                        <>
                          {i < 5 && (
                            <div
                              key={i}
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
                    details.materias.map((m) => (
                      <div key={m} className="nameLogoMaDeCont">
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
            <div className="subContDe subContDecontChats ">
              <div className="subContDEChats">
              {userData.email === details.email ? (
                <ChatProfesor
                  socket={socket}
                  userLogin={details.nombre}
                  canal={details.id}
                />
              ) : userData.rol === "student" ? (
                <ChatAlumno
                  socket={socket}
                  userLogin={userData.name}
                  canal={details.id}
                  receptor={details.nombre}
                />
              ) : (
                <h1>No esta disponible</h1>
              )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
