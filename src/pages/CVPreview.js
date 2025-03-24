// client/src/pages/CVPreview.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CVContext } from '../context/CVContext';
import api from '../services/api';
import '../styles/CVPreview.css';

// CV Template Components
import SobreTemplate from '../components/CVTemplates/SobreTemplate';
import MinimalisteTemplate from '../components/CVTemplates/MinimalisteTemplate';
import DetailleTemplate from '../components/CVTemplates/DetailleTemplate';
import SynthetiqueTemplate from '../components/CVTemplates/SynthetiqueTemplate';

const CVPreview = () => {
  const { id } = useParams();
  const { currentCV, setCurrentCV } = useContext(CVContext);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState(null);
  const navigate = useNavigate();
  
  // Fetch CV data if not in context
  useEffect(() => {
    const fetchCV = async () => {
      try {
        setLoading(true);
        
        // If CV is not in context, fetch it
        if (!currentCV || currentCV._id !== id) {
          const response = await api.get(`/cv/${id}`);
          setCurrentCV(response.data);
        }
        
        // Fetch template details
        if (currentCV?.template) {
          const templateResponse = await api.get(`/templates/${currentCV.template}`);
          setTemplate(templateResponse.data);
        }
      } catch (error) {
        console.error('Error fetching CV:', error);
        toast.error('Erreur lors du chargement du CV');
        navigate('/my-documents');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCV();
  }, [id, currentCV?._id]);
  
  // Handle export
  const handleExport = async () => {
    try {
      await api.get(`/cv/${id}/export`);
      toast.success('Export en PDF sera disponible dans la version complète');
    } catch (error) {
      console.error('Error exporting CV:', error);
      toast.error('Erreur lors de l\'export du CV');
    }
  };
  
  // Handle edit
  const handleEdit = () => {
    navigate(`/create-cv?edit=${id}`);
  };
  
  // Render appropriate template
  const renderTemplate = () => {
    if (!currentCV || !template) return null;
    
    switch (template.type) {
      case 'Sobre':
        return <SobreTemplate cv={currentCV} />;
      case 'Minimaliste':
        return <MinimalisteTemplate cv={currentCV} />;
      case 'Détaillé':
        return <DetailleTemplate cv={currentCV} />;
      case 'Synthétique':
        return <SynthetiqueTemplate cv={currentCV} />;
      default:
        return <div>Template non trouvé</div>;
    }
  };
  
  if (loading) {
    return <div className="loading">Chargement du CV...</div>;
  }
  
  return (
    <div className="preview-container">
      <div className="preview-header">
        <h1>Aperçu de votre CV</h1>
        
        <div className="preview-actions">
          <button className="btn-secondary" onClick={handleEdit}>
            Modifier
          </button>
          <button className="btn-primary" onClick={handleExport}>
            Exporter en PDF
          </button>
        </div>
      </div>
      
      <div className="preview-content">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default CVPreview;