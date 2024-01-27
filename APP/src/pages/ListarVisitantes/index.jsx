import './visitantes.css'

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

import Swal from 'sweetalert2'
import { formatTelefone } from '../../utils/mascaras'

export default function ListarVisitantes() {

  const [filtro, setFiltro] = useState("")
  const [users, setUsers] = useState([])
  const [usersOriginal, setUsersOriginal] = useState([])

  const navigate = useNavigate()

  async function buscarUsuarios() {
    await api.get('/cadastros',
      {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        const { cadastros } = response.data

        if (cadastros && cadastros.length > 0) {
          setUsers(cadastros)
          setUsersOriginal(cadastros)
        }

      }
    })
  }

  useEffect(() => {
    buscarUsuarios()
  }, [])

  

  useEffect(() => {
    if (filtro !== '') {
      let usuariosAux = []

      usersOriginal.forEach((usuario) => {
        if (usuario.nome.toUpperCase().includes(filtro.toUpperCase())) {
          usuariosAux = [...usuariosAux, usuario]
        }
      })

      setUsers([...usuariosAux])
    } else {
      setUsers([...usersOriginal])
    }
  }, [filtro])

  async function excluirUsuario(user_id) {
    Swal.fire({
      title: 'Deseja realmente excluir o visitante?',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: false,
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
      if (result.isConfirmed) {

        await api.delete(`/cadastros/${user_id}`,
          {}, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {

          if (response.status === 204) {
            Swal.fire({
              title: 'Sucesso',
              text: 'Visitante deletado com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
          } else {
            Swal.fire({
              title: 'Erro',
              text: 'Ocorreu um erro ao excluir o Visitante!',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }

        }).catch((error) => {
          Swal.fire({
            title: 'Erro',
            text: 'Ocorreu um erro ao excluir o Visitante!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
      }
    })
  }

  const mostrarUsuarios = users.map((user, index) => (
    <div className="usuario-container" key={index}>
      <p className="info-usuario">{user.nome}</p>
      <p className="info-usuario">{user.endereco}, {user.numero}</p>
      <p className="info-usuario">{formatTelefone(user.telefone)}</p>
      <button className="btn-usuario" onClick={() => navigate(`/main/visitantes/editar/${user.codigo}`)}>Editar</button>
      <button className="btn-usuario btn-usuario-excluir" onClick={() => excluirUsuario(user.codigo)}>Excluir</button>
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

        <button className="btn-cadastrar" onClick={() => navigate('/main/visitantes/cadastrar')}>Novo</button>
      </div>

      <div className="lista-funcionarios-container">
        {users.length > 0 ?
          mostrarUsuarios : <h1>Nenhum visitante cadastrado</h1>
        }
      </div>
    </div>
  )
}