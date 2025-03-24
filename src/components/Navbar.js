// client/src/components/Navbar.js
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <NavLink 
        to="/create-cv" 
        className={`nav-item ${location.pathname === '/create-cv' ? 'active' : ''}`}
      >
        <div className="nav-icon">✎</div>
        <div className="nav-text">Créer</div>
      </NavLink>
      
      <NavLink 
        to="/my-documents" 
        className={`nav-item ${location.pathname === '/my-documents' ? 'active' : ''}`}
      >
        <div className="nav-icon">📄</div>
        <div className="nav-text">Mes Docs</div>
      </NavLink>
      
      <NavLink 
        to="/profile" 
        className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
      >
        <div className="nav-icon">👤</div>
        <div className="nav-text">Profil</div>
      </NavLink>
      
      <NavLink 
        to="/settings" 
        className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
      >
        <div className="nav-icon">⚙️</div>
        <div className="nav-text">Paramètres</div>
      </NavLink>
    </nav>
  );
};

export default Navbar;