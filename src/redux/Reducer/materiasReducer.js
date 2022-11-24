import {GET_MATERIAS, 
          GET_OP_SELECTED,
          ADD_OP_SELECTED} from '../types/typesMaterias' 

const initialState = {
    materias: [],
    filtrosSeleccionados:{materias:[],
                          pais:'',
                          puntuacion:'',
                          precio:''}
  };

  const materiasReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MATERIAS:
        return {
          ...state,
          materias:action.payload
        };
      case ADD_OP_SELECTED:
        return{
          ...state,
          filtrosSeleccionados:action.payload
        }
      default:
        return {
          ...state,
        };
    }
  };
  
  export default materiasReducer;
  