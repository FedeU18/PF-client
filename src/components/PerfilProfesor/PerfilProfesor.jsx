import React, {useState} from "react";
import { useParams } from "react-router-dom";
import ProfesorPerfil from "../profesorPerfil/profesorPerfil";
import EditarProfesor from "../editarProfesor/editarProfesor"
import { NavBar } from "../../components/Nav/Nav"

export const PerfilProfesor=()=>{
   const {id} = useParams()
    console.log("desde perfil profesor", id);
    const [open, setOpen] = useState(false);

    const openTrue= ()=>{
        setOpen(true);
    }

    const openFalse=()=>{
        setOpen(false)
    }

    return(
        <div>
            <NavBar/>
            <ProfesorPerfil id={id}/>
            <button onClick={openTrue}>Editar cuenta</button>
            <EditarProfesor open={open} close={openFalse} id={id}/>
        </div>
    )
}

export default PerfilProfesor;