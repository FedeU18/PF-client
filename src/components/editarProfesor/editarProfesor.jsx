import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfesorById, putProfesor } from "../../redux/Actions/Profesor";

const EditarProfesor= ()=>{
    
    const{id} = useParams()
    const [actualizar, setActualizar] = useState({})
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfesorById(id))
    },[])
    const info = useSelector((state)=> state.profesores.profesores)

    actualizarProfesor = (e)=>{
        e.preventDefault();
        if(e.target.value !== ""){
            setActualizar({
                ...actualizar,
                [e.target.name]: e.target.value
            });
        }else{
            setActualizar({
                [e.target.name]: info[e.target.name]
            })
        }
    }

    const updateProfesor = (e)=>{
        e.preventDefault()
        dispatch(putProfesor(info.id, actualizar))
    };

    return(
        <div>hola</div>
    )
}

export default EditarProfesor