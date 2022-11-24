import logOut from "../../Authentication/functions/logOut"
import { NavBar } from "../../components/Nav/Nav"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Authentication/context/AuthContext"
import { useEffect } from "react";
import { Filtros } from "../../components/Filtros/Filtros";
import {BsFillGrid3X3GapFill } from "react-icons/bs";
import './Home.css'
import { useEffect, useState } from "react";
import { getMaterias } from "../../redux/Actions/Materias";
import { getPaises} from "../../redux/Actions/Paises"
import { addOPSelected } from "../../redux/Actions/Materias"; 
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { allProfes } from "../../redux/Actions/Profesor";
import ProfeCards from "../../components/profesores/ProfeCards";

export const Home=()=>{
    const [open , setOpen]=useState(false)
     const auth = useAuth()
    const dispatch= useDispatch()
    const filtrosSeleccionados=useSelector(state=> state.materias.filtrosSeleccionados)
     const user = useContext(AuthContext)
    const navigate = useNavigate()
    const profes =useSelector(state=>state.profesores)  //todo el estado de profes 
    
    useEffect(()=>{
    dispatch(allProfes())
    },[dispatch])
    
    const CloseMySesion = () => {
        logOut()
        navigate("/")
    }

    console.log(filtrosSeleccionados)
    const handleFiltros=()=>{
        setOpen(true)
    }
    const handleCloseFiltros=(set)=>{
        setOpen(set)
    }

    useEffect(()=>{
        dispatch(getMaterias())
        dispatch(getPaises())
    })
    
    const handleDeleteOpSelec=(e)=>{
        
        dispatch(addOPSelected({...filtrosSeleccionados,
            materias:filtrosSeleccionados.materias.filter(f=>f!==e.target.name)}))
    }

    const handleDelOp=(e)=>{
        dispatch(addOPSelected({...filtrosSeleccionados,
                [e.target.name]:''}))
    }

    return(
    <div>
        <div >
            <NavBar/>
            <button className="filtroBtn">
                <BsFillGrid3X3GapFill onClick={handleFiltros}  /> 
            </button>
            {filtrosSeleccionados.materias?.length>0 ? filtrosSeleccionados.materias.map((f)=>(
                <button className="btnListOpSelected" 
                        name={f}
                        onClick={handleDeleteOpSelec}>
                  X {f}      
                </button>
            )):(<button className="btnListOpSelected" > Todas las materias </button>) }

            {filtrosSeleccionados.pais && filtrosSeleccionados.pais!==''?(
                <button className="btnListOpSelected"
                        name="pais"
                        onClick={handleDelOp}>
                     X {filtrosSeleccionados.pais} 
                </button>)
                :(<button className="btnListOpSelected" > Todos los paises </button>) }

            {filtrosSeleccionados.puntuacion && filtrosSeleccionados.puntuacion!==''&&(
                <button className="btnListOpSelected"
                        name="puntuacion" 
                        onClick={handleDelOp}> 
                X {filtrosSeleccionados.puntuacion}                 
                </button>) }

            {filtrosSeleccionados.precio && filtrosSeleccionados.precio!==''&&(
                <button className="btnListOpSelected" 
                        name="precio"
                        onClick={handleDelOp}> 
                X {filtrosSeleccionados.precio} </button>) }

            <Filtros open={open} close={handleCloseFiltros}/>
            <br></br>
           <button
                className="btn btn-danger btn-sm"
                onClick={CloseMySesion}>
                Log out
            </button>

            <div className="homeCardContainer">
                {
                    profes.length ?
                        profes?.map(e => {
                            return (
                                e.Error ? <h4>profesor no encontrado</h4> :
                                    <div className="homeProfeCard" key={e.id}>

                                        <ProfeCards nombre={e.nombre} imagen={e.imagen} pais={e.pais} descripcion={e.descripcion} materias={e.materias} />

                                    </div>
                            )
                        }) :
                        <div><h1>Cargando...</h1></div>
                }
            </div>

            </div>
        </div>
    )
}