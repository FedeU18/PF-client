import io from "socket.io-client";
const socket = io("http://localhost:3001");
import "./Home.css";
import React from "react";
import { NavBar } from "../../components/Nav/Nav";
import { Filtros } from "../../components/Filtros/Filtros";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { editAlumno } from "../../redux/Actions/Alumno";
import { getPaises } from "../../redux/Actions/Paises";
import { addOPSelected } from "../../redux/Actions/Materias";
import { useDispatch, useSelector } from "react-redux";
import { allProfes, desmontajeProfesores } from "../../redux/Actions/Profesor";
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
import MateriasBtn from "./MateriasBtn.jsx";
import Caru from "./Caru.jsx";
import Loader from "../../components/Loader/Loader";
import FooterH from "./FooterH.jsx";
import Footer from ".././Landing/Footer.jsx"
import { RiCloseCircleFill } from "react-icons/ri";

export const Home = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  let profesor = useSelector((state) => state.profesores.detail);
  const [ban, setBan] = useState(false);
  const { userData } = userAuthentication();
  const id = userData.id;

  let today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear().toString();

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

  console.log("soy userData-->", userData);
  console.log("soy alerta-->", alerta);
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
  const infoAlumno = useSelector((state) => state.alumnos.alumno);

  const materias = useSelector((state) => state.materias.filtrosSeleccionados);

  useEffect(() => {
    if (Object.entries(infoAlumno).length > 0 && infoAlumno.baneado === true) {
      const array = infoAlumno.fechaLimiteBan.split("-");

      console.log(
        array[0],
        " ",
        yyyy,
        " ",
        array[1],
        " ",
        mm,
        " ",
        array[2],
        " ",
        dd
      );
      if (array[0] <= yyyy && array[1] <= mm && array[2] <= dd) {
        console.log("aaaaa");
        dispatch(editAlumno({ baneado: false }, infoAlumno.id));
      }
    }
  }, [infoAlumno.fechaLimiteBan]);

  useEffect(() => {
    if (Object.entries(infoAlumno).length > 0 && infoAlumno.baneado === true) {
      setBan(true);
    }
  }, [infoAlumno]);

  useEffect(() => {
    socket.emit("solicitarMSG_pendientes");

    socket.on("usuarios_chat", (info) => {
      setUsuariosChat([...info]);
    });
    socket.on("alerta_mensajes", (data) => {
      setAlerta([...data]);
    });
    socket.on("mensaje_privado", (res) => {
      console.log("recibo mensajes desde home", res);
    });

    dispatch(getProfesorById(id));
    dispatch(getAllAlumnos());
    dispatch(allProfes(filtrosSeleccionados));
    dispatch(getMaterias());
    dispatch(getPaises());

    return () => {
      dispatch(desmontajeProfesores());
    };
  }, [dispatch, socket]);

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
    <>
      <NavBar />

      <Caru />

      {profes.length > 0 ? (
        <div className={theme === "dark" ? "dark_home" : null}>
          <button className="filtroBtn">
            <BsFillGrid3X3GapFill onClick={handleFiltros} />
          </button>
          {filtrosSeleccionados.materias?.length > 0 ? (
            filtrosSeleccionados.materias.map((f) => (
              <button
                className={`btnListOpSelected ${
                  theme === "dark" ? "dark_filtros" : null
                }`}
                name={f}
                onClick={handleDeleteOpSelec}
              >
                <RiCloseCircleFill className="fs-4 text-danger button_quit_materia" />
                {f[0].toUpperCase() + f.slice(1, f.length)}
              </button>
            ))
          ) : (
            <button
              className={`btnListOpSelected ${
                theme === "dark" ? "dark_filtros" : null
              }`}
            >
              Todas las materias
            </button>
          )}

          {filtrosSeleccionados.pais && filtrosSeleccionados.pais !== "" ? (
            <button
              className={`btnListOpSelected`}
              name="pais"
              onClick={handleDelOp}
            >
              X {filtrosSeleccionados.pais}
            </button>
          ) : (
            <button
              className={`btnListOpSelected ${
                theme === "dark" ? "dark_filtros" : null
              }`}
            >
              Todos los paises
            </button>
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

          {userData.rol === "teacher" && (
            <BotonChats
              chatUsers={chatUsers}
              mensajesUsuarios={mensajesUsuarios}
              mostrarChatUsers={mostrarChatUsers}
            />
          )}

          <MateriasBtn />

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
          className={`d-flex justify-content-center align-items-center ${theme === "dark" ? "dark_loader_eye" : null}`}
          style={{ height: "75vh" }}
        >
          <Loader theme={theme}/>
        </div>
      )}

      <div
        className="d-flex flex-column align-items-center"
        style={{ margin: "0 auto" }}
      >
        <hr />
        {/*<footer>
          <Link to="/about" className="aFootAbout">
            About
          </Link>
        </footer>
      */}
      </div>
      {/*<FooterH />*/}
      <Footer/>
    </>
  );
};

function BotonChats({ mostrarChatUsers, mensajesUsuarios, chatUsers }) {
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
