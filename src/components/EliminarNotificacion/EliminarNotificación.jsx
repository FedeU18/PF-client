import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComent } from '../../redux/Actions/Comentarios';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import { useEffect } from 'react';
import { deleteNotificacion } from '../../redux/Actions/Notificacion';

export const EliminarNotificacion=({show, handleClose,notiId})=> {
  
  const dispatch=useDispatch()  
  const handleConfirmDeComent=()=>{
    
      dispatch(deleteNotificacion(notiId))
     
      handleClose()    
    //   handleClose()
    }

  return (
     <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>

          <Modal.Title>
            
                Eliminar Notificación
           
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>       
                   
            ¿Esta seguro de querer eliminar esta notificación?
         
        </Modal.Body>
        
        <Modal.Footer>
        
        
            <Button variant="danger" onClick={handleConfirmDeComent}>
            Eliminar
          </Button>
        
        
        </Modal.Footer>
      </Modal>
    </>
  );
}