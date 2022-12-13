import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfesor, putProfesor } from "../../redux/Actions/Profesor";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { getPaises } from "../../redux/Actions/Paises";
import deleteFirestoreUser from "../../Authentication/functions/deleteFirestoreUser";
import deleteCurrentUser from "../../Authentication/functions/deleteCurretUser";
import logOut from "../../Authentication/functions/logOut";
import { useNavigate } from "react-router-dom";

const EditarProfesor = ({ show, profesor, handleClose }) => {
  const navigate = useNavigate()
  const paises = useSelector((state) => state.paises.paises);
  const [actualizar, setActualizar] = useState({});
  const [opcionConf, setOpConf] = useState(1);
  const [useProfesor, setuseProfesor] = useState({
    nombre: false,
    apellido: false,
    precio: false,
    imagen: false,
    country: false,
    descripcion: false,
    descripcion2: false,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaises());
  }, []);
  const actualizarProfesor = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setActualizar({
        ...actualizar,
        [e.target.name]: e.target.value,
      });
    } else {
      setActualizar({
        [e.target.name]: profesor[e.target.name],
      });
    }
    console.log(actualizar);
  };

  const updateProfesor = (e) => {
    e.preventDefault();
    dispatch(putProfesor(profesor.id, actualizar));
    setActualizar({});
    setuseProfesor({
      nombre: false,
      apellido: false,
      precio: false,
      imagen: false,
      country: false,
    });
    handleClose();
  };

  const deleteOwnAccount = async () => {
    const deleteAccount = window.confirm(
      "¿Esta seguro de querer eliminar su cuenta?"
    );
    if (deleteAccount) {
      const UID = profesor.id;
      await deleteFirestoreUser(UID); // borra firestore
      dispatch(deleteProfesor(UID)); // borra base de datos
      await deleteCurrentUser(); // borra de firebase auth
      await logOut(); // lo deslogea
      navigate("/"); // lo lleva al landing :)
      // NO CAMBIAR EL ORDEN ,no comete errores pero si hace que se vea feo , primero eliminamos los datos para que
      // se podria arreglar con un loader pero ya veremos :)
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Configuraciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="EditarOpCont">
            <div
              onClick={() => {
                setOpConf(1);
              }}
              className={`EditOpEach ${
                opcionConf === 1 ? "selectedOPEdi" : "notSelOPEdi"
              }`}
            >
              Editar Perfil
            </div>
            <div
              onClick={() => {
                setOpConf(2);
              }}
              className={`EditOpEach ${
                opcionConf === 2 ? "selectedOPEdi" : "notSelOPEdi"
              }`}
            >
              Editar Cuenta
            </div>
          </div>
          {opcionConf === 1 ? (
            <div
              className={`opEditarPErfContent ${
                opcionConf === 1 ? "ContEditSElA" : "contNoEditSElA"
              }`}
            >
              <div className="nameAlumInptChangeCont">
                {useProfesor.nombre === false ? (
                  <div>{profesor.nombre}</div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder={profesor.nombre + "..."}
                      name="nombre"
                      onChange={(e) => actualizarProfesor(e)}
                    />
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setuseProfesor({
                        ...useProfesor,
                        nombre: !useProfesor.nombre,
                      });
                    }}
                  />
                </button>
              </div>

              <div className="nameAlumInptChangeCont">
                {useProfesor.apellido === false ? (
                  <div>{profesor.apellido}</div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder={profesor.apellido + "..."}
                      name="apellido"
                      onChange={(e) => actualizarProfesor(e)}
                    />
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setuseProfesor({
                        ...useProfesor,
                        apellido: !useProfesor.apellido,
                      });
                    }}
                  />
                </button>
              </div>


              <div className="nameAlumInptChangeCont">
                {useProfesor.precio === false ? (
                  <div>{profesor.precio}</div>
                ) : (
                  <div>
                    <input
                      type="number"
                      name="precio"
                      onChange={(e) => actualizarProfesor(e)}
                      placeholder={profesor.precio + "..."}
                    />
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setuseProfesor({
                        ...useProfesor,
                        precio: !useProfesor.precio,
                      });
                    }}
                  />
                </button>
              </div>

              <div className="nameAlumInptChangeCont">
                {useProfesor.imagen === false ? (
                  <div>Picture</div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder={profesor.imagen + "..."}
                      name="imagen"
                      onChange={(e) => actualizarProfesor(e)}
                    />
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setuseProfesor({
                        ...useProfesor,
                        imagen: !useProfesor.imagen,
                      });
                    }}
                  />
                </button>
              </div>

              <div className="nameAlumInptChangeCont">
                {useProfesor.descripcion===false?(
                    <div>
                        {profesor.descripcion}
                    </div>):(
                    <div>
                        
                        <input type='text'
                                 placeholder={profesor.descripcion+'...'}
                                 name="descripcion"
                                onChange={(e) => actualizarProfesor(e)}/>
                    </div>)} 
                    <button className="btnEditProAlu">
                        <AiOutlineEdit onClick={()=>{setuseProfesor({...useProfesor,descripcion:!useProfesor.descripcion})}}/>
                    </button> 
              </div>
              <div className="nameAlumInptChangeCont">
                {useProfesor.descripcion2===false?(
                    <div>
                        
                           ¿Porque deberian elegirme? 
                        
                    </div>):(
                    <div>
                        
                        <textarea type='text'
                                 placeholder={profesor.descripcion2+'...'}
                                 name="descripcion2"
                                onChange={(e) => actualizarProfesor(e)}/>
                              
                    </div>)} 
                    <button className="btnEditProAlu">
                        <AiOutlineEdit onClick={()=>{setuseProfesor({...useProfesor,descripcion2:!useProfesor.descripcion2})}}/>
                    </button> 
              </div>

              <div className="nameAlumInptChangeCont">
                {useProfesor.country===false?(
                    <div>
                      <br></br>
                        {profesor.country.name}
                    </div>):(
                    <div className="contareglarPsiases">
                        <div className="container mt-3  containerPaisInpt">
                    

                    <br></br>
                    <input onChange={(e) => actualizarProfesor(e)}  
                            list="browsers"
                            type='text' 
                            placeholder={profesor.country.name+'...'} 
                            name="country" 
                            id="browser" />
                    <datalist id="browsers">
                        {paises.length > 0 && paises.map((p, index) => (
                            <option value={p.name} key={index}></option>))}

                    </datalist>

                </div>
                        
                    </div>)} 
                    <button className="btnEditProAlu">
                        <AiOutlineEdit onClick={()=>{setuseProfesor({...useProfesor,country:!useProfesor.country})}}/>
                    </button> 
              </div>


            </div>
          ) : (
            <div
              className={`opEditarPErfContent ${
                opcionConf === 2 ? "ContEditSElA" : "contNoEditSElA"
              }`}
            >
              ¿Quieres eliminar tu cuenta?:
              <br></br>
              <Button onClick={deleteOwnAccount} variant="danger">
                Eliminar Cuenta
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={updateProfesor}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarProfesor;
