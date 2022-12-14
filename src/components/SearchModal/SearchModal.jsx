import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { clearAction ,getMatches} from '../../redux/Actions/Profesor';
import './SearchModal.css'
import { UserCard } from '../UserCard/UserCard';
import Spinner from 'react-bootstrap/Spinner';

export const BuscarModal= ({lgShow , lgHide})=> {
    const[searchConfirm , setSearchConfirm]=useState(false)
    const [text,setText]=useState('')
    const[suggestions , setSuggestions]=useState([])
    const allUsernames=useSelector(state=>state.profesores.allUsernames)
    const matchesProAlu=useSelector(state=>state.profesores.matches)
   
    const dispatch=useDispatch()

    console.log(matchesProAlu)

    
    const onSuggestHandler=(text)=>{
        dispatch(clearAction('matches',[])) 
        setText(text)
        setSuggestions([])
        setSearchConfirm(true)
        dispatch(getMatches(text))
      
    }
    const handleKeyDown = (e) => {
        const posicion = suggestions.indexOf(text);
        if (e.key === "Enter") {
          onSuggestHandler(text);
          e.preventDefault();
        }
        if (e.key === "ArrowUp") {
          if (posicion >= 0) {
            setText(suggestions[posicion - 1]);
          } else {
            setText(suggestions[suggestions.length - 1]);
          }
        }
        if (e.key === "ArrowDown") {
          if (posicion < suggestions.length) {
            setText(suggestions[posicion + 1]);
          }
          if (posicion === suggestions.length) {
            setText(suggestions[posicion]);
          }
        }
      };

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        onSuggestHandler(text)
    }
    const onChangeInput=(text)=>{
        let matches=[]
        let short=[]
        if(text.length>0){
            matches=allUsernames.filter(name=>{
                
                const regex= new RegExp(`${text}`,"gi")
                return name.match(regex)
            })
        }
        matches.map((m,i)=>{if(i<5){short.push(m)}})
        setSuggestions(short)
        setText(text)
    }
    
    const onClose=()=>{
        setSearchConfirm(false)
        dispatch(clearAction('matches',[]))
    }

  return (
    <>     

      <Modal
        style={{backgroundColor:'rgb(255, 255, 255,0.05)'}}
        size="lg"
        show={lgShow}
        onHide={() => lgHide()}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Buscar Usuario
          </Modal.Title>
        </Modal.Header>
        <div className='allMatchesCont'>
            <div className='SearchAdmiCont contenedorWrapper position-relative'>                    
                <div className="search-input">
                <div className="position-relative bg-light rounded-5 p-1">
                    <input
                    className="searchInput form-control rounded-5 border-0 fs-5 p-1"
                    type="text"
                    placeholder="buscar.."     
                    style={{ marginLeft: ".3rem" }}
                    onBlur={()=>{ setTimeout(()=>{setSuggestions([])},200)}}
                    onChange={(e)=>{onChangeInput(e.target.value)}}
                    onKeyDown={(e)=>{handleKeyDown(e)}}
                    value={text}
                    ></input>

                    <button
                    type="submit"
                    className="btn position-absolute"
                    style={{ top: "5px", right: "5px" }}
                    >
                    <FaSearch className="text-primary fs-5" />
                    </button>
                </div>
                </div>
                <div
                style={{ zIndex: "1000" }}
                className="mt-1 position-absolute w-100 bg-light text-dark rounded-1 dark_sugerencias"
                >
                {suggestions &&
                    suggestions.map((sugName) => (
                    <div
                        key={sugName}
                        style={{with:'100px'}}
                        className={`p-1 hover-searchbar-options sugerencia_option`}
                        onBlur={() => {
                        setTimeout(() => {
                            setSuggestions([]);
                        }, 1);
                        }}
                        onClick={() => onSuggestHandler(sugName)}
                    >
                        {sugName}
                    </div>
                    ))}
                </div>
            </div>
            {Object.entries(matchesProAlu).length=== 0 && searchConfirm===false &&(
                <div>

                </div>
            )}
            {Object.entries(matchesProAlu).length=== 0 && searchConfirm===true && (
                <div className='NOTFoundBanner'>
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
           {Object.entries(matchesProAlu).length> 0 && searchConfirm===true && (
                <div className='allUsersSEarchCont'>
                     <div>
                        <span>Profesores:</span>
                        {matchesProAlu.Profesor?.length>0?(
                            <div  className='UserCArdsCont'>
                            {
                                 matchesProAlu.Profesor.map((m)=>(
                                    <div>
                                        <UserCard id={m}
                                                nombre={m.nombre}
                                                apellido={m.apellido}
                                                username={m.username} 
                                                tipo={m.tipo} 
                                                baneado={m.baneado} 
                                                imagen={m.imagen}/>
                                    </div>
        
                                ))

                            }
                            </div>
                        ):(
                            <div className='NOTFoundBanner'>
                                    No hay ningún profesor con ese nombre.
                            </div>
                        )}
                    </div>
                    <div>
                        <br></br>
                        <span>Alumnos:</span>
                        {matchesProAlu.Alumno?.length>0?(
                            <div  className='UserCArdsCont'>
                            {
                                 matchesProAlu.Alumno.map((m)=>(
                                    <div>
                                        <UserCard id={m.id}
                                   nombre={m.name}
                                   apellido={m.lastname}
                                   username={m.username} 
                                   tipo={m.tipo} 
                                   baneado={m.baneado} 
                                   imagen={m.picture}/>
                                    </div>
        
                                ))

                            }
                            </div>
                        ):(
                            <div className='NOTFoundBanner'>
                                No hay ningún alumno con ese nombre.                            
                            </div>
                        )}
                       
                    </div>
                </div>
            )}
            
           
        </div>
      </Modal>
    </>
  );
}