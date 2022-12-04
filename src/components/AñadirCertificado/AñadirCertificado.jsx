import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { createCertificado } from '../../redux/Actions/Certificado';
import { useDispatch } from 'react-redux';

export const AñadirCerificado=(props)=>{
    const [certficado,setCertificado]=useState({nombre:'',foto:'', profesorId:props.profesorId})
    const dispach=useDispatch()

    const handleOnChange=(e)=>{
        e.preventDefault();
        setCertificado({
            ...certficado,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit=()=>{
        console.log(certficado)
        dispach(createCertificado(props.profesorId,certficado))
        setCertificado({nombre:'',foto:'', profesorId:props.profesorId})
        props.onHide()
    }

    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
             Añadir Certificado
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='descContEditCer'>
                Descripción:
                <br></br>
                <textarea placeholder='Añade una descripción...'
                            name='nombre'
                            onChange={handleOnChange}
                            className='textareaDescCErti'/>
                            
                <br></br>
                Subir imagen:
                <input type={'text'} name='foto' onChange={handleOnChange}/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>Añadir</Button>
          </Modal.Footer>
        </Modal>
      );
}