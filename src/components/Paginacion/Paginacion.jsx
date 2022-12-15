import { useEffect } from "react"
import { useState } from "react"
import'./Paginacion.css'
import { ProfeCards } from "../ProfeCards/ProfeCards";
export const Pagination=({socket,msgUsuariosAlumno,profes})=>{
    const[numberPages, setnumberPages]=useState([])
    const[profePerPag,setProfePerPag]=useState([])
    
    const[currentPage, setCurrentPage]=useState(1)
    
    useEffect(()=>{
        setnumberPages([1])
        for (let i = 2; i < (profes.length/8)+1; i++) {
        setnumberPages(oldNumbers=>[...oldNumbers,i])
        
        }
    },[profes])

    useEffect(()=>{
      onClickHandlerPages(1)  
    
    },[profes])

    const onClickHandlerPages=(n)=>{
        setCurrentPage(n)
        setProfePerPag([])
        profes.map((p,i)=>{
            if((8*(n-1))<=i && i<=((n*8)-1)){
                setProfePerPag(oldGame=>[...oldGame,p])
            }
        })
      
    }


    const prevHandler=(e)=>{
        if(currentPage!==1){
            onClickHandlerPages(currentPage-1)
            console.log('prev')
        }
        
    }

    const nextHandler=(e)=>{
        if(numberPages.length>currentPage){

            onClickHandlerPages(currentPage+1)
            
        }
    }
    return(
        <div className="paginationContainer">
            <div className="upperBtn">
                <div className="centerButons">
                    {currentPage!==1 &&(<button name='prev'
                            className='prevBtn' 
                            onClick={(e)=>prevHandler(e)}
                            >{'<'}</button>)}
                    {numberPages&& numberPages.map((n,i)=>(               
                            <button key={i} name={n} className={`pageBtn ${currentPage===n&&'currentBTN'}`} onClick={(e)=>onClickHandlerPages(n)}>
                                {n}
                            </button>                
                    )
                    )}
                    {numberPages.length>currentPage&&(<button name='next'
                            className='nextBtn'                     
                            onClick={(e)=>nextHandler(e)}
                            >{'>'}</button>)}
                </div>
            </div>
            


            <div className="cardsPRofeCont">                        
                {/* <Cards profes={profePerPag} version={1} /> */}
                <ProfeCards
                socket={socket}
                msgUsuariosAlumno={msgUsuariosAlumno}
                profes={profePerPag}
              />
            </div>

            <div className="underBtn">
                <div className="centerButons">
                    {currentPage!==1 &&(<button name='prev'
                                className='prevBtn' 
                                onClick={(e)=>prevHandler(e)}
                                >{'<'}</button>)}
                        {numberPages&& numberPages.map((n,i)=>(               
                                <button key={i} name={n} className={`pageBtn ${currentPage===n&&'currentBTN'}`} onClick={(e)=>onClickHandlerPages(n)}>
                                    {n}
                                </button>                
                        )
                        )}
                        {numberPages.length>currentPage&&(<button name='next'
                                className='nextBtn'                     
                                onClick={(e)=>nextHandler(e)}
                                >{'>'}</button>)}
                </div>
            </div>
        </div>
    )
}