import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import PlanetDetailPage from './pages/PlanetDetailPage.jsx';
import PlanetComparisonPage from './pages/PlanetComparisonPage.jsx';
import PlanetComparisonEnhanced from './pages/PlanetComparisonEnhanced';
import SmoothScroll from './components/SmoothScroll.jsx';
import HomePage from './pages/HomePage.jsx';
import PlanetsPage from './pages/PlanetsPage.jsx';
import MissionsPage from './pages/MissionsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import WeightCalculatorPage from './pages/WeightCalculatorPage.jsx';
import SpaceQuizPage from './pages/SpaceQuizPage.jsx';
import CosmicAddressPage from './pages/CosmicAddressPage';
import SolarSystemModelPage from './pages/SolarSystemModelPage.jsx';
import './styles/main.css';

import GalleryDetailPage from './pages/GalleryDetailPage.jsx';

function App() {
  return (
     
    <Router future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}>
       <div className="App scroll-gradient">
        
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SmoothScroll><HomePage /></SmoothScroll>} />
            <Route path="/planets" element={<SmoothScroll><PlanetsPage /></SmoothScroll>} />
             <Route path="/planets/:planetId" element={<PlanetDetailPage />} />
             <Route path="/planet-comparison" element={<PlanetComparisonEnhanced />} />
             <Route path="/missions" element={<SmoothScroll><MissionsPage /></SmoothScroll>} />
            <Route path="/gallery" element={<SmoothScroll><GalleryPage /></SmoothScroll>} />
            <Route path="/weight-calculator" element={<SmoothScroll><WeightCalculatorPage /></SmoothScroll>} />
            <Route path="/space-quiz" element={<SmoothScroll><SpaceQuizPage /></SmoothScroll>} />
             <Route path="/cosmic-address" element={<CosmicAddressPage />} />
             <Route path="/solar-model" element={<SmoothScroll><SolarSystemModelPage /></SmoothScroll>} />
             <Route path="/gallery/:imageId" element={<GalleryDetailPage />} />
          </Routes>
        </main>
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;