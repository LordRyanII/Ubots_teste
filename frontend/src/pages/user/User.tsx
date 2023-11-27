import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './configs.css';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(''); // Adição da variável selectedTeam
  const navigate = useNavigate();

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
        setSelectedTeam(response.data.status.dadosUsuarios.teams); // Define o valor inicial de selectedTeam
      })
      .catch((error) => {
        console.error('Erro ao recuperar dados do usuário:', error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;

    axios
      .put(
        'http://localhost:4005/invext/status',
        { status: newStatus },
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.status.success);
      })
      .catch((error) => {
        console.error('Erro ao atualizar o status:', error);
      });

    setSelectedStatus(newStatus);
  };

  const handleTeamChange = (event) => {
    const newTeam = event.target.value;
  
    if (newTeam) {
      axios
        .put(
          'http://localhost:4005/invext/teams',
          { teams: newTeam }, // Corrigido para 'teams'
          {
            headers: {
              Authorization: `${localStorage.getItem('token')}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.status.success);
        })
        .catch((error) => {
          console.error('Erro ao atualizar a fila:', error);
        });
    }
  
    setSelectedTeam(newTeam);
  };

  return (
    <div className="user-container">
      <div className="user-header">
        <Typography variant="h4">
          Informações do usuário
        </Typography>
        <Button className="logout-button" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Divider />

      {userData && (
        <div className="user-data">
          <Divider />

          <Typography>
            <strong>Nome:</strong> {userData.nome}
            <br />
            <strong>Email:</strong> {userData.email}
          </Typography>

          <div className="user-status">
            <label>Status:</label>
            <select value={selectedStatus} onChange={handleStatusChange}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="user-team">
            <label>Teams:</label>
            <select value={selectedTeam} onChange={handleTeamChange}>
              <option value="cartoes">Cartões</option>
              <option value="emprestimos">Empréstimos</option>
              <option value="outros">Outros Assuntos</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
