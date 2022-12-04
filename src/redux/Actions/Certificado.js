import axios from "axios"
import { POST_CERTIFICADO,EDIT_CERTIFICADO,DELETE_CERTIFICADO
} from '../types/typesCertificado' 
import { getProfesorById } from "./Profesor"


  
  export const createCertificado=(id,payload)=>dispatch=>{    
    return axios.post("/certificados", payload)
    .then((d)=>{ 
        dispatch({ type:POST_CERTIFICADO, payload: d.data }) 
        dispatch(getProfesorById(id))
       })
     .catch ((e) =>{console.log(e)})       
    }  
    
    
  
    export const deleteCertificado=(id , profeID)=>dispatch=>{
      
      return axios.delete(`/certificados/${id}`)
      .then((d)=> {
        dispatch({ type:DELETE_CERTIFICADO, payload:d.data })
        dispatch(getProfesorById(profeID))
      }     
        )
      .catch((e)=> console.log(e))
  }
  
  export const editCertificado=(id,newData,profeID)=>dispatch=>{
    
    return axios.patch(`/certificados/${id}`,newData)
    .then((d)=> 
        {dispatch({ type:EDIT_CERTIFICADO, payload:d.data })
        dispatch(getProfesorById(profeID))
      }
        )
    .catch((e)=> console.log(e))
  }