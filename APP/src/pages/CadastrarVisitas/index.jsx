import { useState } from 'react'
import './cadastrarvisitas.css'
import Input from '../../components/Input'
import { retornarDataAtual } from '../../utils/datas'

export default function CadastrarVisitas() {
  const [codvisitante, setCodVisitante] = useState('')
  const [codagendador, setCodAgendador] = useState('')
  const [motivoVisita, setMotivoVisita] = useState('')
  const [datavisita, setDataVisita] = useState(retornarDataAtual())
  const [statusvisita, setStatusVisita] = useState('')

  return (
    <div className="register-form-container">
      <h3>Nova Visita</h3>

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
              <option value="1">TESTE</option>
              <option value="2" >TESTE 2</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="agendador">Agendador:</label>
            <select
              id="agendador"
              value={codagendador}
              onChange={(e) => setCodAgendador(e.target.value)}
            >
              <option value="" disabled>Selecione o Agendador</option>
              <option value="1" >TESTE</option>
              <option value="2" >TESTE 2</option>
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

        <button type="button" onClick={() => { }}>
          Cadastrar
        </button>
      </form>
    </div>
  )
}