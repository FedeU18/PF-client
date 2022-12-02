import './AddComentOnComent.css'
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import { createComentProfe,createComentsonComent } from '../../redux/Actions/Comentarios';

export const AddComentOnComent=({show,comentId ,handleClose, alumnoId, profesorId ,myId,alumnoName})=>{
    const dispatch=useDispatch()
    const [contenido, setContenido]=useState('');
    const handleTextArea=(e)=>{
        setContenido(e.target.value)
        
    }
    const handleSendComent=()=>{
    //    dispatch(createComent(profesorId,{contenido, profesorId, alumnoId:myId}))
        if(myId===profesorId){
            dispatch(createComentProfe(profesorId,{contenido , comentId ,profesorId}))
        }else{
            dispatch(createComentsonComent(profesorId,{contenido,comentId,alumnoId:myId}))
        }
       setContenido('')
       handleClose()
    }
    return(
        <>
        <Modal show={show} onHide={()=>{handleClose()}}>
          <Modal.Header closeButton>
            <Modal.Title>Responder a {alumnoName!==null && alumnoName} </Modal.Title>
          </Modal.Header>
          <textarea 
              onChange={handleTextArea}
              value={contenido}
              placeholder='Escribe un comentario...' 
              className='textInputComent'></textarea>
          <Modal.Footer>
            <button  onClick={handleSendComent} className='btnSEndComment'>
              <RiSendPlaneFill />
            </button>
          </Modal.Footer>
        </Modal>
      </>
    )
}