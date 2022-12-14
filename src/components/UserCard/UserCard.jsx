import "./UserCard.css"
import { BanearUsuario } from '../BanearUsuario/BanearUsuario';
import { useState } from "react";
export const UserCard=({id , nombre, apellido , username, tipo, baneado,imagen})=>{
    const [show ,setShow]=useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <div className="UserCardCont">
             <BanearUsuario show={show}
                        demandado={id}
                        handleClose={handleClose} 
                         />
            <div className="CenterUserCard">
                <img src={imagen} className='profileImgUserC'/>
                <br></br>
                <span className="usernameUserC">{username}</span>
                <br></br>
                <span>{nombre} {' '+apellido}</span>
                <br></br>
                <button className='button-34' onClick={()=>{handleShow()}}> 
                    
                        Banear Usuario
                    
            </button>
            </div>
        </div>
    )
}