import axios from "axios"
import {
    GET_NOTIFICACION,
    GET_NOTIFICACIONES,
    POST_NOTIFICACION,
    EDITAR_NOTIFICACIONES,
    EDITAR_NOTIFICACION,
    DELETE_NOTIFICACION
} from '../types/typesNotificacion' 

export function loadingNoti () {
  return {
    type: "LOADING_NOTIS"
  }
}

export const createNotificacion=(payload)=>dispatch=>{    
    return axios.post("/notificaciones", payload)
    .then((d)=>{ 
        dispatch({ type:POST_NOTIFICACION, payload: d.data }) 
       dispatch(getNotificaciones())
       })
     .catch ((e) =>{console.log(e)})       
    }  
export const getNotificaciones=()=>dispatch=>{
    
        return axios.get("/notificaciones")
        .then((d)=>{ 
            dispatch({ type:GET_NOTIFICACIONES, payload: d.data }) 
           
           })
         .catch ((e) =>{console.log(e)})       
        } 
export const EditarNotificaciones=()=>dispatch=>{    
        return axios.patch("/notificaciones")
        .then((d)=>{ 
            dispatch({ type:EDITAR_NOTIFICACIONES, payload: d.data }) 
            dispatch(getNotificaciones())
           })
         .catch ((e) =>{console.log(e)})       
        }  
export const getNotificacion=(id )=>dispatch=>{
      return axios.get(`/notificaciones/${id}`)
      .then((d)=> {
        dispatch({ type:GET_NOTIFICACION, payload:d.data })
        
      }     
        )
      .catch((e)=> console.log(e))
  }
  
export const deleteNotificacion=(id)=>dispatch=>{
 
      return axios.delete(`/notificaciones/${id}`)
      .then((d)=> {
        dispatch({ type:DELETE_NOTIFICACION, payload:d.data })
        dispatch(getNotificaciones())
        
      }     
        )
      .catch((e)=> console.log(e))
  }
  
  export const EditNotificacion=(id)=>dispatch=>{
    
    return axios.patch(`/notificaciones/${id}`)
    .then((d)=> 
        {dispatch({ type:EDITAR_NOTIFICACION, payload:d.data })
        dispatch(getNotificaciones())
      }
        )
    .catch((e)=> console.log(e))
  }