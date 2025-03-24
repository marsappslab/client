// client/src/components/CVForm/PersonalInfoForm.js
import React, { useContext } from 'react';
import { CVContext } from '../../context/CVContext';
import '../../styles/CVForm.css';

const PersonalInfoForm = ({ data, onChange }) => {
  const { enhanceWithAI } = useContext(CVContext);
  
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };
  
  const handleEnhanceSummary = async () => {
    if (!data.summary) return;
    
    try {
      const enhancedSummary = await enhanceWithAI('summary', data.summary);
      handleChange('summary', enhancedSummary);
    } catch (error) {
      console.error('Error enhancing summary:', error);
      alert('Erreur lors de l\'amélioration du résumé');
    }
  };
  
  return (
    <div className="form-section">
      <h3>Informations personnelles</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Prénom *</label>
          <input 
            type="text" 
            value={data.firstName} 
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Nom *</label>
          <input 
            type="text" 
            value={data.lastName} 
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Email *</label>
          <input 
            type="email" 
            value={data.email} 
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Téléphone</label>
          <input 
            type="tel" 
            value={data.phone} 
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Ville</label>
          <input 
            type="text" 
            value={data.city} 
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Pays</label>
          <input 
            type="text" 
            value={data.country} 
            onChange={(e) => handleChange('country', e.target.value)}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Résumé professionnel</label>
        <textarea 
          rows="4" 
          value={data.summary} 
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Décrivez votre profil professionnel en quelques phrases..."
        />
        <button 
          type="button" 
          className="btn-enhance"
          onClick={handleEnhanceSummary}
          disabled={!data.summary}
        >
          Améliorer avec IA
        </button>
      </div>
    </div>
  );
};

export default PersonalInfoForm;