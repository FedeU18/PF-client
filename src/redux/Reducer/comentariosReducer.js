import {GET_COMENT,
        POST_COMENT,
        POST_COMENT_ON_COMENT,
        POST_COMENT_PROFESOR,
        EDITAR_COMENT,
        DELETE_COMENT
    } from '../types/typesComentarios' 

const initialState = {
comentarios: [],
comentario:{}
};

const comentariosReducer = (state = initialState, action) => {
switch (action.type) {
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
    
  }
default:
  return {
    ...state,
  };
}

};

export default comentariosReducer;
