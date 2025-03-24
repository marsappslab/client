// client/src/components/CVForm/CVTypeSelector.js
import React from 'react';
import '../../styles/CVForm.css';

const CVTypeSelector = ({ value, onChange }) => {
  const cvTypes = [
    {
      id: 'Chronologique',
      name: 'CV Chronologique',
      description: 'Présentation des expériences de la plus récente à la plus ancienne.',
      explanation: 'Idéal si votre parcours est cohérent et sans interruptions majeures. Met en valeur votre évolution de carrière.'
    },
    {
      id: 'Fonctionnel',
      name: 'CV Fonctionnel (par compétences)',
      description: 'Met l\'accent sur les compétences et réalisations regroupées par thèmes.',
      explanation: 'Convient bien si vous avez occupé des fonctions très variées ou si vous changez de domaine.'
    },
    {
      id: 'Mixte',
      name: 'CV Mixte (ou combiné)',
      description: 'Combine les approches chronologique et fonctionnelle.',
      explanation: 'Commence par une section Compétences clés, suivie d\'une liste chronologique des expériences.'
    }
  ];
  
  return (
    <div className="form-section">
      <h3>Type de CV</h3>
      <p className="form-hint">Choisissez le format qui correspond le mieux à votre parcours professionnel</p>
      
      <div className="cv-type-options">
        {cvTypes.map(type => (
          <div 
            key={type.id}
            className={`cv-type-option ${value === type.id ? 'selected' : ''}`}
            onClick={() => onChange(type.id)}
          >
            <h4>{type.name}</h4>
            <p>{type.description}</p>
            <div className="type-explanation">
              <span className="info-icon">?</span>
              <div className="explanation-tooltip">
                {type.explanation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVTypeSelector;