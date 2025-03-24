// client/src/context/CVContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { UserContext } from './UserContext';

export const CVContext = createContext();

export const CVProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [cvs, setCvs] = useState([]);
  const [currentCV, setCurrentCV] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Fetch user's CVs when user changes
  useEffect(() => {
    if (user?._id) {
      fetchUserCVs();
    } else {
      setCvs([]);
    }
  }, [user]);
  
  // Fetch user's CVs
  const fetchUserCVs = async () => {
    if (!user?._id) return;
    
    try {
      setLoading(true);
      const response = await api.get(`/cv/user/${user._id}`);
      setCvs(response.data);
    } catch (error) {
      console.error('Error fetching CVs:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Create new CV
  const createCV = async (cvData) => {
    try {
      setLoading(true);
      const response = await api.post('/cv', {
        ...cvData,
        userId: user._id
      });
      
      const newCV = response.data;
      setCvs([...cvs, newCV]);
      setCurrentCV(newCV);
      return newCV;
    } catch (error) {
      console.error('Error creating CV:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Update CV
  const updateCV = async (id, data) => {
    try {
      setLoading(true);
      const response = await api.put(`/cv/${id}`, data);
      
      const updatedCV = response.data;
      setCvs(cvs.map(cv => cv._id === id ? updatedCV : cv));
      
      if (currentCV?._id === id) {
        setCurrentCV(updatedCV);
      }
      
      return updatedCV;
    } catch (error) {
      console.error('Error updating CV:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Delete CV
  const deleteCV = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/cv/${id}`);
      
      setCvs(cvs.filter(cv => cv._id !== id));
      
      if (currentCV?._id === id) {
        setCurrentCV(null);
      }
    } catch (error) {
      console.error('Error deleting CV:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Enhance content with AI
  const enhanceWithAI = async (type, content, context = {}) => {
    try {
      const response = await api.post('/cv/enhance', {
        type,
        content,
        context
      });
      
      return response.data.enhancedContent;
    } catch (error) {
      console.error('Error enhancing with AI:', error);
      throw error;
    }
  };
  
  return (
    <CVContext.Provider 
      value={{ 
        cvs, 
        currentCV, 
        setCurrentCV, 
        loading, 
        createCV, 
        updateCV, 
        deleteCV,
        enhanceWithAI,
        fetchUserCVs
      }}
    >
      {children}
    </CVContext.Provider>
  );
};
