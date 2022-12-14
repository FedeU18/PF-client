import './PerfilAdmi.css'
import { Card, Title, DonutChart ,BarList, Bold,Flex,Text,BarChart, Subtitle} from '@tremor/react';
import { useEffect, useState } from 'react';
import { allProfes,
        getUsersNames,
         getProfesorsBYMateria,
         getUsersByPais,
         getProfesorById } from '../../redux/Actions/Profesor';
import { getAllAlumnos } from '../../redux/Actions/Alumno';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { BuscarModal } from '../SearchModal/SearchModal';

export const PerfilAdmi=({id})=>{
    const dispatch=useDispatch()
    const [cities,setCities]=useState([])
    const [lgShow, setLgShow] = useState(false);
    const alumnos=useSelector((state)=> state.alumnos.alumnos)
    const profesores=useSelector((state)=> state.profesores.profesores)
    const profeByMateria=useSelector((state)=>state.profesores.profesoresBYMateria)
    const usuariosBYPais=useSelector((state)=>state.profesores.usuariosBYPais)
    let info = useSelector((state) => state.profesores.detail);

    const lgHide=()=>{
        setLgShow(false)
    }

    useEffect(()=>{
        dispatch(getProfesorById(id))
        dispatch(getAllAlumnos())
        dispatch(allProfes())
        dispatch(getProfesorsBYMateria())
        dispatch(getUsersByPais())
        dispatch(getUsersNames())
        
    },[])

    useEffect(()=>{
        if(alumnos.length>0 && profesores.length>0){
            setCities([{
                name: 'Profesores',
                sales: profesores.length,
            },
            {
                name: 'Alumnos',
                sales: alumnos.length,
            },])
        }
    },[alumnos, profesores])


    return(
        <div className='allADmiPErfil'>
            <BuscarModal lgShow={lgShow}  lgHide={lgHide}/>
        <div className="contAdmiFirstRow">
            <Link to="/home">
              <button className="goBackBtn">
                <img className="gobackArrowProf" src={"/retro.png"} />
              </button>
            </Link>
        <div className='admiContData'>
        <div>
        <div className="search-input">
          <div className="position-relative bg-light rounded-5 p-1">
            <input
              className="searchInput form-control rounded-5 border-0 fs-5 p-1"
              type="text"
              placeholder="buscar.."     
              style={{ marginLeft: ".3rem" }}
              onClick={() => setLgShow(true)}
            ></input>

            <button
              type="submit"
              className="btn position-absolute"
              style={{ top: "5px", right: "5px" }}
            >
              <FaSearch className="text-primary fs-5" />
            </button>
          </div>
        </div>
             <div className="myperfilContPlus">
                <div className="FotoPerfilACont">
                  <img src={info.imagen} className="ProfilePictureAlum" />

                  <button
                    className="button-17"
                    role="button"
                  >
                    Administrador
                  </button>
                </div>
            <div className="InFoAlumnoPErfCont">
                  
                  <div className="InFoAlumnoPErfCont">
                    <div className="titleMyPRofile">
                      <span>
                      Perfil Administrador                  
                      </span>
                    <button className="btnEditProAlu">
                    
                    </button>
                    </div>

                      <div className="contInfoPErfAlum">
                        <div>
                          <div className="miniContinfoPErfAlu">
                            <div className="eachInfoIputPErProfe">
                              <div className="nameInfoPErAlu">
                                Nombre:
                              </div> 
                              <div className="lainfoPErAlu">
                                {info.nombre}
                            </div> 
                          </div>
                          <div className="eachInfoIputPErProfe">
                              <div className="nameInfoPErAlu">
                                Apellido:
                              </div> 
                              <div className="lainfoPErAlu">
                                {info.apellido}
                            </div> 
                          </div>
                        
                        </div>
                        <div  className="nameInfoPErAlu plusnipa">
                                Email:
                              </div> 
                              <div className="plusnipa2">
                                {info.email} 
                            </div> 
                      </div>
                      </div>

                  </div>
                </div>
            </div>
        <div className='dashDonut'>

            <Card maxWidth="max-w-2xl" backgroundColor="teal">
            <Title>Numero de cuentas:</Title>
            <DonutChart
                data={ cities }
                category="sales"
                dataKey="name"
                marginTop="mt-6"
                colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
                />
            </Card>
        </div>
        
        </div>
        <div className='profesByMateriaChart'>
            <Card maxWidth="max-w-lg" >
                <Title>Profesores por materia:</Title>
                <Flex marginTop="mt-4">
                <Text><Bold>Materias</Bold></Text>
                <Text><Bold>Profesores</Bold></Text>
                </Flex>
                <BarList data={ profeByMateria } marginTop="mt-2" />
            </Card>
        </div>
        </div>
        </div>
            <div className='lastChartAdmi'>
                <Card>
                    <Title>Numero de usuarios por pais: </Title>
                    <Subtitle>
                    Lista que especifica cuantos usuarios pertenecen a cada pais de la tabla.
                    </Subtitle>
                    <BarChart
                    data={usuariosBYPais}
                    dataKey="name"
                    categories={["numero de usuarios por pais"]}
                    colors={["blue"]}
                    marginTop="mt-6"
                    yAxisWidth="w-12"
                    />
                </Card>
            </div>
        </div>
    )
}