import { PerfilProfesor } from "../../components/PerfilProfesor/PerfilProfesor";
import PerfilAlumno from "../../components/PerfilAlumno/PerfilAlumno";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionsAlumno from "../../redux/Actions/Alumno";

export const Perfil = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);
  let infoProfesor = "";

  useEffect(() => {
    dispatch(actionsAlumno.getAlumnoFromAPI(id));
  }, []);

  console.log("hola soy el tipo de usuario----> ", infoAlumno.tipo);

  return (
    <>
      {infoProfesor.tipo === "profesor" ? (
        <PerfilProfesor id={id} />
      ) : infoAlumno.tipo === "estudiante" ? (
        <PerfilAlumno id={id} />
      ) : (
        <h1>Cargando...</h1>
      )}
    </>
  );
};
