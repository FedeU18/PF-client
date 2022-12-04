import React from "react";
import MateriaBox from "./MateriaBox";

//importar imagen o icono.
import { TbMathSymbols,TbGeometry } from 'react-icons/tb';
//importar materias
let materias = ["algebra","aritmetica","geometria","trigonometría","biología","quimica","fisica","geografia"];

function MateriasBtn(){
    return (
        <div id="features">
            <div className="contenedorDecajas">
                <MateriaBox icono = {<TbMathSymbols size={200} />} name={materias[0]}/>
                <MateriaBox icono = {<TbMathSymbols size={200} />} name={materias[1]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                <MateriaBox icono = {<TbGeometry size={200} />} name={materias[2]}/>
                
            </div>

        </div>
    )
}

export default MateriasBtn;