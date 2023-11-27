import {
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Variables = () => {
  
  return (
    <div>
      <Typography variant="h1" component="h2" fontSize={28}>
        Variáveis
      </Typography>
      <Divider />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Variável</TableCell>
              <TableCell>Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />

      <h2>Em breve cadastro de mensagens prontas:)</h2>
    </div>
  );
};

export default Variables;
