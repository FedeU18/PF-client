import React from "react"
import "./Scroll.css"

import image from "./img-fab/imagen8.gif"
function Scroll1() {
    return (
        <div id="about">
        <div className="about-image" data-aos="zoom-in-right">
            <img src={image} alt=""/>
            </div>
        <div className="about-text" data-aos="zoom-in-left">
            <h2>Estudia online con profesionales en la mejor App.</h2>
            <p>80% de los usuarios de Find mejoran sus calificaciones.</p>
            <p>Clases prácticas, concretas y especializadas en las áreas de tu interes.</p>
            <p>Cursos especializados impartidos por líderes en la pedadogia mundial.</p>
            <p>La mejor experiencia de aprendizaje sin importar la velocidad de tu conexión.</p>
            <p>Una ruta de aprendizaje ideal para ti; te ayudamos a definirla según tus objetivos.</p>
        </div>
        </div>
    )
}
export default Scroll1;