// client/src/components/CVForm/TemplateSelector.js
import React from 'react';
import '../../styles/CVForm.css';

const TemplateSelector = ({ templates, selectedTemplate, onChange, cvData }) => {
  return (
    <div className="template-selector">
      <div className="templates-grid">
        {templates.map(template => (
          <div 
            key={template._id}
            className={`template-card ${selectedTemplate === template._id ? 'selected' : ''}`}
            onClick={() => onChange(template._id)}
          >
            <div className="template-preview">
              {/* In a real app, this would be an actual preview image */}
              <div className="preview-placeholder">
                <div className="preview-header"></div>
                <div className="preview-content">
                  <div className="preview-sidebar"></div>
                  <div className="preview-main"></div>
                </div>
              </div>
            </div>
            <div className="template-info">
              <h4>{template.name}</h4>
              <p>{template.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="template-preview-large">
        <h3>Aperçu</h3>
        <div className="preview-container">
          {/* This would be a real preview in the full app */}
          <div className="cv-preview-placeholder">
            <div className="cv-header">
              <div className="cv-name">{cvData.personalInfo.firstName} {cvData.personalInfo.lastName}</div>
              <div className="cv-title">
                {cvData.experiences.length > 0 ? cvData.experiences[0].position : 'Titre professionnel'}
              </div>
            </div>
            
            <div className="cv-body">
              <div className="cv-section">
                <h4>Expérience professionnelle</h4>
                <div className="cv-experiences">
                  {cvData.experiences.slice(0, 2).map((exp, index) => (
                    <div key={index} className="cv-experience-item">
                      <div className="cv-experience-header">
                        <strong>{exp.position}</strong> - {exp.company}
                      </div>
                      <div className="cv-experience-dates">
                        {exp.startDate} - {exp.endDate || 'Présent'}
                      </div>
                      <div className="cv-experience-desc">
                        {exp.description.substring(0, 60)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="cv-section">
                <h4>Formation</h4>
                <div className="cv-education">
                  {cvData.education.slice(0, 1).map((edu, index) => (
                    <div key={index} className="cv-education-item">
                      <div className="cv-education-header">
                        <strong>{edu.degree}</strong> - {edu.institution}
                      </div>
                      <div className="cv-education-dates">
                        {edu.startDate} - {edu.endDate || 'Présent'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="cv-section">
                <h4>Compétences</h4>
                <div className="cv-skills">
                  {cvData.skills.slice(0, 5).map((skill, index) => (
                    <div key={index} className="cv-skill-item">
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;