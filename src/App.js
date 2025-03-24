// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import CreateCV from './pages/CreateCV';
import CVPreview from './pages/CVPreview';
import MyDocuments from './pages/MyDocuments';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

// Components
import Navbar from './components/Navbar';

// Context
import { UserProvider } from './context/UserContext';
import { CVProvider } from './context/CVContext';

function App() {
  return (
    <UserProvider>
      <CVProvider>
        <Router>
          <div className="app">
            <ToastContainer position="top-right" autoClose={5000} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create-cv" element={<CreateCV />} />
              <Route path="/preview/:id" element={<CVPreview />} />
              <Route path="/my-documents" element={<MyDocuments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
            <Navbar />
          </div>
        </Router>
      </CVProvider>
    </UserProvider>
  );
}

export default App;



