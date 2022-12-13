import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComent } from '../../redux/Actions/Comentarios';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import { useEffect } from 'react';
import { deleteNotificacion } from '../../redux/Actions/Notificacion';

export const EliminarComent=({show, handleClose,comentId,notiId})=> {
  
  const dispatch=useDispatch()  
  const loading =useSelector((state)=>state.comentarios.loading)
  const [eliminar,setEliminar]=useState('coment')
 

  const handleConfirmDeComent=()=>{
    if(eliminar==='coment'){
      dispatch(deleteComent(comentId))
      setEliminar('noti')
    }else{
      dispatch(deleteNotificacion(notiId))
      setEliminar('coment')
      handleClose()
    }

  }
  return (
     <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>

          <Modal.Title>
            {eliminar==='coment' ?(
            <>
              Eliminar Comentario            
            </>):(
              <>
                Eliminar Notificación
              </>
            )}
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>
          {eliminar==='coment' && loading===false &&(
            <>
            ¿Esta seguro de querer eliminar este comentario?
            </>
          )}
          {eliminar==='noti' && loading===false &&(
            <>
            El comentario se elmino correctamente.
            <br></br>
            ¿Quieres Eliminar esta notificación?
            </>
          )}
          {loading===true && (
            <Placeholder as="p" animation="glow">
              <Placeholder xs={12} />
              <Placeholder xs={12} />
            </Placeholder>

          )}

        </Modal.Body>
        
        <Modal.Footer>
         
         {loading?(
            <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
         ):(
          <Button variant="danger" onClick={handleConfirmDeComent}>
          Eliminar
        </Button>
         )}
        </Modal.Footer>
      </Modal>
    </>
  );
}