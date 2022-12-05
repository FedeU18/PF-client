import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./profesor.css";

export const ChatProfesor = ({ socket, userLogin, canal }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [remitente, setRemitente] = useState([]);

  let alumnosChat = [];
  console.log("soy el canal", canal);
  console.log("soy el userLogin", userLogin);

  const enviarMensaje = async (e) => {
    console.log("mensajes ", mensaje);
    e.preventDefault();
    if (mensaje !== "") {
      const mensajeData = {
        room: canal, //el canal lo paso para valirdar a donde enviar el msg
        remitente: userLogin,
        recibido: remitente, //picar primero el a quien le queremos enviar el msg
        mensaje,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("mensaje_privado", mensajeData);
      // setMensajes((data) => [...data, mensajeData]);

      setMensaje("");
    }
  };

  mensajes.forEach((e) => {
    !alumnosChat.includes(e.remitente) ? alumnosChat.push(e.remitente) : "";
  });

  useEffect(() => {
    socket.emit("join_room", canal);
    console.log("me monte");
    socket.on("mensaje_privado", (res) => {
      console.log("mensajes", res);
      if (res.remitente == userLogin || res.recibido === userLogin) {
        setMensajes((data) => [...data, res]);
      }
    });
    return () => {
      socket.off("mensaje_privado", (res) => {
        console.log("mensajes", res);
        if (res.remitente == userLogin || res.recibido == userLogin) {
          setMensajes([...mensajes, res]);
        }
      });
    };
  }, [socket]);

  const mensajesAlumno = mensajes.filter(
    (e) =>
      (e.remitente === userLogin && e.recibido === remitente) ||
      (e.remitente === remitente && e.recibido === userLogin)
  );

  return (
    <div id="wrapper">
      <div className="col-4">
        <div className="user-info">
          {userLogin}&nbsp;
          <i class="fas fa-user"></i>
        </div>
        <div id="status-aside">
          <div id="user-online">
            {alumnosChat.length &&
              alumnosChat.map((item, index) => {
                if (item === userLogin) return;
                let active = item === remitente;
                return (
                  <MensajeAlumno
                    nombre={item}
                    setRemitente={setRemitente}
                    active={active}
                    key={index}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Chat
        socket={socket}
        setMensaje={setMensaje}
        enviarMensaje={enviarMensaje}
        mensaje={mensaje}
        userLogin={userLogin}
        mensajesAlumno={mensajesAlumno}
      />
    </div>
  );
};

const MensajeAlumno = ({ nombre, setRemitente, active }) => {
  return (
    <div
      onClick={() => setRemitente(nombre)}
      className={active ? "list-user-item item-active" : "list-user-item"}
    >
      <div className="user-name">{nombre}</div>
      <i className="fas fa-circle text-green"></i>
      <span className="user-status"> Alumno</span>
    </div>
  );
};

const Chat = ({
  mensajesAlumno,
  setMensaje,
  enviarMensaje,
  mensaje,
  userLogin,
}) => {
  return (
    <div className="col-8 containerChat">
      <div>
        <h5>Espera a que ellos te contacten...</h5>
        <ScrollToBottom className="containerMensajes " id="chat">
          {mensajesAlumno.map((e) => {
            return (
              <div
                className="message"
                id={userLogin !== e.remitente ? "you" : "other"}
              >
                <div className="message-content">
                  <p>{e.mensaje}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{e.time}</p>
                  <p id="author">
                    {e.remitente == userLogin ? "tu" : e.remitente}
                  </p>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>

        <div className="input-item">
          <div className="input-group-append">
            <form id="message-form" className="card-footer">
              <div className="input-group">
                <input
                  id="text-input"
                  placeholder="Type your message..."
                  onChange={(e) => setMensaje(e.target.value)}
                  value={mensaje}
                />
                <div className="input-group-append">
                  <button
                    onClick={enviarMensaje}
                    type="submit"
                    className="btn btn-success"
                    id="btnSubmit"
                    typeof="submit"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
