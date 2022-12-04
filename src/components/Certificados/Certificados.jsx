import Carousel from 'react-bootstrap/Carousel';
import './Certificados.css'


export const Certificados=({open, fotos, close})=>{
    
    return(
        <div className={`CertiFotosContCarr ${open ? "abicuaso" : "closecuaso"}`} >
             <button onClick={() => { close() }} className='filtCloseBtn'>
                X
            </button>
            <Carousel style={{height:'80vh'}} >
                {fotos?.length>0 && fotos.map((f,i)=>(
                    <Carousel.Item className='carruIte'>
                   <div className='insideCaIte' style={{backgroundImage:`url(${f.foto})`}}>
                        <div className={'descCertCarru'}>
                            {f.nombre}
                        </div>
                   </div>
                  </Carousel.Item>
                 )
                
                )} 
      
            </Carousel>
                </div>
    )
}