import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { REPORT_TYPES, ISSUE_CATEGORIES, analyzeReport } from '../data/optimizationRules';
import ScoreRing from '../components/ScoreRing';
import RecommendationCard from '../components/RecommendationCard';

const defaultForm = {
  reportType: '',
  reportName: '',
  issues: [],
  rowCount: '',
  columnCount: '',
  kpiCount: '',
  hierarchyDepth: '',
  dataAge: '',
  userCount: '',
  description: '',
};

export default function AnalyzerPage() {
  const [form, setForm] = useState(defaultForm);
  const [results, setResults] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const toggleIssue = (val) => {
    setForm(prev => ({
      ...prev,
      issues: prev.issues.includes(val)
        ? prev.issues.filter(v => v !== val)
        : [...prev.issues, val]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnalyzing(true);
    // Simulate analysis delay for UX
    setTimeout(() => {
      const result = analyzeReport({
        reportType: form.reportType,
        issues: form.issues,
        rowCount: parseInt(form.rowCount) || 0,
        columnCount: parseInt(form.columnCount) || 0,
        kpiCount: parseInt(form.kpiCount) || 0,
        hierarchyDepth: parseInt(form.hierarchyDepth) || 0,
        dataAge: form.dataAge,
        userCount: parseInt(form.userCount) || 0,
      });
      setResults(result);
      setAnalyzing(false);
    }, 1800);
  };

  const handleReset = () => {
    setForm(defaultForm);
    setResults(null);
    setActiveTab('all');
  };

  const filteredRecs = results?.recommendations?.filter(r => {
    if (activeTab === 'all') return true;
    return r.severity === activeTab;
  }) || [];

  return (
    <div className="section">
      <div className="analyzer-container">
        <div className="section-header">
          <h2>o9 Report Optimizer</h2>
          <p>Enter your report details to receive tailored optimization recommendations.</p>
        </div>

        {/* Input Form */}
        <form className="analyzer-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Report Type *</label>
              <select
                value={form.reportType}
                onChange={e => setForm({ ...form, reportType: e.target.value })}
                required
              >
                <option value="">Select report type…</option>
                {REPORT_TYPES.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Report Name</label>
              <input
                type="text"
                placeholder="e.g., Weekly Demand Dashboard"
                value={form.reportName}
                onChange={e => setForm({ ...form, reportName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Approximate Row Count</label>
              <input type="number" placeholder="e.g., 50000"
                value={form.rowCount}
                onChange={e => setForm({ ...form, rowCount: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Column Count</label>
              <input type="number" placeholder="e.g., 25"
                value={form.columnCount}
                onChange={e => setForm({ ...form, columnCount: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Number of KPIs</label>
              <input type="number" placeholder="e.g., 18"
                value={form.kpiCount}
                onChange={e => setForm({ ...form, kpiCount: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Hierarchy Depth (Levels)</label>
              <input type="number" placeholder="e.g., 7"
                value={form.hierarchyDepth}
                onChange={e => setForm({ ...form, hierarchyDepth: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Data History (Months)</label>
              <input type="number" placeholder="e.g., 36"
                value={form.dataAge}
                onChange={e => setForm({ ...form, dataAge: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Concurrent Users</label>
              <input type="number" placeholder="e.g., 50"
                value={form.userCount}
                onChange={e => setForm({ ...form, userCount: e.target.value })} />
            </div>
            <div className="form-group full-width">
              <label>Known Issues (Select All That Apply) *</label>
              <div className="checkbox-group">
                {ISSUE_CATEGORIES.map(cat => (
                  <div
                    key={cat.value}
                    className={`checkbox-item ${form.issues.includes(cat.value) ? 'checked' : ''}`}
                    onClick={() => toggleIssue(cat.value)}
                  >
                    <input type="checkbox" checked={form.issues.includes(cat.value)} readOnly />
                    {cat.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group full-width">
              <label>Additional Context</label>
              <textarea
                placeholder="Describe any specific problems, user complaints, or performance issues…"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!form.reportType || form.issues.length === 0 || analyzing}
            >
              <Zap size={18} /> {analyzing ? 'Analyzing…' : 'Run Analysis'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </form>

        {/* Loading */}
        {analyzing && (
          <div className="loading-spinner">
            <div className="spinner" />
            <p style={{ color: 'var(--text-secondary)' }}>
              Analyzing report configuration against 12+ optimization rules…
            </p>
          </div>
        )}

        {/* Results */}
        <AnimatePresence>
          {results && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Stats */}
              <div className="stats-bar">
                <div className="stat-card">
                  <ScoreRing score={results.score} size={140} />
                </div>
                <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="stat-value" style={{ color: 'var(--accent-indigo)' }}>
                    {results.totalRecommendations}
                  </div>
                  <div className="stat-label">Total Recommendations</div>
                </div>
                <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="stat-value" style={{ color: '#ef4444' }}>
                    {results.criticalCount}
                  </div>
                  <div className="stat-label">Critical Issues</div>
                </div>
                <div className="stat-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="stat-value" style={{ color: 'var(--accent-rose)' }}>
                    {results.highCount}
                  </div>
                  <div className="stat-label">High Priority</div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="tabs">
                {['all', 'critical', 'high', 'medium', 'low'].map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'all' ? `All (${results.totalRecommendations})` :
                      `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${results[tab + 'Count']})`}
                  </button>
                ))}
              </div>

              {/* Recommendations */}
              <div className="results-section">
                {filteredRecs.length > 0 ? (
                  filteredRecs.map(rule => (
                    <RecommendationCard key={rule.id} rule={rule} />
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>
                    <CheckCircle size={40} style={{ marginBottom: 12, color: 'var(--accent-emerald)' }} />
                    <p>No issues found in this category. Looking good!</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
