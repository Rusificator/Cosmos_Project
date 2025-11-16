import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import PlanetsPage from './pages/PlanetsPage.jsx';
import MissionsPage from './pages/MissionsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import WeightCalculatorPage from './pages/WeightCalculatorPage.jsx';
import SpaceQuizPage from './pages/SpaceQuizPage.jsx';

function App() {
  return (
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planets" element={<PlanetsPage />} />
             <Route path="/missions" element={<MissionsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/weight-calculator" element={<WeightCalculatorPage />} />
            <Route path="/space-quiz" element={<SpaceQuizPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;