import io from "socket.io-client";
const socket = io("http://localhost:3001");
import "./Home.css";
import React from "react";
import { NavBar } from "../../components/Nav/Nav";
import { Filtros } from "../../components/Filtros/Filtros";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useEffect, useState } from "react";

import { getPaises } from "../../redux/Actions/Paises";
import { addOPSelected } from "../../redux/Actions/Materias";
import { useDispatch, useSelector } from "react-redux";
import { allProfes } from "../../redux/Actions/Profesor";
import { ProfeCards } from "../../components/ProfeCards/ProfeCards";
import { Link } from "react-router-dom";
import { filterProfes } from "../../redux/Actions/Profesor";
import { getAllAlumnos } from "../../redux/Actions/Alumno";
import { getMaterias } from "../../redux/Actions/Materias";
import { clear, getProfesorById } from "../../redux/Actions/Profesor";
import userAuthentication from "../../Authentication/functions/user";
import { auth } from "../../Authentication/firebase/credenciales";
import autentication from "../../Authentication/functions/user";
import logOut from "../../Authentication/functions/logOut";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { ChatProfe } from "../../components/Chat/chatProfe";

// import MateriasBtn from "./MateriasBtn.jsx";

import Loader from "../../components/Loader/Loader";

export const Home = () => {
  const { userData } = userAuthentication();
  console.log("soy userData", userData);
  const dispatch = useDispatch();
  const id = userData.id;
  let profesor = useSelector((state) => state.profesores.detail);

  const [open, setOpen] = useState(false);
  const [chatUsers, setChatUsers] = useState(false);
  const [usuariosChat, setUsuariosChat] = useState([]);
  const [alerta, setAlerta] = useState([]);

  let mensajesUsuarios = [];
  let msgUsuariosAlumno = [];

  if (alerta.length) {
    alerta.forEach((e) => {
      if (
        userData.rol === "teacher" &&
        e.receptor === userData.nombre &&
        !mensajesUsuarios.includes(e.remitente)
      ) {
        mensajesUsuarios.push(e.remitente);
      }
      if (
        userData.rol === "student" &&
        e.receptor === userData.name &&
        !msgUsuariosAlumno.includes(e.remitente)
      ) {
        msgUsuariosAlumno.push(e.remitente);
      }
    });
  }

  console.log("soy mensajeUsuarios-->", mensajesUsuarios);
  console.log("soy msgUsuariosAlumno--->", msgUsuariosAlumno);

  const mostrarChatUsers = () => {
    socket.emit("usuarios_chat", userData.nombre);
    setChatUsers(!chatUsers);
  };

  // const user = userAuthenticate();

  const filtrosSeleccionados = useSelector(
    (state) => state.materias.filtrosSeleccionados
  );
  const profes = useSelector((state) => state.profesores.profesores); //todo el estado de profes
  const materias = useSelector((state) => state.materias.filtrosSeleccionados);

  useEffect(() => {
    socket.emit("solicitarMSG_pendientes");

    socket.on("usuarios_chat", (info) => {
      setUsuariosChat([...info]);
    });
    socket.on("alerta_mensajes", (data) => {
      setAlerta([...data]);
    });

    dispatch(getProfesorById(id));
    dispatch(getAllAlumnos());
    dispatch(allProfes(filtrosSeleccionados));
    dispatch(getMaterias());
    dispatch(getPaises());
  }, []);

  useEffect(() => {
    dispatch(filterProfes(filtrosSeleccionados));
  }, [filtrosSeleccionados]);

  const handleFiltros = () => {
    setOpen(true);
  };
  const handleCloseFiltros = (set) => {
    setOpen(set);
  };

  const handleDeleteOpSelec = (e) => {
    dispatch(
      addOPSelected({
        ...filtrosSeleccionados,
        materias: filtrosSeleccionados.materias.filter(
          (f) => f !== e.target.name
        ),
      })
    );
  };

  const handleDelOp = (e) => {
    dispatch(
      addOPSelected({
        ...filtrosSeleccionados,
        [e.target.name]: "",
      })
    );
  };

  return (
    <div>
      <NavBar />

      {profes.length > 0 ? (
        <div>
          <button className="filtroBtn">
            <BsFillGrid3X3GapFill onClick={handleFiltros} />
          </button>
          {filtrosSeleccionados.materias?.length > 0 ? (
            filtrosSeleccionados.materias.map((f) => (
              <button
                className="btnListOpSelected"
                name={f}
                onClick={handleDeleteOpSelec}
              >
                X {f}
              </button>
            ))
          ) : (
            <button className="btnListOpSelected"> Todas las materias </button>
          )}

          {filtrosSeleccionados.pais && filtrosSeleccionados.pais !== "" ? (
            <button
              className="btnListOpSelected"
              name="pais"
              onClick={handleDelOp}
            >
              X {filtrosSeleccionados.pais}
            </button>
          ) : (
            <button className="btnListOpSelected"> Todos los paises </button>
          )}

          {filtrosSeleccionados.puntuacion &&
            filtrosSeleccionados.puntuacion !== "" && (
              <button
                className="btnListOpSelected"
                name="puntuacion"
                onClick={handleDelOp}
              >
                X {filtrosSeleccionados.puntuacion}
              </button>
            )}
          {filtrosSeleccionados.precio &&
            filtrosSeleccionados.precio !== "" && (
              <button
                className="btnListOpSelected"
                name="precio"
                onClick={handleDelOp}
              >
                X {filtrosSeleccionados.precio}{" "}
              </button>
            )}

          <Filtros open={open} close={handleCloseFiltros} />
          <br></br>

          <ProfeCards
            socket={socket}
            msgUsuariosAlumno={msgUsuariosAlumno}
            profes={profes}
          />

          {/* <MateriasBtn/> */}
          {/* { canal, socket, receptor, userLogin } */}

          {userData.rol === "teacher" && (
            <BotonChats
              chatUsers={chatUsers}
              mensajesUsuarios={mensajesUsuarios}
              mostrarChatUsers={mostrarChatUsers}
            />
          )}

          {chatUsers && (
            <ChatProfe
              setChatUsers={setChatUsers}
              usuariosChat={usuariosChat}
              socket={socket}
              userLogin={profesor.nombre}
              canal={profesor.id}
            />
          )}
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "75vh" }}
        >
          <Loader></Loader>
        </div>
      )}

      <div
        className="d-flex flex-column align-items-center"
        style={{ margin: "0 auto" }}
      >
        <hr />

        <footer>
          <Link to="/about" className="aFootAbout">
            About
          </Link>
        </footer>
      </div>
    </div>
  );
};

function BotonChats({ mostrarChatUsers, mensajesUsuarios, chatUsers }) {
  console.log("soy usuarios de mensajes-->", mensajesUsuarios);
  useEffect(() => {
    socket.on("alerta_mensajes", (data) => {
      console.log("soy data desde boton ", data);
    });
  });

  return (
    <div className="btnMensajes">
      <Button onClick={mostrarChatUsers}>
        <div className="btnmsg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-chat-right-text-fill"
            viewBox="0 0 16 16"
          >
            <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
          </svg>
          <h5 className={chatUsers ? "noAlerta" : "alerta"}>
            {mensajesUsuarios.length ? mensajesUsuarios.length : ""}
          </h5>
        </div>
      </Button>
    </div>
  );
}
