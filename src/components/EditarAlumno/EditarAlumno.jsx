import React, { useEffect, useState } from "react";
import * as actions from "../../redux/Actions/Alumno.js";
import { deleteAlumno, editAlumno } from "../../redux/Actions/Alumno.js";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import deleteFirestoreUser from "../../Authentication/functions/deleteFirestoreUser";
import deleteCurrentUser from "../../Authentication/functions/deleteCurretUser";
import logOut from "../../Authentication/functions/logOut";
import "./edit.css";
import { getPaises } from "../../redux/Actions/Paises";
import { useNavigate } from "react-router-dom";

export const EditarAlumno = ({ show, handleClose, alumno }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.paises.paises);
  const [actualizar, setActualizar] = useState({});
  const [opcionConf, setOpConf] = useState(1);
  const [userAlumno, setUserAlumno] = useState({
    name: false,
    lastname: false,
    age: false,
    picture: false,
    country: false,
  });
  useEffect(() => {
    dispatch(getPaises());
  }, []);

  const deleteOwnAccount = async () => {
    console.log(alumno.id);
    const deleteAccount = window.confirm(
      "¿Esta seguro de querer eliminar su cuenta?"
    );
    if (deleteAccount) {
      const UID = alumno.id;
      await deleteFirestoreUser(UID); // borra firestore
      dispatch(deleteAlumno(UID)); // borra base de datos
      await deleteCurrentUser(); // borra de firebase auth
      await logOut(); // lo deslogea
      navigate("/"); // lo lleva al landing :)
      // NO CAMBIAR EL ORDEN ,no comete errores pero si hace que se vea feo , primero eliminamos los datos para que
      // se podria arreglar con un loader pero ya veremos :)
    }
  };

  const objActualizarAlumno = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setActualizar({
        ...actualizar,
        [e.target.name]: e.target.value,
      });
    } else {
      setActualizar({
        ...actualizar,
        [e.target.name]: alumno[e.target.name],
      });
    }
    console.log("hola soy el obj ", actualizar);
  };
  const updateAlumno = (e) => {
    e.preventDefault();
    dispatch(editAlumno(actualizar, alumno.id));
    setActualizar({});
    setUserAlumno({
      name: false,
      lastname: false,
      age: false,
      picture: false,
      country: false,
    });
    handleClose();
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
                {userAlumno.name === false ? (
                  <div>{alumno.name}</div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder={alumno.name + "..."}
                      name="name"
                      onChange={(e) => objActualizarAlumno(e)}
                    />
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setUserAlumno({ ...userAlumno, name: !userAlumno.name });
                    }}
                  />
                </button>
              </div>

              <div className="nameAlumInptChangeCont">
                {userAlumno.lastname === false ? (
                  <div>{alumno.lastname}</div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder={alumno.lastname + "..."}
                      name="lastname"
                      onChange={(e) => objActualizarAlumno(e)}
                    />
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setUserAlumno({
                        ...userAlumno,
                        lastname: !userAlumno.lastname,
                      });
                    }}
                  />
                </button>
              </div>

              <div className="nameAlumInptChangeCont">
                {userAlumno.age === false ? (
                  <div>{alumno.age}</div>
                ) : (
                  <div>
                    <input
                      type="number"
                      name="age"
                      onChange={(e) => objActualizarAlumno(e)}
                      placeholder={alumno.age + "..."}
                    />
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setUserAlumno({ ...userAlumno, age: !userAlumno.age });
                    }}
                  />
                </button>
              </div>


              <div className="nameAlumInptChangeCont">
                {userAlumno.picture === false ? (
                  <div>Picture</div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder={alumno.picture + "..."}
                      name="picture"
                      onChange={(e) => objActualizarAlumno(e)}
                    />
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setUserAlumno({
                        ...userAlumno,
                        picture: !userAlumno.picture,
                      });
                    }}
                  />
                </button>
              </div>

              <div className="nameAlumInptChangeCont">
                {userAlumno.country === false ? (
                  <div>{alumno.country.name}</div>
                ) : (
                  <div>
                    <div className="container mt-3  containerPaisInpt">
                      <br></br>
                      <input
                        onChange={(e) => objActualizarAlumno(e)}
                        list="browsers"
                        type="text"
                        placeholder={alumno.country.name + "..."}
                        name="country"
                        id="browser"
                      />
                      <datalist id="browsers">
                        {paises.length > 0 &&
                          paises.map((p, index) => (
                            <option value={p.name} key={index}></option>
                          ))}
                      </datalist>
                    </div>
                  </div>
                )}
                <button className="btnEditProAlu">
                  <AiOutlineEdit
                    onClick={() => {
                      setUserAlumno({
                        ...userAlumno,
                        country: !userAlumno.country,
                      });
                    }}
                  />
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
          <Button variant="primary" onClick={updateAlumno}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
