import React from "react";
import { NavBar } from "../../components/Nav/Nav";
import { useNavigate } from "react-router-dom";
import NavFiltros from "./NavFiltros.jsx";
import FooterH from "./FooterH.jsx";
import { usePagination } from "../../hooks/usePagination";
import { searchProfesor } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ProfeCards } from "../../components/ProfeCards/ProfeCards";
import { useParams } from "react-router-dom";
import { setProfeFiltered } from "../../redux/Actions/Profesor";
import Footer from ".././Landing/Footer.jsx";
import styles from "./ProfesoresList.module.css";

function ProfesoresList() {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  const handlerVolver = () => {
    navigate("/home");
  };

  const dispatch = useDispatch();

  let { id } = useParams();

  const profesFilt = useSelector((state) => state.profesores.profesFiltered);

  const { results, nextPage, prevPage, canNextPage, canPrevPage } =
    usePagination(3, searchProfesor, id);

  useEffect(() => {
    dispatch(setProfeFiltered(results));
  }, [results]);

  return (
    <div className={`${theme === "dark" ? styles.dark_search_profes : null}`}>
      <NavBar />
      <div className="fab-contenedor-boton-home">
        <button
          className={`fab-select ${theme === "dark" ? "" : null}`}
          onClick={handlerVolver}
        >
          Home
        </button>
      </div>
      <NavFiltros />
      <div className={`d-flex justify-content-center`}>
        <button
          className={`fab-select ${
            theme === "dark" ? styles.dark_button : styles.light_buttons
          }`}
          onClick={prevPage}
          disabled={!canPrevPage()}
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={!canNextPage()}
          className={`fab-select ${
            theme === "dark" ? styles.dark_button : styles.light_buttons
          }`}
        >
          Next
        </button>
      </div>
      <ProfeCards profes={profesFilt} />
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
      <Footer />
    </div>
  );
}
export default ProfesoresList;
