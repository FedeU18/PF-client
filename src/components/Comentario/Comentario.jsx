import './Comentario.css'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { ComentsOnComent } from '../ComentsOnComent/ComentsOnComent';
import NavDropdown from "react-bootstrap/NavDropdown";
import { deleteComent,EditComent } from '../../redux/Actions/Comentarios';
import { useDispatch } from 'react-redux';
import { AddComentOnComent } from "../../components/AddComentOnComent/AddComentOnComent";
import { EditarComent } from '../EditarComent/EditarComent';
import { Denuncia } from '../Denunciar/Denunciar';

export const Comentario=({idComent, contenido, likes , alumno ,coments, myId,profileOwner})=>{
    const dispatch=useDispatch()
    const [myLike, SetmyLike]=useState(false)
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    useEffect(()=>{
        console.log('alumno: ',alumno, 'my id: ',myId)
        if(likes?.find(l=>l===myId)){
            SetmyLike(true)
        }
    },[])
    
    const handleLikeComent=()=>{
        console.log('liki')
        console.log(likes)
        if(likes && likes!==null && likes.includes(myId)){
            console.log('la')
            dispatch(EditComent(idComent,{likes:likes.filter(l=>l!==myId)},profileOwner))
            SetmyLike(false)
        }
        if(likes===null){
            dispatch(EditComent(idComent,{likes:[myId]},profileOwner))
            SetmyLike(true)
        }
        if(!likes.includes(myId)){
            console.log('lo')
            dispatch(EditComent(idComent,{likes:[...likes,myId]},profileOwner))
            SetmyLike(true)
        }
    }

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleEliminarComent=()=>{
        dispatch(deleteComent(idComent, profileOwner))
    }
    const handleEditarComent=()=>{
        setShow2(true)
    }
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);

    const handleDenunciar=()=>{
        setShow3(true)
    }

    return (
       <>
        {alumno !== null &&(
            <div className='ComentarioCont'>
                <Denuncia show={show3}
                        handleClose={handleClose3}
                        comentarioId={idComent}
                        denunciadoId={alumno.id}
                        denuncianteId={myId}/>

                <AddComentOnComent   
                              myId={myId}
                                profesorId={profileOwner}
                                alumnoId={myId}
                                alumnoName={alumno.name}
                              comentId ={idComent}
                               show={show} 
                               handleClose={handleClose}/> 

                <EditarComent show={show2}
                            placeholder={contenido}
                            comentId={idComent} 
                            handleClose={handleClose2} 
                            profileOwner={profileOwner}/>

                <div>

                    <div className='ComentAvaNameFlagCont'>
                        <div>
                            {alumno?.picture==='sin foto' ? (
                                <div className='AvatarNameProf'>
                                <div>{alumno.name[0].toUpperCase()}</div>
                                
                            </div>):(                        
                                <img src={alumno.picture} className='AvatarNameProfImg'/>)}
                        
                        </div>
                        <div>
                            <span className='nameLAstnameBolder'>
                            {alumno?.name && alumno?.lastname &&( <>{alumno.name} {alumno.lastname}</>)}
                            </span>
                            <br></br>
                            {alumno?.country && (<>
                                <img src={alumno.country.flag} className='flagcarProfeComent' />
                                {alumno.country.name}
                            </>)}
                        </div>
                    </div>

                    <div className='contComentCont'>
                        {contenido}
                    </div>

                    <div className='btnLikeCoCont'>
                        <div className='responderComent' onClick={handleShow}>
                            Responder
                        </div>

                        <button className='btnLikeComent'
                                onClick={handleLikeComent}>
                        {myLike?(<AiFillLike/>):(<AiOutlineLike/>)}
                        </button>
                        {likes?.length>0 &&(
                            <div className='numbLikesCont'>
                                {likes.length} Likes
                            </div>)} 
                    </div>
                    {
                        coments?.length>0 &&(
                            <ComentsOnComent myId={myId} profileOwner={profileOwner} comentarios={coments}/>
                        )
                    }
            </div>
            <div>
                {alumno?.id === myId &&(
                  
                    <NavDropdown className="dro" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleEliminarComent}>
                            Eliminar
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleEditarComent}>
                            Editar
                        </NavDropdown.Item>
                    
                    </NavDropdown>
                  
                )}
                {myId === profileOwner && (
                    <NavDropdown className="dro" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleEliminarComent}>
                            Eliminar
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={handleDenunciar}>
                            Denunciar
                        </NavDropdown.Item>
                    
                    </NavDropdown>
                )}
                {myId!==profileOwner && alumno?.id !== myId &&(
                    <NavDropdown className="dro" id="basic-nav-dropdown">
                        
                        <NavDropdown.Item onClick={handleDenunciar}>
                            Denunciar
                        </NavDropdown.Item>
                    
                    </NavDropdown>
                )}
              
            </div>
        </div>
        )}
        </>
        
    )
}