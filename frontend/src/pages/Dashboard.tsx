// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, faBuilding, faBriefcase, faUserTie,
  faArrowUp, faPlus, faUserCheck, faChartLine
} from '@fortawesome/free-solid-svg-icons';
import api from '../services/api';

interface DashboardStats {
  totalPersonnels: number;
  totalDirections: number;
  totalServices: number;
  totalPostes: number;
  personnelsActifs: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPersonnels: 0,
    totalDirections: 0,
    totalServices: 0,
    totalPostes: 0,
    personnelsActifs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [personnelsRes, directionsRes, servicesRes, postesRes] = await Promise.all([
        api.get('/personnels'),
        api.get('/directions'),
        api.get('/services'),
        api.get('/postes')
      ]);

      const personnels = personnelsRes.data;
      const actifs = personnels.filter((p: any) => p.id_etat === 1 || p.etat_nom === 'Actif').length;

      setStats({
        totalPersonnels: personnels.length,
        totalDirections: directionsRes.data.length,
        totalServices: servicesRes.data.length,
        totalPostes: postesRes.data.length,
        personnelsActifs: actifs
      });
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Personnels', value: stats.totalPersonnels, icon: faUsers, color: '#3b82f6', bg: '#eff6ff' },
    { title: 'Directions', value: stats.totalDirections, icon: faBuilding, color: '#10b981', bg: '#ecfdf5' },
    { title: 'Services', value: stats.totalServices, icon: faBriefcase, color: '#f59e0b', bg: '#fffbeb' },
    { title: 'Postes', value: stats.totalPostes, icon: faUserTie, color: '#8b5cf6', bg: '#f5f3ff' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        Chargement...
      </div>
    );
  }

  return (
    <div>
      {/* Statistiques */}
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-info">
              <h3>{card.title}</h3>
              <p className="stat-number">{card.value}</p>
              <div className="stat-trend">
                <FontAwesomeIcon icon={faArrowUp} /> +12% ce mois
              </div>
            </div>
            <div className="stat-icon" style={{ background: card.bg, color: card.color }}>
              <FontAwesomeIcon icon={card.icon} />
            </div>
          </div>
        ))}
      </div>

      {/* Graphique simple */}
      <div className="chart-card" style={{ marginBottom: '30px' }}>
        <h3 className="chart-title">
          <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '10px' }} />
          État des personnels
        </h3>
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', padding: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>{stats.personnelsActifs}</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Actifs</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ef4444' }}>{stats.totalPersonnels - stats.personnelsActifs}</div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>Inactifs</div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="quick-actions">
        <Link to="/personnels" className="quick-btn">
          <div className="quick-icon">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="quick-info">
            <h4>Gérer les personnels</h4>
            <p>Ajouter, modifier, supprimer</p>
          </div>
        </Link>
        <Link to="/personnels" className="quick-btn">
          <div className="quick-icon">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div className="quick-info">
            <h4>Nouveau recrutement</h4>
            <p>Ajouter un personnel</p>
          </div>
        </Link>
        <Link to="/directions" className="quick-btn">
          <div className="quick-icon">
            <FontAwesomeIcon icon={faBuilding} />
          </div>
          <div className="quick-info">
            <h4>Directions</h4>
            <p>Gérer les directions</p>
          </div>
        </Link>
        <Link to="/statut-admin" className="quick-btn">
          <div className="quick-icon">
            <FontAwesomeIcon icon={faUserCheck} />
          </div>
          <div className="quick-info">
            <h4>Statuts</h4>
            <p>Fonctionnaire / Privé</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;