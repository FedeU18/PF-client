
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "../../components/Nav/Nav";
import { allProfes } from "../../redux/Actions/Profesor";
import ProfeCards from "../../components/profesores/ProfeCards";


export const Home=()=>{
    
  const dispatch = useDispatch()
  const profes =useSelector(state=>state.profesores)  //todo el estado de profes 


    useEffect(()=>{
    dispatch(allProfes())
    },[dispatch])

    
    
    
    
    return(




        <div>
            <NavBar/>
            Home.




            <div className="homeCardContainer">

                 {
                    profes.length ? 
                    profes?.map(e=>{
                        return (
                            e.Error? <h4>profesor no encontrado</h4> :
                            <div className="homeProfeCard" key={e.id}>

                              <ProfeCards nombre={e.nombre} imagen={e.imagen} pais={e.pais} descripcion={e.descripcion} materias={e.materias} />
                   
                            </div>
                        )
                    }) :
                    <div><h1>Cargando...</h1></div>
                 }

            </div>

         

        </div>
    )
}