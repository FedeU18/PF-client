
import { useEffect } from 'react';
import { useState } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useDispatch } from 'react-redux';
import "./Notificacion.css"
import { EliminarComent } from '../EliminarComent/EliminarComent';
import { EliminarNotificacion } from '../EliminarNotificacion/EliminarNotificación';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiFillDelete } from "react-icons/ai";
import { BanearUsuario } from '../BanearUsuario/BanearUsuario';
import { EditNotificacion } from '../../redux/Actions/Notificacion';
export const Notificacion=({visto2,denuncianteinfo,razon,denunciadoinfo,comentInfo,notiId})=> {
    const dispatch=useDispatch()
    const [show ,setShow]=useState(false)
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    const handleClose = () => setShow2(false);
    const handleShow = () => setShow2(true);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

   const handleEliminarComentario=()=>{
    setShow(true)
    handleShow()
     
   }
   
  return (
    <div onBlur={()=>{setShow(false)}}>
        <EliminarComent show={show2}
                        notiId={notiId}
                        handleClose={handleClose} 
                        comentId={comentInfo.id}   />
         <EliminarNotificacion show={show3}
                        notiId={notiId}
                        handleClose={handleClose3} 
                         />
         <BanearUsuario show={show4}
                        demandado={denunciadoinfo}
                        handleClose={handleClose4} 
                         />               
      <OverlayTrigger        
        trigger={'click'}
        show={show}
        onToggle={()=>{dispatch(EditNotificacion(notiId))
            setShow(true)}}
        key={'right'}
        placement={'right'}
        overlay={
          <Popover id={`popover-positioned-${'right'}`} 
                    style={{ maxWidth:'none',marginLeft:'30px', marginTop:'3rem'}}>
            <div className='contComentOnDe' >
                <div className='dropContNoti'> 

                                    <NavDropdown
                                    onClick={()=>{setShow(true)}}
                                    title="..."
                                    id="basic-nav-dropdown"
                                    style={{ all:'unset' }}
                                    >
                                    <div>
                                    <NavDropdown.Item
                                        onClick={()=>{handleShow3()}}
                                        className="opacity-100"                                        
                                        >
                                        <AiFillDelete/> Eliminar Notificación
                                    </NavDropdown.Item>
                                    
                                    </div>
                                </NavDropdown>
                                        </div>
            <div className='comentDemandado'>
                <img src={denunciadoinfo.tipo==="profesor"?denunciadoinfo.imagen: denunciadoinfo.picture}
                        className={'denunciadpicComent'}/>
                <div>
                    <span className='toupeerCSpan bolderSpan'>{denunciadoinfo.username}</span>
                    <br></br>
                    <span className='toupeerCSpan brigterSpa'>{denunciadoinfo.tipo==="profesor"?(
                        <>
                        {denunciadoinfo.nombre} {denunciadoinfo.apellido}
                        </>):(
                        <>
                        {denunciadoinfo.name} {denunciadoinfo.lastname}
                        </>
                        )}</span>
                    <div>
                        {comentInfo.contenido?(
                        <span>
                            {comentInfo.contenido}
                        </span>):(
                            <span className='comentNotAba'>
                                {comentInfo.mensaje}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className='btnsEliBanCont'>
            <button className={`btnDeBanComent ${comentInfo.mensaje && 'btnDeBanComentDis'}`} 
                    disabled={comentInfo.mensaje && true} 
                    onClick={handleEliminarComentario}> 
                    
                        Eliminar Comentario
                    
            </button>
            <button className='btnDeBanComent' onClick={()=>{handleShow4()  
                                                            setShow(true)}}> 
                    
                        Banear Usuario
                    
            </button>

            </div>
            </div>
          </Popover>
        }
      >
        <button className='btnoverlay'  >
                           
                                    
                            
                              <div className={`noti notiEsp ${visto2===false &&'notiSinVer '}`}>
                               
                                <div className="imgNotifiCont">
                                  {denuncianteinfo.tipo==="profesor"?(
                                      <img className={`notiPic`} src={denuncianteinfo.imagen} alt={'pic'}/>
                                  ):(
                                    <img className={`notiPic`} src={denuncianteinfo.picture} alt={'pic'}/>
                                  )}
                                </div>
                                <div className='notiText'>
                                    {denuncianteinfo.tipo==="profesor"?(
                                      <>
                                        <span className='autNoti'>
                                            {denuncianteinfo.username}
                                        </span>
                                        denuncio el comentario de 
                                        <span className='autNoti'>
                                            {denunciadoinfo.username}
                                        </span>.
                                        <br></br>
                                        
                                        <span  className='descNoti'>
                                            Razon: {razon}
                                        </span>
                                      </>
                                    ):(
                                    <>
                                       <span className='autNoti'>
                                            {denuncianteinfo.username}
                                        </span>
                                        denuncio el comentario de 
                                        <span className='autNoti'>
                                            {denunciadoinfo.username}
                                        </span>.
                                        <br></br>
                                        <span  className='descNoti'>
                                            Razon: {razon}
                                        </span>
                                    </>)}
                            </div>

                            <div className="imgNotifiCont">
                              {denunciadoinfo.tipo==="profesor"?(
                                  <div>
                                    
                                        <img className={`notiPic`} src={denunciadoinfo.imagen} alt={'pic'}/>
                                </div>
                                ):(
                                    <div>
                                    
                                <img className={`notiPic`} src={denunciadoinfo.picture} alt={'pic'}/>
                                </div>
                                )}
                            </div>
                            
                       
                        </div>
                            
        </button>
      </OverlayTrigger>

      
    
  </div>
  );
}