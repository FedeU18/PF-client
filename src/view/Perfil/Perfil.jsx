import {PerfilProfesor} from '../PerfilProfesor/PerfilProfesor'
import { PerfilAlumno } from '../PerfilAlumno/PerfilAlumno'

export const Perfil=()=>{
    const tipoUsuario='profesor'
    return(
        <>
            {tipoUsuario==='profesor'?(<PerfilProfesor/>):(<PerfilAlumno/>)}
        </>
    )
}