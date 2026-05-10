import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Zap, BarChart3, BookOpen, Settings, Database, Target, Layout, Menu, X
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: <Zap size={15} /> },
  { path: '/analyzer', label: 'Analyzer', icon: <BarChart3 size={15} /> },
  { path: '/ekg-health', label: 'EKG Health', icon: <Database size={15} /> },
  { path: '/snop-advisor', label: 'S&OP Advisor', icon: <Target size={15} /> },
  { path: '/templates', label: 'Templates', icon: <Layout size={15} /> },
  { path: '/knowledge', label: 'Knowledge', icon: <BookOpen size={15} /> },
  { path: '/best-practices', label: 'Practices', icon: <Settings size={15} /> },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">o9</div>
          <span>Optimizer Agent</span>
        </Link>

        {/* Desktop Nav */}
        <div className="navbar-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'nav-link active' : 'nav-link'}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                {item.icon} {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: 'none', border: 'none', background: 'none',
            color: 'var(--text-primary)', padding: 8
          }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'nav-link active' : 'nav-link'}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '12px 24px' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.icon} {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
