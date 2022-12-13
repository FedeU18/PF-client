import { PerfilProfesor } from "../../components/PerfilProfesor/PerfilProfesor";
import { PerfilAdmi } from "../../components/PerfilAdministardor/PerfilAdministrador";
import PerfilAlumno from "../../components/PerfilAlumno/PerfilAlumno";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionsAlumno from "../../redux/Actions/Alumno";
import * as actionsProfesor from "../../redux/Actions/Profesor";
import userAuthentication from "../../Authentication/functions/user";
import { clearAlumno } from "../../redux/Actions/Alumno";
import { clear } from "../../redux/Actions/Profesor";
import LoaderPerfilStudent from "../../components/alumnoPerfil/LoaderPerfilStudent";
import LoaderProfePerfil from "../../components/PerfilProfesor/LoaderProfePerfil";

export const Perfil = () => {
  const { userData } = userAuthentication();
  let id = userData.id;
  const dispatch = useDispatch();
  let infoAlumno = useSelector((state) => state.alumnos.alumno);
  let infoProfesor = useSelector((state) => state.profesores.detail);

  // let idAlumno = "hdgfuhfj";
  useEffect(() => {
    dispatch(actionsAlumno.getAlumnoFromAPI(id));
    dispatch(actionsProfesor.getProfesorById(id));
    return () => {
      dispatch(clear());
      dispatch(clearAlumno());
    };
  }, []);

  if(Object.entries(infoProfesor).length > 0 &&
  infoProfesor.administrador===true ){
    return <PerfilAdmi id={id}/>
  }else{
    
    if (
      infoProfesor &&
      Object.entries(infoProfesor).length > 0 &&
      infoProfesor.tipo === "profesor"
      ) {
        return <PerfilProfesor id={id} />;
      } else if (
        infoAlumno &&
        Object.entries(infoAlumno).length > 0 &&
        infoAlumno.tipo === "estudiante"
        ) {
          return <PerfilAlumno id={id} />;
        } else if (userData.rol === "student") {
          return <LoaderPerfilStudent />;
        } else if (userData.rol === "teacher") {
          return <LoaderProfePerfil />;
        }
      }
};
