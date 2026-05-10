import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Wrench, TrendingUp } from 'lucide-react';

export default function RecommendationCard({ rule }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="result-card">
      <div className="result-card-header" onClick={() => setExpanded(!expanded)}>
        <div className="result-card-header-left">
          <span className={`result-severity severity-${rule.severity}`}>
            {rule.severity}
          </span>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{rule.title}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {rule.category}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="impact-tag">
            <TrendingUp size={11} /> {rule.impact}
          </span>
          {expanded
            ? <ChevronUp size={18} color="var(--text-muted)" />
            : <ChevronDown size={18} color="var(--text-muted)" />}
        </div>
      </div>

      {expanded && (
        <div className="result-card-body">
          <h4>🔍 Problem</h4>
          <p>{rule.problem}</p>

          <h4>💡 Recommendation</h4>
          <p>{rule.recommendation}</p>

          <h4>📋 Implementation Steps</h4>
          <ul>
            {rule.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 999,
              background: '#eef2ff', border: '1px solid #c7d2fe',
              fontSize: '0.73rem', fontWeight: 600, color: 'var(--accent-indigo)'
            }}>
              <Wrench size={12} /> Effort: {rule.effortLevel}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 14px', borderRadius: 999,
              background: 'var(--accent-emerald-light)', border: '1px solid #a7f3d0',
              fontSize: '0.73rem', fontWeight: 600, color: 'var(--accent-emerald)'
            }}>
              <TrendingUp size={12} /> {rule.impact}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
