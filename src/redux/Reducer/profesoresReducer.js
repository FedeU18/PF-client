import { 
  GET_PROFESORES,
  GET_PROFESOR_ID,
  PUT_PROFESORES,
  POST_PROFESORES,
  DELETE_PROFESORES,
  FILTER_PRECIO,
  FILTER_PUNTUACION,
} from "../types/typesProfesor";

const initialState = {
  profesores: [],
  allProfesores: [],
  detail: []
};

import { FilterOrder } from "./filterHelper";

const profesoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFESORES:
      
      return {
        ...state,
        profesores: action.payload,
        allProfesores: action.payload
      };

    case 'FILTER_ORDER':
      const newAllprofes=FilterOrder(state.allProfesores,action.payload  )
      return{
        ...state,
        profesores:newAllprofes
      }
    case GET_PROFESOR_ID:{
      return{
        ...state,
        detail: action.payload
      }
    }
    case PUT_PROFESORES:{
      return{
        ...state
      }
    }
    case POST_PROFESORES:{
      return{
        ...state
      }
    }
    case DELETE_PROFESORES:{
      return{
        ...state
      }
    }
    case FILTER_PRECIO:{
      let filterPrecio = action.payload === "MayorPrecio" ?
                state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return -1;
                    }
                    if(b.healthScore > a.healthScore){
                        return 1;
                    }
                    return 0
                }) :
                state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return 1;
                    }
                    if(b.healthScore > a.healthScore){
                        return -1;
                    }
                    return 0
                })
                return {
                  ...state,
                  profesores:filterPrecio
                }
    }
    case FILTER_PUNTUACION:{
      let filterPuntuacion = action.payload === "mayorPuntuacion" ?
                state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return -1;
                    }
                    if(b.healthScore > a.healthScore){
                        return 1;
                    }
                    return 0
                }) :
                state.recipes.sort(function(a, b){
                    if(a.healthScore > b.healthScore){
                        return 1;
                    }
                    if(b.healthScore > a.healthScore){
                        return -1;
                    }
                    return 0
                })
                return{
                  ...state,
                  profesores:filterPuntuacion
                }
    }
    default:
      return {
        ...state,
      };
  }
};

export default profesoresReducer;
