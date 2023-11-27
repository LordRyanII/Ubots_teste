import React, { useEffect, useState } from 'react';
import '../../assets/css/Home.css'; // Mantenha sua importação de estilos aqui
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:4005/invest/user/info', {
        headers: {
          Authorization: `${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        setUserData(response.data.status.dadosUsuarios);
        setSelectedStatus(response.data.status.dadosUsuarios.status);
        setSelectedTeam(response.data.status.dadosUsuarios.teams);
      })
      .catch((error) => {
        console.error('Erro ao recuperar dados do usuário:', error);
      });
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      setGreeting('Bom dia');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  return (
    <div className="paginaInicial">
      <div className="saudacao">
            <h1>{`${greeting} ${userData ? userData.nome : ''}`}</h1>
            <p> Bem-Vindo ao Sistema de gerenciamento da Ubots, parceria com invext!</p>
      </div>
      <div className="conteudo">
        
      </div>
    </div>
  );
};

export default Home;
