import {GET_COMENT,
        POST_COMENT,
        POST_COMENT_ON_COMENT,
        POST_COMENT_PROFESOR,
        EDITAR_COMENT,
        DELETE_COMENT
    } from '../types/typesComentarios' 

const initialState = {
comentarios: [],
comentario:{},
loading: false,
};

const comentariosReducer = (state = initialState, action) => {
switch (action.type) {
  case "LOADING":
      return{
        ...state,
        loading: true
      };
case GET_COMENT:
  return {
    ...state,
    comentarios:action.payload
  };
case POST_COMENT:
  return{
    ...state,
    
  }
case POST_COMENT_ON_COMENT:
  return{
    ...state,
    
  }
case POST_COMENT_PROFESOR:
  return{
    ...state,
    
  }
case EDITAR_COMENT:
  return{
    ...state,
    
  }
case DELETE_COMENT:
  return{
    ...state,
    loading: false
    
  }
default:
  return {
    ...state,
  };
}

};

export default comentariosReducer;
