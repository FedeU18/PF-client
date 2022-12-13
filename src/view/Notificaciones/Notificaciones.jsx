import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../../components/Nav/Nav"
import "./Notificaciones.css"
import { Notificacion } from "../../components/Notificacion/Notificacion";

export const TodasNotificaciones=()=>{
    const dispatch=useDispatch()
    const loadingNotis=useSelector((state)=>state.notificaciones.loadingNotis)
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
          {Object.entries(notificaciones).length === 0 && notificaciones.length===0?(<> cargando...</>):(
          
          <div className='notiCol'>
  
            
            { notificaciones.length > 0  ?(
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
            ):(<div className="NotNotis">
              <div>
               {notificaciones.msg}

              </div>
               </div>)}
          </div>
          )}
          
        </div>
      );
  }