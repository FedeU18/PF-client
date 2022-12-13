import axios from "axios"
import {GET_COMENT,
    POST_COMENT,
    POST_COMENT_ON_COMENT,
    POST_COMENT_PROFESOR,
    EDITAR_COMENT,
    DELETE_COMENT
} from '../types/typesComentarios' 
import { getProfesorById } from "./Profesor"
import { getNotificaciones } from "./Notificacion"

export function loadingComents () {
  return {
    type: "LOADING"
  }
}

export const createComentProfe=(id,payload)=>dispatch=>{    
    return axios.post("/comentarios/coment/profesor ", payload)
    .then((d)=>{ 
        dispatch({ type:POST_COMENT_PROFESOR, payload: d.data }) 
        dispatch(getProfesorById(id))
       })
     .catch ((e) =>{console.log(e)})       
    }  

  
  export const createComent=(id,payload)=>dispatch=>{    
    return axios.post("/comentarios ", payload)
    .then((d)=>{ 
        dispatch({ type:POST_COMENT, payload: d.data }) 
        dispatch(getProfesorById(id))
       })
     .catch ((e) =>{console.log(e)})       
    }  
    
    export const createComentsonComent=(id,payload)=>dispatch=>{    
      
      return axios.post("/comentarios/coment/", payload)
      .then((d)=>{ 
          dispatch({ type:POST_COMENT_ON_COMENT, payload: d.data }) 
          dispatch(getProfesorById(id))
         })
       .catch ((e) =>{console.log(e)})       
      } 
  
    export const deleteComent=(id , profeID)=>dispatch=>{
      dispatch(loadingComents())
      return axios.delete(`/comentarios/${id}`)
      .then((d)=> {
        dispatch({ type:DELETE_COMENT, payload:d.data })
        if(profeID){
          dispatch(getProfesorById(profeID))
        }else{
          dispatch(getNotificaciones())
        }
      }     
        )
      .catch((e)=> console.log(e))
  }
  
  export const EditComent=(id,newData,profeID)=>dispatch=>{
    
    return axios.patch(`/comentarios/${id}`,newData)
    .then((d)=> 
        {dispatch({ type:EDITAR_COMENT, payload:d.data })
        dispatch(getProfesorById(profeID))
      }
        )
    .catch((e)=> console.log(e))
  }