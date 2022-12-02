import React, {useEffect, useState} from "react";
import EditarProfesor from "../editarProfesor/editarProfesor"
import { AiOutlineEdit } from "react-icons/ai";
import * as actionsProfesor from "../../redux/Actions/Profesor";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './PerfilProfesor.css'
import Carousel from 'react-bootstrap/Carousel';

export const PerfilProfesor=({id})=>{
    const dispatch = useDispatch(); 
    const [show, setShow] = useState(false);
    let info = useSelector((state) => state.profesores.detail);
    useEffect(() => {     
        dispatch(actionsProfesor.getProfesorById(id));       
      }, []);


const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  


    return (
        <div>
          {Object.entries(info).length > 0? (
            <div className="divPrincipalProf">
                <EditarProfesor show={show} profesor={info}  handleClose={handleClose}/>
              <div className="ContMyPerfilFavoritesProf">
                  <Link to="/home">
                       <button className="goBackBtn">
                        <img className="gobackArrowProf" src={'/retro.png'} />
                      </button>              
                  </Link>
    
                <div>
                    <div className="myperfilContProf">
                      <div className="FotoPerfilAContProf">
                        {info.picture!==null ?(
                          <img src={info.imagen} className='ProfilePictureAlumProf'/>
                        ):(
                          <div className='AvatarNameAluPerProf'>
                              <div>{info.nombre[0].toUpperCase()}</div>                                
                          </div>
                        )  }
                        <button class="button-17" role="button">Profesor</button>
                      </div>
                      <div className="InFoAlumnoPErfContProf">
                        <div className="titleMyPRofileProf">
                          <span>
                          Mi Perfil                  
                          </span>
                        <button className="btnEditProAluProf">
                        <AiOutlineEdit onClick={handleShow}/>
                        </button>
                        </div>
    
                          <div className="contInfoPErfAlumProf">
                            <div>
                              <div className="miniContinfoPErfAluProf">
                                <div className="eachInfoIputPErProfe">
                                  <div className="nameInfoPErAluProf">
                                    Nombre:
                                  </div> 
                                  <div className="lainfoPErAluProf">
                                    {info.nombre}
                                </div> 
                              </div>
                              <div className="eachInfoIputPErProfe">
                                  <div className="nameInfoPErAluProf">
                                    Apellido:
                                  </div> 
                                  <div className="lainfoPErAluProf">
                                    {info.apellido}
                                </div> 
                              </div>
                              <div className="eachInfoIputPErProfe">
                                  <div className="nameInfoPErAluProf">
                                    Precio:
                                  </div> 
                                  <div className="lainfoPErAluProf">
                                    {info.precio} $ por hora.
                                </div> 
                              </div>
                              <div className="eachInfoIputPErProfe">
                                  <div className="nameInfoPErAluProf">
                                    Pais:
                                  </div> 
                                  <div className="lainfoPErAluProf">
                                    <img src={info.country.flag} className='flagalumPro'/>
                                    {info.country.name}
                                </div> 
                              </div>
                            </div>
                            <div className="nameInfoPErAluProf plusnipaProf">
                                    Email:
                                  </div> 
                                  <div className="plusnipa2Prof">
                                    {info.email} 
                                </div> 
                          </div>
                          </div>
                      </div>
                    </div>
                    
                </div>    
    
                <div className="myFavContProf">                    
                       ¿Porque deberian elegirme?                   
                </div>
              </div>

              <div className="SEcondcontProper">
                <div className="myMAteriasProfper">
                <div className="myFavHeaderPerFal"> 
                  <span>
                    Mis Materias
                    <button className="btnEditProAluProf ">
                        <AiOutlineEdit />
                        </button>
                  </span>
                  <div className="materiasContProfPEr">
                  {info.materias?.length>0 && info.materias.map(m=>(
                        <div className="nameLogoMaDeCont">
                          <div className="logoMaDeContDo">
                            <div className="logoMaDeCont">
                            <img src={`/${m.name}.png`} className='logoMaDe'/>
                          </div>
                          </div>
                          <div className="nameMaDeCont">
                            {m.name}
                          </div>
                        </div>
                      )
                      )}
                </div>
                  </div>
                </div>

                <div className="MisCertificadosPRofePEr">
                <div className="myFavHeaderPerFal"> 
                  <span>
                    Mis Certificados 
                    <button className="btnEditProAluProf ">
                        <AiOutlineEdit />
                        </button>
                  </span>
                  {info.certificados.length===0?(
                    <div>
                        Aun no añades ningún Certificado.
                    </div>):(                    
                    <div>
                        <Carousel style={{marginTop:'5%', color:'black'}} >
                            {info.certificados.map((f,i)=>(
                                <Carousel.Item className='carruIte'>
                            <div className='insideCaIte certiProPER' style={{backgroundImage:`url(${f.foto})`}}>
                                    <div className={'descCertCarru'}>
                                        {f.nombre}
                                    </div>
                            </div>
                            </Carousel.Item>
                 )
                
                )} 
      
            </Carousel>
                    </div>
                    )}


                  </div>
                </div>

              </div>

            </div>
          ) : (
            <h1>Cargando...</h1>
          )}
        </div>
      );
}

export default PerfilProfesor;