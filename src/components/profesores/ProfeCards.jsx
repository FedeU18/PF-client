import React from 'react'
import img from "./img/profecard.jpg"
function ProfeCards({nombre,descripcion,imagen,materias}) {
  
  var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
  
  
  return (
    <div className='card'>
         
        <div>
        <img className='cardImg' src={regexUrl.test(imagen) ? imagen : img} alt="File Not Found" width="250px" height="200px" />
        </div>
        <div className='card-body'>

        
          <div >
           <h3 className='card-title' style={{textDecoration:"none"}} >{nombre}</h3>
          </div>

           <div className='genreContainer'>
           <h5 className='cardGenre'>{ materias.map(e=>e.name)}</h5>
           </div>
           
          <div className='r'>
           <p className='card-text'>{descripcion}</p>
         </div>

         </div>
    </div>
  )
}

export default ProfeCards