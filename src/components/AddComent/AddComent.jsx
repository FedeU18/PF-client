import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './AddComent.css'
import { RiSendPlaneFill } from "react-icons/ri";
import {createComent} from '../../redux/Actions/Comentarios'
import { useDispatch } from 'react-redux';

export const AddComent=({show ,handleClose, alumnoId, profesorId ,myId})=> {
    const dispatch=useDispatch()
    const [contenido, setContenido]=useState('');
    const handleTextArea=(e)=>{
        setContenido(e.target.value)
        
    }
    const handleSendComent=()=>{
       dispatch(createComent(profesorId,{contenido, profesorId, alumnoId:myId}))
       setContenido('')
       handleClose()
    }

  return (
    <>
      <Modal show={show} onHide={()=>{handleClose()}}>
        <Modal.Header closeButton>
          <Modal.Title>Añade Una Reseña</Modal.Title>
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
  );
}