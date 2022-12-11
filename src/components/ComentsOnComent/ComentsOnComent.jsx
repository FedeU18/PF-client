import { useState } from 'react'
import NavDropdown from "react-bootstrap/NavDropdown";
import './ComentsOnComent.css'
import { deleteComent, EditComent } from '../../redux/Actions/Comentarios';
import { useDispatch } from 'react-redux';
import { EditarComent } from '../EditarComent/EditarComent';
import { Denuncia } from '../Denunciar/Denunciar';
export const ComentsOnComent=({comentarios , myId,profileOwner})=>{
    const dispatch=useDispatch()
    const [min , setMin]=useState(1)
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [denunciado,setDenunciado]=useState('')
    const [comentarioId, setComentarioId]=useState('')
    const handleShowMore=()=>{
        setMin(comentarios.length+1)
    }
    const handleEliminarComent=(id)=>{
         dispatch(deleteComent(id, profileOwner))
    }
    const handleEditarComent=()=>{
        setShow2(true)
    }

    const handleDenunciar=(id, comentarioID)=>{
        setComentarioId(comentarioID)
        setDenunciado(id)
        setShow3(true)
    }
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);
    return(
        <>
        

        {comentarios!==null &&(
            <div className='ComentsOnComentsCont'>
                
               {comentarios?.map((c,i)=>(
                    <>
                    <Denuncia show={show3}
                                handleClose={handleClose3}
                                comentarioId={comentarioId}
                                denunciadoId={denunciado}
                                denuncianteId={myId}/>
                    {i<min ? (
                        <div className=' comContonComPlus'> 
          
                               <div>
                                    {c.alumno ===null ?(
                                            <div className='ComentAvaNameFlagCont2'>
                                               
                                            <div>
                                                {c.profesor?.imagen==='' ? (
                                                    <div className='AvatarNameProf'>
                                                    <div>{c.profesor.nombre[0].toUpperCase()}</div>
                                                    
                                                </div>):(                        
                                                    <img src={c.profesor.imagen} className='AvatarNameProf2'/>)}
                                            
                                            </div>
                                            <div>
                                                <span className='nameLAstnameBolder'>
                                                {c.profesor?.nombre && c.profesor?.apellido &&( <>{c.profesor.nombre} {c.profesor.apellido}</>)}
                                                </span>
                                                <br></br>
                                                {c.profesor?.country && (<>
                                                    <img src={c.profesor.country.flag} className='flagcarProfeComent' />
                                                    {c.profesor.country.name}
                                                </>)}
                                            </div>
                                            <div>
                                                
                                                    {myId === profileOwner ? (
                                                        <NavDropdown className="dro" id="basic-nav-dropdown">
                                                            <NavDropdown.Item onClick={()=>{handleEliminarComent(c.id)}}>
                                                                Eliminar
                                                            </NavDropdown.Item>
                                                            <NavDropdown.Item onClick={handleEditarComent}>
                                                                Editar
                                                            </NavDropdown.Item>
                                                        
                                                        </NavDropdown>
                                                    ):(
                                                        <NavDropdown className="dro" id="basic-nav-dropdown">
                                                            
                                                            <NavDropdown.Item onClick={()=>{handleDenunciar(c.profesor.id,c.id)}}>
                                                                Denunciar
                                                            </NavDropdown.Item>
                                                        
                                                        </NavDropdown>
                                                    )}
                                                    
                                                    
                                                </div>  
                                        </div>

                                        ):(
                                            <div className='ComentAvaNameFlagCont2'>
                                               
                                            <div>
                                                {c.alumno?.picture==='sin foto' ? (
                                                    <div className='AvatarNameProf'>
                                                    <div>{c.alumno.name[0].toUpperCase()}</div>
                                                    
                                                </div>):(                        
                                                    <img src={c.alumno.picture} className='AvatarNameProf2'/>)}
                                            
                                            </div>
                                            <div>
                                                <span className='nameLAstnameBolder'>
                                                {c.alumno?.name && c.alumno?.lastname &&( <>{c.alumno.name} {c.alumno.lastname}</>)}
                                                </span>
                                                <br></br>
                                                {c.alumno?.country && (<>
                                                    <img src={c.alumno.country.flag} className='flagcarProfeComent' />
                                                    {c.alumno.country.name}
                                                </>)}
                                            </div>
                                            
                                            <div>
                                                {myId === profileOwner && (
                                                            <NavDropdown className="dro" id="basic-nav-dropdown">
                                                                <NavDropdown.Item onClick={()=>{handleEliminarComent(c.id)}}>
                                                                    Eliminar
                                                                </NavDropdown.Item>
                                                                <NavDropdown.Item onClick={()=>{handleDenunciar(c.alumno.id ,c.id)}}>
                                                                    Denunciar
                                                                </NavDropdown.Item>
                                                            
                                                            </NavDropdown>
                                                        )}
                                                {c.alumno.id === myId &&(
                                                    <NavDropdown className="dro" id="basic-nav-dropdown">
                                                        <NavDropdown.Item onClick={()=>{handleEliminarComent(c.id)}}>
                                                            Eliminar
                                                        </NavDropdown.Item>
                                                        <NavDropdown.Item onClick={handleEditarComent}>
                                                            Editar
                                                        </NavDropdown.Item>
                                                    
                                                    </NavDropdown>
                                                )}
                                               
                                                {c.alumno?.id !== myId && myId!==profileOwner && (
                                                    <NavDropdown className="dro" id="basic-nav-dropdown">
                                                        
                                                        <NavDropdown.Item onClick={()=>{handleDenunciar(c.alumno.id ,c.id)}}>
                                                            Denunciar
                                                        </NavDropdown.Item>
                                                    
                                                    </NavDropdown>
                                                )}
                                            
                                            </div>

                                        </div>
                                        )}
                                         <EditarComent show={show2}
                                                    placeholder={c.contenido}
                                                    comentId={c.id} 
                                                    handleClose={handleClose2} 
                                                    profileOwner={profileOwner}/>
                                        
                                        <div className='contComentCont2'>
                                            {c.contenido}
                                        </div> 

                               </div>

                                                 
                                
                    
                        </div>
                    ):(<div>
                       <button onClick={handleShowMore} className='showMorecoments'>
                        ...
                       </button>
                    </div>)}
                    </>
                ))}
              
               
            </div>
        )}
        </>
    )
}