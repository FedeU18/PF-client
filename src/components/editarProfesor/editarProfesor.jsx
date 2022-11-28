import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfesorById, putProfesor } from "../../redux/Actions/Profesor";

const EditarProfesor= (props)=>{
    
    
    const {id} = useParams()

    const [actualizar, setActualizar] = useState({})
     
    console.log("soy actualizar",actualizar)
    
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfesorById(id))
    },[dispatch])

    const info = useSelector((state)=> state.profesores.detail)

 const actualizarProfesor = (e)=>{
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
        <div className={props.open ? "abicuaso" : "closecuaso"}>
      
      
      { info.nombre ? (
        <div className="conatinerFormEditAlumno">
          <form
           
            className="formEditProfesor"
            action=""
            autoComplete="off"
          >
            <div className="container_inputs">
              <button
                className="btnVolver"
                onClick={() => {
                  props.close(false);
                }}
              >
                X
              </button>
              <h1 className="tituloFormulario">
                Editar usuario {info.nombre} {info.apellido}
              </h1>
              <div className="input-container">
                <input
                  className="input"
                  type="string"
                  placeholder={info.imagen}
                  name="imagen"
                  onChange={(e) => actualizarProfesor(e)}
                  onBlur={(e) => actualizarProfesor(e)}
                />
                <label htmlFor="name" className="nombre">
                  Foto
                </label>
              </div>
              <div className="input-container">
                <input
                  className="input"
                  type="string"
                  placeholder={info.nombre}
                  name="nombre"
                  onChange={(e) => actualizarProfesor(e)}
                  onBlur={(e) => actualizarProfesor(e)}
                />
                <label htmlFor="name" className="nombre">
                  Nombre
                </label>
              </div>

              <div className="input-container">
                <input
                  className="input"
                  type="text"
                  placeholder={info.apellido}
                  name="apellido"
                  onChange={(e) => actualizarProfesor(e)}
                  onBlur={(e) => actualizarProfesor(e)}
                />
                <label className="nombre" htmlFor="dishtypes">
                  Apellido
                </label>
              </div>

              <div className="input-container">
                <input
                  className="input"
                  type="number"
                  name="edad"
                  placeholder={info.precio}
                  onBlur={(e) => actualizarProfesor(e)}
                  onChange={(e) => actualizarProfesor(e)}
                />
                <label className="nombre" htmlFor="health_score">
                  Edad
                </label>
              </div>
              <div className="input-container">
                <input
                  className="input"
                  type="text"
                  name="email"
                  placeholder={info.email}
                  onChange={(e) => actualizarProfesor(e)}
                  onBlur={(e) => actualizarProfesor(e)}
                />
                <label className="nombre" htmlFor="health_score">
                  Correo
                </label>
              </div>
              <div className="input-container">
                <input
                  className="input"
                  type="text"
                  name="pais"
                  placeholder={info.country.name}
                  onChange={(e) => actualizarProfesor(e)}
                  onBlur={(e) => actualizarProfesor(e)}
                />
                <label className="nombre" htmlFor="health_score">
                  Pais
                </label>
              </div>

            
            </div>
            <div className="divBtn">
              <button type="submit" className="button" onClick={(e)=> updateProfesor(e)}>
                Actualizar
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
    )
}

export default EditarProfesor