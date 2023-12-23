import './navbar.css'

import { Link } from 'react-router-dom'

import Logo from '../../assets/logo.png'

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-menu">
        <img src={Logo} />
        <Link to="/main">Home</Link>
        <Link to="/main/cadastro">Visitantes</Link>
        <Link to="/main/visitas">Visitas</Link>
        <Link to="/main/funcionarios">Funcionários</Link>
      </div>

      <Link to="/">Sair</Link>
    </nav>
  )
}