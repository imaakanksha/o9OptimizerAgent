import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, AlertTriangle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { EKG_CHECKLIST, evaluateEKGHealth } from '../data/ekgHealthData';
import ScoreRing from '../components/ScoreRing';

export default function EKGHealthPage() {
  const [checkedItems, setCheckedItems] = useState([]);
  const [results, setResults] = useState(null);
  const [expandedCat, setExpandedCat] = useState(EKG_CHECKLIST.map(c => c.id));

  const toggleItem = (id) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleCat = (id) => {
    setExpandedCat(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleEvaluate = () => {
    setResults(evaluateEKGHealth(checkedItems));
  };

  const totalItems = EKG_CHECKLIST.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="section" style={{ background: 'white', minHeight: '80vh' }}>
      <div className="analyzer-container">
        <div className="section-header">
          <h2>EKG Health Checker</h2>
          <p>
            Audit your Enterprise Knowledge Graph configuration against o9 best practices.
            Check each item that applies to your current implementation.
          </p>
        </div>

        {/* Checklist */}
        <div className="analyzer-form" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {checkedItems.length} of {totalItems} items checked
            </p>
            <div className="progress-bar" style={{ width: 200 }}>
              <div className="progress-bar-fill" style={{ width: `${(checkedItems.length / totalItems) * 100}%` }} />
            </div>
          </div>

          {EKG_CHECKLIST.map((cat, ci) => (
            <div key={cat.id} style={{ marginBottom: 20 }}>
              <div
                onClick={() => toggleCat(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-input)', cursor: 'pointer', marginBottom: 8
                }}
              >
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{cat.category}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {cat.items.filter(i => checkedItems.includes(i.id)).length}/{cat.items.length}
                  </span>
                  {expandedCat.includes(cat.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>
              {expandedCat.includes(cat.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 8 }}
                >
                  {cat.items.map(item => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        padding: '10px 14px', borderRadius: 'var(--radius-sm)',
                        border: `1px solid ${checkedItems.includes(item.id) ? 'var(--accent-emerald)' : 'var(--border-subtle)'}`,
                        background: checkedItems.includes(item.id) ? 'var(--accent-emerald-light)' : 'white',
                        cursor: 'pointer', transition: 'all 150ms ease'
                      }}
                    >
                      {checkedItems.includes(item.id)
                        ? <CheckCircle size={18} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: 1 }} />
                        : <Circle size={18} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 1 }} />
                      }
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{item.text}</span>
                        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                          {[...Array(item.weight)].map((_, i) => (
                            <div key={i} style={{
                              width: 6, height: 6, borderRadius: '50%',
                              background: item.weight === 3 ? '#ef4444' : item.weight === 2 ? '#f59e0b' : '#94a3b8'
                            }} />
                          ))}
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginLeft: 4 }}>
                            {item.weight === 3 ? 'Critical' : item.weight === 2 ? 'Important' : 'Nice-to-have'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ))}

          <button className="btn btn-primary" onClick={handleEvaluate} style={{ marginTop: 16 }}>
            <TrendingUp size={18} /> Evaluate EKG Health
          </button>
        </div>

        {/* Results */}
        {results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="stats-bar">
              <div className="stat-card">
                <ScoreRing score={results.overallScore} size={140} />
              </div>
              {Object.entries(results.categoryScores).map(([cat, score]) => (
                <div className="stat-card" key={cat} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="stat-value" style={{ color: score >= 70 ? 'var(--accent-emerald)' : score >= 40 ? '#f59e0b' : '#ef4444' }}>
                    {score}%
                  </div>
                  <div className="stat-label">{cat}</div>
                </div>
              ))}
            </div>

            {results.findings.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16 }}>
                  <AlertTriangle size={18} style={{ color: '#f59e0b', marginRight: 8, verticalAlign: 'text-bottom' }} />
                  Findings ({results.findings.length})
                </h3>
                <div className="results-section">
                  {results.findings.map((f, i) => (
                    <div key={i} className="result-card" style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span className={`result-severity severity-${f.severity}`}>{f.severity}</span>
                        <div>
                          <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{f.issue}</p>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{f.category}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
