import { useEffect, useState } from 'react';

import './login.css';

import Input from '../../components/Input';

import api from '../../utils/api';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let dados =  localStorage.getItem("dados_usuario_controle_visitas")

    dados = JSON.parse(dados)

    if (dados) {
      if (dados.codigo > 0) {
        navigate('/main')  
      }
    }

  }, [])

  const handleLogin = async () => {

    await api.post('/usuarios/login',
      {
        username,
        password
      }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {

      if (response.status === 200) {
        let dados = response.data.extra_data
        localStorage.setItem("dados_usuario_controle_visitas", JSON.stringify(dados))
        navigate('/main')
      } else {
        alert(response.data.message)
      }
    }).catch((error) => {
      const { response } = error
      alert(response.data.message)
    });
  };

  return (

    <div className="login-container">

      <h1>Login</h1>
      <form>
        <Input
          fieldName="username"
          description="Usuário:"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />

        <Input
          fieldName="password"
          description="Senha:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          autoComplete="off"
        />

        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;