import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Wrench, Clock, TrendingUp } from 'lucide-react';

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
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{rule.title}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {rule.category}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="impact-tag">
            <TrendingUp size={12} /> {rule.impact}
          </span>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
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

          <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 999,
              background: 'rgba(99,102,241,0.1)', fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--accent-indigo)'
            }}>
              <Wrench size={13} /> Effort: {rule.effortLevel}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 999,
              background: 'rgba(34,211,238,0.1)', fontSize: '0.75rem', fontWeight: 600,
              color: 'var(--accent-cyan)'
            }}>
              <TrendingUp size={13} /> {rule.impact}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
