import React from "react";
import { NavBar } from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import NavFiltros from "./NavFiltros.jsx";
import FooterH from "./FooterH.jsx";

function ProfesoresList() {
  const navigate = useNavigate();

  const handlerVolver = () => {
    navigate("/home");
  };

  return (
    <div>
      <NavBar />
      <div className="fab-contenedor-boton-home"> 
      <button className="fab-select" onClick={handlerVolver}>
        Home
      </button>
      </div>
      <NavFiltros />

      <h1>deberia renderizarse todos los profesores.</h1>
{/*imagen*/}
<div className="fab-contenedor-imagenes">
        <img className="fab-img-nav-filtros" src={"/frase1.png"} alt="" />
      </div>
      {/*imagen*/}
      <div className="fab-contenedor-imagenes">
        <img className="fab-img-nav-filtros" src={"/frase2.png"} alt="" />
      </div>
      {/*imagen*/}
      <div className="fab-contenedor-imagenes">
        <img className="fab-img-nav-filtros" src={"/frase3.png"} alt="" />
      </div>
      <FooterH />
    </div>
  );
}
export default ProfesoresList;
