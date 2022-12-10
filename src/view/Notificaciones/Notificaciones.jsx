import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/Nav/Nav"
import "./Notificaciones.css"
import { Notificacion } from "../../components/Notificacion/Notificacion";

export const TodasNotificaciones=()=>{
    const dispatch=useDispatch()
    let notificaciones=useSelector((state)=>state.notificaciones.notificaciones);
    let infoProfesor = useSelector((state) => state.profesores.detail);
    const navigate= useNavigate()
   useEffect(()=>{
    if( Object.entries(infoProfesor).length === 0 || !infoProfesor.administrador ){
      navigate("/home");
    }
   },[])
      return (
        <div className='notificacionesPag'>
          <NavBar/>
          <div className='notiCol'>
  
            
            { Object.entries(notificaciones).length > 0  ?(
                          <div className='todaNotificacionesCont'>
                          {notificaciones.map((o ,i)=>(

                            <Notificacion visto2 ={o.visto2}
                                          notiId={o.id}
                                          denuncianteinfo={o.denuncianteinfo} 
                                          razon={o.razon}
                                          comentInfo={o.comentInfo} 
                                          denunciadoinfo={o.denunciadoinfo}/>
                          ))}
                        </div>
            ):(<> cargando...</>)}
          </div>
          
        </div>
      );
  }