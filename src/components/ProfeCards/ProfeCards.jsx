import { ProfeCard } from "../ProfeCard/Profecard";
import "./ProfeCards.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

export const ProfeCards = ({ profes, msgUsuariosAlumno, socket }) => {
  const repeat =[1,2,3,4,5,6,7,8]
  return (
    <div className="ProfeCardsCont">
      {profes && profes.length > 0 ? (
        profes?.map((e, index) => {
          let active = msgUsuariosAlumno?.includes(e.nombre);
          return e.Error ? (

            <h4 key={index}>profesor no encontrado</h4>
          ) : (
            <div className="homeProfeCard" key={index}>
              <ProfeCard
                id={e.id}
                active={active}
                msgUsuariosAlumno={msgUsuariosAlumno}
                username={e.username}
                nombre={e.nombre}
                imagen={e.imagen}
                pais={e.country?.flag}
                descripcion={e.descripcion}
                materias={e.materias}
                puntuacion={e.puntuacions}
                precio={e.precio}
              />
            </div>
          );
        })
      ) : (
        <div className="ProfeCardsCont">
          
          {repeat.map((r)=>(
            <Card style={{ width: '14rem'  ,heigth:'20rem'}}>
            <Card.Img variant="top" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png" />
            
            <Placeholder as="p" animation="glow">
              <Placeholder xs={8} />
              
            </Placeholder>
              
            
          </Card>
          ))}
        
        
          
        </div>
      )}
    </div>
  );
};
