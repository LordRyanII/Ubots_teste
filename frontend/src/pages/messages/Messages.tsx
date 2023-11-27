import React, { useContext, useEffect, useState } from 'react';
import { Alert, Divider, Typography, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';

const Messages = () => {
  const { loggedUserEmail } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const obterMensagens = async () => {
    try {
      const response = await axios.get('http://localhost:4005/invest/mensagens/vizualizar', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
  
      const respostaApi = response.data;
  
      console.log('Dados recebidos (response):', response.data);
      console.log(' Response ' + response);

      if (respostaApi.status && respostaApi.status.success === 'Dados dos usuários recuperados com sucesso') {
        const mensagens = respostaApi.status.response.flat();
        setMessages(mensagens);
      } else {
        console.warn('Resposta da API sem sucesso:', respostaApi.status);
      }
    } catch (error) {
      console.error('Erro ao obter mensagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    obterMensagens();
  };

  useEffect(() => {
    obterMensagens();
  }, []);

  return (
    <section>
      <Typography variant="h1" component="h2" fontSize={28}>
        Mensagens
      </Typography>
      <Divider />

      <Alert severity="info">
        Aqui você confere a entrada de seus leads
      </Alert>

      <Button onClick={handleRefresh} disabled={loading} variant="outlined" color="primary">
        Atualizar
      </Button>

      {loading && <p>Carregando...</p>}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Mensagem</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages.map((message) => (
              <TableRow
                key={message._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {message.nome}
                </TableCell>
                <TableCell component="th" scope="row">
                  {message.texto}
                </TableCell>
                <TableCell component="th" scope="row">
                  {message.teams}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
};

export default Messages;