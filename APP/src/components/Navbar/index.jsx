import './navbar.css'

import { Link, useNavigate } from 'react-router-dom'

import Logo from '../../assets/logo.png'
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [name, setName] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    let dados = localStorage.getItem("dados_usuario_controle_visitas")

    dados = JSON.parse(dados)

    if (!dados) {
      navigate('/')
    } else {
      if (dados.codigo > 0) {
        setName(dados.nome)
      }
    }

  }, [])


  const handleLogout = () => {
    localStorage.removeItem("dados_usuario_controle_visitas");
    navigate('/')
  }

  return (
    <nav className="navbar-container">
      <div className="navbar-menu">
        <img src={Logo} />
        <p className="user-name">Olá, {name}</p>
        <Link to="/main">Home</Link>
        <Link to="/main/cadastro">Visitantes</Link>
        <Link to="/main/visitas">Visitas</Link>
        <Link to="/main/funcionarios">Funcionários</Link>
      </div>

      <button className="btn-logout" onClick={handleLogout}>Sair</button>
    </nav>
  )
}