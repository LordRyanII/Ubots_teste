import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import { useAuth } from '../../config/contextLogin'; // Importe o contexto de autenticação
import './login.css';

const Login = () => {
  const { login } = useAuth(); // Utilize a função de login do contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Use o hook useNavigate para navegar programaticamente
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await axios.post('http://localhost:4005/invext/login', {
        email: email,
        senha: password,
      });

      const data = response.data;

      if (data.status === 'sucesso') {
        // Salvar token no localStorage
        localStorage.setItem('token', data.response.token);
        // Use a função de login do contexto
        login();
        console.log('Usuário logado com sucesso!');
        
        // Navegar para a página principal após o login
        navigate('/');
      } else {
        console.error('Erro no login:', data.response);
        // Exibir o modal de erro com a mensagem específica do erro
        setErrorMessage(data.response.message);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Erro na requisição:', error.response ? error.response.data : error.message);
      // Exibir o modal de erro com uma mensagem padrão
      setErrorMessage('Erro na requisição. Tente novamente mais tarde.');
      setShowErrorModal(true);
    }

    setIsLoggingIn(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await axios.post('http://localhost:4005/invext/cadastro', {
        nome: name,
        email: email,
        senha: password,
        teams: 'emprestimos', // Valor fixo conforme o exemplo
      });

      const data = response.data;

      if (data.status === 'sucesso') {
        // Salvar token no localStorage (opcional, dependendo da lógica de sua aplicação)
        // localStorage.setItem('token', data.response.leadSalvo.token);
        console.log('Usuário cadastrado com sucesso!');
      } else {
        console.error('Erro no cadastro:', data.response);
        // Exibir o modal de erro com a mensagem específica do erro
        setErrorMessage(data.response.message);
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error('Erro na requisição:', error.response ? error.response.data : error.message);
      // Exibir o modal de erro com uma mensagem padrão
      setErrorMessage('Erro na requisição. Tente novamente mais tarde.');
      setShowErrorModal(true);
    }

    setIsLoggingIn(false);
  };

  // Restante do código do componente de login
  // ...

  return (
    <div className="body-login">
      <div className={`conteiner-login ${isLoggingIn ? 'logging-in' : ''}`}>
        <h2 className='headerLogin'>{isRegistering ? 'Cadastro' : 'Login'}</h2>
        <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <Form.Group controlId="formBasicName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group controlId="formBasicEmail">
            <Form.Label className={emailFocused ? 'focused' : ''}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Entre com o seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className={passwordFocused ? 'focused' : ''}>
              Senha
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Entre com a sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isLoggingIn} style={{ marginTop: "20px", marginBottom: "20px" }}>
            {isLoggingIn ? 'Entrando...' : isRegistering ? 'Cadastrar' : 'Entrar'}
          </Button>
        </Form>

        {/* Modal de erro */}
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>

        <p>
          {isRegistering
            ? 'Já possui uma conta?'
            : 'Ainda não possui uma conta?'}
          <span
            className={`register-link ${isLoggingIn ? 'disabled' : ''}`}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isLoggingIn ? 'Aguarde...' : isRegistering ? 'Fazer login' : 'Cadastre-se'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
