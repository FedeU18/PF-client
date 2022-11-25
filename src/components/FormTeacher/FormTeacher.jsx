import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './FormTeacher.css'
import {postProfesor} from '../../redux/Actions/Profesor'
import registerUser from '../../Authentication/functions/registerUser'
import { useDispatch, useSelector } from 'react-redux'
import {getMaterias} from '../../redux/Actions/Materias'

const FormTeacher = () => {
  const [teacher,setTeacher] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    rol: 'teacher',
    username: '',
    imagen: '',
    descripcion: '',
    precio: '',
    estudios: '',
    materias: ''
  })
  const navigate = useNavigate()
  const materias = useSelector(state=> state.materias.materias)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getMaterias())
  },[])

  const handleOnChange = (e)=>{
    setTeacher({
      ...teacher,
      [e.target.name]:e.target.value
    })
  }
  
  const handleSelect=(e)=>{
    setTeacher({
      ...teacher,
      materias: e.target.value
    })
  }

  const handleOnClick = (e) => {
    e.preventDefault()
    dispatch(postProfesor(teacher))
    registerUser(teacher.email,teacher.contraseña, teacher)
    navigate("/home")
  }

  return (
    <div>
      <form className='form'>
        <h3>¡Registrate como profesor!</h3>
        <div>
          <input onChange={(e)=>handleOnChange(e)} type="text" name='nombre' value={teacher.nombre} placeholder="Nombre"/>
          <input onChange={(e)=>handleOnChange(e)} type="text" name='apellido' value={teacher.apellido} placeholder="Apellido"/>
        </div>
        <input onChange={(e)=>handleOnChange(e)} type="email" name='email' value={teacher.email} placeholder='Email'/>
        <input onChange={(e)=>handleOnChange(e)} type="password" name='contraseña' value={teacher.contraseña} placeholder="Contraseña" />
        <input onChange={(e)=>handleOnChange(e)} type="text" name='username' value={teacher.username} placeholder='Username'/>
        <input onChange={(e)=>handleOnChange(e)} type="text" name='imagen' value={teacher.imagen} placeholder="Foto de perfil(url)"/>
        <textarea onChange={(e)=>handleOnChange(e)} type="text" name='descripcion' value={teacher.descripcion} placeholder="Descripcion"/>
        <input onChange={(e)=>handleOnChange(e)} type="text" name='precio' value={teacher.precio} placeholder="Precio" />
        <input onChange={(e)=>handleOnChange(e)} type="text" name='estudios' value={teacher.estudios} placeholder="estudios" />

        <select onChange={(e)=>handleSelect(e)}>
          {materias.length && materias.map(m=>{
            return(
              <option key={m.id} value={m.name}>{m.name}</option>
            )
          })

}
        </select>

        <button type='submit' onClick={(e)=>handleOnClick(e)}>Register</button>
      </form>
    </div>
  )
}

export default FormTeacher