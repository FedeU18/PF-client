import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteProfesor, getProfesorById } from "../../redux/Actions/Profesor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfesorPerfil = ()=>{

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getProfesorById(id))
    },[])

    let info = useSelector((state)=> state.profesores.profesores)
    console.log(info)
    const deleteAlumno = ()=>{
        alert("Esta seguro de eliminar su cuenta de profesor?")
        dispatch(deleteProfesor(id))
        navigate("/")
    } 

    return(
        <div>
            {info.name?(
                <div>
                    <p>{info.id}</p>
                    <div>
                        <img src={info.image} alt={info.name} />
                    </div>
                    <br/>
                    <br/>
                    <div>
                        <h2>Informacion del Profesor</h2>
                    </div>

                </div>
            ):(<h1>cargando...</h1>)}
        </div>
    )
}

export default ProfesorPerfil