import './About.css'
import { NavAbout } from '../../components/NavAbout/NavAbout'
import { CardsAbout } from '../../components/CardsAbout/CardsAbout'
export const About =()=>{
    return(
        <div className='abtCont'>
            <NavAbout/>
            
            <div className='aboutDesc'>
                <h1 className='aboutTitle'>Find your Teacher</h1>
                <div className='aboutdes'>
                    Find your teacher fue creado como una manera 
                    <br></br>
                    de ayudar a conectar a profesores de toda Latinoamerica
                    <br></br>
                     con  aquellos alumnos en busca de reforzar sus conocimientos en 
                     <br></br>
                     las materias de la escuela.
                </div>
            </div>
            <CardsAbout/>
        </div>
    )
}