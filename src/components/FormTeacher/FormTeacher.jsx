import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './FormTeacher.css'
import {postProfesor} from '../../redux/Actions/Profesor'
import registerUser from '../../Authentication/functions/registerUser'
import { useDispatch, useSelector } from 'react-redux'
import {getMaterias} from '../../redux/Actions/Materias'
import {getPaises} from '../../redux/Actions/Paises'

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
    puntuacion:[1],
    precio: '',
    estudios: [],
    materias: [],
    pais: []
  })
  const navigate = useNavigate()
  const materias = useSelector(state=> state.materias.materias)
  const paises = useSelector(state=>state.paises.paises)
  const dispatch = useDispatch()
  const [globalMessage, setGlobalMessage] = useState("")

  useEffect(()=>{
    dispatch(getPaises())
    dispatch(getMaterias())
  },[])

  const handleOnChange = (e)=>{
    setTeacher({
      ...teacher,
      [e.target.name]:e.target.value
    })
  }
  
  const handleSelectMaterias=(e)=>{
    setTeacher({
      ...teacher,
      materias: [...teacher.materias,Number(e.target.value)]
    })
    console.log(e.target.value)
  }

  const handleSelectPaises=(e)=>{
    setTeacher({
      ...teacher,
      pais: [...teacher.pais, e.target.value]
    })
  }

  const handleEstudios=(e)=>{
    setTeacher({
      ...teacher,
      estudios: [...teacher.estudios, e.target.value]
    })
  }

  const handleOnClick = async(e) => {
    e.preventDefault()
    dispatch(postProfesor(teacher))
    const userLogin = await registerUser(teacher.email, teacher.contraseña, teacher)

    if (typeof userLogin === "string") {
      setGlobalMessage(userLogin)
      setTimeout(() => {
        setGlobalMessage("")
      }, 10000);
      return;
    }
    navigate("/home")
  }

  const handleClose = (e) => {
    e.preventDefault()
    setTeacher({
      ...teacher,
      materias: teacher.materias.filter(m=>{
        return m !== Number(e.target.value)
      })
    })
    console.log(e.target)
  }

  return (
    <div>
      <form className='form'>
        <h3>¡Registrate como profesor!</h3>
        {globalMessage && <p>{globalMessage}</p>}
        <div className='label-input'>
          <label>Nombre</label>
          <input onChange={(e)=>handleOnChange(e)} type="text" name='nombre' value={teacher.nombre} placeholder="Nombre"/>
        </div>
        <div className='label-input'>
          <label>Apellido</label>
          <input onChange={(e)=>handleOnChange(e)} type="text" name='apellido' value={teacher.apellido} placeholder="Apellido"/>
        </div>        
        <div className='label-input'>
          <label>Email</label>
          <input onChange={(e)=>handleOnChange(e)} type="email" name='email' value={teacher.email} placeholder='Email'/>
        </div>
        <div className='label-input'>
          <label>Contraseña</label>
          <input onChange={(e)=>handleOnChange(e)} type="password" name='contraseña' value={teacher.contraseña} placeholder="Contraseña" />
        </div>
        <div className='label-input'>
          <label>Username</label>
          <input onChange={(e)=>handleOnChange(e)} type="text" name='username' value={teacher.username} placeholder='Username'/>
        </div>
        <div className='label-input'>
          <label>Foto de perfil</label>
          <input onChange={(e)=>handleOnChange(e)} type="text" name='imagen' value={teacher.imagen} placeholder="Foto de perfil(url)"/>
        </div>
        <div className='label-input'>
          <label>Descripción</label>
          <textarea onChange={(e)=>handleOnChange(e)} type="text" name='descripcion' value={teacher.descripcion} placeholder="Descripcion"/>
        </div>
        <div className='label-input'>
          <label>¿Cuanto cuestan tus clases?</label>
          <input onChange={(e)=>handleOnChange(e)} type="text" name='precio' value={teacher.precio} placeholder="Precio(USD)" />
        </div>
        <div className='label-input'>
          <label>Tus estudios</label>
          <input onChange={(e)=>handleEstudios(e)} type="text" name='estudios' value={teacher.estudios} placeholder="estudios" />
        </div>
        <div>¿Que enseñas?</div>
        <select onChange={(e)=>handleSelectMaterias(e)}>
          {materias.length && materias.map(m=>{
            return(
              <option key={m.id} value={m.id}>{m.name}</option>
            )
          })

          }
        </select>
        {teacher.materias.length ? teacher.materias.map((m)=>{
          return (
            <button type='button' onClick={(e)=> handleClose(e)} value={m} key={m}>{m}</button>
          )
        }):<></>}
        <div>Tu país</div>
          <select onChange={(e)=>handleSelectPaises(e)}>
            {paises.length && paises.map(p=>{
              return(
                <option key={p.id} value={p.name}>{p.name}</option>
              )
            })}
          </select>
        <button type='submit' onClick={(e)=>handleOnClick(e)}>Register</button>
      </form>
    </div>
  )
}

export default FormTeacher
