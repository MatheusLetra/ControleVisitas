import './funcionarios.css'

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

import Swal from 'sweetalert2'

export default function Funcionarios() {

  const [filtro, setFiltro] = useState("")
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  async function buscarUsuarios() {
    await api.get('/usuarios',
      {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {

      if (response.status === 200) {
        const { usuarios } = response.data

        if (usuarios && usuarios.length > 0) {
          setUsers(usuarios)
        }

      }


    })
  }

  useEffect(() => {
    buscarUsuarios()
  })

  async function excluirUsuario(user_id) {
    Swal.fire({
      title: 'Deseja realmente excluir o funcionário?',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: false,
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
      if (result.isConfirmed) {

        await api.delete(`/usuarios/${user_id}`,
          {}, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {

          if (response.status === 204) {
            Swal.fire({
              title: 'Sucesso',
              text: 'Funcionário deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          } else {
            Swal.fire({
              title: 'Erro',
              text: 'Ocorreu um erro ao excluir o Funcionário!',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }

        }).catch((error) => {
          Swal.fire({
            title: 'Erro',
            text: 'Ocorreu um erro ao excluir o Funcionário!',
            icon: 'error',
            confirmButtonText: 'OK'
          })  
        })
      }
    })
  }

  const mostrarUsuarios = users.map((user, index) => (
    <div className="usuario-container" key={index}>
      <p className="info-usuario">{user.cadastro.nome}</p>
      <p className="info-usuario">{user.cadastro.endereco}, {user.cadastro.numero}</p>
      <p className="info-usuario">{user.cadastro.telefone}</p>
      <button className="btn-usuario" onClick={() => { }}>Editar</button>
      <button className="btn-usuario btn-usuario-excluir" onClick={() => excluirUsuario(user.codigo_cadastro)}>Excluir</button>
    </div>
  )
  );

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

      <div className="lista-funcionarios-container">
        {users.length > 0 ?
          mostrarUsuarios : <h1>Nenhum funcionário cadastrado</h1>
        }
      </div>
    </div>
  )
}