import React from 'react'
import img from "./img/profecard.jpg"
import "./card.css";

function ProfeCards({nombre,descripcion,imagen,materias,puntuacion}) {
  
  var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
  
  
  return (
    <div className="card text-center bg-dark" >
         
        <div className="overFlow">
        <img className='card-img-top' src={regexUrl.test(imagen) ? imagen : img} alt="File Not Found" width="250px" height="200px" />
        </div>
        <div className='card-body text-light'>

        
          <div >
           <h3 className='card-title' style={{textDecoration:"none"}} >{nombre}</h3>
          </div>

           <div className='genreContainer'>
           <h5 className='cardGenre'>{ materias.map(e=>e.name)}</h5>
           </div>
           
          <div className='descrip'>
           <p className='card-text'>{descripcion}</p>
         </div>
          
          <div >
           <h5>{ puntuacion.map(e=>e)}</h5>
          </div>

          <a href="#!" className="btn btn-outline-secondary">Contactar</a>
           

         </div>
    </div>
  )
}

export default ProfeCards