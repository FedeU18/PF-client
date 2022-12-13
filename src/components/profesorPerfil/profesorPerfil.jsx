import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { deleteProfesor, getProfesorById } from "../../redux/Actions/Profesor";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfesorPerfil = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfesorById(id));
  }, []);

  let info = useSelector((state) => state.profesores.detail);
  console.log(info);

  const DeleteProfesor = () => {
    alert("Esta seguro de eliminar su cuenta de profesor?");
    dispatch(deleteProfesor(id));
    navigate("/");
  };

  return (
    <div>
      {info.nombre ? (
        <div>
          <p>{info.id}</p>

          <div>
            <img src="./concluido.png" alt={info.imagen} />
          </div>

          <br />
          <br />
          <div>
            <h2>Informacion del Profesor</h2>
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Nombre</th>
                  <td>{info.nombre}</td>
                </tr>
                <tr>
                  <th scope="row">Apellido</th>
                  <td>{info.apellido}</td>
                </tr>
                <tr>
                  <th scope="row">Edad</th>
                  <td>{info.Edad}</td>
                </tr>

                <tr>
                  <th scope="row">Correo</th>
                  <td colSpan="2">{info.email}</td>
                </tr>
                <tr>
                  <th scope="row">Pais</th>
                  <td colSpan="2">{info.country.name}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button onClick={DeleteProfesor}>Eliminar Cuenta</button>
        </div>
      ) : (
        <h1 className="5">Cargando...</h1>
      )}
    </div>
  );
};

export default ProfesorPerfil;
