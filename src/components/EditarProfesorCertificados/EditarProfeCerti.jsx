import './EditarProfeCerti.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { editCertificado} from '../../redux/Actions/Certificado';
import { useDispatch } from 'react-redux';
import { AiOutlineEdit } from "react-icons/ai";


export const EditarProfeCerti=(props)=>{
    const [certficado,setCertificado]=useState({nombre:'',foto:''})
    const dispach=useDispatch()
    const [useCertificado ,setuseCertificado]=useState({    nombre:false,
                                                        foto:false  })

    const handleOnChange=(e)=>{
        e.preventDefault();
    
            setCertificado({
                ...certficado,
                [e.target.name]: e.target.value
            });
       
    }

    const handleSubmit=()=>{
        if(certficado.foto===''){
            delete certficado.foto;
        }
        if(certficado.nombre===''){
            delete certficado.nombre;
        }
        dispach(editCertificado(props.certificadoId,certficado,props.profesorId))
        setCertificado({nombre:'',foto:''})
        setuseCertificado({    nombre:false,
            foto:false  })
        props.onHide()
        props.onShowalert()
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
             Editar Certificado
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='descContEditCer descContEditCerplus'>
            <div className="nameAlumInptChangeCont">                
                <div>
                    <span className='bolderinputdescEdit'>Descripcion:</span>
                    {useCertificado.nombre===false?(
                            <div>
                                {props.nombre}
                            </div>):(
                            <div>
                                
                                <input type='text'
                                        placeholder={props.nombre+'...'}
                                        name="nombre"
                                        onChange={(e) => handleOnChange(e)}/>
                            </div>)}

                </div>
                    <button className="btnEditProAlu">
                        <AiOutlineEdit onClick={()=>{setuseCertificado({...useCertificado,nombre:!useCertificado.nombre})}}/>
                    </button> 
                </div>
                                <br></br>
                <div className="nameAlumInptChangeCont">                
                <div>
                    <span className='bolderinputdescEdit'>Foto:</span>
                    {useCertificado.foto===false?(
                            <div>
                                <img src={props.foto} className={'editimgCertiImg'}/>
                            </div>):(
                            <div>
                                
                                <input type='text'
                                        placeholder={props.foto+'...'}
                                        name="foto"
                                        onChange={(e) => handleOnChange(e)}/>
                                <img src={certficado.foto===''?props.foto:certficado.foto} className={'editimgCertiImg'}/>
                            </div>)}

                </div>
                    <button className="btnEditProAlu">
                        <AiOutlineEdit onClick={()=>{setuseCertificado({...useCertificado,foto:!useCertificado.foto})}}/>
                    </button> 
                </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>Guardar cambios</Button>
          </Modal.Footer>
        </Modal>
      );
}