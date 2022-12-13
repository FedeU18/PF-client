import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAlumno } from "../../redux/Actions/Alumno";

import userAuthentication from "../../Authentication/functions/user";

import styles from "./ProfeCard.module.css";

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

    <Card className={`rounded-4 position-relative ${styles.card_container}`}>
      <Link to={"/profesores/" + id}>
        <img
          src={imagen}
          className={`cardAboutContImg ${styles.border_cards}`}
        />

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

              <h5 className="nameUsuarioC">
                {username.length > 10
                  ? `${username.slice(0, 10)}...`
                  : username}
              </h5>

            </Link>
            <div>
              <img className="flagcarProfe" src={pais} />
            </div>
          </div>
        </Card.Title>

        <Card.Text>
          <span>
            {descripcion.length > 60
              ? `${descripcion.slice(0, 50)}...`
              : descripcion}
          </span>
          <br></br>

          <span className="fw-bolder">Enseña:</span>
          <div>
            {materias?.length > 0 &&
              materias.map((m, index) => {
                return index < 2 ? (
                  <>
                    <span
                      key={m.name}
                      className={`materiasNaCaPro ${styles.materias_profe} d-inline-block mt-1`}
                    >
                      {m.name}
                    </span>
                  </>
                ) : null;
              })}
            <br />
            <span className="fw-bolder">
              {materias.length > 2 ? "..." : null}
            </span>
          </div>
        </Card.Text>
        <div
          className={`puncContCard position-absolute ${styles.estrella_puntuacion}`}
        >
          <div>
            <AiFillStar className="fs-2 text-warning" />
          </div>
          <div className={`d-inline-block ${styles.puntuacion}`}>
            <h5 className="puntProfCard text-warning">
              {puntuacion?.length > 0 ? promedio / puntuacion?.length : 0}
            </h5>
          </div>
        </div>
        <hr className={`position-absolute ${styles.hr_card}`} />
        <div
          className={`precioFavCont position-absolute ${styles.precio_heart} d-flex justify-content-around w-100`}
        >
          <div>
            <button onClick={handleFav} className="btnFavProfeCards">
              {fav ? (
                <MdOutlineFavorite
                  size={26}
                  style={{ color: "rgb(253, 17, 49)", cursor: "pointer" }}
                />
              ) : (
                <MdOutlineFavoriteBorder
                  className="text-danger"
                  size={26}
                  style={{ cursor: "pointer" }}
                />
              )}
            </button>
          </div>
          <div className={styles.precio_por_hora}>
            <span className="text-success"><b>{precio} US$</b> por hora</span>
          </div>

        </div>
      </Card.Body>
    </Card>
  );
};
