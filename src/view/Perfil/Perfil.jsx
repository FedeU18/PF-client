import { PerfilProfesor } from "../../components/PerfilProfesor/PerfilProfesor";
import PerfilAlumno from "../../components/PerfilAlumno/PerfilAlumno";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionsAlumno from "../../redux/Actions/Alumno";
import * as actionsProfesor from "../../redux/Actions/Profesor";

export const Perfil = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);
  let infoProfesor = useSelector((state) => state.profesores.detail);

  // let idAlumno = "hdgfuhfj";
  useEffect(() => {
    dispatch(actionsAlumno.getAlumnoFromAPI(id));
    dispatch(actionsProfesor.getProfesorById(id));
    return () => {
      dispatch({ type: "VACIAR_ESTADO", payload: {} });
    };
  }, []);

  // console.log("hola soy el tipo de usuario----> ", infoAlumno.tipo);
  // console.log("hola soy el tipo de usuario----> ", infoProfesor.tipo);

  return (
    <>
      {Object.entries(infoProfesor).length > 0 &&
      infoProfesor.tipo === "profesor" ? (
        <PerfilProfesor id={id} />
      ) : Object.entries(infoAlumno).length > 0 &&
        infoAlumno.tipo === "estudiante" ? (
        <PerfilAlumno id={id} />
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};
