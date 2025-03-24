// client/src/components/CVTemplates/SobreTemplate.js
import React from 'react';
import '../../styles/CVTemplates.css';

const SobreTemplate = ({ cv }) => {
  const { personalInfo, experiences, education, skills } = cv;
  
  return (
    <div className="cv-template sobre">
      <div className="cv-header">
        <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
        {experiences.length > 0 && (
          <p className="job-title">{experiences[0].position}</p>
        )}
        <div className="contact-info">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.city && personalInfo.country && (
            <span>{personalInfo.city}, {personalInfo.country}</span>
          )}
        </div>
      </div>
      
      {personalInfo.summary && (
        <div className="cv-section">
          <h2>Profil</h2>
          <p>{personalInfo.summary}</p>
        </div>
      )}
      
      {experiences.length > 0 && (
        <div className="cv-section">
          <h2>Expérience professionnelle</h2>
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-header">
                <div className="job-info">
                  <h3>{exp.position}</h3>
                  <h4>{exp.company}</h4>
                </div>
                <div className="job-period">
                  <p>{exp.startDate} - {exp.endDate || 'Présent'}</p>
                </div>
              </div>
              <p className="experience-description">{exp.description}</p>
              {exp.tools && <p className="tools-used"><strong>Outils:</strong> {exp.tools}</p>}
            </div>
          ))}
        </div>
      )}
      
      {education.length > 0 && (
        <div className="cv-section">
          <h2>Formation</h2>
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-header">
                <div className="education-info">
                  <h3>{edu.degree}</h3>
                  <h4>{edu.institution}</h4>
                  {edu.field && <p>{edu.field}</p>}
                </div>
                <div className="education-period">
                  <p>{edu.startDate} - {edu.endDate || 'Présent'}</p>
                </div>
              </div>
              {edu.description && <p>{edu.description}</p>}
            </div>
          ))}
        </div>
      )}
      
      {skills.length > 0 && (
        <div className="cv-section">
          <h2>Compétences</h2>
          <div className="skills-container">
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SobreTemplate;