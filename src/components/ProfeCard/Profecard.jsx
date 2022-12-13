import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAlumno } from "../../redux/Actions/Alumno";
import userAuthentication from "../../Authentication/functions/user";

export const ProfeCard = ({
  id,
  nombre,
  descripcion,
  imagen,
  precio,
  materias,
  puntuacion,
  username,
  pais,
  active,
  socket,
}) => {
  const { userData } = userAuthentication();

  var regexUrl =
    /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
  const img =
    "https://as01.epimg.net/epik/imagenes/2020/01/17/portada/1579264345_014526_1579264425_noticia_normal_recorte1.jpg";
  const [fav, setFav] = useState(false);
  const [promedio, setPromedio] = useState(0);
  const [alerta, setAlerta] = useState([]);
  console.log("alertaaaa->", alerta);
  const dispatch = useDispatch();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);

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

  useEffect(() => {
    socket.emit("solicitarMSG_pendientes");

    console.log("use", id);
    if (infoAlumno.favourites?.find((l) => l === id)) {
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      console.log(infoAlumno.favourites, " comparo  ", id);
      setFav(true);
    }
  }, [infoAlumno]);

  useEffect(() => {
    socket.on("alerta_mensajes", (data) => {
      setAlerta([...data]);
    });
    console.log("d:", puntuacion);
    console.log("cards", infoAlumno);
    if (puntuacion?.length > 0) {
      setPromedio(0);
      console.log("la", promedio);
      puntuacion.map((p) => {
        setPromedio((prev) => prev + p.puntaje);
      });
    } else {
      setPromedio(0);
    }
  }, []);

  const handleFav = () => {
    console.log("aquiiinnn");
    if (
      infoAlumno.favourites &&
      infoAlumno.favourites !== null &&
      infoAlumno.favourites.includes(id)
    ) {
      dispatch(
        editAlumno(
          { favourites: infoAlumno.favourites.filter((l) => l !== id) },
          infoAlumno.id
        )
      );
      setFav(false);
    }
    if (infoAlumno.favourites === null) {
      dispatch(editAlumno({ favourites: [id] }, infoAlumno.id));
      setFav(true);
    }
    if (!infoAlumno.favourites.includes(id)) {
      console.log("lo");
      dispatch(
        editAlumno(
          { favourites: [...infoAlumno.favourites, id] },
          infoAlumno.id
        )
      );
      setFav(true);
    }
  };

  return (
    <Card style={{ width: "18rem", margin: "16px" }}>
      <Link to={"/profesores/" + id}>
        <img src={imagen} className="cardAboutContImg" />
      </Link>

      <Card.Body>
        <Card.Title>
          <div className="usuarioCont">
            <Link to={"/profesores/" + id}>
              <div className="AvatarNameProf">
                <div>
                  {username?.length > 0 && <>{username[0].toUpperCase()}</>}
                </div>
              </div>
            </Link>
            <Link to={"/profesores/" + id}>
              <div className="nameUsuarioC">{username}</div>
            </Link>
            <div>
              <img className="flagcarProfe" src={pais} />
            </div>
          </div>
        </Card.Title>

        <Card.Text>
          {descripcion}
          <br></br>
          Enseña:{" "}
          {materias?.length > 0 &&
            materias.map((m) => (
              <span key={m.name} className="materiasNaCaPro">
                {" "}
                {m.name}{" "}
              </span>
            ))}
        </Card.Text>
        {active && (
          <div className="iconVisible">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chat-right-text-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
            </svg>
            <h5>1</h5>
          </div>
        )}

        <div className="puncContCard">
          <AiFillStar size={22} />
          <div className="puntProfCard">
            {puntuacion?.length > 0 ? promedio / puntuacion?.length : 0}
          </div>
        </div>

        <hr></hr>
        <div className="precioFavCont">
          <button onClick={handleFav} className="btnFavProfeCards">
            {fav ? (
              <MdOutlineFavorite
                size={26}
                style={{ color: "rgb(253, 17, 49)", cursor: "pointer" }}
              />
            ) : (
              <MdOutlineFavoriteBorder
                size={26}
                style={{ cursor: "pointer" }}
              />
            )}
          </button>
          <div>{precio} US$ por hora</div>
        </div>
      </Card.Body>
    </Card>
  );
};
