import { useState } from 'react';

import './login.css';

import Input from '../../components/Input';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação aqui
    console.log('Usuário:', username);
    console.log('Senha:', password);
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
        />

        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;