import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { createNotificacion } from '../../redux/Actions/Notificacion';

export const Denuncia=({show,handleClose,comentarioId,denunciadoId,denuncianteId})=> { 
    const dispatch=useDispatch() 
    const [razon,setRazon]=useState('Muestras de odio')
    const handleRazon=(e)=>{
        setRazon(e.target.value)
        console.log(razon)
    }
    const handleDenunciar=()=>{
        dispatch(createNotificacion({razon, denuncianteId, denunciadoId,comentarioId }))
        setRazon('Muestras de odio')        
        handleClose()
    }
  return (
    <>
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Denunciar Comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <input type="radio"               
               value={'Muestras de odio'}  
               onClick={handleRazon} 
               checked={razon==='Muestras de odio'?true:false}/> Muestras de odio.
        <br></br>
        <input type="radio"               
               value={'Spam e interacción falsa'}  
               onClick={handleRazon} 
               checked={razon==='Spam e interacción falsa'?true:false}/> Spam e interacción falsa.
        <br></br>
        <input type="radio"               
               value={'Desinformación perjudicial'}  
               onClick={handleRazon} 
               checked={razon==='Desinformación perjudicial'?true:false}/> Desinformación perjudicial.
        <br></br>
        <input type="radio"               
               value={'Acoso e intimidación'}  
               onClick={handleRazon} 
               checked={razon==='Acoso e intimidación'?true:false}/> Acoso e intimidación.
        <br></br>
        <input type="radio"               
               value={'Suicidio, autolesiones y transtornos alimentarios'}  
               onClick={handleRazon} 
               checked={razon==='Suicidio, autolesiones y transtornos alimentarios'?true:false}/> Suicidio, autolesiones y transtornos alimentarios.
        <br></br>
        
        </Modal.Body>
        <Modal.Footer>          
          <Button variant="primary" onClick={handleDenunciar}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

