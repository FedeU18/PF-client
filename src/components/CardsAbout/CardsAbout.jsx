import './CardsAbout.css'
import { CardAbout } from '../CardAbout/CardAbout'

export const CardsAbout = () => {

    const programadores = [
        {
            nombre: 'Fabian',
            apellido: 'Menjura',
            foto: 'menjura.jpeg',
            posicion: 'Full Stack Developer',
            linkedin: 'https://www.linkedin.com/in/fabian-menjura-1409ba216/',
            github: 'https://github.com/fabian-07-menjura',
        },

        {
            nombre: 'Fabian',
            apellido: 'Lopez',
            foto: 'lopez.jpeg',
            posicion: 'Full Stack Developer',
            linkedin: 'https://www.linkedin.com/in/fabian-lopez-b4933a216/',
            github: 'https://github.com/fabianlopezar',
        },

        {
            nombre: 'Gaston',
            apellido: 'Flora',
            foto: 'gaston.jpeg',
            posicion: 'Full Stack Developer',
            linkedin: '',
            github: 'https://github.com/gastonf-git',
        },

        {
            nombre: 'Gianella',
            apellido: 'León',
            foto: 'gia.jpeg',
            posicion: 'Full Stack Developer',
            linkedin: 'www.linkedin.com/in/gianella-gupio-león-544166230',
            github: 'https://github.com/GiaAlenay',
        },

        {
            nombre: 'Federico',
            apellido: 'Uñates',
            foto: 'fede.jpeg',
            posicion: 'Full Stack Developer',
            linkedin: 'https://www.linkedin.com/in/federico-u%C3%B1ates-a08967254/',
            github: '',
        },

        {
            nombre: 'Hernán',
            apellido: 'Bellassai',
            foto: 'Henan.jpeg',
            posicion: 'Full Stack Developer',
            linkedin: 'https://www.linkedin.com/in/hern%C3%A1n-bellassai-20b7b88b/',
            github: '',
        },

        {
            nombre: 'Jonathan',
            apellido: 'Campanello',
            foto: 'jonathan.jpeg',
            posicion: 'Full Stack Developer',
            linkedin: 'https://www.linkedin.com/in/jonathan-campanello-25a84122a/',
            github: '',
        },

        {
            nombre: 'Michael ',
            apellido: 'Palomino',
            foto: 'michael.jpeg',
            posicion: 'Full Stack Developer',
            linkedin: '',
            github: 'https://github.com/Miiichael6',
        },


    ]

    return (
        <div className='CardsContainer'>
            {programadores.map((p, index) => (
                <CardAbout
                    key={index}
                    nombre={p.nombre}
                    apellido={p.apellido}
                    foto={p.foto}
                    posicion={p.posicion}
                    linkedin={p.linkedin}
                    git={p.github} />
            ))}
        </div>
    )
}