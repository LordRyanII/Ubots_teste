/* eslint-disable */
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ButtonsExample from './LedsBanco';
import FormLead from './FormLead';
const Leads = () => {

  return (
    <div>
      <Typography variant="h1" component="h2" fontSize={28}>
        Contatos histórico
      </Typography>
      <br />
      <p>
        Aqui você pode pesquisar os seus leads!
      </p>
      <br />
      <br />
      <Divider />
      <ButtonsExample />
    </div>
  );
};

export default Leads;
