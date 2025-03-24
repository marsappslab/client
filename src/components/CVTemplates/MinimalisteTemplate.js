// client/src/components/CVTemplates/MinimalisteTemplate.js
import React from 'react';
import '../../styles/CVTemplates.css';

const MinimalisteTemplate = ({ cv }) => {
  const { personalInfo, experiences, education, skills } = cv;
  
  return (
    <div className="cv-template minimaliste">
      <div className="cv-header">
        <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
        {experiences.length > 0 && (
          <p className="job-title">{experiences[0].position}</p>
        )}
      </div>
      
      <div className="cv-content">
        <div className="cv-sidebar">
          <div className="sidebar-section">
            <h2>Contact</h2>
            <ul className="contact-list">
              {personalInfo.email && <li>{personalInfo.email}</li>}
              {personalInfo.phone && <li>{personalInfo.phone}</li>}
              {personalInfo.city && personalInfo.country && (
                <li>{personalInfo.city}, {personalInfo.country}</li>
              )}
            </ul>
          </div>
          
          {skills.length > 0 && (
            <div className="sidebar-section">
              <h2>Compétences</h2>
              <ul className="skills-list">
                {skills.map((skill, index) => (
                  <li key={index}>{skill.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="cv-main">
          {personalInfo.summary && (
            <div className="cv-section">
              <p className="summary">{personalInfo.summary}</p>
            </div>
          )}
          
          {experiences.length > 0 && (
            <div className="cv-section">
              <h2>Expérience</h2>
              {experiences.map((exp, index) => (
                <div key={index} className="mini-item">
                  <div className="mini-header">
                    <h3>{exp.position} | {exp.company}</h3>
                    <span className="date">{exp.startDate} - {exp.endDate || 'Présent'}</span>
                  </div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </div>
          )}
          
          {education.length > 0 && (
            <div className="cv-section">
              <h2>Formation</h2>
              {education.map((edu, index) => (
                <div key={index} className="mini-item">
                  <div className="mini-header">
                    <h3>{edu.degree} | {edu.institution}</h3>
                    <span className="date">{edu.startDate} - {edu.endDate || 'Présent'}</span>
                  </div>
                  {edu.description && <p>{edu.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalisteTemplate;