import React from 'react';

export default function PriorityMatrix({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  const effortMap = { Low: 1, Medium: 2, High: 3 };
  const severityMap = { critical: 4, high: 3, medium: 2, low: 1 };
  const severityColors = { critical: '#ef4444', high: '#f43f5e', medium: '#f59e0b', low: '#10b981' };

  const items = recommendations.map(r => ({
    id: r.id,
    title: r.title.length > 28 ? r.title.slice(0, 26) + '…' : r.title,
    x: effortMap[r.effortLevel] || 2,
    y: severityMap[r.severity] || 2,
    color: severityColors[r.severity],
    severity: r.severity,
  }));

  const w = 340, h = 240, pad = 44;
  const plotW = w - pad * 2, plotH = h - pad * 2;

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', padding: '24px', boxShadow: 'var(--shadow-sm)', marginBottom: 20
    }}>
      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
        🎯 Priority Matrix — Impact vs. Effort
      </h4>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 14 }}>
        Focus on top-left quadrant for quick wins
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ maxWidth: '100%' }}>
          {/* Background quadrants */}
          <rect x={pad} y={pad} width={plotW / 2} height={plotH / 2} fill="#ecfdf5" rx="4" />
          <rect x={pad + plotW / 2} y={pad} width={plotW / 2} height={plotH / 2} fill="#eff6ff" rx="4" />
          <rect x={pad} y={pad + plotH / 2} width={plotW / 2} height={plotH / 2} fill="#f8f9fc" rx="4" />
          <rect x={pad + plotW / 2} y={pad + plotH / 2} width={plotW / 2} height={plotH / 2} fill="#fef2f2" rx="4" />
          {/* Labels */}
          <text x={pad + plotW / 4} y={pad + 14} textAnchor="middle" fontSize="7" fontWeight="700" fill="#10b981">QUICK WINS</text>
          <text x={pad + 3 * plotW / 4} y={pad + 14} textAnchor="middle" fontSize="7" fontWeight="700" fill="#3b82f6">STRATEGIC</text>
          <text x={pad + plotW / 4} y={pad + plotH - 6} textAnchor="middle" fontSize="7" fontWeight="600" fill="var(--text-muted)">LOW PRIORITY</text>
          <text x={pad + 3 * plotW / 4} y={pad + plotH - 6} textAnchor="middle" fontSize="7" fontWeight="600" fill="#ef4444">DEPRIORITIZE</text>
          {/* Axes */}
          <line x1={pad} y1={pad} x2={pad} y2={pad + plotH} stroke="var(--border-subtle)" strokeWidth="1.5" />
          <line x1={pad} y1={pad + plotH} x2={pad + plotW} y2={pad + plotH} stroke="var(--border-subtle)" strokeWidth="1.5" />
          <text x={pad + plotW / 2} y={h - 4} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-muted)">Effort →</text>
          <text x={10} y={pad + plotH / 2} textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--text-muted)" transform={`rotate(-90, 10, ${pad + plotH / 2})`}>Impact →</text>
          {/* Data points */}
          {items.map((item, i) => {
            const jitter = (i % 3 - 1) * 8;
            const px = pad + ((item.x - 0.5) / 3) * plotW + jitter;
            const py = pad + plotH - ((item.y - 0.5) / 4) * plotH + (i % 2 === 0 ? -5 : 5);
            return (
              <g key={item.id}>
                <circle cx={px} cy={py} r={8} fill={item.color} opacity={0.85} stroke="white" strokeWidth="2" />
                <title>{item.title} ({item.severity})</title>
              </g>
            );
          })}
        </svg>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 8, flexWrap: 'wrap' }}>
        {['critical', 'high', 'medium', 'low'].map(s => (
          <span key={s} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: severityColors[s] }} />
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </span>
        ))}
      </div>
    </div>
  );
}
