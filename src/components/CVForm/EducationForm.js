// client/src/components/CVForm/EducationForm.js
import React, { useState } from 'react';
import '../../styles/CVForm.css';

const EducationForm = ({ education, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  
  const handleAddEducation = () => {
    // Validate required fields
    if (!newEducation.institution || !newEducation.degree || !newEducation.startDate) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    onChange([...education, { ...newEducation }]);
    setNewEducation({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };
  
  const handleUpdateEducation = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    onChange(updatedEducation);
  };
  
  const handleRemoveEducation = (index) => {
    onChange(education.filter((_, i) => i !== index));
    if (activeIndex === index) {
      setActiveIndex(-1);
    }
  };
  
  const handleNewEducationChange = (field, value) => {
    setNewEducation({
      ...newEducation,
      [field]: value
    });
  };
  
  return (
    <div className="form-section">
      <h3>Formation</h3>
      
      <div className="education-list">
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <div 
              className="education-header"
              onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
            >
              <h4>{edu.degree} - {edu.institution}</h4>
              <div>
                <span>{edu.startDate} - {edu.endDate || 'Présent'}</span>
                <button 
                  type="button" 
                  className="btn-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveEducation(index);
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
            
            {activeIndex === index && (
              <div className="education-details">
                <div className="form-row">
                  <div className="form-group">
                    <label>Établissement *</label>
                    <input 
                      type="text" 
                      value={edu.institution} 
                      onChange={(e) => handleUpdateEducation(index, 'institution', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Diplôme *</label>
                    <input 
                      type="text" 
                      value={edu.degree} 
                      onChange={(e) => handleUpdateEducation(index, 'degree', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Domaine d'études</label>
                    <input 
                      type="text" 
                      value={edu.field} 
                      onChange={(e) => handleUpdateEducation(index, 'field', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Date de début *</label>
                    <input 
                      type="text" 
                      value={edu.startDate} 
                      onChange={(e) => handleUpdateEducation(index, 'startDate', e.target.value)}
                      placeholder="MM/AAAA"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Date de fin</label>
                    <input 
                      type="text" 
                      value={edu.endDate} 
                      onChange={(e) => handleUpdateEducation(index, 'endDate', e.target.value)}
                      placeholder="MM/AAAA ou 'Présent'"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea 
                    rows="3" 
                    value={edu.description} 
                    onChange={(e) => handleUpdateEducation(index, 'description', e.target.value)}
                    placeholder="Décrivez cette formation, les compétences acquises, les projets réalisés..."
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="add-education">
        <h4>Ajouter une formation</h4>
        
        <div className="form-row">
          <div className="form-group">
            <label>Établissement *</label>
            <input 
              type="text" 
              value={newEducation.institution} 
              onChange={(e) => handleNewEducationChange('institution', e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Diplôme *</label>
            <input 
              type="text" 
              value={newEducation.degree} 
              onChange={(e) => handleNewEducationChange('degree', e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Date de début *</label>
            <input 
              type="text" 
              value={newEducation.startDate} 
              onChange={(e) => handleNewEducationChange('startDate', e.target.value)}
              placeholder="MM/AAAA"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Date de fin</label>
            <input 
              type="text" 
              value={newEducation.endDate} 
              onChange={(e) => handleNewEducationChange('endDate', e.target.value)}
              placeholder="MM/AAAA ou laissez vide pour 'Présent'"
            />
          </div>
        </div>
        
        <button 
          type="button" 
          className="btn-add"
          onClick={handleAddEducation}
        >
          Ajouter la formation
        </button>
      </div>
    </div>
  );
};

export default EducationForm;