import React from "react";
import "./Tarjetas.css";
//debe recibir por props imagen y nombre de la materia.
function MateriaBox(props) {
  return (
    <div className="caja" onClick={props.myOnClick}>
      <div className="icono">
        {/*Props imagen o icono*/}
        <img src={props.image} alt="" />
      </div>
      <div className="materiatext">
        <h2>
          {/*Props Nombre materia*/}
          {props.name}
        </h2>
      </div>
    </div>
  );
}
export default MateriaBox;
