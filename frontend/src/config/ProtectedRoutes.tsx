// ProtectedRoutes.jsx
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import SideMenu from "../components/SideMenu/SideMenu";
import Header from "../components/header/Header";
import Container from "../components/container/Container";
import React from 'react';
import { useAuth } from './contextLogin';

export function ProtectedRoutes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <>
      <NavBar />
      <SideMenu />
      <Container>
        <Header />
        <br />
        <br />
        <Outlet />
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
}
