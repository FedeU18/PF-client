import { NavBar } from "../../components/Nav/Nav"
import { Filtros } from "../../components/Filtros/Filtros";
import {BsFillGrid3X3GapFill } from "react-icons/bs";
import './Home.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMaterias } from "../../redux/Actions/Materias";
import { getPaises} from "../../redux/Actions/Paises"
import { addOPSelected } from "../../redux/Actions/Materias"; 

export const Home=()=>{
    const [open , setOpen]=useState(false)
    const dispatch= useDispatch()
    const filtrosSeleccionados=useSelector(state=> state.materias.filtrosSeleccionados)

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
          

            
           
        </div>
    )
}