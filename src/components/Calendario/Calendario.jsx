import './Calendario.css';
import Calendar from 'react-calendar'
import { useState } from 'react';

function Calendario() {
  const [date,onChange] = useState(new Date())

  const fecha = date.getDate()+ "-" + ( date.getMonth() + 1 ) + "-" + date.getFullYear()

  console.log(fecha)
  
  return (
    <div>
      <Calendar 
        defaultActiveStartDate={date} 
        value={date} 
        onChange={onChange}
        defaultView="month"  
        minDetail="month"
        maxDetail='month'
    />
    </div>
  );
}

export default Calendario;
