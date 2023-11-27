import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/home';
import Configurations from '../pages/configs/Configs';
import Messages from '../pages/messages/Messages';
import Variables from '../pages/variables/Variables';
import Leads from '../pages/leads/Leads';
import User from '../pages/user/User';
import Login from '../pages/login/Login';
import { ProtectedRoutes } from './ProtectedRoutes';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoutes />} >
        <Route path="/" element={<Home />} />
        <Route path="/user-info" element={<User />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/configurations" element={<Configurations />} />
        <Route path="/templates/mensagens" element={<Variables />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
