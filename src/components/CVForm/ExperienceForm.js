// client/src/components/CVForm/ExperienceForm.js
import React, { useState, useContext } from 'react';
import { CVContext } from '../../context/CVContext';
import '../../styles/CVForm.css';

const ExperienceForm = ({ experiences, onChange }) => {
  const { enhanceWithAI } = useContext(CVContext);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    context: '',
    responsibilities: '',
    achievements: '',
    tools: ''
  });
  
  const handleAddExperience = () => {
    // Validate required fields
    if (!newExperience.company || !newExperience.position || !newExperience.startDate) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    onChange([...experiences, { ...newExperience }]);
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: '',
      context: '',
      responsibilities: '',
      achievements: '',
      tools: ''
    });
  };
  
  const handleUpdateExperience = (index, field, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [field]: value
    };
    onChange(updatedExperiences);
  };
  
  const handleRemoveExperience = (index) => {
    onChange(experiences.filter((_, i) => i !== index));
    if (activeIndex === index) {
      setActiveIndex(-1);
    }
  };
  
  const handleNewExperienceChange = (field, value) => {
    setNewExperience({
      ...newExperience,
      [field]: value
    });
  };
  
  const handleEnhanceDescription = async (index) => {
    const experience = experiences[index];
    if (!experience.description) return;
    
    try {
      const enhancedDescription = await enhanceWithAI('experience', experience.description, {
        jobTitle: experience.position,
        company: experience.company,
        industry: experience.context
      });
      
      handleUpdateExperience(index, 'description', enhancedDescription);
    } catch (error) {
      console.error('Error enhancing description:', error);
      alert('Erreur lors de l\'amélioration de la description');
    }
  };
  
  return (
    <div className="form-section">
      <h3>Expériences professionnelles</h3>
      
      <div className="experiences-list">
        {experiences.map((exp, index) => (
          <div key={index} className="experience-item">
            <div 
              className="experience-header"
              onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
            >
              <h4>{exp.position} - {exp.company}</h4>
              <div>
                <span>{exp.startDate} - {exp.endDate || 'Présent'}</span>
                <button 
                  type="button" 
                  className="btn-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveExperience(index);
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
            
            {activeIndex === index && (
              <div className="experience-details">
                <div className="form-row">
                  <div className="form-group">
                    <label>Entreprise *</label>
                    <input 
                      type="text" 
                      value={exp.company} 
                      onChange={(e) => handleUpdateExperience(index, 'company', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Poste *</label>
                    <input 
                      type="text" 
                      value={exp.position} 
                      onChange={(e) => handleUpdateExperience(index, 'position', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Date de début *</label>
                    <input 
                      type="text" 
                      value={exp.startDate} 
                      onChange={(e) => handleUpdateExperience(index, 'startDate', e.target.value)}
                      placeholder="MM/AAAA"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Date de fin</label>
                    <input 
                      type="text" 
                      value={exp.endDate} 
                      onChange={(e) => handleUpdateExperience(index, 'endDate', e.target.value)}
                      placeholder="MM/AAAA ou 'Présent'"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Contexte du projet/mission</label>
                  <textarea 
                    rows="2" 
                    value={exp.context} 
                    onChange={(e) => handleUpdateExperience(index, 'context', e.target.value)}
                    placeholder="Décrivez brièvement le contexte et l'objectif de la mission..."
                  />
                </div>
                
                <div className="form-group">
                  <label>Description et réalisations</label>
                  <textarea 
                    rows="4" 
                    value={exp.description} 
                    onChange={(e) => handleUpdateExperience(index, 'description', e.target.value)}
                    placeholder="Décrivez vos responsabilités et réalisations principales..."
                  />
                  <button 
                    type="button" 
                    className="btn-enhance"
                    onClick={() => handleEnhanceDescription(index)}
                    disabled={!exp.description}
                  >
                    Améliorer avec IA
                  </button>
                </div>
                
                <div className="form-group">
                  <label>Outils et technologies utilisés</label>
                  <input 
                    type="text" 
                    value={exp.tools} 
                    onChange={(e) => handleUpdateExperience(index, 'tools', e.target.value)}
                    placeholder="Listez les outils, technologies ou méthodologies utilisés..."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="add-experience">
        <h4>Ajouter une expérience</h4>
        
        <div className="form-row">
          <div className="form-group">
            <label>Entreprise *</label>
            <input 
              type="text" 
              value={newExperience.company} 
              onChange={(e) => handleNewExperienceChange('company', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Poste *</label>
            <input 
              type="text" 
              value={newExperience.position} 
              onChange={(e) => handleNewExperienceChange('position', e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Date de début *</label>
            <input 
              type="text" 
              value={newExperience.startDate} 
              onChange={(e) => handleNewExperienceChange('startDate', e.target.value)}
              placeholder="MM/AAAA"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date de fin</label>
            <input 
              type="text" 
              value={newExperience.endDate} 
              onChange={(e) => handleNewExperienceChange('endDate', e.target.value)}
              placeholder="MM/AAAA ou laissez vide pour 'Présent'"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea 
            rows="3" 
            value={newExperience.description} 
            onChange={(e) => handleNewExperienceChange('description', e.target.value)}
            placeholder="Décrivez vos responsabilités et réalisations principales..."
          />
        </div>
        
        <button 
          type="button" 
          className="btn-add"
          onClick={handleAddExperience}
        >
          Ajouter l'expérience
        </button>
      </div>
    </div>
  );
};

export default ExperienceForm;