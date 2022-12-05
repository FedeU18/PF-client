import React, {useEffect, useState} from 'react'
import Calendar from 'react-calendar'
import './Calendario.css'
import { postFecha, getFecha } from '../../redux/Actions/Fecha'
import { useDispatch, useSelector } from 'react-redux'
import userAuthenticate from '../../Authentication/functions/user'
import Table from 'react-bootstrap/Table'


const Calendario = ({profe}) => {
    const [date,onChange] = useState(new Date())
    const [reserva, setReserva] = useState({
        fecha: "",
        hora: "",
        habilitado: false,
        idProfesor: profe.id,
        idAlumno:""
    })

    useEffect(()=>{
        dispatch(getFecha())
    },[])

    const fechas = useSelector(state=> state.fechas.fechas)
    console.log("fechas: ", fechas)
    const user = userAuthenticate()
    const dispatch = useDispatch()
    const handleHora = (e) => {
        e.preventDefault()
        setReserva({
            ...reserva,
            hora: e.target.value,
            idAlumno: user.userData.id
        })
    }

    const handleFecha = (e) => {
        setReserva({
            ...reserva,
            fecha: e.getDate() + "-" + (e.getMonth() +1 ) +"-" +e.getFullYear()
        })
    }


    const handleSubmitFecha = (e) => {
        e.preventDefault();
        dispatch(postFecha(reserva))
    }
  
    return (
      <div>
        <div>
            <Calendar 
            onClickDay={(e)=>handleFecha(e)}
            value={date} 
            onChange={onChange}
            defaultView="month"  
            minDetail="month"
            maxDetail='month'
            />
        </div>
        <div className='all-horarios'>
            <div>
                <h2>Horario: </h2>
            </div>
            <div  className='horarios'>
                <button onClick={(e)=>handleHora(e)} value="12:00-13:00">12:00-13:00</button>
                <button onClick={(e)=>handleHora(e)} value="15:00-16:00">15:00-16:00</button>
                <button onClick={(e)=>handleHora(e)} value="17:00-18:00">17:00-18:00</button>
            </div>
        </div>
            <h2>Tu reserva: </h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <td>Fecha</td>
                    <td>Hora</td>
                    <td>Precio</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{reserva.fecha}</td>
                    <td>{reserva.hora}</td>
                    <td>{profe.precio + "$"}</td>
                </tr>
            </tbody>
        </Table>
        
        <div className='reserva'>
            <button disabled={reserva.fecha === "" || reserva.hora === ""} onClick={(e)=> handleSubmitFecha(e)}>Reservar</button>
        </div>
      </div>
    );
}

export default Calendario