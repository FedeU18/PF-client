import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import {MdOutlineFavoriteBorder} from "react-icons/md";
import {MdOutlineFavorite} from "react-icons/md";
import { AiFillStar } from "react-icons/ai";


export const ProfeCard=({nombre,descripcion,imagen,precio,materias,puntuacion,username,pais})=> {
  var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
  const img='https://as01.epimg.net/epik/imagenes/2020/01/17/portada/1579264345_014526_1579264425_noticia_normal_recorte1.jpg'
  const [fav , setFav]=useState(false)
  return (
    <Card style={{ width: '18rem' , margin:'16px' }}>
     <img  src={imagen} className='cardAboutContImg' />
      <Card.Body>
        <Card.Title>
          <div className='usuarioCont'>
            <div className='AvatarNameProf'>
              <div>{username?.length>0 && (<>{username[0].toUpperCase()}</>)}</div>
            </div>
            <div className='nameUsuarioC'>
              {username}
            </div>
            <div>
              <img className='flagcarProfe' src={pais}/>
            </div>
          </div>
        </Card.Title>
        <Card.Text>
          {descripcion}
          <br></br>
          Enseña:   {materias?.length>0 && materias.map((m)=>(<span key={m.name} className='materiasNaCaPro'>  {m.name}  </span>))}
        </Card.Text>
        <div className='puncContCard'>
        <AiFillStar size={22} />
         <div className='puntProfCard'>{puntuacion},0</div>
        </div>
        <hr></hr>
        <div className='precioFavCont'>
          {fav?(
            <MdOutlineFavorite size={26} 
            onClick={()=>{setFav(!fav)}}
            style={{color:'rgb(253, 17, 49)' , cursor:'pointer' }}/>
          ):(
            <MdOutlineFavoriteBorder  onClick={()=>{setFav(!fav)}} size={26} style={{ cursor:'pointer' }} />
          )}
          <div>
            {precio} US$ por hora
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

