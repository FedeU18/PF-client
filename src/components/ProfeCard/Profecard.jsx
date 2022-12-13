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
}) => {
  const theme = useSelector((state) => state.theme.theme);
  const { userData } = userAuthentication();
  console.log(active);
  var regexUrl =
    /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
  const img =
    "https://as01.epimg.net/epik/imagenes/2020/01/17/portada/1579264345_014526_1579264425_noticia_normal_recorte1.jpg";
  const [fav, setFav] = useState(false);
  const [promedio, setPromedio] = useState(0);

  const dispatch = useDispatch();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);

  useEffect(() => {
    console.log("use", id);
    if (infoAlumno.favourites?.find((l) => l === id)) {
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      console.log(infoAlumno.favourites, " comparo  ", id);
      setFav(true);
    }
  }, [infoAlumno]);

  useEffect(() => {
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
    <Card
      className={`rounded-4 position-relative ${styles.card_container} ${
        theme === "dark" ? styles.dark_card : null
      }`}
    >
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
                {username?.length > 10
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
            {descripcion?.length > 60
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
              {materias?.length > 2 ? "..." : null}
            </span>
          </div>
        </Card.Text>
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
            <h5>1</h5>
          </div>
        )}

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
            <span>
              <b>{precio} US$</b> por hora
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
