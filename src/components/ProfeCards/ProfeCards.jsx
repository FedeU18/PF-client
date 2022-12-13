import { ProfeCard } from "../ProfeCard/Profecard";
import "./ProfeCards.css";
import { Link } from "react-router-dom";
export const ProfeCards = ({ profes, msgUsuariosAlumno, socket }) => {
  return (
    <div className="ProfeCardsCont">
      {profes && profes.length > 0 ? (
        profes?.map((e, index) => {
          let active = msgUsuariosAlumno.includes(e.nombre);

          return e.Error ? (
            <h4 key={index}>profesor no encontrado</h4>
          ) : (
            <div className="homeProfeCard" key={index}>
              <ProfeCard
                socket={socket}
                active={active}
                id={e.id}
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
        <div>
          <h1 className="3">Cargando...</h1>
        </div>
      )}
    </div>
  );
};
