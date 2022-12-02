import './Reseñas.css'
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from 'react';
export const Reseñas =({puntajes})=>{
    const [promedio,setPromedio]=useState(0)
    const [numeros, setNumeros]=useState({
                                            p1:0,
                                            p2:0,
                                            p3:0,
                                            p4:0,
                                            p5:0,
    })
   useEffect(()=>{
    if(puntajes?.length>0){
        setPromedio(0)
        console.log('la',promedio)
        puntajes.map((p)=>{ 
            setPromedio(promedio+p.puntaje)
            if(p.puntaje===5){
                setNumeros({
                    ...numeros,
                    p5:numeros.p5+1
                })
            }
            if(p.puntaje===4){
                setNumeros({
                    ...numeros,
                    p4:numeros.p4+1
                })
            }
            if(p.puntaje===3){
                setNumeros({
                    ...numeros,
                    p3:numeros.p3+1
                })
            }
            if(p.puntaje===2){
                setNumeros({
                    ...numeros,
                    p2:numeros.p2+1
                })
            }
            if(p.puntaje===1){
                setNumeros({
                    ...numeros,
                    p1:numeros.p1+1
                })
            }
        })
       
    }else{
        setPromedio(0)
    }
   },[])

    return(
        <div className='PuntajesCont'>
            <div className='numbReviewCont'>
                <div className='numbReviewRe'>
                    {puntajes?.length} {puntajes?.length===1?'Reseña':'Reseñas'} 
                </div>
                <div className='starRese'>
                    <AiFillStar size={25}/>
                    <AiFillStar size={25}/>
                    <AiFillStar size={25}/>
                    <AiFillStar size={25}/>
                    <AiFillStar size={25}/>
                    <span className='proNumvRe'>
                    {puntajes?.length>0 ? promedio/(puntajes?.length):0}
                    </span>
                </div>
            </div>
            <div>
                <div className={`allPuntuactionNumbRe ${numeros.p5>0?'punctWithCont':'punctWithNoCont'}`}>
                    5 estrellas 
                    <div className={`progPuntRe ${numeros.p5>0 ?'progYes':'progNo'}`}>
                    </div> 
                    ({numeros.p5})
                </div>
                
                <div className={`allPuntuactionNumbRe ${numeros.p4>0?'punctWithCont':'punctWithNoCont'}`}>
                     4 estrellas 
                     <div className={`progPuntRe ${numeros.p4>0 ?'progYes':'progNo'}`}>
                        </div> ({numeros.p4})
                </div>               
                
                <div className={`allPuntuactionNumbRe ${numeros.p3>0?'punctWithCont':'punctWithNoCont'}`}>
                    3 estrellas 
                    <div className={`progPuntRe ${numeros.p3>0 ?'progYes':'progNo'}`}>
                        </div> ({numeros.p3})
                </div>
                
                <div className={`allPuntuactionNumbRe ${numeros.p2>0?'punctWithCont':'punctWithNoCont'}`}>
                    2 estrellas 
                    <div className={`progPuntRe ${numeros.p2>0 ?'progYes':'progNo'}`}>
                        </div> ({numeros.p2})
                </div>
                
                <div className={`allPuntuactionNumbRe ${numeros.p1>0?'punctWithCont':'punctWithNoCont'}`}>
                    1 estrellas 
                    <div className={`progPuntRe ${numeros.p1>0 ?'progYes':'progNo'}`}>
                        </div> ({numeros.p1})
                </div>
            </div>

        </div>
    )
}