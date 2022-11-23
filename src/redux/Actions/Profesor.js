import axios from "axios";

export function allProfes (){
    
  return async function(dispatch){
    let info = await axios.get("http://localhost:3001/profesores");

    return dispatch({
      type:"GET_PROFESORES",
      payload : info.data
    })
  }
      

};


