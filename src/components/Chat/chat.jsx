import React, { useEffect, useState } from "react";
import "./chat.css";
import io from "socket.io-client";
import { Chats } from "./chatAlumno";
const socket = io("http://localhost:3001");

export const Chat = () => {
  const [canal, setCanal] = useState("");
  const [userLogin, setUserLogin] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [usuariosOnline, setusuariosOnline] = useState([]);
  const [perfilIngresado, setPerfilIngresado] = useState({
    usuario: "",
    id: "",
    tipo: "",
  });

  console.log("soy profesor ", profesores);

  const logearAlumno = (e) => {
    e.preventDefault();
    socket.emit("logearAlumno", userLogin);
    if (userLogin !== "" && canal !== "") {
      socket.emit("join_room", canal);
    }
  };

  const logearProfesor = (e) => {
    e.preventDefault();
    socket.emit("loguearProfesor", userLogin);
    if (userLogin !== "" && canal !== "") {
      socket.emit("join_room", canal);
    }
  };

  useEffect(() => {
    socket.on("logearAlumno", (data) => {
      if (data.status === "aceptado") {
        setAlumnos([
          ...alumnos,
          {
            usuario: data.data.nombre,
            id: data.data.id,
            tipo: data.data.tipo,
          },
        ]);
        setPerfilIngresado({
          usuario: data.data.nombre,
          id: data.data.id,
          tipo: data.data.tipo,
        });
      }
    });

    socket.on("usuariosIniciados", (res) => {
      console.log(res);
      if ((res.status = "aceptado")) {
        setusuariosOnline([...usuariosOnline, ...res.data]);
      }
    });

    socket.on("loguearProfesor", (data) => {
      console.log("soy data de profe", data);
      if (data.status === "aceptado") {
        setProfesores([
          ...profesores,
          {
            usuario: data.data.nombre,
            id: data.data.id,
            tipo: data.data.tipo,
          },
        ]);
        setPerfilIngresado({
          usuario: data.data.nombre,
          id: data.data.id,
          tipo: data.data.tipo,
        });
      }
    });

    return () => {
      socket.off("logearAlumno", (data) => {
        if (data.status === "aceptado") {
          setAlumnos([
            ...alumnos,
            {
              usuario: data.data.nombre,
              id: data.data.id,
            },
          ]);
        }
      });
      socket.off("usuariosProfesor", (data) => {
        if (data.status === "aceptado") {
          setProfesores([
            ...profesores,
            {
              usuario: data.data.nombre,
              id: data.data.id,
            },
          ]);
        }
      });
    };
  }, [socket]);

  return (
    <div>
      <nav className="nav navbar-dark bg-dark">
        <a href="/" className="nav navbar-brand mx-auto">
          Chatea con tu profe
        </a>
      </nav>
      {/* formulario inicio de sesion */}
      {!alumnos.length && !profesores.length ? (
        <div
          className="card col-md-4 mx-auto mt-5"
          id={!alumnos.length ? "nick-wrap-visible" : "nick-wrap-invisible"}
        >
          <button onClick={(e) => setCanal(e.target.value)} value="canal A">
            grupo A
          </button>
          <button onClick={(e) => setCanal(e.target.value)} value="canal B">
            grupo B
          </button>
          <div>
            <div className="card-header">
              <h4>Como Alumno</h4>
            </div>
            <p id="nick-error"></p>
            <div className="card-body">
              <form id="nick-form">
                <input
                  onChange={(e) => setUserLogin(e.target.value)}
                  type="text"
                  id="nick-name"
                  className="form-control"
                />
                <button
                  onClick={logearAlumno}
                  type="submit"
                  className="btn btn-success mt-3"
                  id="nick-btn"
                >
                  Acceder
                </button>
              </form>
            </div>
            <div className="card-header">
              <h4>Como Profesor</h4>
            </div>
            <p id="nick-error"></p>
            <div className="card-body">
              <form id="nick-form">
                <input
                  onChange={(e) => setUserLogin(e.target.value)}
                  type="text"
                  id="nick-name"
                  className="form-control"
                />
                <button
                  onClick={logearProfesor}
                  type="submit"
                  className="btn btn-success mt-3"
                  id="nick-btn"
                >
                  Acceder
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : perfilIngresado.tipo === "alumno" ||
        perfilIngresado.tipo === "profesor" ? (
        <Chats
          setUserLogin={setUserLogin}
          perfilIngresado={perfilIngresado}
          usuariosOnline={usuariosOnline}
          profesor={"fabian"}
          canal={canal}
          socket={socket}
          userLogin={userLogin}
        />
      ) : (
        <h1>cargando...</h1>
      )}
    </div>
  );
};
