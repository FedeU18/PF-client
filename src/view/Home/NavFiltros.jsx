import React from "react";
import { useSelector,useDispatch } from "react-redux";
import "./NavFiltros.css";
import { sortPriceBack } from "../../redux/Actions/Profesor";
import { filterProfeCountryBack } from "../../redux/Actions/Profesor";
import { sortUserBack } from "../../redux/Actions/Profesor";

//dispachar la accion de traer paises.

function NavFiltros() {
  const paises = useSelector((state) => state.paises.paises);
  const dispatch = useDispatch();


  function onSelectSortChange(e) {
    e.preventDefault();
   
   dispatch(sortPriceBack(e.target.value));
    
    

  }

  function onSelectFilter(e) {
    e.preventDefault();
   
   dispatch(filterProfeCountryBack(e.target.value));
    
    

  }

  function onSelectSortUser(e) {
    e.preventDefault();
   
   dispatch(sortUserBack(e.target.value));
    
    

  }



  return (
    <div>
      
      {/*-----------FILTROS--------------------*/}
      <div className="fab-contenedor-selectores">
        <div className="fab-caja-filtros">
          <select className="fab-select" onChange={onSelectSortChange}>
            <option>Precio</option> 
            <option value="asc">Menor</option>
            <option value="desc">Mayor</option>
          </select>
          <select className="fab-select" onChange={onSelectSortUser}>
            <option>Username</option>
            <option value="ZA">Menor</option>
            <option value="AZ">Mayor</option>
          </select>
          <select className="fab-select" onChange={onSelectFilter}>
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
