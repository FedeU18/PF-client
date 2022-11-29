import "./Home.css";
import { NavBar } from "../../components/Nav/Nav";
import { Filtros } from "../../components/Filtros/Filtros";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getMaterias } from "../../redux/Actions/Materias";
import { getPaises } from "../../redux/Actions/Paises";
import { addOPSelected } from "../../redux/Actions/Materias";
import { useDispatch, useSelector } from "react-redux";
import { allProfes } from "../../redux/Actions/Profesor";
import { ProfeCards } from "../../ProfeCards/ProfeCards";
import { Link, useNavigate, useParams } from "react-router-dom";
import { filterProfes } from "../../redux/Actions/Profesor";
import { getAllAlumnos } from "../../redux/Actions/Alumno";
import userAuthenticate from "../../Authentication/functions/user";
import { auth } from "../../Authentication/firebase/credenciales";
import autentication from "../../Authentication/functions/user";
import logOut from "../../Authentication/functions/logOut";

export const Home = () => {
  const [open, setOpen] = useState(false);
  // const user = userAuthenticate();
  const dispatch = useDispatch();

  const filtrosSeleccionados = useSelector(
    (state) => state.materias.filtrosSeleccionados
  );
  const profes = useSelector((state) => state.profesores.profesores); //todo el estado de profes

  useEffect(() => {
    dispatch(getAllAlumnos());
    dispatch(allProfes(filtrosSeleccionados));
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProfes(filtrosSeleccionados));
  }, [filtrosSeleccionados]);

  const handleFiltros = () => {
    setOpen(true);
  };
  const handleCloseFiltros = (set) => {
    setOpen(set);
  };

  useEffect(() => {
    dispatch(getMaterias());
    dispatch(getPaises());
  }, []);

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
      {filtrosSeleccionados && profes ? (
        <div>
          <NavBar />
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
          {filtrosSeleccionados.precio && filtrosSeleccionados.precio !== "" && (
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

          <div className="foot">
            <hr />
            <footer>
              <Link to="/about" className="aFootAbout">
                About
              </Link>
            </footer>
          </div>
        </div>
      ) : (
        <div>
          <h1>Error 404</h1>
          <Link to="/">
            <a onClick={() => logOut()}>inicio</a>
          </Link>
        </div>
      )}
    </div>
  );
};
