import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import "./Detalle.css";
// import img from "../../components/profesores/img/profecard.jpg"
import { getProfesorById } from '../../redux/Actions/Profesor';




export const Detalle = () => {
 
 let {id} = useParams();
 let dispatch = useDispatch();
 let details = useSelector(state=>state.profesores.detail); 
   console.log(details) 
 useEffect(()=>{
  dispatch(getProfesorById(id))
 },[])
  return (
      <>
    
    <div className='firstContainer' key={details.id}>
           
           <div className='detailContainer'>
             
             <img className="profImg"src= {details.image? details.image : img} alt="" width="380px"  height="300px"/>
  
              <div className="gameDetail">
             
                <h1>{details.nombre}</h1>
              
  
              
              
              <div className='detailPlatform' ><strong>Email: </strong> {details.email } </div>
              <p ><strong>materias:</strong>{details.materias?.map(e => e.name).join(", ")}</p>
              <div><strong>Sobre mi: </strong>{<p dangerouslySetInnerHTML={{__html: details.descripcion}}></p>}</div>
              <div  className="ratingDetail"> <strong> puntaje:</strong> <p className='ratingDetails'>{details.puntuacion}</p> </div>
              </div>
  
          </div>
  
        </div>
  
        
     </> 
  )
}
