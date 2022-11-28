import { useDispatch, useSelector } from 'react-redux'
import './Filtros.css'
import { addOPSelected } from '../../redux/Actions/Materias';
import { useEffect, useState } from 'react';

export const Filtros = ({ open, close }) => {
    const dispatch = useDispatch()
    const materias = useSelector(state => state.materias.materias)
    const paises = useSelector(state => state.paises.paises)
    const filtrosSelecc = useSelector(state => state.materias.filtrosSeleccionados)



    const handleMaterias = (e) => {

        if (filtrosSelecc.materias.includes(e.target.name)) {

            dispatch(addOPSelected({
                ...filtrosSelecc,
                materias: filtrosSelecc.materias.filter(f => f !== e.target.name)
            }))

        }
        else {


            dispatch(addOPSelected({
                ...filtrosSelecc,
                materias: [...filtrosSelecc.materias, e.target.name]
            }))
        }

    }

    const handleOrdByPuntuacion = (e) => {
        console.log(e.target.name)


        if (e.target.name === '0') {
            dispatch(addOPSelected({
                ...filtrosSelecc,
                puntuacion: ''
            }))
        }
        if (e.target.name === '1') {
            dispatch(addOPSelected({
                ...filtrosSelecc,
                puntuacion: 'Puntuación de mayor a menor'
            }))
        }
        if (e.target.name === '2') {
            dispatch(addOPSelected({
                ...filtrosSelecc,
                puntuacion: 'Puntuación de menor a mayor'
            }))
        }
    }

    const handleOrdByPrecio = (e) => {

        if (e.target.name === '0') {
            dispatch(addOPSelected({
                ...filtrosSelecc,
                precio: ''
            }))
        }
        if (e.target.name === '1') {
            dispatch(addOPSelected({
                ...filtrosSelecc,
                precio: 'Precio de mayor a menor'
            }))
        }
        if (e.target.name === '2') {
            dispatch(addOPSelected({
                ...filtrosSelecc,
                precio: 'Precio de menor a mayor'
            }))
        }
    }

    const hadleOrdByPais = (e) => {
        console.log('gi')
        dispatch(addOPSelected({
            ...filtrosSelecc,
            pais: e.target.value
        }))
    }

    return (
        <div className={`${open ? 'filtrosContainerShow' : 'notShow'}`}>
            <button onClick={() => { close(false) }} className='filtCloseBtn'>
                X
            </button>
            <div className='FiltrosContent'>
                <span className='filtNames'>FILTRADO POR:</span>
                <br></br>
                <br></br>


                <span className='filtOrdNames'>MATERIAS</span>
                <div className='materiasContainer' >
                    {materias.length > 0 && materias.map((m, index) => (
                        <div className={`btnMaterias ${filtrosSelecc.materias.includes(m.name) && 'Materiaselected'}`}
                            name={m.name}
                            key={index}
                        >
                            <button className='btnMateriasImg'
                                name={m.name}
                                onClick={handleMaterias}
                                style={{ backgroundImage: `url(${m.name}.png)` }} >
                            </button>
                            <button className='btnMateriasNames'
                                name={m.name}
                                onClick={handleMaterias}>
                                {m.name}
                            </button>
                        </div>
                    ))}
                </div>


                <div className="container mt-3  containerPaisInpt">
                    <span className='filtOrdNames' >PAÍS</span>

                    <br></br>
                    <input onChange={hadleOrdByPais} className="inputPais" list="browsers" name="browser" id="browser" />
                    <datalist id="browsers">
                        {paises.length > 0 && paises.map((p, index) => (
                            <option value={p.name} key={index}></option>))}

                    </datalist>

                </div>


                <span className='filtNames'>ORDENAMIENTO POR:</span>
                <br></br>
                <br></br>

                <span className='filtOrdNames' >PUNTUACIÓN</span>
                <div className='opcionesCont'>

                    <button className={`opcionesContOp ${filtrosSelecc.puntuacion === '' && 'opcinSelected'}`}
                        name={0}
                        style={{ backgroundImage: `url(noFiltro.png)` }}
                        onClick={handleOrdByPuntuacion}>

                        Sin Filtro
                    </button>

                    <button className={`opcionesContOp ${filtrosSelecc.puntuacion === 'Puntuación de mayor a menor' && 'opcinSelected'}`}
                        name={1}
                        style={{ backgroundImage: `url(sort${1}.png)` }}
                        onClick={handleOrdByPuntuacion}>

                        De mayor a menor
                    </button>
                    <button name={2}
                        onClick={handleOrdByPuntuacion}
                        style={{ backgroundImage: `url(sort${0}.png)` }}
                        className={`opcionesContOp ${filtrosSelecc.puntuacion === 'Puntuación de menor a mayor' && 'opcinSelected'}`}>

                        De menor a mayor
                    </button>

                </div>

                <span className='filtOrdNames' >PRECIO</span>
                <div className='opcionesCont'>

                    <button className={`opcionesContOp ${filtrosSelecc.precio === '' && 'opcinSelected'}`}
                        name={0}
                        style={{ backgroundImage: `url(noFiltro.png)` }}
                        onClick={handleOrdByPrecio}>

                        Sin Filtro
                    </button>

                    <button className={`opcionesContOp ${filtrosSelecc.precio === 'Precio de mayor a menor' && 'opcinSelected'}`}
                        name={1}
                        style={{ backgroundImage: `url(sort${1}.png)` }}
                        onClick={handleOrdByPrecio}>

                        De mayor a menor
                    </button>
                    <button name={2}
                        onClick={handleOrdByPrecio}
                        style={{ backgroundImage: `url(sort${0}.png)` }}
                        className={`opcionesContOp ${filtrosSelecc.precio === 'Precio de menor a mayor' && 'opcinSelected'}`}>

                        De menor a mayor
                    </button>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}