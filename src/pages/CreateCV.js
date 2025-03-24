// client/src/pages/CreateCV.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { CVContext } from '../context/CVContext';
import api from '../services/api';
import '../styles/CreateCV.css';

// Components
import CVTypeSelector from '../components/CVForm/CVTypeSelector';
import PersonalInfoForm from '../components/CVForm/PersonalInfoForm';
import ExperienceForm from '../components/CVForm/ExperienceForm';
import EducationForm from '../components/CVForm/EducationForm';
import SkillsForm from '../components/CVForm/SkillsForm';
import TemplateSelector from '../components/CVForm/TemplateSelector';

const CreateCV = () => {
  const { user } = useContext(UserContext);
  const { createCV } = useContext(CVContext);
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // CV data state
  const [cvData, setCvData] = useState({
    title: 'Mon CV',
    cvType: 'Chronologique',
    template: '',
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      summary: ''
    },
    experiences: [],
    education: [],
    skills: [],
    languages: [],
    certifications: []
  });
  
  // Fetch templates on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await api.get('/templates');
        setTemplates(response.data);
        
        // Initialize templates if none exist
        if (response.data.length === 0) {
          await api.post('/templates/initialize');
          const newResponse = await api.get('/templates');
          setTemplates(newResponse.data);
        }
        
        // Set default template
        if (response.data.length > 0 && !cvData.template) {
          setCvData(prev => ({
            ...prev,
            template: response.data[0]._id
          }));
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast.error('Erreur lors du chargement des templates');
      }
    };
    
    fetchTemplates();
  }, []);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      navigate('/');
      toast.info('Veuillez vous connecter pour créer un CV');
    }
  }, [user, navigate]);
  
  // Handle form data changes
  const handleChange = (section, data) => {
    setCvData(prev => ({
      ...prev,
      [section]: data
    }));
  };
  
  // Handle next step
  const handleNext = () => {
    if (step === 1) {
      // Validate first step
      const { firstName, lastName, email } = cvData.personalInfo;
      if (!firstName || !lastName || !email) {
        toast.error('Veuillez remplir tous les champs obligatoires');
        return;
      }
    }
    
    setStep(prev => prev + 1);
  };
  
  // Handle previous step
  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };
  
  // Handle submit
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Validate data
      if (!cvData.template) {
        toast.error('Veuillez sélectionner un template');
        return;
      }
      
      // Create CV
      const newCV = await createCV(cvData);
      
      toast.success('CV créé avec succès!');
      navigate(`/preview/${newCV._id}`);
    } catch (error) {
      console.error('Error creating CV:', error);
      toast.error('Erreur lors de la création du CV');
    } finally {
      setLoading(false);
    }
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Informations personnelles et professionnelles</h2>
            
            <CVTypeSelector 
              value={cvData.cvType} 
              onChange={(value) => handleChange('cvType', value)} 
            />
            
            <PersonalInfoForm 
              data={cvData.personalInfo} 
              onChange={(data) => handleChange('personalInfo', data)} 
            />
            
            <ExperienceForm 
              experiences={cvData.experiences} 
              onChange={(data) => handleChange('experiences', data)} 
            />
            
            <EducationForm 
              education={cvData.education} 
              onChange={(data) => handleChange('education', data)} 
            />
            
            <SkillsForm 
              skills={cvData.skills} 
              onChange={(data) => handleChange('skills', data)} 
            />
          </div>
        );
        
      case 2:
        return (
          <div className="form-step">
            <h2>Choisissez un template</h2>
            
            <TemplateSelector 
              templates={templates} 
              selectedTemplate={cvData.template} 
              onChange={(templateId) => handleChange('template', templateId)} 
              cvData={cvData}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="create-cv-container">
      <div className="steps-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Informations</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Template</div>
      </div>
      
      {renderStepContent()}
      
      <div className="navigation-buttons">
        {step > 1 && (
          <button 
            className="btn-secondary" 
            onClick={handlePrevious}
            disabled={loading}
          >
            Précédent
          </button>
        )}
        
        {step < 2 ? (
          <button 
            className="btn-primary" 
            onClick={handleNext}
            disabled={loading}
          >
            Suivant
          </button>
        ) : (
          <button 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Création en cours...' : 'Créer mon CV'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateCV;