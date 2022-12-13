import React from "react";
import { NavBar } from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import NavFiltros from "./NavFiltros.jsx";
import FooterH from "./FooterH.jsx";
import {usePagination} from '../../hooks/usePagination';
import { searchProfesor } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ProfeCards } from "../../components/ProfeCards/ProfeCards";
import { useParams } from 'react-router-dom';
import { setProfeFiltered } from "../../redux/Actions/Profesor";
import Footer from ".././Landing/Footer.jsx"



function ProfesoresList() {
  const navigate = useNavigate();

  const handlerVolver = () => {
    navigate("/home");
  };

  const dispatch = useDispatch();

  let { id } = useParams();


  const profesFilt = useSelector((state) => state.profesores.profesFiltered);

  const {results, nextPage, prevPage, canNextPage, canPrevPage} = usePagination(3,searchProfesor,id);




  useEffect(()=>{

    dispatch(setProfeFiltered(results));
    
   },[results])

   


  
    
    
  

  return (
    <div>
      <NavBar />
      <div className="fab-contenedor-boton-home"> 
      <button className="fab-select" onClick={handlerVolver}>
        Home
      </button>
      </div>
      <NavFiltros />

      <ProfeCards profes={profesFilt} />
      <div>
        <button onClick={prevPage} disabled={!canPrevPage()}>Prev</button>
        <button onClick={nextPage} disabled={!canNextPage()}>Next</button>
    </div>
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
      {/*<FooterH />*/}
      <Footer/>
    </div>
  );
}
export default ProfesoresList;
