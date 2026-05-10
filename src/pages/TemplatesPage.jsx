import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, BarChart3, Layers, Clock } from 'lucide-react';
import { REPORT_TEMPLATES, TEMPLATE_CATEGORIES } from '../data/reportTemplates';

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const filtered = selectedCategory === 'all'
    ? REPORT_TEMPLATES
    : REPORT_TEMPLATES.filter(t => t.category === selectedCategory);

  return (
    <div className="section" style={{ background: 'white', minHeight: '80vh' }}>
      <div className="page-wrapper">
        <div className="section-header">
          <h2>Optimized Report Templates</h2>
          <p>
            Pre-built, performance-optimized report configurations based on
            proven o9 implementation patterns.
          </p>
        </div>

        {/* Category Filter */}
        <div className="tabs" style={{ maxWidth: 800, margin: '0 auto 32px' }}>
          <button
            className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => { setSelectedCategory('all'); setSelectedTemplate(null); }}
          >
            All ({REPORT_TEMPLATES.length})
          </button>
          {TEMPLATE_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => { setSelectedCategory(cat); setSelectedTemplate(null); }}
            >
              {cat}
            </button>
          ))}
        </div>

        {!selectedTemplate ? (
          /* Template Grid */
          <div className="card-grid">
            {filtered.map((tpl, i) => (
              <motion.div
                key={tpl.id}
                className="card"
                style={{ cursor: 'pointer' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                onClick={() => setSelectedTemplate(tpl)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: '1.8rem' }}>{tpl.icon}</span>
                  <span style={{
                    padding: '3px 10px', borderRadius: 999, fontSize: '0.68rem', fontWeight: 700,
                    background: tpl.difficulty === 'Starter' ? 'var(--accent-emerald-light)' : '#eef2ff',
                    color: tpl.difficulty === 'Starter' ? 'var(--accent-emerald)' : 'var(--accent-indigo)',
                    border: `1px solid ${tpl.difficulty === 'Starter' ? '#a7f3d0' : '#c7d2fe'}`
                  }}>
                    {tpl.difficulty}
                  </span>
                </div>
                <h3>{tpl.name}</h3>
                <p style={{ marginBottom: 14, minHeight: 48 }}>{tpl.description.substring(0, 100)}…</p>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: 14, borderTop: '1px solid var(--border-subtle)'
                }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    {tpl.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-blue)', fontWeight: 600 }}>
                    {tpl.kpis.length} KPIs →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Template Detail */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: 900, margin: '0 auto' }}
          >
            <button
              onClick={() => setSelectedTemplate(null)}
              className="btn btn-secondary btn-sm"
              style={{ marginBottom: 24 }}
            >
              ← Back to Templates
            </button>

            <div className="analyzer-form">
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <span style={{ fontSize: '2.5rem' }}>{selectedTemplate.icon}</span>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{selectedTemplate.name}</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{selectedTemplate.category}</p>
                </div>
              </div>

              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: 28, lineHeight: 1.7 }}>
                {selectedTemplate.description}
              </p>

              {/* KPIs */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <BarChart3 size={16} style={{ color: 'var(--accent-blue)' }} /> Recommended KPIs
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {selectedTemplate.kpis.map((kpi, i) => (
                    <span key={i} style={{
                      padding: '6px 14px', borderRadius: 999, fontSize: '0.8rem', fontWeight: 500,
                      background: 'var(--accent-blue-light)', color: 'var(--accent-blue-dark)',
                      border: '1px solid rgba(59,130,246,0.2)'
                    }}>
                      {kpi}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hierarchy Config */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Layers size={16} style={{ color: 'var(--accent-violet)' }} /> Hierarchy Configuration
                </h3>
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12
                }}>
                  {Object.entries(selectedTemplate.hierarchyConfig).map(([key, val]) => (
                    <div key={key} style={{
                      padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-input)', border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>
                        {key}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Layout Spec */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 12 }}>
                  📐 Layout Specification
                </h3>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{
                    padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem'
                  }}>
                    <strong>Columns:</strong> {selectedTemplate.layoutSpec.columns}
                  </div>
                  <div style={{
                    padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem'
                  }}>
                    <strong>Default View:</strong> {selectedTemplate.layoutSpec.defaultView}
                  </div>
                  <div style={{
                    padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem'
                  }}>
                    <strong>Charts:</strong> {selectedTemplate.layoutSpec.chartsIncluded.join(', ')}
                  </div>
                </div>
              </div>

              {/* Exceptions */}
              <div style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 12 }}>
                  ⚠️ Exception Rules
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                  {selectedTemplate.exceptions.map((exc, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.875rem',
                      color: 'var(--text-secondary)', padding: '8px 14px',
                      background: 'var(--accent-amber-light)', borderRadius: 'var(--radius-sm)',
                      border: '1px solid #fde68a'
                    }}>
                      <Clock size={14} style={{ color: '#d97706', flexShrink: 0 }} />
                      {exc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Practices */}
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 12 }}>
                  ✅ Implementation Best Practices
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                  {selectedTemplate.bestPractices.map((tip, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65
                    }}>
                      <CheckCircle size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: 3 }} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
