import {PerfilProfesor} from '../PerfilProfesor/PerfilProfesor'
import { PerfilAlumno } from '../PerfilAlumno/PerfilAlumno'

export const Perfil=()=>{
    const tipoUsuario='profesor'
   let {id} = useParams();
   
    return(
        <>
            {tipoUsuario==='profesor'?(<PerfilProfesor/>):(<PerfilAlumno/>)}
        </>
    )
}