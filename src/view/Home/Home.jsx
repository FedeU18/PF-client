import "./Home.css";
import { NavBar } from "../../components/Nav/Nav";
import { Filtros } from "../../components/Filtros/Filtros";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useEffect, useState } from "react";

import { getPaises } from "../../redux/Actions/Paises";
import { addOPSelected } from "../../redux/Actions/Materias";
import { useDispatch, useSelector } from "react-redux";
import { allProfes } from "../../redux/Actions/Profesor";
import { ProfeCards } from "../../components/ProfeCards/ProfeCards";
import { Link } from "react-router-dom";
import { filterProfes } from "../../redux/Actions/Profesor";
import { getAllAlumnos } from "../../redux/Actions/Alumno";
import { getMaterias } from "../../redux/Actions/Materias";

import userAuthenticate from "../../Authentication/functions/user";
import { auth } from "../../Authentication/firebase/credenciales";
import autentication from "../../Authentication/functions/user";
import logOut from "../../Authentication/functions/logOut";



import MateriasBtn from "./MateriasBtn.jsx";

import Loader from "../../components/Loader/Loader";
import FooterH from "./FooterH.jsx";


export const Home = () => {
  const [open, setOpen] = useState(false);
  // const user = userAuthenticate();
  const dispatch = useDispatch();

  const filtrosSeleccionados = useSelector(
    (state) => state.materias.filtrosSeleccionados
  );
  const profes = useSelector((state) => state.profesores.profesores); //todo el estado de profes
  const materias = useSelector((state) => state.materias.filtrosSeleccionados);

  useEffect(() => {
    dispatch(getAllAlumnos());
    dispatch(allProfes(filtrosSeleccionados));

    dispatch(getMaterias());
    dispatch(getPaises());
  }, []);

  useEffect(() => {
    dispatch(filterProfes(filtrosSeleccionados));
  }, [filtrosSeleccionados]);

  const handleFiltros = () => {
    setOpen(true);
  };
  const handleCloseFiltros = (set) => {
    setOpen(set);
  };

  const handleDeleteOpSelec = (e) => {
    dispatch(
      addOPSelected({
        ...filtrosSeleccionados,
        materias: filtrosSeleccionados.materias.filter(
          (f) => f !== e.target.name
        ),
      })
    );
  };

  const handleDelOp = (e) => {
    dispatch(
      addOPSelected({
        ...filtrosSeleccionados,
        [e.target.name]: "",
      })
    );
  };

  return (
    <div>
      <NavBar />

      {profes.length > 0 ? (
        <div>
          <button className="filtroBtn">
            <BsFillGrid3X3GapFill onClick={handleFiltros} />
          </button>
          {filtrosSeleccionados.materias?.length > 0 ? (
            filtrosSeleccionados.materias.map((f) => (
              <button
                className="btnListOpSelected"
                name={f}
                onClick={handleDeleteOpSelec}
              >
                X {f}
              </button>
            ))
          ) : (
            <button className="btnListOpSelected"> Todas las materias </button>
          )}

          {filtrosSeleccionados.pais && filtrosSeleccionados.pais !== "" ? (
            <button
              className="btnListOpSelected"
              name="pais"
              onClick={handleDelOp}
            >
              X {filtrosSeleccionados.pais}
            </button>
          ) : (
            <button className="btnListOpSelected"> Todos los paises </button>
          )}

          {filtrosSeleccionados.puntuacion &&
            filtrosSeleccionados.puntuacion !== "" && (
              <button
                className="btnListOpSelected"
                name="puntuacion"
                onClick={handleDelOp}
              >
                X {filtrosSeleccionados.puntuacion}
              </button>
            )}
          {filtrosSeleccionados.precio &&
            filtrosSeleccionados.precio !== "" && (
              <button
                className="btnListOpSelected"
                name="precio"
                onClick={handleDelOp}
              >
                X {filtrosSeleccionados.precio}{" "}
              </button>
            )}

          <Filtros open={open} close={handleCloseFiltros} />
          <br></br>

          <ProfeCards profes={profes} />


          <MateriasBtn/>
       
          
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "75vh" }}
        >
          <Loader></Loader>
          <h1>cargando...</h1>
        </div>
      )}

      <div
        className="d-flex flex-column align-items-center"
        style={{ margin: "0 auto" }}
      >
        <hr />
        {/*<footer>
          <Link to="/about" className="aFootAbout">
            About
          </Link>
        </footer>
      */}
      </div>
      <FooterH/>
   
    </div>
  );
};
