import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import './visitas.css'

export default function ListarVisitas(){
  const [filtro, setFiltro] = useState("")
  const [visitas, setVisitas] = useState([])
  const [visitasOriginal, setVisitasOriginal] = useState([])

  const navigate = useNavigate()


  return (
    <div className='visitas-container'>
      <div className='buscar-visitas-container'>
        <label htmlFor="filtro">Buscar:</label>
        <input
          type="text"
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <button className="btn-cadastrar" onClick={() => navigate('/main/visitas/cadastrar')}>Novo</button>
      </div>

      {/* <div className="lista-visitas-container">
        {users.length > 0 ?
          mostrarUsuarios : <h1>Nenhum funcionário cadastrado</h1>
        }
      </div> */}
    </div>
  )
}