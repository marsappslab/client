// client/src/components/CVTemplates/SynthetiqueTemplate.js
import React from 'react';
import '../../styles/CVTemplates.css';

const SynthetiqueTemplate = ({ cv }) => {
  const { personalInfo, experiences, education, skills } = cv;
  
  // Group skills by category if available
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Autres';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});
  
  return (
    <div className="cv-template synthetique">
      <div className="cv-header synthetique-header">
        <h1>{personalInfo.firstName} {personalInfo.lastName}</h1>
        <div className="header-line"></div>
        <div className="contact-row">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.city && <span>{personalInfo.city}</span>}
        </div>
      </div>
      
      <div className="cv-content synthetique-content">
        {skills.length > 0 && (
          <div className="cv-section skills-summary">
            <h2>Compétences clés</h2>
            <div className="skills-highlights">
              {Object.entries(groupedSkills).map(([category, skillsList]) => (
                <div key={category} className="skill-category">
                  {category !== 'Autres' && <h3>{category}</h3>}
                  <div className="skill-tags">
                    {skillsList.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {personalInfo.summary && (
          <div className="cv-section synthetique-summary">
            <h2>Profil</h2>
            <p>{personalInfo.summary}</p>
          </div>
        )}
        
        {experiences.length > 0 && (
          <div className="cv-section synthetique-experience">
            <h2>Expérience professionnelle</h2>
            <div className="synthetique-timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h3>{exp.position}</h3>
                      <div className="company-period">
                        <span className="company">{exp.company}</span>
                        <span className="period">{exp.startDate} - {exp.endDate || 'Présent'}</span>
                      </div>
                    </div>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {education.length > 0 && (
          <div className="cv-section synthetique-education">
            <h2>Formation</h2>
            <div className="education-compact">
              {education.map((edu, index) => (
                <div key={index} className="education-row">
                  <div className="education-period">
                    {edu.startDate} - {edu.endDate || 'Présent'}
                  </div>
                  <div className="education-details">
                    <h3>{edu.degree}</h3>
                    <h4>{edu.institution}</h4>
                    {edu.field && <p>{edu.field}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SynthetiqueTemplate;