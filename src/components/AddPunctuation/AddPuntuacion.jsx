import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiSendPlaneFill } from "react-icons/ri";
import {createComent} from '../../redux/Actions/Comentarios'
import { useDispatch } from 'react-redux';
import { AiFillStar } from "react-icons/ai";
import { createPunctuationprofe } from '../../redux/Actions/Comentarios';

export const AddPuntuacion=({show ,handleClose, alumnoId, profesorId ,myId})=> {
    const dispatch=useDispatch()
    const [stars,setStars]=useState(0)
    const [puntaje,setPuntaje]=useState(0)

   
    const handleSendComent=()=>{
      handleClose()
       dispatch(createPunctuationprofe(profesorId,{puntaje, profesorId, alumnoId:myId}))
       setPuntaje(0)
    }

  return (
    <>
      <Modal show={show} onHide={()=>{handleClose()}}>
        <Modal.Header closeButton>
          <Modal.Title>Añade Una Puntaje</Modal.Title>
        </Modal.Header>
        <div className='starsCont'>
          <button value={1} 
                  onMouseEnter={() => setStars(1)}
                  onMouseLeave={() => setStars(0)}
                  onClick={()=>{setPuntaje(1)}}
                  className={`starPunctuation ${stars>=1 || puntaje>=1 ?'fullStarPu':'noneStar'}`}>
            <AiFillStar size={34}/>
          </button>
          <button value={2} 
                   onMouseEnter={() => setStars(2)}
                   onMouseLeave={() => setStars(0)}
                   onClick={()=>{setPuntaje(2)}}
                  className={`starPunctuation ${stars>=2 || puntaje>=2 ?'fullStarPu':'noneStar'}`}>
            <AiFillStar size={34}/>
          </button>
          <button value={3} 
                   onMouseEnter={() => setStars(3)}
                   onMouseLeave={() => setStars(0)}
                   onClick={()=>{setPuntaje(3)}}
                  className={`starPunctuation ${stars>=3 || puntaje>=3 ?'fullStarPu':'noneStar'}`}>
            <AiFillStar size={34}/>
          </button>
          <button value={4} 
                   onMouseEnter={() => setStars(4)}
                   onMouseLeave={() => setStars(0)}
                   onClick={()=>{setPuntaje(4)}}
                  className={`starPunctuation ${stars>=4 || puntaje>=4 ?'fullStarPu':'noneStar'}`}>
            <AiFillStar size={34}/>
          </button>
          <button value={4} 
                   onMouseEnter={() => setStars(5)}
                   onMouseLeave={() => setStars(0)}
                   onClick={()=>{setPuntaje(5)}}
                  className={`starPunctuation ${stars>=5 || puntaje>=5 &&'fullStarPu'}`}>
                  
            <AiFillStar size={34}/>
          </button>
          
        </div>
        
        <Modal.Footer>
          <button  onClick={()=>{handleSendComent()
                            }}  className='btnSEndComment'>
            <RiSendPlaneFill />
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}