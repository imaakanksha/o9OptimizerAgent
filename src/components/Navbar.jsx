import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, BarChart3, BookOpen, Settings } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">o9</div>
          <span>Optimizer Agent</span>
        </Link>
        <div className="navbar-links">
          <Link to="/" className={isActive('/')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={15} /> Home
            </span>
          </Link>
          <Link to="/analyzer" className={isActive('/analyzer')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BarChart3 size={15} /> Analyzer
            </span>
          </Link>
          <Link to="/knowledge" className={isActive('/knowledge')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={15} /> Knowledge Base
            </span>
          </Link>
          <Link to="/best-practices" className={isActive('/best-practices')}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Settings size={15} /> Best Practices
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
