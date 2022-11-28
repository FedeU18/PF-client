import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Detalle.css";
import img from "../../view/PerfilProfesor/img/1.jpg"
import { clear, getProfesorById } from "../../redux/Actions/Profesor";
import { Link } from "react-router-dom";
import {AiFillStar} from "react-icons/ai";
import { NavBar } from "../../components/Nav/Nav"

export const Detalle = () => {
  let { id } = useParams();
  let dispatch = useDispatch();
  let details = useSelector((state) => state.profesores.detail);
  
  console.log(details);
  
  useEffect(() => {
    dispatch(getProfesorById(id));
    return ()=> dispatch(clear())
  }, []);
   
  
   return (
    <>

      <NavBar/>
           
           <div className="back"> 
               <Link to="/home">
                   <button> back </button>
              </Link>
            </div>
              

      <div className="firstContainer" key={details.id}>
         
      
 


          <div className="overflow">
             
              <img
            className="profImg"
            src={details.imagen ? details.imagen : img}
            alt=""
            width="200px"
            height="200px"
             />
           </div> 
       
         <div className="detailContainer">
         

          <div className="nameeDetail">
            <h1>{details.nombre} {details.apellido} </h1>
             <br />
            
             <div className="detailemail">
              <strong>Email: </strong> {details.email}{" "}
            </div>
            <br />
            <p>
              <strong>materias:</strong>
              {details.materias?.map((e) => e.name).join(", ")}
            </p>


             <div className="descrip">
               <strong>Sobre mi: </strong>
                {
                <p 
                  dangerouslySetInnerHTML={{ __html: details.descripcion }}
                ></p>
              }
               </div>


            <div className="puntaje">
              {" "}
              <strong> puntaje:</strong>{" "}
               <AiFillStar size={22} />
              <p className="ratingDetails">{details.puntuacion},0</p>{" "}
            </div>
           
            
             
            
        
           
          </div>
        
        </div>
         
           <div className="elegir"> 
            <h1 className="letra">por que elegirme?</h1>
            </div>


            <div className="elegir-dos">
              <h5 className="letra-dos"> {details.descripcion} </h5>
            </div>
           

        
        
        <div className="boton">
            <button>Pedir una clase</button>
            </div>
             
            
        
      </div>
      
    </>
  );
};
