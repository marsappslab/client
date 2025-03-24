// client/src/pages/Home.js
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../styles/Home.css';

const Home = () => {
  const { user, login } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleGetStarted = async () => {
    if (!user) {
      try {
        // Simple login for MVP (would be replaced with proper auth in real app)
        const email = prompt('Entrez votre email pour continuer:');
        if (email) {
          await login(email);
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('Erreur de connexion. Veuillez réessayer.');
      }
    }
    
    navigate('/create-cv');
  };
  
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Créez votre CV professionnel en quelques minutes</h1>
        <p>Avec notre outil assisté par IA, créez facilement un CV qui vous démarque</p>
        
        <button className="btn-primary" onClick={handleGetStarted}>
          {user ? 'Créer un CV' : 'Commencer'}
        </button>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Simple et intuitif</h3>
          <p>Interface facile à utiliser pour créer votre CV en seulement 2 étapes</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🤖</div>
          <h3>Assisté par IA</h3>
          <p>Notre IA vous aide à rédiger un contenu impactant et professionnel</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Templates élégants</h3>
          <p>Choisissez parmi plusieurs designs modernes et professionnels</p>
        </div>
      </div>
    </div>
  );
};

export default Home;