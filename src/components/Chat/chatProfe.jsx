import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import "./profesor.css";

export const ChatProfe = ({ socket, userLogin, canal, usuariosChat }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [receptor, setReceptor] = useState([]);
  const [chat, setChat] = useState(false);

  let usersChat = usuariosChat;

  const selectUser = (receptor) => {
    socket.emit("mensajes_antiguos", userLogin, receptor);
    setReceptor(receptor);
    setChat(true);
  };

  const mensajesAlumno = mensajes.filter(
    (e) =>
      (e.remitente === userLogin && e.receptor === receptor) ||
      (e.remitente === receptor && e.receptor === userLogin)
  );

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (mensaje !== "") {
      const mensajeData = {
        room: canal, //el canal lo paso para valirdar a donde enviar el msg
        remitente: userLogin,
        receptor: receptor, //picar primero el a quien le queremos enviar el msg
        mensaje,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("mensaje_privado", mensajeData);
      setMensaje("");
    }
  };

  useEffect(() => {
    socket.on("mensajes_antiguos", (data) => {
      setMensajes([...mensajes, ...data]);
    });

    socket.emit("join_room", canal);
    console.log("me monte");
    socket.on("mensaje_privado", (res) => {
      console.log("mensajes de el profe", res);
      if (res.remitente == userLogin || res.receptor === userLogin) {
        setMensajes((data) => [...data, res]);
      }
    });
    return () => {
      socket.off("mensaje_privado", (res) => {
        console.log("mensajes de el profe", res);
        if (res.remitente == userLogin || res.receptor == userLogin) {
          setMensajes([...mensajes, res]);
        }
      });
    };
  }, [socket]);

  return (
    <div id="status-aside" className="divUsuariosChat">
      <div className="containerUserChats ">
        {usersChat.length &&
          usersChat.map((item, index) => {
            if (item === userLogin) return;
            let active = item === receptor;
            return (
              <MensajeAlumno
                nombre={item}
                selectUser={selectUser}
                active={active}
                key={index}
              />
            );
          })}
      </div>
      {chat && (
        <Chat
          setChat={setChat}
          chat={chat}
          socket={socket}
          setMensaje={setMensaje}
          enviarMensaje={enviarMensaje}
          mensaje={mensaje}
          userLogin={userLogin}
          mensajesAlumno={mensajesAlumno}
        />
      )}
    </div>
  );
};

const MensajeAlumno = ({ nombre, selectUser, active }) => {
  return (
    <div
      onClick={() => selectUser(nombre)}
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
  setChat,
  chat,
}) => {
  return (
    <div className="divContainer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-5">
            <div className="card">
              <button className="btnSalirChat" onClick={() => setChat(!chat)}>
                chat
              </button>
              <ScrollToBottom className="containerMensajes ">
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
                        className="inputChat inputChat"
                        id="text-input"
                        placeholder="Type your message..."
                        onChange={(e) => setMensaje(e.target.value)}
                        value={mensaje}
                      />
                      <div className="input-group-append">
                        <button
                          onClick={enviarMensaje}
                          type="submit"
                          className="btn btn-primary"
                          id="btnSubmit"
                          typeof="submit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-send-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
