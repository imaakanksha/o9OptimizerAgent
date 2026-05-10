import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AnalyzerPage from './pages/AnalyzerPage';
import KnowledgePage from './pages/KnowledgePage';
import BestPracticesPage from './pages/BestPracticesPage';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analyzer" element={<AnalyzerPage />} />
            <Route path="/knowledge" element={<KnowledgePage />} />
            <Route path="/best-practices" element={<BestPracticesPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>
            o9 Report Optimizer Agent — Built with domain expertise from real-world o9 Solutions implementations.
          </p>
          <p style={{ marginTop: 4 }}>
            © {new Date().getFullYear()} · Powered by AI-driven optimization intelligence
          </p>
        </footer>
      </div>
    </Router>
  );
}
