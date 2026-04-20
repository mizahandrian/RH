import React, { useState } from 'react';
import '../style/auth.css';
import LogoINSTAT from '../assets/image/Logo-INSTAT.png';

const AuthLayout: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Login attempt:', { fullName, password });
      setLoading(false);
      // Redirect or handle success here
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-overlay"></div>
      <div className="auth-card">
        <div className="auth-header">
          <img 
            src={LogoINSTAT} 
            alt="INSTAT Madagascar" 
            className="auth-logo"
          />
          <h1 className="instat-title">INSTAT MADAGASCAR</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="fullName">Identifiant</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Entrez votre nom complet"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              required
              disabled={loading}
            />
          </div>

          <div className="form-options">
            <a href="#" className="forgot-password">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'CONNEXION...' : 'SE CONNECTER'}
          </button>
        </form>

        <div className="auth-footer">
          <p>© INSTAT MADAGASCAR - Données et Statistiques</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;