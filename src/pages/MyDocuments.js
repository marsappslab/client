// client/src/pages/MyDocuments.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/UserContext';
import { CVContext } from '../context/CVContext';
import '../styles/MyDocuments.css';

const MyDocuments = () => {
  const { user } = useContext(UserContext);
  const { cvs, loading, fetchUserCVs, deleteCV } = useContext(CVContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?._id) {
      fetchUserCVs();
    } else if (!loading) {
      navigate('/');
      toast.info('Veuillez vous connecter pour accéder à vos documents');
    }
  }, [user]);
  
  const handleViewCV = (id) => {
    navigate(`/preview/${id}`);
  };
  
  const handleEditCV = (id) => {
    navigate(`/create-cv?edit=${id}`);
  };
  
  const handleDeleteCV = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce CV ?')) {
      try {
        await deleteCV(id);
        toast.success('CV supprimé avec succès');
      } catch (error) {
        console.error('Error deleting CV:', error);
        toast.error('Erreur lors de la suppression du CV');
      }
    }
  };
  
  if (loading) {
    return <div className="loading">Chargement de vos documents...</div>;
  }
  
  return (
    <div className="documents-container">
      <h1>Mes Documents</h1>
      
      <div className="documents-tabs">
        <div className="tab active">CVs créés</div>
        <div className="tab">Brouillons</div>
        <div className="tab">Importés</div>
      </div>
      
      {cvs.length === 0 ? (
        <div className="no-documents">
          <p>Vous n'avez pas encore créé de CV</p>
          <button className="btn-primary" onClick={() => navigate('/create-cv')}>
            Créer un CV
          </button>
        </div>
      ) : (
        <div className="documents-grid">
          {cvs.map(cv => (
            <div key={cv._id} className="document-card">
              <div className="document-preview">
                <div className="preview-placeholder">
                  <div className="document-title">{cv.title}</div>
                  <div className="document-type">{cv.cvType}</div>
                </div>
              </div>
              
              <div className="document-info">
                <div className="document-name">
                  {cv.personalInfo.firstName} {cv.personalInfo.lastName}
                </div>
                <div className="document-date">
                  Mis à jour le {new Date(cv.updatedAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="document-actions">
                <button 
                  className="btn-view"
                  onClick={() => handleViewCV(cv._id)}
                >
                  Voir
                </button>
                <button 
                  className="btn-edit"
                  onClick={() => handleEditCV(cv._id)}
                >
                  Modifier
                </button>
                <button 
                  className="btn-delete"
                  onClick={() => handleDeleteCV(cv._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDocuments;