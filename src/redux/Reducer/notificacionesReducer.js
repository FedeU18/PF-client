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
    loadingNotis: false,
};

    const notificacionesReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOADING_NOTIS":
            return{
              ...state,
              loadingNotis: true
            }; 

        case GET_NOTIFICACION:
        return{
        ...state,
        notificacion:action.payload

        }

        case GET_NOTIFICACIONES:
        return{
        ...state,
        notificaciones:action.payload,
        loadingNotis:false,

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
