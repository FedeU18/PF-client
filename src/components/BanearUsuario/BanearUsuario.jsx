import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import Placeholder from 'react-bootstrap/Placeholder';
import { useEffect } from 'react';
import { editAlumno } from '../../redux/Actions/Alumno';
import { putProfesor } from '../../redux/Actions/Profesor';


export const BanearUsuario=({show, handleClose,demandado})=> {
  const [fecha,setFecha]=useState('')
  const [razon,setRazon]=useState('')
  const [error,setErrors]=useState('')
  const [showError,setShowError]=useState(false)

  let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear().toString();

  const dispatch=useDispatch()  

    useEffect(()=>{
        if(fecha ==='' || razon===''){
            setErrors('Llena todos los campos requeridos.')
        }
        if(fecha !== "" && razon !==''){
            setErrors('')
        }
    },[fecha, razon])

  const handleBan=()=>{    

     if(demandado.tipo==='profesor'){
        dispatch(putProfesor(demandado.id,{baneado:true,
                                            fechaLimiteBan:fecha,
                                            razon:razon}))
     }
     else{
        dispatch(editAlumno({baneado:true,
                            fechaLimiteBan:fecha,
                            razon:razon},demandado.id))
     }
      setFecha('')
      setRazon('')
      setErrors('')
      handleClose()    
    }
    const handleDate=(e)=>{
        setFecha(e.target.value)
       
    }
    const handleRazon=(e)=>{
        setRazon(e.target.value)
    }
  return (
     <>
      <Modal show={show} onHide={()=>{
        setFecha('')
        setRazon('')
        setErrors('')
        handleClose()  
      }}>
        <Modal.Header closeButton>

          <Modal.Title>
            Banear Usuario
           
          </Modal.Title>

        </Modal.Header>
        <Modal.Body>       
                   
            Introduzca hasta que fecha <b>{demandado.username}</b> sera bloqueado de la aplicación:
            <br></br>
            <input type="date" 
                    className='fechinpt'
                    min={`${yyyy}-${mm}-${parseInt(dd,10)+1}`} 
                    onChange={handleDate} id="birthday" name="birthday"></input>
            <br></br>
            <br></br>
            Agregue una razon:
            <br></br>
            <input type="text" className='inptrazon' placeholder='razon...' onChange={handleRazon}/>
         
        </Modal.Body>
        
        <Modal.Footer>
        
        
            <Button variant="primary" disabled={error===''?false:true} onClick={handleBan}>
            Guardar Cambios
          </Button>
        
        
        </Modal.Footer>
      </Modal>
    </>
  );
}