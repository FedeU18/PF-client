import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editAlumno } from "../../redux/Actions/Alumno";
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
}) => {
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
    <Card className={`rounded-5 ${styles.card_container}`}>
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
          <span className="fw-bolder">Enseña:</span>
          {materias?.length > 0 &&
            materias.map((m) => (
              <span key={m.name} className="materiasNaCaPro">
                {" "}
                {m.name}{" "}
              </span>
            ))}
        </Card.Text>
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
