import { PerfilProfesor } from "../../components/PerfilProfesor/PerfilProfesor";
import PerfilAlumno from "../../components/PerfilAlumno/PerfilAlumno";
import { useParams } from "react-router-dom";

export const Perfil = () => {
  const { id } = useParams();
  console.log(id);
  const tipoUsuario = "otro";
  return (
    <>
      {tipoUsuario === "profesor" ? (
        <PerfilProfesor />
      ) : (
        <PerfilAlumno id={id} />
      )}
    </>
  );
};
