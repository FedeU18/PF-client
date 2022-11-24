import axios from "axios";
import {
    GET_PROFESOR_ID,
    PUT_PROFESORES,
    POST_PROFESORES,
    DELETE_PROFESORES,
    FILTER_PRECIO,
    FILTER_PUNTUACION,
} from "../types/typesProfesor";

export function getProfesorById(id){
    return async function(dispatch){
        try {
            const prof = await axios.get(`http://localhost:3001/profesores/${id}`)
            return dispatch({
                type:GET_PROFESOR_ID,
                payload: prof.data
            })
        } catch (error) {
            return error.message
        }
    }
}

export function postProfesor(payload){
    return async function(dispatch){
        try {
            const prof = await axios.post(`http://localhost:3001/profesores`, payload)
            return dispatch({
                type: POST_PROFESORES,
                payload: prof
            })
        } catch (error) {
            return error.message
        }
    }
}

export function putProfesor(id, payload){
    return async function(dispatch){
        try {
            const prof = await axios.put(`http://localhost:3001/profesores/${id}`, payload)
            return dispatch({
                type: PUT_PROFESORES,
                payload:prof
            })
        } catch (error) {
            return error.message
        }
    }
}

export function deleteProfesor(id){
    return async function(dispatch){
        try {
            const prof = await axios.delete(`http://localhost:3001/profesores/${id}`)
            return dispatch({
                type: DELETE_PROFESORES,
                payload:prof
            })
        } catch (error) {
            return error.message
        }
    }
}

export function filterPrecio(payload){
    return{
        type:FILTER_PRECIO,
        payload
    }
}

export function filterPuntuacion(payload){
    return{
        type:FILTER_PUNTUACION,
        payload
    }
}