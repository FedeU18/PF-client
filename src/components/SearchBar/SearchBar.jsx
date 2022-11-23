import "./SearchBar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons"
import {useEffect, useState} from "react"


function SearchBar(){
    const [teacher, setTeacher] = useState("")
    
    function handleChange(e){
        e.preventDefault()
        setTeacher(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        if(teacher!==""){
            //dispachar accion
        }else{
            alert("Ingresa el nombre o la materia deseada.")
        }
    }
    

    

    {/*-------------------------------Renderizado-------------------------*/ }
    return (
    <div>
        <div className="containerInput">
        
        <input 
        className="form-control inputBuscar"
        placeholder="Busqueda por Nombre o Materia..."
        onChange={(e)=>handleChange(e)}
        />

        <button 
        className="btn btn-danger"
        type="submit"
        onClick={(e)=>handleSubmit(e)}>
        <FontAwesomeIcon icon = {faSearch}/>
        </button>
       
        </div>
   
    </div>
    )
}
export default SearchBar;