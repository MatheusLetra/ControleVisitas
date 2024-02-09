import './visitas.css'

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import api from '../../utils/api'

import Swal from 'sweetalert2'
import { formatTelefone } from '../../utils/mascaras'
import { formatarDataVisualizar } from '../../utils/datas'

export default function ListarVisitas() {
  const [filtro, setFiltro] = useState("")
  const [visitas, setVisitas] = useState([])
  const [visitasOriginal, setVisitasOriginal] = useState([])
  const [excluindo, setExcluindo] = useState(false)

  const navigate = useNavigate()

  async function buscarVisitas() {
    await api.get('/visitas',
      {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        const { visitas } = response.data

        if (visitas && visitas.length > 0) {
          setVisitas([...visitas])
          setVisitasOriginal([...visitas])
        }
      }
    })
  }

  useEffect(() => {
    buscarVisitas()
  }, [])

  useEffect(() => {
    buscarVisitas()
  }, [excluindo])

  useEffect(() => {
    if (filtro !== '') {
      let visitasAux = []

      visitasOriginal.forEach((visita) => {
        if (visita.cadastro.nome.toUpperCase().includes(filtro.toUpperCase()) || visita.usuario.cadastro.nome.toUpperCase().includes(filtro.toUpperCase())) {
          visitasAux = [...visitasAux, visita ]
        }
      })

      setVisitas([...visitasAux])
    } else {
      setVisitas([...visitasOriginal])
    }
  }, [filtro])

  async function excluirVisita(visita_id) {
    Swal.fire({
      title: 'Deseja realmente excluir a visita?',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: false,
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
      if (result.isConfirmed) {

        await api.delete(`/visitas/${visita_id}`,
          {}, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {

          if (response.status === 204) {
            Swal.fire({
              title: 'Sucesso',
              text: 'Visita deletada com sucesso!',
              icon: 'success',
              confirmButtonText: 'OK'
            })
            setExcluindo(true)
          } else {
            Swal.fire({
              title: 'Erro',
              text: 'Ocorreu um erro ao excluir o Visita!',
              icon: 'error',
              confirmButtonText: 'OK'
            })
          }

        }).catch((error) => {
          Swal.fire({
            title: 'Erro',
            text: 'Ocorreu um erro ao excluir o Visita!',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        })
      }
    })
  }

  const mostrarVisitas = visitas.map((visita, index) => (
    <div className="visita-container" key={index}>
      <p className="info-visitas">{visita.cadastro.nome}</p>
      <p className="info-visitas">{visita.usuario.cadastro.nome}</p>
      <p className="info-visitas">{formatarDataVisualizar(visita.data_visita)}</p>
      <p className="info-visitas">{visita.status === 'P' ? 'PENDENTE' : visita.status === 'C' ? 'CANCELADA' : 'FINALIZADA'}</p>
      <button className="btn-visitas" onClick={() => navigate(`/main/visitas/editar/${visita.codigo}`)}>Editar</button>
      <button className="btn-visitas btn-visitas-excluir" onClick={() => excluirVisita(visita.codigo)}>Excluir</button>
    </div>
  )
  );


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

      <div className="lista-visitas-container">
        {visitas.length > 0 ?
          <>
            <div className="visita-container-cabecalho">
              <p className="info-visitas">VISITANTE</p>
              <p className="info-visitas">AGENDADOR</p>
              <p className="info-visitas">DATA VISITA</p>
              <p className="info-visitas">STATUS</p>
              <p className="btn-visitas" ></p>
              <p className="btn-visitas" ></p>
            </div>
            {mostrarVisitas}
          </> : <h1>Nenhuma visita cadastrado</h1>
        }
      </div>
    </div>
  )
}