import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Location from './pages/Location';
import Program from './pages/Program';

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div style={{ 
        backgroundColor: '#0B0C10', 
        minHeight: '100vh', 
        maxWidth: '480px', 
        margin: '0 auto', 
        boxShadow: '0 0 15px rgba(0,0,0,0.5)',
        fontFamily: 'sans-serif'
      }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location" element={<Location />} />
          <Route path="/program" element={<Program />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;