import './funcionarios.css'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

export default function Funcionarios() {

  const [filtro, setFiltro] = useState("")

  const navigate = useNavigate()

  return (
    <div className='funcionarios-container'>
      <div className='buscar-funcionarios-container'>
        <label htmlFor="filtro">Buscar:</label>
        <input
          type="text"
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />

        <button className="btn-cadastrar" onClick={() => navigate('/main/funcionarios/cadastrar')}>Novo</button>
      </div>
    </div>
  )
}