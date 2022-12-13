import React from "react";
import styles from "./Tarjetas.module.css";
//debe recibir por props imagen y nombre de la materia.
function MateriaBox(props) {
  return (
    <div className={styles.materias_container}>
      <div className={styles.container} onClick={props.myOnClick}>
        <div className={styles.logo_materia}>
          {/*Props imagen o icono*/}
          <img src={props.image} alt="" />
        </div>
        <div className={styles.text_materia}>
          <h2>
            {/*Props Nombre materia*/}
            {props.name}
          </h2>
        </div>
      </div>
    </div>
  );
}
export default MateriaBox;
