import React, { useState } from "react";
import { AlumnoPerfil } from "../alumnoPerfil";


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
      
    </div>
  );
}

export default PerfilAlumno;
