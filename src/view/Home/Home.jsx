import { NavBar } from "../../components/Nav/Nav";
import { useAuth } from "../../Authentication/context/AuthContext";
import { Filtros } from "../../components/Filtros/Filtros";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import "./Home.css";
import { useEffect, useState } from "react";
import { getMaterias } from "../../redux/Actions/Materias";
import { getPaises } from "../../redux/Actions/Paises";
import { addOPSelected } from "../../redux/Actions/Materias";
import { useDispatch, useSelector } from "react-redux";
import { allProfes } from "../../redux/Actions/Profesor";
import { ProfeCards } from "../../ProfeCards/ProfeCards";
import { useNavigate, useParams } from "react-router-dom";
import { filterProfes } from "../../redux/Actions/Profesor";
import { getAllAlumnos } from "../../redux/Actions/Alumno";
import deleteCurrentUser from "../../Authentication/functions/deleteUser";
import userAuthenticate from "../../Authentication/functions/user"

export const Home = () => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const user = userAuthenticate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const idAlumno = 14; //este id para alumno es provisional, para probar la vista de el perfil de alumno se debe colocar el id de un alumno que este en 
  // la tabla alumnos, "esto para probar"

  console.log(auth.isAuth, auth.dbDataUser);
  console.log(user)


  const filtrosSeleccionados = useSelector(
    (state) => state.materias.filtrosSeleccionados
  );
  const profes = useSelector((state) => state.profesores.profesores); //todo el estado de profes
  console.log(profes);

  useEffect(() => {
    dispatch(getAllAlumnos())
    dispatch(allProfes(filtrosSeleccionados));
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProfes(filtrosSeleccionados));
  }, [filtrosSeleccionados]);

  console.log(filtrosSeleccionados);
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
      <h1>IMPORTANTE</h1>
      <h2>Ahora para requerir al usuario registrado tendran que llamar a la funcion "userAuthenticate" en el path "src/functions/user" este tiene un objeto con 
        const myUser = userAuthenticate()
        los datos si el user está activo y todo lo que necesita el desarrollador que quiera trabjar con la data del usuario registrado
        se trabaja con el local storage -- este  mensaje será eliminado luego
      </h2>
      <div>
        <NavBar idAlumno={idAlumno} />
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
          <footer>
            <a
              className="aFootAbout"
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
};
