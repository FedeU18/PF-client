import React, {useState} from 'react'
import Calendar from 'react-calendar'
import './Calendario.css'
import { postFecha } from '../../redux/Actions/Fecha'
import { useDispatch } from 'react-redux'


const Calendario = () => {
    const [date,onChange] = useState(new Date())
    const [reserva, setReserva] = useState({
        fecha: "",
        hora: "",
        habilitado: false,
        idProfesor: "",
        idAlumno:""
    })

    const dispatch = useDispatch()

    const handleHora = (e) => {
        e.preventDefault()
        setReserva({
            ...reserva,
            hora: e.target.value
        })
    }

    const handleFecha = (e) => {
        setReserva({
            ...reserva,
            fecha: e.getDate() + "-" + (e.getMonth() +1 ) +"-" +e.getFullYear()
        })
        console.log(reserva.fecha)
    }


    const handleSubmitFecha = (e) => {
        e.preventDefault;
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
        <div>
            <h2>Horario: </h2>
            <button onClick={(e)=>handleHora(e)} value="12:00-13:00">12:00-13:00</button>
            <button onClick={(e)=>handleHora(e)} value="15:00-16:00">15:00-16:00</button>
            <button onClick={(e)=>handleHora(e)} value="17:00-18:00">17:00-18:00</button>
        </div>
        <div>
            <h2>Tu reserva: </h2>
            <div>Fecha: {reserva.fecha}</div>
            <div>Hora: {reserva.hora}</div>
            <div>Precio: 15$</div>
        </div>
        <button disabled={reserva.fecha === "" || reserva.hora === ""} onClick={(e)=> handleSubmitFecha(e)}>Reservar</button>
      </div>
    );
}

export default Calendario