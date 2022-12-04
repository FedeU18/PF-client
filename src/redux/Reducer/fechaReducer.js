import { GET_FECHA, POST_FECHA } from "../types/typesFecha";

const initialState = {
    fechas: [],
    mensaje: ""
}

const fechasReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_FECHA: 
            return {
                ...state,
                fechas: action.payload
            };
        case POST_FECHA: 
            return {
                ...state,
                mensaje: action.payload
            };
        default:
            return {...state}
    }
}

export default fechasReducer