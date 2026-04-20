// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthLayout />} />
        
        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;