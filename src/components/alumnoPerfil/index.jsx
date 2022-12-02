import React, { useEffect, useState } from "react";
import * as actions from "../../redux/Actions/Alumno.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import imag from "./default user.png";
import cloud from "./upload-cloud.png";
import "./alumnoPerfil.css";
import deleteFirestoreUser from "../../Authentication/functions/deleteFirestoreUser";
import deleteCurrentUser from "../../Authentication/functions/deleteCurretUser";
import logOut from "../../Authentication/functions/logOut";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import {MdOutlineFavorite} from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { EditarAlumno} from "../EditarAlumno/EditarAlumno.jsx";

export const AlumnoPerfil = (props) => {
  console.log("desde alumno perfil ", props.id);
  const dispach = useDispatch();
  const navigate = useNavigate();
  let info = useSelector((state) => state.alumnos.alumno);

  const [show, setShow] = useState(false);

  let valorImagen = "";


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    dispach(actions.getAlumnoFromAPI(props.id));
  }, []);


  const [pict, setPict] = useState ("")


  const deleteAlumno = async () => {
    const deleteAccount = window.confirm(
      "esta seguro de eliminar su cuenta de alumno"
    );
    if (deleteAccount) {
      const UID = props.id;
      await deleteFirestoreUser(UID); // borra firestore
      dispach(actions.deleteAlumno(UID)); // borra base de datos
      deleteCurrentUser(); // borra de firebase auth
      logOut(); // lo deslogea
      navigate("/"); // lo lleva al landing :)
      // NO CAMBIAR EL ORDEN ,no comete errores pero si hace que se vea feo , primero eliminamos los datos para que
      // se podria arreglar con un loader pero ya veremos :)
    }
  };

  function valor() {
    if(pict!=""){
      valorImagen = pict;

    }else{valorImagen = info.picture;

    } return valorImagen;
  }


  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpeannw8c",
        uploadPreset: "w5okfspz",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          dispach(actions.editAlumno({picture:result.info.url},props.id));
          setPict(result.info.url);
          
        }
      }
    );
    myWidget.open();
  }

  return (
    <div>
      {info && info.name ? (
        <div className="divPrincipal">

            <EditarAlumno show={show} alumno={info}  handleClose={handleClose}/>
          <div className="ContMyPerfilFavorites">
              <Link to="/home">
                   <button className="goBackBtn">
                    <img className="gobackArrow" src={'/retro.png'} />
                  </button>              
              </Link>

            <div>
                <div className="myperfilCont">
                  <div className="FotoPerfilACont">
                    {info.picture!=='sin foto' ?(
                      <img src={info.picture} className='ProfilePictureAlum'/>
                    ):(
                      <div className='AvatarNameAluPer'>
                          <div>{info.name[0].toUpperCase()}</div>                                
                      </div>
                    )  }
                    <button class="button-17" role="button">Alumno</button>
                  </div>
                  <div className="InFoAlumnoPErfCont">
                    <div className="titleMyPRofile">
                      <span>
                      Mi Perfil                  
                      </span>
                    <button className="btnEditProAlu">
                    <AiOutlineEdit onClick={handleShow}/>
                    </button>
                    </div>

                      <div className="contInfoPErfAlum">
                        <div>
                          <div className="miniContinfoPErfAlu">
                            <div className="eachInfoIputPErProfe">
                              <div className="nameInfoPErAlu">
                                Nombre:
                              </div> 
                              <div className="lainfoPErAlu">
                                {info.name}
                            </div> 
                          </div>
                          <div className="eachInfoIputPErProfe">
                              <div className="nameInfoPErAlu">
                                Apellido:
                              </div> 
                              <div className="lainfoPErAlu">
                                {info.lastname}
                            </div> 
                          </div>
                          <div className="eachInfoIputPErProfe">
                              <div className="nameInfoPErAlu">
                                Edad:
                              </div> 
                              <div className="lainfoPErAlu">
                                {info.age} años
                            </div> 
                          </div>
                          <div className="eachInfoIputPErProfe">
                              <div className="nameInfoPErAlu">
                                Pais:
                              </div> 
                              <div className="lainfoPErAlu">
                                <img src={info.country.flag} className='flagalumPro'/>
                                {info.country.name}
                            </div> 
                          </div>
                        </div>
                        <div className="nameInfoPErAlu plusnipa">
                                Email:
                              </div> 
                              <div className="plusnipa2">
                                {info.email} 
                            </div> 
                      </div>
                      </div>

                  </div>
                </div>
                <div className="pendientesContperfAlum">
                      <div className="myPEndHeaderPerFal">
                         <spna className='mispenSpan'>
                           Mis Pendientes 
                          </spna>
                         <MdOutlinePendingActions  style={{color:'rgb(151, 140, 140,0.8)' }} size={24}/>
                      </div>
                </div>
            </div>


            <div className="myFavCont">
                 <div className="myFavHeaderPerFal"> 
                  <span>
                    Mis Favoritos
                  </span>
                  <MdOutlineFavorite size={30}             
                  style={{color:'rgb(253, 17, 49)' }}/>
                  </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Cargando...</h1>
      )}
    </div>
  );
};
