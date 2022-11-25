import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Detalle.css";
import img from "../../view/PerfilProfesor/img/1.jpg"
import { getProfesorById } from "../../redux/Actions/Profesor";

export const Detalle = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let details = useSelector((state) => state.profesores.detail);
  
  console.log(details);
  
  useEffect(() => {
    dispatch(getProfesorById(id));
  }, []);
  return (
    <>
      <div className="firstContainer" key={details.id}>
       
      <div className="overflow">
              <img
            className="profImg"
            src={details.imagen ? details.imagen : img}
            alt=""
            width="200px"
            height="200px"
             />
           </div> 
       
        <div className="detailContainer">
         

          <div className="nameeDetail">
            <h1>{details.nombre}</h1>
           
            <div className="detailemail">
              <strong>Email: </strong> {details.email}{" "}
            </div>
            <p>
              <strong>materias:</strong>
              {details.materias?.map((e) => e.name).join(", ")}
            </p>
            <div>
              <strong>Sobre mi: </strong>
              {
                <p
                  dangerouslySetInnerHTML={{ __html: details.descripcion }}
                ></p>
              }
            </div>
            <div className="ratingDetail">
              {" "}
              <strong> puntaje:</strong>{" "}
              <p className="ratingDetails">{details.puntuacion}</p>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
