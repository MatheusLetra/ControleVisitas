import { useEffect, useState } from 'react'
import './editarvisitas.css'
import Input from '../../components/Input'
import {  formatarDataEnviar, retornarDataAtual } from '../../utils/datas'
import api from '../../utils/api'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditarVisitas() {
  const [codvisitante, setCodVisitante] = useState('')
  const [codagendador, setCodAgendador] = useState('')
  const [motivoVisita, setMotivoVisita] = useState('')
  const [datavisita, setDataVisita] = useState(retornarDataAtual())
  const [statusvisita, setStatusVisita] = useState('P')
  const [cadastros, setCadastros] = useState([])
  const [funcionarios, setFuncionarios] = useState([])

  const navigate = useNavigate()
  const { id } = useParams()


  async function buscarVisita(codigo_visita) {
    await api.get(`/visitas/${codigo_visita}`,
      {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        const dados = response.data

       setCodAgendador(dados.codigo_agendador)
       setCodVisitante(dados.codigo_visitante)
       setMotivoVisita(dados.motivo_visita)
       setDataVisita(dados.data_visita)
       setStatusVisita(dados.status_visita)

      } else {
        navigate('/main/visitas')
      }
    })
  }

  useEffect(() => {
    buscarVisita(id)
  }, [id])


  async function buscarCadastros() {
    await api.get('/cadastros',
      {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {

      if (response.status === 200) {
        const { cadastros } = response.data

        if (cadastros && cadastros.length > 0) {
          setCadastros([...cadastros])
        }
      }
    })
  }

  async function buscarFuncionarios() {
    await api.get('/usuarios',
      {}, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {

      if (response.status === 200) {
        const { usuarios } = response.data

        if (usuarios && usuarios.length > 0) {
          setFuncionarios([...usuarios])
        }
      }
    })
  }


  useEffect(() => {
    buscarCadastros()
    buscarFuncionarios()
  }, [])

  async function handleEditarVisita() {
    if (!parseInt(codagendador) > 0) {
      Swal.fire({
        title: 'Erro',
        text: 'É necessário preencher o agendador',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      return
    }

    if (!parseInt(codvisitante) > 0) {
      Swal.fire({
        title: 'Erro',
        text: 'É necessário preencher o visitante',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      return
    }

    if (motivoVisita.trim() === '') {
      Swal.fire({
        title: 'Erro',
        text: 'É necessário preencher o motivo da visita',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      return
    }

    if (datavisita.trim() === '') {
      Swal.fire({
        title: 'Erro',
        text: 'É necessário preencher a data da visita',
        icon: 'error',
        confirmButtonText: 'OK'
      })

      return
    }

    let dados = {
      codigo_visitante: codvisitante,
      codigo_agendador: codagendador,
      motivo_visita: motivoVisita,
      data_visita: formatarDataEnviar(datavisita),
      status: statusvisita
    }

    await api.put(`/visitas/${id}`,
      dados, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 204) {
        navigate('/main/visitas')
        return
      } else {
        Swal.fire({
          title: 'Erro',
          text: response.data.message,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    }).catch((error) => {
      const { response } = error
      Swal.fire({
        title: 'Erro',
        text: response.data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    });

  }

  return (
    <div className="register-form-container">
      <h3>Editar Visita</h3>

      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="visitante">Visitante:</label>
            <select
              id="visitante"
              value={codvisitante}
              onChange={(e) => setCodVisitante(e.target.value)}
            >
              <option value="" disabled>Selecione o Visitante</option>
              {
                cadastros.map((cadastro, index) => {
                  return (
                    <option value={cadastro.codigo} key={index}>{cadastro.nome}</option>
                  )
                })
              }
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="agendador">Agendador:</label>
            <select
              id="agendador"
              value={codagendador}
              onChange={(e) => setCodAgendador(e.target.value)}
              disabled
            >
              <option value="" disabled>Selecione o Agendador</option>
              {
                funcionarios.map((usuario, index) => {

                  return (
                    <option value={usuario.cadastro.codigo} key={index}>{usuario.cadastro.nome}</option>
                  )
                })
              }
            </select>
          </div>
        </div>

        <div className="form-group">

          <Input
            fieldName="motivovisita"
            description="Motivo da Visita:"
            value={motivoVisita}
            onChange={(e) => setMotivoVisita(e.target.value)}
            type="text"
          />

        </div>

        <div className="form-row">
          <div className="form-group">
            <Input
              fieldName="datavisita"
              description="Data da Visita:"
              value={datavisita}
              onChange={(e) => setDataVisita(e.target.value)}
              type="date"
            />

          </div>

          <div className="form-group">
            <label htmlFor="statusvisita">Status:</label>
            <select
              id="statusvisita"
              value={statusvisita}
              onChange={(e) => setStatusVisita(e.target.value)}
            >
              <option value="" disabled>Selecione o Status</option>
              <option value="P" >PENDENTE</option>
              <option value="C" >CANCELADA</option>
              <option value="F" >FINALIZADA</option>
            </select>
          </div>
        </div>

        <button type="button" onClick={() => handleEditarVisita()}>
          EDITAR
        </button>
      </form>
    </div>
  )
}