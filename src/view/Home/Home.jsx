import logOut from "../../Authentication/functions/logOut"
import { NavBar } from "../../components/Nav/Nav"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../Authentication/context/AuthContext"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProfes } from "../../redux/Actions/Profesor";
import ProfeCards from "../../components/profesores/ProfeCards";

export const Home = () => {
    const user = useContext(AuthContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const profes =useSelector(state=>state.profesores)  //todo el estado de profes 
    
    useEffect(()=>{
    dispatch(allProfes())
    },[dispatch])
    
    const CloseMySesion = () => {
        logOut()
        navigate("/")
    }

    return(
        <div>
            <NavBar />
            <button
                className="btn btn-danger btn-sm"
                onClick={CloseMySesion}>
                Log out
            </button>

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