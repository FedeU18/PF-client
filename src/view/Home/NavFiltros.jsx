import React from "react";
import { useSelector } from "react-redux";
import "./NavFiltros.css";

//dispachar la accion de traer paises.

function NavFiltros() {
  const paises = useSelector((state) => state.paises.paises);

  return (
    <div>
      
      {/*-----------FILTROS--------------------*/}
      <div className="fab-contenedor-selectores">
        <div className="fab-caja-filtros">
          <select className="fab-select">
            <option>Precio</option>
            <option value="asc">Costoso</option>
            <option value="des">Barato</option>
          </select>
          <select className="fab-select">
            <option>Puntuacion</option>
            <option value="asc">Mayor</option>
            <option value="des">Menor</option>
          </select>
          <select className="fab-select">
            <option>Paises</option>
            {paises.length > 0 &&
              paises.map((el) => <option key={el.name}>{el.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

export default NavFiltros;
