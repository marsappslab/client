// client/src/components/CVForm/SkillsForm.js
import React, { useContext } from 'react';
import { CVContext } from '../../context/CVContext';
import '../../styles/CVForm.css';

const SkillsForm = ({ skills, onChange }) => {
  const { enhanceWithAI } = useContext(CVContext);
  const [newSkill, setNewSkill] = React.useState({ name: '', level: 3, category: '' });
  
  const handleAddSkill = () => {
    if (!newSkill.name) {
      alert('Veuillez entrer un nom de compétence');
      return;
    }
    
    onChange([...skills, { ...newSkill }]);
    setNewSkill({ name: '', level: 3, category: '' });
  };
  
  const handleRemoveSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };
  
  const handleSkillChange = (field, value) => {
    setNewSkill({
      ...newSkill,
      [field]: value
    });
  };
  
  const handleSuggestSkills = async () => {
    try {
      // Get current job titles from experiences
      const jobTitles = document.querySelectorAll('.experience-header h4');
      const positions = Array.from(jobTitles).map(el => el.textContent).join(', ');
      
      if (!positions) {
        alert('Veuillez ajouter au moins une expérience professionnelle pour générer des suggestions de compétences');
        return;
      }
      
      const suggestedSkills = await enhanceWithAI('skill', positions);
      
      // Parse the comma-separated list
      const skillList = suggestedSkills.split(',').map(skill => skill.trim());
      
      // Add each skill if it doesn't already exist
      const existingSkillNames = skills.map(s => s.name.toLowerCase());
      const newSkills = skillList
        .filter(skill => skill && !existingSkillNames.includes(skill.toLowerCase()))
        .map(skill => ({
          name: skill,
          level: 3,
          category: ''
        }));
      
      if (newSkills.length > 0) {
        onChange([...skills, ...newSkills]);
      } else {
        alert('Aucune nouvelle compétence n\'a été suggérée');
      }
    } catch (error) {
      console.error('Error suggesting skills:', error);
      alert('Erreur lors de la suggestion de compétences');
    }
  };
  
  return (
    <div className="form-section">
      <h3>Compétences</h3>
      
      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <span className="skill-name">{skill.name}</span>
            <div className="skill-level">
              {[1, 2, 3, 4, 5].map(level => (
                <span 
                  key={level} 
                  className={`level-dot ${level <= skill.level ? 'filled' : ''}`}
                />
              ))}
            </div>
            <button 
              type="button" 
              className="btn-remove-small"
              onClick={() => handleRemoveSkill(index)}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      
      <div className="add-skill">
        <div className="form-row">
          <div className="form-group">
            <label>Compétence</label>
            <input 
              type="text" 
              value={newSkill.name} 
              onChange={(e) => handleSkillChange('name', e.target.value)}
              placeholder="Ex: JavaScript, Gestion de projet, etc."
            />
          </div>
          
          <div className="form-group">
            <label>Niveau (1-5)</label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={newSkill.level} 
              onChange={(e) => handleSkillChange('level', parseInt(e.target.value))}
            />
            <div className="range-value">{newSkill.level}</div>
          </div>
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            className="btn-add"
            onClick={handleAddSkill}
          >
            Ajouter
          </button>
          
          <button 
            type="button" 
            className="btn-suggest"
            onClick={handleSuggestSkills}
          >
            Suggérer des compétences (IA)
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;