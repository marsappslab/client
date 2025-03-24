// client/src/pages/Profile.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    city: '',
    country: ''
  });
  
  const handleChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };
  
  const handleSaveProfile = () => {
    // This would update the user profile in a real app
    toast.success('Profil mis à jour avec succès');
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast.info('Vous avez été déconnecté');
  };
  
  if (!user) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="profile-container">
      <h1>Mon Profil</h1>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {profileData.firstName?.charAt(0) || '?'}{profileData.lastName?.charAt(0) || '?'}
          </div>
          <div className="profile-name">
            {profileData.firstName} {profileData.lastName}
          </div>
          <div className="profile-email">
            {profileData.email}
          </div>
        </div>
        
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label>Prénom</label>
              <input 
                type="text" 
                value={profileData.firstName} 
                onChange={(e) => handleChange('firstName', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Nom</label>
              <input 
                type="text" 
                value={profileData.lastName} 
                onChange={(e) => handleChange('lastName', e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={profileData.email} 
                onChange={(e) => handleChange('email', e.target.value)}
                disabled
              />
            </div>
            
            <div className="form-group">
              <label>Téléphone</label>
              <input 
                type="tel" 
                value={profileData.phone} 
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Ville</label>
              <input 
                type="text" 
                value={profileData.city} 
                onChange={(e) => handleChange('city', e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label>Pays</label>
              <input 
                type="text" 
                value={profileData.country} 
                onChange={(e) => handleChange('country', e.target.value)}
              />
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="btn-primary" onClick={handleSaveProfile}>
              Enregistrer
            </button>
            <button className="btn-secondary" onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;