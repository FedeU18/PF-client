import { useState } from 'react';
import { useSelector } from 'react-redux';
import './SearchBar.css'
import { useNavigate } from 'react-router-dom';

export const SearchBar =()=>{
    const navigate = useNavigate();

    const allTeachers = useSelector((state)=>state.profesores.profesores)
    //console.log("Soy los allprofesores", allTeachers)
    //console.log("Soy los allprofesores[0].nombre:", allTeachers[0].nombre)
    const arrProfesores = allTeachers.map(ele=>ele.nombre)
    //console.log("Soy los arrProfesores-> ", arrProfesores)
    const [ sugerencias, setSugerencias ] = useState([])
    const [ text, setText] = useState('')
    //console.log("soy sugerencias",sugerencias)
//--------- FUNCION ------------------------------
const handleComplete=(nameTeacher)=>{
    let idTeach = allTeachers.find(el=>el.nombre==nameTeacher)
    //console.log("id: ", idTeach)
    let idLimpio = idTeach.id
    //console.log("idLimpio: ",idLimpio)
    navigate(`/profesores/${idLimpio}`)

}
//------------- MANIPULADOR  TECLA ARROW ↑ ↓ --------------------------------------------------------------
    const handleKeyDown = (e) => {  
        const posicion = sugerencias.indexOf(text)
        //console.log("soy la posicion actual", posicion)
        if( e.key === 'Enter' ) {            
          onSuggestHandler(text)
          e.preventDefault(); 
         }
         if( e.key === "ArrowUp" ){
             if(posicion>=0){
                setText(sugerencias[posicion-1])
            }
            else{                
                setText(sugerencias[sugerencias.length-1])
                }
            }
         if (e.key === "ArrowDown"){
            
             if(posicion<sugerencias.length){
                setText(sugerencias[posicion+1])               
            }
            if(posicion===sugerencias.length){   
                setText(sugerencias[posicion])
            }           
         }
       };
//-------------MANIPULADOR CAMBIAR INPUT--------------------------------------------------------------------------------------
        const onChangeInput=(text)=>{
            let matches = []
            let short = []
            if( text.length>0 ){
                matches = arrProfesores.filter( (name) =>{
                    const regex = new RegExp(`${text}`,"gi")
                    return name.match(regex)
            })
        }
        matches.map((m,i)=>{if(i<5){short.push(m)}})
        setSugerencias(short)
        setText(text)
    }
//---------------------------------------------------------------------------------------------------    
    const onSuggestHandler=(text)=>{       
       //deberia llevarme al detalle
        if(text.length>0){
        setText(text)
        handleComplete(text)
        console.log('va')
        setSugerencias([])        
       }       
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        // deberia llevarme al detalle
        console.log("deberia llevarme al detalle")
        onSuggestHandler(text)
    }
   
    return (
        <>
        <form className='searchform' onSubmit={(e)=>{onSubmitHandler(e)}}>
            <div className="searchInputWrapper">
                <input className="searchInput" 
                        type="text" 
                        placeholder='Buscar Nombre del Profesor...'
                        value={text}
                        onBlur={()=>{ setTimeout(()=>{setSugerencias([])},200)}}
                        onChange={(e)=>{onChangeInput(e.target.value)}}
                        onKeyDown={(e)=>{handleKeyDown(e)}}
                        >                
                </input>

                 <button type="submit" className="icon"><img className='lupa' src={'https://cdn-icons-png.flaticon.com/512/3917/3917754.png'} alt='search'/></button>
                
            </div>
            <div className='sugCont'>
                {sugerencias && sugerencias.map((sugName,i)=>(
                    <div  
                            key={sugName} 
                            id={sugerencias.length===i+1 ?'su':'else'}
                            className={`suggestion ${text===sugName&& 'sugestiononKey'}`}
                            onBlur={()=>{ setTimeout(()=>{setSugerencias([])},1)}}
                            onClick={()=>onSuggestHandler(sugName)}     
                    >
                        {sugName}
                    </div> 
                        ))}
            </div>
        </form>
        </>
    )

}
export default SearchBar;
