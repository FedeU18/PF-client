import React,{useEffect} from "react"
import image from "./img-fab/buscador.jpg";
import image2 from "./img-fab/imagen9.gif";
import image3 from "./img-fab/calendario.png";
import image4 from "./img-fab/calificacion.png";
import image5 from "./img-fab/compartir.png";
import Caja from "./Caja.jsx"
import CajaInv from "./CajaInv.jsx"

import AOS from "aos"
import "aos/dist/aos.css"
import "./Tarjetas.css"

function Tarjetas() {
    useEffect(()=>{
        AOS.init({duration:1000})
        },[])
    return (
        <div id="features">
       <div className="contenedor-atrjetas" >
                <div data-aos="fade-down">
                <Caja image={image}  title="1." resumen="Busca con toda libertad entre varios perfiles y contacta al profesor que más se acerque a tus necesidades."/>
                </div>
                <div data-aos="fade-up">
                <CajaInv image={image2}  title="2." resumen="De manera rápida, nuestros profesores te responderán en unas cuantas horas. Y si no encuentras al profesor indicado."/>
                </div>
                <div data-aos="fade-down">
                <Caja image={image3}  title="3." resumen="Escoje el horario que mas se te facilite a ti y al docente."/>
                </div>
                <div data-aos="fade-up">
                <CajaInv image={image4}  title="4." resumen="Preparate para ser el mejor y recibir las mejores calificaciones."/>
                </div>
                <div data-aos="fade-down">
                <Caja image={image5}  title="5." resumen="Comparte la App donde obtuviste tus nuevos aprendizajes, a tus amigos y familiares."/>
                </div>
            </div>
            
        </div>
    )
}
export default Tarjetas;