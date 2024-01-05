import React, { useState } from 'react'

import Input from "../../components/Input"

import './cadastrarfuncionarios.css'

import { formatCpfCnpj, formatCep, formatTelefone } from '../../utils/mascaras'

import api from '../../utils/api'

import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function CadastrarFuncionarios() {
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [complemento, setComplemento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate()

  const handleRegister = async () => {

    let dados = {
      cpfcnpj: cpfCnpj,
      nome: nome,
      endereco: endereco,
      numero: numero,
      bairro: bairro,
      cep: cep,
      cidade: cidade,
      estado: estado,
      complemento: complemento,
      telefone: telefone,
      login: login,
      senha: senha
    }

    await api.post('/usuarios',
      dados, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 201) {
        navigate('/main/funcionarios')
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
  };

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
    'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="register-form-container">
      <h3>Novo Funcionário</h3>
      <form>
        <div className="form-row">
          <div className="form-group">

            <Input
              fieldName="cpfCnpj"
              description="CPF/CNPJ:"
              value={formatCpfCnpj(cpfCnpj)}
              onChange={(e) => setCpfCnpj(e.target.value)}
              type="text"
            />

          </div>

          <div className="form-group">

            <Input
              fieldName="nome"
              description="Nome:"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value)
                setLogin(e.target.value.replaceAll(' ', '_').toLowerCase())
              }}
              type="text"
            />

          </div>
        </div>

        <div className="form-group">

          <Input
            fieldName="endereco"
            description="Endereço:"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            type="text"
          />

        </div>

        <div className="form-row">
          <div className="form-group">

            <Input
              fieldName="numero"
              description="Número:"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              type="text"
            />

          </div>

          <div className="form-group">

            <Input
              fieldName="bairro"
              description="Bairro:"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              type="text"
            />

          </div>
        </div>

        <div className="form-row">
          <div className="form-group">

            <Input
              fieldName="cep"
              description="CEP:"
              value={formatCep(cep)}
              onChange={(e) => setCep(e.target.value)}
              type="text"
            />

          </div>

          <div className="form-group">

            <Input
              fieldName="cidade"
              description="Cidade:"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              type="text"
            />

          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="" disabled>Selecione o Estado</option>
              {estadosBrasileiros.map(sigla => (
                <option key={sigla} value={sigla}>{sigla}</option>
              ))}
            </select>
          </div>

          <div className="form-group">

            <Input
              fieldName="complemento"
              description="Complemento:"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              type="text"
            />

          </div>
        </div>

        <div className="form-group">

          <Input
            fieldName="telefone"
            description="Telefone:"
            value={formatTelefone(telefone)}
            onChange={(e) => setTelefone(e.target.value)}
            type="text"
          />

        </div>

        <div className="form-group">

          <Input
            fieldName="login"
            description="Login:"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            type="text"
          />

          <Input
            fieldName="senha"
            description="Senha:"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            autoComplete="off"
          />

        </div>

        <button type="button" onClick={handleRegister}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}