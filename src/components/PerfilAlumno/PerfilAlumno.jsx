import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../Nav/Nav";
import { AlumnoPerfil } from "../alumnoPerfil";
import { EditarAlumno } from "../EditarAlumno";

function PerfilAlumno(props) {
  const id = props.id;
  console.log("desde perfil alumno ", id);
  const [open, setOpen] = useState(false);

  const openTrue = () => {
    setOpen(true);
  };
  const OpenFalse = () => {
    setOpen(false);
  };

  return (
    <div>
      <AlumnoPerfil open={openTrue} id={id} />
      <EditarAlumno open={open} close={OpenFalse} id={id} />
    </div>
  );
}

export default PerfilAlumno;
