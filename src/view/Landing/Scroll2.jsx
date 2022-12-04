import React from "react";
import "./Scroll.css";
import image from "./img-fab/imagen5.jpg";

import SimpleSlider from "./SimpleSlider.jsx";
function Scroll2() {
  return (
    <div id="about2">
      <div className="about-text" data-aos="zoom-in-right">
        <h2>Accede a tus clases</h2>
        <p>Aprende a la hora que quieras desde donde tú elijas.</p>
        <p>
          Conéctate con diferentes docentes, comparte tus proyectos y crea conexiones profesionales.
        </p>
        <p>Comparte tus aprendizajes y resuelve tus dudas en Find Your Teacher.</p>
      </div>
      <div className="about-image" data-aos="zoom-in-left">
        {/*<img src={image} alt="" />*/}
        <SimpleSlider/>
      </div>
    </div>
  );
}
export default Scroll2;
