import React from 'react'
import { Link } from 'react-router-dom'
import img from "./img/3.png"
import "./error.css"


export const Error = () => {
  return (
    <div className='err'>
       
       <div className='letra'>
        <h1>404</h1>
        </div> 
       
          <div>
         <Link to="/home"> <img src={img} alt="" /> 
        </Link>
         </div>
        
      
     
      </div>
  )
}
