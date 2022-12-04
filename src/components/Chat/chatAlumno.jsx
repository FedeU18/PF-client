import React, { useEffect, useState } from "react";
import "./componenteChat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import { Profesor } from "./chatProfesor";
export const Chats = ({
  perfilIngresado,
  canal,
  socket,
  userLogin,
  setUserLogin,
}) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (mensaje !== "") {
      const mensajeData = {
        room: canal, //el canal lo paso para valirdar a donde enviar el msg
        remitente: userLogin,
        recibido: "fabian", //picar primero el a quien le queremos enviar el msg
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

  useEffect(() => {
    socket.on("mensaje_privado", (res) => {
      if (
        res.remitente == userLogin || //validamos en que ocaciones mostrar los mensajes
        res.recibido === userLogin
      ) {
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
  const salir = (e) => {
    socket.emit("desconectar", userLogin);
    setUserLogin("");
  };

  return (
    <div>
      {perfilIngresado.tipo === "alumno" ? (
        <div className="container">
          <div className="row">
            <div className="col-md-7 mt-5">
              <div className="card">
                <div className="container_titulo">
                  <h4>Chatea con el profe</h4>
                  <button onClick={salir}>
                    <a href="/chat">SALIR</a>
                  </button>
                </div>

                <ScrollToBottom className="cardBody " id="chat">
                  {mensajes.map((e) => {
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
                      <button
                        type="submit"
                        className="btn btn-success"
                        id="btnSubmit"
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
      ) : (
        <Profesor
          setUserLogin={setUserLogin}
          socket={socket}
          userLogin={userLogin}
          canal={canal}
        />
      )}
    </div>
  );
};
