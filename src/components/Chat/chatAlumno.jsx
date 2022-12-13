import React, { useEffect, useState } from "react";
import "./componenteChat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import img from "../Chat/concluido.png";

export const ChatAlumno = ({ canal, socket, userLogin, receptor }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const mensajesProfe = mensajes.filter(
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
        receptor: receptor,
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
    socket.emit("solicitarMSG_pendientes");
    socket.emit("join_room", canal);
    socket.on("mensajes_antiguos", (data) => {
      setMensajes([...mensajes, ...data]);
    });
    socket.on("mensaje_privado", (res) => {
      console.log("recibo mensajes desde alumno", res);
      if (
        res.remitente == userLogin || //validamos en que ocaciones mostrar los mensajes
        res.receptor === userLogin
      ) {
        setMensajes((data) => [...data, res]);
      }
    });
    return () => {
      socket.off("mensaje_privado", (res) => {
        console.log("mensajes", res);
        if (res.remitente == userLogin || res.receptor == userLogin) {
          setMensajes([...mensajes, res]);
        }
      });
    };
  }, [socket]);

  return (
    <div>
      <div className="containerChat">
        <div className="titulo">
          <h4 className="tituloChat">Chatea con el profe</h4>
        </div>
        <div className="containerImg">
          <img src={img} alt="img" />
        </div>
        <ScrollToBottom className="cardBody " id="chat">
          {mensajesProfe.map((e) => {
            return (
              <div
                className="message"
                id={userLogin !== e.remitente ? "you" : "other"}
              >
                <div className="contenedor_mensaje">
                  <p>{e.mensaje.toLowerCase()}</p>
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
        <form
          onSubmit={enviarMensaje}
          id="message-form"
          className="card-footer"
        >
          <div className="input-group">
            <input
              value={mensaje}
              placeholder="preguntale al profe..."
              type="text"
              onChange={(e) => setMensaje(e.target.value)}
              className="form-control"
              id="message"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-success" id="btnSubmit">
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
  );
};
