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
    const[p1,setp1]=useState(0)
    const[p2,setp2]=useState(0)
    const[p3,setp3]=useState(0)
    const[p4,setp4]=useState(0)
    const[p5,setp5]=useState(0)

   useEffect(()=>{
    console.log('d:', puntajes)
    if(puntajes?.length>0){
        setPromedio(0)
        console.log('la',promedio)
        puntajes.map((p)=>{ 
            setPromedio((prev)=>prev+p.puntaje)
            if(p.puntaje===5){
                setp5((prev)=>prev+1)
            }
            if(p.puntaje===4){
                setp4((prev)=>prev+1)
            }
            if(p.puntaje===3){
                setp3((prev)=>prev+1)
            }
            if(p.puntaje===2){
                setp2((prev)=>prev+1)
            }
            if(p.puntaje===1){
                setp1((prev)=>prev+1)
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
                <div className={`allPuntuactionNumbRe ${p5>0?'punctWithCont':'punctWithNoCont'}`}>
                    5 estrellas 
                    <div className={`progPuntRe ${p5>0 ?'progYes':'progNo'}`}>
                    </div> 
                    ({p5})
                </div>
                
                <div className={`allPuntuactionNumbRe ${p4>0?'punctWithCont':'punctWithNoCont'}`}>
                     4 estrellas 
                     <div className={`progPuntRe ${p4>0 ?'progYes':'progNo'}`}>
                        </div> ({p4})
                </div>               
                
                <div className={`allPuntuactionNumbRe ${p3>0?'punctWithCont':'punctWithNoCont'}`}>
                    3 estrellas 
                    <div className={`progPuntRe ${p3>0 ?'progYes':'progNo'}`}>
                        </div> ({p3})
                </div>
                
                <div className={`allPuntuactionNumbRe ${p2>0?'punctWithCont':'punctWithNoCont'}`}>
                    2 estrellas 
                    <div className={`progPuntRe ${p2>0 ?'progYes':'progNo'}`}>
                        </div> ({p2})
                </div>
                
                <div className={`allPuntuactionNumbRe ${p1>0?'punctWithCont':'punctWithNoCont'}`}>
                    1 estrellas 
                    <div className={`progPuntRe ${p1>0 ?'progYes':'progNo'}`}>
                        </div> ({p1})
                </div>
            </div>

        </div>
    )
}