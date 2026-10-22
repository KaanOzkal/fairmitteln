import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Application from './pages/Application';
import Leistungen from './pages/Leistungen'; 
import Ablauf from './pages/Ablauf';
import Branchen from './pages/Branchen';
import UberUns from './pages/UberUns';
import Kontakt from './pages/Kontakt';

function App() {
  return (
    <Router>
      <Routes>
        {/* Mevcut Sayfalar */}
        <Route path="/" element={<Home />} />
        <Route path="/anfrage" element={<Application />} />
        <Route path="/leistungen" element={<Leistungen />} />
        <Route path="/ablauf" element={<Ablauf/>} />
        <Route path="/branchen" element={<Branchen />} />
        <Route path="/ueber-uns" element={<UberUns />} />
        <Route path="*" element={<Kontakt/>} />
      </Routes>
    </Router>
  );
}

export default App;