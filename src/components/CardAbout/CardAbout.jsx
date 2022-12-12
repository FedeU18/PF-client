import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './CardAbout.css'

export const CardAbout=({nombre, apellido, foto, posicion, linkedin, git})=>{
    return(
        <Card className='cardAboutCont' style={{ width: '15rem', margin:'20px' }}>
        <img  src={foto} className='cardAboutContImg ' />
        <Card.Body>
          <Card.Title style={{ textAlign:'center' }}>{nombre} {apellido}</Card.Title>
          <Card.Text  style={{ textAlign:'center' }}>
            {posicion}
          </Card.Text>

          <div className="d-grid gap-2">
            <a href={git} target="_blank" className='btnGitLink'>
               
              <img  className='aboutbtnsIc' src={'github.png'}/> 
          
            </a>

          
            <a href={linkedin} target="_blank" className='btnGitLink'>
                <img  className='aboutbtnsIc' src={'linkedin.png'}/>
                </a>

          </div>
        </Card.Body>
      </Card>
    )
}