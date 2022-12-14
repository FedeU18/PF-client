import React from "react";
import { useSelector } from "react-redux";
import MateriaBox from "./MateriaBox";
import { useNavigate } from "react-router-dom";

function MateriasBtn() {
  const materias = useSelector((state) => state.materias.materias);
  const navigate = useNavigate();

  const handleMateria = (name) => {
    navigate(`/home/${name}`);
  };

  return (

<div className="materiasBTNCont">

      {materias.length > 0 &&
        materias.map((el, index) => (
          <MateriaBox
            key={index}
            image={`/${el.name}.png`}
            name={el.name}
            myOnClick={() => handleMateria(el.name)}
          />
        ))}
    </div>
  );
}

export default MateriasBtn;
