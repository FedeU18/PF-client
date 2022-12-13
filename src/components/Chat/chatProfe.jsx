import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import "animate.css";

import "./profesor.css";

export const ChatProfe = ({
  socket,
  userLogin,
  canal,
  usuariosChat,
  setChatUsers,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [receptor, setReceptor] = useState([]);
  const [chat, setChat] = useState(false);
  const [alerta, setAlerta] = useState([]);
  console.log("soy alertMensajes", alerta);

  let usersChat = usuariosChat;

  let mensajesUsuarios = [];
  if (alerta.length) {
    alerta.forEach((e) => {
      if (e.receptor === userLogin && !mensajesUsuarios.includes(e.remitente)) {
        mensajesUsuarios.push(e.remitente);
      }
    });
  }
  console.log("soy mensaje usuarios ", mensajesUsuarios);

  const selectUser = (receptor) => {
    socket.emit("mensajes_antiguos", userLogin, receptor);
    socket.emit("chat_abierto", receptor);
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
      await socket.emit("alerta_mensajes", mensajeData);
      await socket.emit("chat_abierto", receptor);
      await socket.emit("mensaje_privado", mensajeData);

      setMensaje("");
    }
  };

  useEffect(() => {
    setChatUsers(true);
    socket.emit("solicitarMSG_pendientes");
    socket.on("mensajes_antiguos", (data) => {
      setMensajes([...mensajes, ...data]);
    });
    socket.on("alerta_mensajes", (data) => {
      setAlerta([...data]);
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
    <div className="divUsuariosChat">
      <div
        className="containerUserChats"
        data-aos="fade-left"
        data-aos-duration="500"
      >
        {usersChat.length ? (
          usersChat.map((item, index) => {
            if (item === userLogin) return;
            let chatPending = mensajesUsuarios.includes(item);
            let active = item === receptor;
            return (
              <MensajeAlumno
                chat={chat}
                chatPending={chatPending}
                nombre={item}
                selectUser={selectUser}
                active={active}
                key={index}
              />
            );
          })
        ) : (
          <div>
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="sr-only"></span>
            </div>
            <div class="spinner-grow spinner-grow-sm" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        )}
      </div>
      {chat && (
        <Chat
          chat={chat}
          setChat={setChat}
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

const MensajeAlumno = ({ nombre, selectUser, active, chatPending }) => {
  return (
    <div
      onClick={() => selectUser(nombre)}
      className={active ? "list-user-item item-active" : "list-user-item"}
    >
      <div>
        <div className={chatPending ? "userChatpendin" : "user-name"}>
          {nombre}
        </div>
        <i className="fas fa-circle text-green"></i>
        <span className={chatPending ? "user-status-active" : "user-status"}>
          {" "}
          Alumno
        </span>
      </div>
      {active && (
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
        </div>
      )}
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
    <div className="divContainer" data-aos="fade-up" data-aos-duration="200">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mt-5">
            <div className="card">
              <button className="btnSalirChat" onClick={() => setChat(!chat)}>
                chat
              </button>
              <ScrollToBottom className="containerMensajes">
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
                        className="inputChat "
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
