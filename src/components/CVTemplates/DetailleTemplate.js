// client/src/components/CVTemplates/DetailleTemplate.js
import React from 'react';
import '../../styles/CVTemplates.css';

const DetailleTemplate = ({ cv }) => {
  const { personalInfo, experiences, education, skills } = cv;
  
  return (
    <div className="cv-template detaille">
      <div className="cv-header detaille-header">
        <div className="header-main">
          <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
          {experiences.length > 0 && (
            <p className="job-title">{experiences[0].position}</p>
          )}
        </div>
        <div className="header-contact">
          <div className="contact-grid">
            {personalInfo.email && (
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="contact-item">
                <span className="contact-icon">☏</span>
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {(personalInfo.city || personalInfo.country) && (
              <div className="contact-item">
                <span className="contact-icon">⌂</span>
                <span>
                  {personalInfo.city}{personalInfo.city && personalInfo.country && ', '}{personalInfo.country}
                </span>
              </div>
            )}
            {personalInfo.linkedIn && (
              <div className="contact-item">
                <span className="contact-icon">in</span>
                <span>{personalInfo.linkedIn}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="cv-content detaille-content">
        {personalInfo.summary && (
          <div className="cv-section summary-section">
            <h2>Profil professionnel</h2>
            <div className="section-content">
              <p>{personalInfo.summary}</p>
            </div>
          </div>
        )}
        
        {experiences.length > 0 && (
          <div className="cv-section">
            <h2>Expérience professionnelle</h2>
            <div className="section-content">
              {experiences.map((exp, index) => (
                <div key={index} className="detailed-item">
                  <div className="detailed-header">
                    <div className="detailed-title">
                      <h3>{exp.position}</h3>
                      <h4>{exp.company}</h4>
                    </div>
                    <div className="detailed-period">
                      <span>{exp.startDate} - {exp.endDate || 'Présent'}</span>
                    </div>
                  </div>
                  
                  <div className="detailed-content">
                    {exp.context && (
                      <div className="context-block">
                        <h5>Contexte</h5>
                        <p>{exp.context}</p>
                      </div>
                    )}
                    
                    <div className="description-block">
                      <h5>Responsabilités et réalisations</h5>
                      <p>{exp.description}</p>
                    </div>
                    
                    {exp.tools && (
                      <div className="tools-block">
                        <h5>Technologies et outils</h5>
                        <p>{exp.tools}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {education.length > 0 && (
          <div className="cv-section">
            <h2>Formation</h2>
            <div className="section-content">
              {education.map((edu, index) => (
                <div key={index} className="detailed-item">
                  <div className="detailed-header">
                    <div className="detailed-title">
                      <h3>{edu.degree}</h3>
                      <h4>{edu.institution}</h4>
                      {edu.field && <p className="field">{edu.field}</p>}
                    </div>
                    <div className="detailed-period">
                      <span>{edu.startDate} - {edu.endDate || 'Présent'}</span>
                    </div>
                  </div>
                  
                  {edu.description && (
                    <div className="detailed-content">
                      <p>{edu.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {skills.length > 0 && (
          <div className="cv-section">
            <h2>Compétences</h2>
            <div className="section-content">
              <div className="skills-grid">
                {skills.map((skill, index) => (
                  <div key={index} className="detailed-skill">
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div 
                        className="skill-level-bar" 
                        style={{ width: `${skill.level * 20}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailleTemplate;