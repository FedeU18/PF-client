
import React, { useState } from 'react'
import FormStudent from "../../components/FormStudent/FormStudent"
import FormTeacher from '../../components/FormTeacher/FormTeacher'
import './Registro.css'
const Registro = () => {
  const [form,setForm] = useState()

  const handleTeacher = (e) => {
    e.preventDefault()
    setForm(false)
  }
  const handleStudent = (e) => {
    e.preventDefault()
    setForm(true)
  }
  return (
    <div className='fondo'>
      <div className='forms'>
        <div className='buttons'>
          <button className='student' onClick={e=>handleTeacher(e)}>¿Querés enseñar?</button>
          <button className='teacher' onClick={e=>handleStudent(e)}>¿Querés aprender?</button> 
        </div>
          {form ?
          <FormStudent />
          :
          <FormTeacher />}
      </div>
    </div>
  )
}

export default Registro