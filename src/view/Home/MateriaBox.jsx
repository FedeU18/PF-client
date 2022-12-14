import React from "react";
import styles from "./Tarjetas.module.css";
//debe recibir por props imagen y nombre de la materia.
function MateriaBox(props) {
  return (
    <div className={styles.container} onClick={props.myOnClick}>
      <img src={props.image} alt="" className={styles.imgMateriBTn} />
      <br />
      <span>{props.name}</span>
    </div>
  );
}
export default MateriaBox;
