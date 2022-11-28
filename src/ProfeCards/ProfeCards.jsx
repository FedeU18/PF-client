import { ProfeCard } from "../ProfeCard/Profecard"
import './ProfeCards.css'
import { Link } from "react-router-dom"
export const ProfeCards = ({ profes }) => {
  console.log(profes)
<<<<<<< HEAD
    return (
        <div  className="ProfeCardsCont">
            {profes && profes.length>0 ?  (
            profes?.map((e) => {
              return e.Error ? (
                <h4>profesor no encontrado</h4>
              ) : (
                <div className="homeProfeCard col-md-3" key={e.id}>
                 {/* <Link to={"/profesores/"+ e.id }>   cambie el link a el otro componente para usar la foto  */}
                  <ProfeCard
                    id={e.id}
                    username={e.username}
                    nombre={e.nombre}
                    imagen={e.imagen}
                    pais={e.country?.flag}
                    descripcion={e.descripcion}
                    materias={e.materias}
                    puntuacion={e.puntuacion}
                    precio={e.precio}
                    
                  />
                  {/* </Link> */}
                </div>
              );
            })
=======
  return (
    <div className="ProfeCardsCont">
      {profes && profes.length > 0 ? (
        profes?.map((e, index) => {
          return e.Error ? (
            <h4 key={index}>profesor no encontrado</h4>
>>>>>>> develop
          ) : (
            <div className="homeProfeCard" key={index}>
              <Link to={"/profesores/" + e.id}>
                <ProfeCard
                  username={e.username}
                  nombre={e.nombre}
                  imagen={e.imagen}
                  pais={e.country?.flag}
                  descripcion={e.descripcion}
                  materias={e.materias}
                  puntuacion={e.puntuacion}
                  precio={e.precio}
                />
              </Link>
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