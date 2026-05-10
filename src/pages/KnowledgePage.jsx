import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Layers, Gauge, Database, ShieldCheck, GitBranch, Wrench } from 'lucide-react';
import { OPTIMIZATION_RULES } from '../data/optimizationRules';

const categoryIcons = {
  'Hierarchy & Data Model': <Layers size={20} />,
  'KPI & Metrics': <Gauge size={20} />,
  'Calculation Engine': <Wrench size={20} />,
  'Layout & UX': <BookOpen size={20} />,
  'Data Management': <Database size={20} />,
  'Scenario Planning': <GitBranch size={20} />,
  'Governance & Process': <ShieldCheck size={20} />,
};

const categoryColors = {
  'Hierarchy & Data Model': 'indigo',
  'KPI & Metrics': 'violet',
  'Calculation Engine': 'cyan',
  'Layout & UX': 'emerald',
  'Data Management': 'amber',
  'Scenario Planning': 'rose',
  'Governance & Process': 'indigo',
};

export default function KnowledgePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [...new Set(OPTIMIZATION_RULES.map(r => r.category))];

  const filtered = OPTIMIZATION_RULES.filter(rule => {
    const matchesSearch = search === '' ||
      rule.title.toLowerCase().includes(search.toLowerCase()) ||
      rule.problem.toLowerCase().includes(search.toLowerCase()) ||
      rule.recommendation.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || rule.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="section">
      <div className="page-wrapper">
        <div className="section-header">
          <h2>Optimization Knowledge Base</h2>
          <p>Browse all optimization rules and best practices for o9 reports.</p>
        </div>

        {/* Search & Filters */}
        <div style={{
          display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center'
        }}>
          <div style={{
            flex: 1, minWidth: 280, position: 'relative'
          }}>
            <Search size={18} style={{
              position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }} />
            <input
              type="text"
              placeholder="Search rules, problems, recommendations…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px 12px 42px',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)',
                background: 'rgba(10,14,26,0.6)', color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)', fontSize: '0.9rem', outline: 'none'
              }}
            />
          </div>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            style={{
              padding: '12px 16px', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)', background: 'rgba(10,14,26,0.6)',
              color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
              outline: 'none'
            }}
          >
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Results Count */}
        <p style={{
          fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 20
        }}>
          Showing {filtered.length} of {OPTIMIZATION_RULES.length} optimization rules
        </p>

        {/* Cards */}
        <div className="card-grid">
          {filtered.map((rule, i) => (
            <motion.div
              key={rule.id}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div className={`card-icon ${categoryColors[rule.category] || 'indigo'}`}>
                  {categoryIcons[rule.category] || <BookOpen size={20} />}
                </div>
                <span className={`result-severity severity-${rule.severity}`}>
                  {rule.severity}
                </span>
              </div>
              <h3>{rule.title}</h3>
              <p style={{ marginBottom: 12 }}>{rule.problem.substring(0, 120)}…</p>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: 12, borderTop: '1px solid var(--border-subtle)'
              }}>
                <span style={{
                  fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {rule.category}
                </span>
                <span className="impact-tag" style={{ fontSize: '0.65rem' }}>
                  {rule.effortLevel} Effort
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
