import { PerfilProfesor } from "../../components/PerfilProfesor/PerfilProfesor";
import PerfilAlumno from "../../components/PerfilAlumno/PerfilAlumno";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/Actions/Alumno";

export const Perfil = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let info = useSelector((state) => state.alumnos.alumno);

  useEffect(() => {
    dispatch(actions.getAlumnoFromAPI(id));
  }, []);

  console.log("hola soy el tipo de usuario----> ", info.tipo);

  return (
    <>
      {info.tipo === "profesor" ? (
        <PerfilProfesor id={id} />
      ) : info.tipo === "estudiante" ? (
        <PerfilAlumno id={id} />
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};
