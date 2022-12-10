import {
    GET_NOTIFICACION,
    GET_NOTIFICACIONES,
    POST_NOTIFICACION,
    EDITAR_NOTIFICACIONES,
    EDITAR_NOTIFICACION,
    DELETE_NOTIFICACION
} from '../types/typesNotificacion' 

const initialState = {
    notificacion:{},
    notificaciones:[],

};

    const notificacionesReducer = (state = initialState, action) => {
    switch (action.type) {
        

        case GET_NOTIFICACION:
        return{
        ...state,
        notificacion:action.payload

        }

        case GET_NOTIFICACIONES:
        return{
        ...state,
        notificaciones:action.payload
        }

        case DELETE_NOTIFICACION:
        return{
        ...state,

        }
        case POST_NOTIFICACION:
        return{
        ...state,

        }

        case EDITAR_NOTIFICACION:
        return{
        ...state,

        }
        case EDITAR_NOTIFICACIONES:
        return{
        ...state,

        }
        default:
        return {
        ...state,
        };
    }

    };

export default notificacionesReducer;
