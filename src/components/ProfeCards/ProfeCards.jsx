import { ProfeCard } from "../ProfeCard/Profecard"
import './ProfeCards.css'
import { Link } from "react-router-dom"
export const ProfeCards = ({ profes }) => {
  console.log(profes)
  return (
    <div className="ProfeCardsCont">
      {profes && profes.length > 0 ? (
        profes?.map((e, index) => {
          return e.Error ? (
            <h4 key={index}>profesor no encontrado</h4>
          ) : (
            <div className="homeProfeCard" key={index}>
             
                <ProfeCard
                  id={e.id}
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
          <h1>Cargando...</h1>
        </div>
      )}
    </div>
  )
}