// client/src/pages/Settings.js
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    language: 'fr',
    darkMode: false,
    notifications: true,
    dataPrivacy: true
  });
  
  const handleChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value
    });
  };
  
  const handleSaveSettings = () => {
    // This would save settings in a real app
    toast.success('Paramètres enregistrés avec succès');
  };
  
  return (
    <div className="settings-container">
      <h1>Paramètres</h1>
      
      <div className="settings-card">
        <div className="settings-section">
          <h2>Préférences</h2>
          
          <div className="setting-item">
            <div className="setting-label">Langue</div>
            <div className="setting-control">
              <select 
                value={settings.language} 
                onChange={(e) => handleChange('language', e.target.value)}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
          
          <div className="setting-item">
            <div className="setting-label">Mode sombre</div>
            <div className="setting-control">
              <label className="toggle">
                <input 
                  type="checkbox" 
                  checked={settings.darkMode} 
                  onChange={(e) => handleChange('darkMode', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="setting-item">
            <div className="setting-label">Notifications</div>
            <div className="setting-control">
              <label className="toggle">
                <input 
                  type="checkbox" 
                  checked={settings.notifications} 
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>Confidentialité et données</h2>
          
          <div className="setting-item">
            <div className="setting-label">Partager les données d'utilisation anonymes</div>
            <div className="setting-control">
              <label className="toggle">
                <input 
                  type="checkbox" 
                  checked={settings.dataPrivacy} 
                  onChange={(e) => handleChange('dataPrivacy', e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
          
          <div className="setting-item">
            <div className="setting-label">Supprimer toutes mes données</div>
            <div className="setting-control">
              <button 
                className="btn-danger"
                onClick={() => toast.info('Cette fonctionnalité sera disponible dans une version ultérieure')}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h2>À propos</h2>
          
          <div className="setting-item">
            <div className="setting-label">Version</div>
            <div className="setting-value">1.0.0 (MVP)</div>
          </div>
          
          <div className="setting-item">
            <div className="setting-label">Conditions d'utilisation</div>
            <div className="setting-link">Consulter</div>
          </div>
          
          <div className="setting-item">
            <div className="setting-label">Politique de confidentialité</div>
            <div className="setting-link">Consulter</div>
          </div>
        </div>
        
        <div className="settings-actions">
          <button className="btn-primary" onClick={handleSaveSettings}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;