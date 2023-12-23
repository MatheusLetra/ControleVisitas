import React, { useState } from 'react';

import './cadastro.css';

import Input from '../../components/Input';

const Cadastro = () => {
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

  const formatCpfCnpj = (value) => {
    // Formatando CPF ou CNPJ
    const cleanedValue = value.replace(/\D/g, ''); // Remover caracteres não numéricos
    if (cleanedValue.length <= 11) {
      // CPF
      return cleanedValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      // CNPJ
      return cleanedValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

  const formatCep = (value) => {
    // Formatando CEP
    return value.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const formatTelefone = (value) => {
    // Formatando Telefone
    return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleRegister = () => {
    // Lógica de registro aqui
    console.log('CPF/CNPJ:', cpfCnpj);
    console.log('Nome:', nome);
    console.log('Endereço:', endereco);
    console.log('Número:', numero);
    console.log('Bairro:', bairro);
    console.log('CEP:', cep);
    console.log('Cidade:', cidade);
    console.log('Estado:', estado);
    console.log('Complemento:', complemento);
    console.log('Telefone:', telefone);
  };

  const estadosBrasileiros = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB',
    'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="register-form-container">
      <h3>Cadastro</h3>
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
              onChange={(e) => setNome(e.target.value)}
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

        <button type="button" onClick={handleRegister}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
