import './EditarComent.css'
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { RiSendPlaneFill } from "react-icons/ri";
import { createComentProfe,createComentsonComent } from '../../redux/Actions/Comentarios';
import { EditComent } from '../../redux/Actions/Comentarios';

export const EditarComent=({show,comentId ,handleClose, profileOwner,placeholder})=>{
    const dispatch=useDispatch()
    const [contenido, setContenido]=useState('');
    const handleTextArea=(e)=>{
        setContenido(e.target.value)
        
    }
    const handleEdiitarComentario=()=>{
       dispatch(EditComent(comentId,{contenido} ,profileOwner))
        
       setContenido('')
       handleClose()
    }
    return(
        <>
        <Modal show={show} onHide={()=>{handleClose()}}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Comentario </Modal.Title>
          </Modal.Header>
          <textarea 
              onChange={handleTextArea}
              value={contenido}
              placeholder={placeholder!==null && placeholder}
              className='textInputComent'></textarea>
          <Modal.Footer>
            <button  onClick={handleEdiitarComentario} className='btnSEndComment'>
              <RiSendPlaneFill />
            </button>
          </Modal.Footer>
        </Modal>
      </>
    )
}