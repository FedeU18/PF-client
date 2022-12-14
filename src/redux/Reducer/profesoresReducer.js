import {
  GET_PROFESORES,
  GET_PROFESOR_ID,
  PUT_PROFESORES,
  POST_PROFESORES,
  DELETE_PROFESORES,
  FILTER_PRECIO,
  FILTER_PUNTUACION,
  VACIAR_ESTADO,
  SET_PROFE_FILTERED,
  SORT_PRICE_BACK,
  FILTER_PROF_COUNTRY_BACK,
  SORT_USER_BACK,
} from "../types/typesProfesor";

const initialState = {
  profesoresBYMateria:[],
  usuariosBYPais:[],
  profesores: [],
  allProfesores: [],
  detail: {},
  profesFiltered: [],
  matches:[],
  allUsernames:[]

};

import { FilterOrder } from "./filterHelper";

const profesoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEARSEARCH":
            return{
                ...state,
                [action.globalStateName]:action.payload
            }
    case 'GET_PROFEBYMATERIA':
      return {
        ...state,
        profesoresBYMateria:action.payload,
      }
      case 'GET_USERBYPAIS':
        return {
          ...state,
          usuariosBYPais:action.payload,
        }
        case 'GET_USERSNAMES':
      return {
        ...state,
        allUsernames:action.payload,
      }
      case 'GET_MATCHES':
        return {
          ...state,
          matches:action.payload,
        }
    case GET_PROFESORES:
      return {
        ...state,
        profesores: action.payload,
        allProfesores: action.payload,
      };

    case "FILTER_ORDER":
      const newAllprofes = FilterOrder(state.allProfesores, action.payload);
      return {
        ...state,
        profesores: newAllprofes,
      };
    case GET_PROFESOR_ID: {
      return {
        ...state,
        detail: action.payload,
      };
    }
    case PUT_PROFESORES: {
      return {
        ...state,
      };
    }
    case POST_PROFESORES: {
      return {
        ...state,
      };
    }
    case DELETE_PROFESORES: {
      return {
        ...state,
      };
    }

    case SORT_PRICE_BACK:{
            let orderedPrice = [...state.profesFiltered]

            orderedPrice = orderedPrice.sort((a, b) => {
                if(a.precio < b.precio) {
                    return action.payload === "asc" ? -1 : 1;
                }
                if(a.precio > b.precio) {
                    return action.payload === "asc" ? 1 : -1;
                }
                return 0;
            })
            return {
              ...state,
              profesFiltered: orderedPrice,
              
          }
        }

     case SORT_USER_BACK:{
          let orderedUser = [...state.profesFiltered]

          orderedUser = orderedUser.sort((a, b) => {
              if(a.precio < b.precio) {
                  return action.payload === "AZ" ? -1 : 1;
              }
              if(a.precio > b.precio) {
                  return action.payload === "AZ" ? 1 : -1;
              }
              return 0;
          })
          return {
            ...state,
            profesFiltered: orderedUser,
            
        }
      }

        case FILTER_PROF_COUNTRY_BACK:
          let filteredCountry = [];
          state.profesFiltered.map((profe) => {
              if(profe.country.name === action.payload) {
                  return filteredCountry.push(profe)
              }
          })
          return {
              ...state,
              profesFiltered: filteredCountry,
              
          }    

    case FILTER_PRECIO: {
      let filterPrecio =
        action.payload === "MayorPrecio"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        profesores: filterPrecio,
      };
    }
    case SET_PROFE_FILTERED:
      return {
        ...state,
        profesFiltered: action.payload,
        
      };
    case FILTER_PUNTUACION: {
      let filterPuntuacion =
        action.payload === "mayorPuntuacion"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        profesores: filterPuntuacion,
      };
    }
    case "CLEAR":
      return {
        ...state,
        detail: {},
      };
    case VACIAR_ESTADO:
      return {
        ...state,
        detail: action.payload,
      };
    case "DESMONTAJE": {
      return initialState;
    }
    default:
      return {
        ...state,
      };
  }
};

export default profesoresReducer;
