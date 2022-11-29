import axios from "axios"
import { GET_PAISES } from "../types/typesPaises";
export const getPaises=()=>dispatch=>{  
    console.log('entro en paises')
    return axios.get(`/paises`)
    .then(d=> {
        console.log(d)
        dispatch({ type:GET_PAISES, payload: d.data })
    })
    .catch(e=> console.log(e))
  };
