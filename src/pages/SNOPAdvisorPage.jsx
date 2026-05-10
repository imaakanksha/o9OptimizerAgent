import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Target } from 'lucide-react';
import { PROCESS_DIMENSIONS, MATURITY_LEVELS, assessMaturity } from '../data/snopMaturityData';

export default function SNOPAdvisorPage() {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [currentDim, setCurrentDim] = useState(0);

  const handleAnswer = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleAssess = () => {
    setResults(assessMaturity(answers));
  };

  const totalQuestions = PROCESS_DIMENSIONS.reduce((s, d) => s + d.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const dim = PROCESS_DIMENSIONS[currentDim];

  return (
    <div className="section" style={{ background: 'white', minHeight: '80vh' }}>
      <div className="analyzer-container">
        <div className="section-header">
          <h2>S&OP / IBP Maturity Advisor</h2>
          <p>
            Assess your planning process maturity across key dimensions and get a
            tailored roadmap for improvement using o9 capabilities.
          </p>
        </div>

        {/* Maturity Scale Legend */}
        <div style={{
          display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32, flexWrap: 'wrap'
        }}>
          {MATURITY_LEVELS.map(l => (
            <div key={l.level} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 600,
              background: `${l.color}10`, color: l.color, border: `1px solid ${l.color}30`
            }}>
              L{l.level}: {l.name}
            </div>
          ))}
        </div>

        {!results ? (
          <div className="analyzer-form">
            {/* Dimension Tabs */}
            <div className="tabs" style={{ marginBottom: 28 }}>
              {PROCESS_DIMENSIONS.map((d, i) => (
                <button
                  key={d.id}
                  className={`tab-btn ${currentDim === i ? 'active' : ''}`}
                  onClick={() => setCurrentDim(i)}
                >
                  {d.icon} {d.name}
                </button>
              ))}
            </div>

            {/* Questions */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 20 }}>
                {dim.icon} {dim.name}
              </h3>
              {dim.questions.map((q, qi) => (
                <div key={q.id} style={{ marginBottom: 24 }}>
                  <p style={{
                    fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)',
                    marginBottom: 10
                  }}>
                    {qi + 1}. {q.text}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {q.options.map(opt => (
                      <div
                        key={opt.value}
                        onClick={() => handleAnswer(q.id, opt.value)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                          border: `1px solid ${answers[q.id] === opt.value ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                          background: answers[q.id] === opt.value ? 'var(--accent-blue-light)' : 'white',
                          cursor: 'pointer', transition: 'all 150ms ease', fontSize: '0.85rem'
                        }}
                      >
                        <div style={{
                          width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.7rem', fontWeight: 700,
                          background: answers[q.id] === opt.value ? 'var(--accent-blue)' : 'var(--bg-input)',
                          color: answers[q.id] === opt.value ? 'white' : 'var(--text-muted)',
                        }}>
                          {opt.value}
                        </div>
                        <span style={{ color: answers[q.id] === opt.value ? 'var(--accent-blue-dark)' : 'var(--text-secondary)' }}>
                          {opt.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {answeredCount} of {totalQuestions} questions answered
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {currentDim < PROCESS_DIMENSIONS.length - 1 ? (
                  <button className="btn btn-secondary" onClick={() => setCurrentDim(currentDim + 1)}>
                    Next: {PROCESS_DIMENSIONS[currentDim + 1].name} <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleAssess}
                    disabled={answeredCount < 5}
                  >
                    <Target size={18} /> Assess Maturity
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Overall Result */}
            <div className="stats-bar">
              <div className="stat-card" style={{ padding: 32, textAlign: 'center' }}>
                <div style={{
                  fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-mono)',
                  color: results.maturityLevel.color, marginBottom: 4
                }}>
                  L{Math.round(results.overallScore)}
                </div>
                <div style={{
                  fontSize: '1.1rem', fontWeight: 600, color: results.maturityLevel.color
                }}>
                  {results.maturityLevel.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                  {results.maturityLevel.description}
                </div>
              </div>
              {Object.entries(results.dimensionScores).map(([dimId, score]) => {
                const dimData = PROCESS_DIMENSIONS.find(d => d.id === dimId);
                const level = MATURITY_LEVELS.find(l => l.level === Math.round(score)) || MATURITY_LEVELS[0];
                return (
                  <div className="stat-card" key={dimId} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: 4 }}>{dimData?.icon}</div>
                    <div className="stat-value" style={{ color: level.color, fontSize: '1.5rem' }}>
                      L{score}
                    </div>
                    <div className="stat-label">{dimData?.name}</div>
                  </div>
                );
              })}
            </div>

            {/* Improvement Roadmap */}
            {results.recommendations.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 20 }}>
                  🗺️ Improvement Roadmap
                </h3>
                <div className="results-section">
                  {results.recommendations.map((rec, i) => (
                    <div key={i} className="result-card" style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                        <span className={`result-severity severity-${rec.priority}`}>{rec.priority}</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{rec.dimension}</h4>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto',
                          fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent-blue)'
                        }}>
                          L{rec.currentLevel} → L{rec.targetLevel}
                        </div>
                      </div>
                      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 0, listStyle: 'none' }}>
                        {rec.actions.map((action, j) => (
                          <li key={j} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6
                          }}>
                            <CheckCircle size={15} style={{ color: 'var(--accent-emerald)', flexShrink: 0, marginTop: 3 }} />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button className="btn btn-secondary" onClick={() => { setResults(null); setAnswers({}); setCurrentDim(0); }} style={{ marginTop: 24 }}>
              Retake Assessment
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
