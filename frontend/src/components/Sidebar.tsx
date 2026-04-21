// src/components/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, faUsers, faBuilding, faBriefcase, faUserTie,
  faChartLine, faHistory, faDatabase, faUserShield
} from '@fortawesome/free-solid-svg-icons';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/dashboard', name: 'Tableau de bord', icon: faTachometerAlt },
    { path: '/personnels', name: 'Personnels', icon: faUsers },
    { path: '/directions', name: 'Directions', icon: faBuilding },
    { path: '/services', name: 'Services', icon: faBriefcase },
    { path: '/postes', name: 'Postes', icon: faUserTie },
    { path: '/carrieres', name: 'Carrières', icon: faChartLine },
    { path: '/historique', name: 'Historique', icon: faHistory },
    { path: '/base-rohi', name: 'Base ROHI', icon: faDatabase },
    { path: '/base-augure', name: 'Base AUGURE', icon: faDatabase },
    { path: '/admin', name: 'Administration', icon: faUserShield },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>INSTAT</h2>
        <p>Gestion RH</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={item.icon} className="nav-icon" />
            <span className="nav-text">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;