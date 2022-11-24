import React, { useState } from 'react'
import FormStudent from "../../components/FormStudent/FormStudent"
import FormTeacher from '../../components/FormTeacher/FormTeacher'

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
    <div>
        <button onClick={e=>handleTeacher(e)}>Teacher</button>
        <button onClick={e=>handleStudent(e)}>Student</button>
        {form ?
        <FormStudent />
        :
        <FormTeacher />}
        </div>
  )
}

export default Registro