import './Comentarios.css'
import { Comentario } from '../Comentario/Comentario'
export const Comentarios=({coments,myId,profileOwner})=>{
    return(
        <div className='ComentariosCont'>
            {coments?.length>0 && coments.map(c=>(
                <Comentario
                    myId={myId}
                    profileOwner={profileOwner}
                    idComent={c.id}
                    contenido={c.contenido}
                    likes={c.likes}
                    alumno={c.alumno}
                    coments={c.coments}
                />
            ))}
        </div>
    )
}