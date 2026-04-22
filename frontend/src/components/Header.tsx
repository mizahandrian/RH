import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState(''); // 🔥 ajout
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getUserInitial = () => {
    if (user.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'U';
  };

  // 🔍 fonction recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recherche :", search);

    // 👉 tu peux rediriger ou filtrer ici
    // navigate(`/search?q=${search}`);
  };

  return (
    <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      
      {/* 🔍 BARRE DE RECHERCHE */}
      <form onSubmit={handleSearch} className="search-bar" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '6px 10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginRight: '5px'
          }}
        />
        <button type="submit" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>

      {/* 👤 USER */}
      <div className="header-user" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <div className="user-avatar">
          {getUserInitial()}
        </div>
        <span className="user-name">{user.name || 'Utilisateur'}</span>
        
        {dropdownOpen && (
          <div className="user-dropdown">
            <button className="dropdown-item">
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
              Mon profil
            </button>
            <button className="dropdown-item logout" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;