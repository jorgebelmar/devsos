import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import AgendaPage from '../features/agenda/AgendaPage';
import SucursalCercanaPage from '../features/sucursales/SucursalCercanaPage';

const AppRouter = () => {
  const { token } = useSession();
  const isAuthenticated = !!token; // Usar el token del contexto para verificar autenticación

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/agenda"
          element={isAuthenticated ? <AgendaPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/sucursales"
          element={isAuthenticated ? <SucursalCercanaPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
