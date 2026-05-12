import React from 'react';

const COLORS = ['#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'];

export default function CategoryDonut({ categories }) {
  const entries = Object.entries(categories);
  const total = entries.reduce((s, [, arr]) => s + arr.length, 0);
  if (total === 0) return null;

  const size = 160;
  const radius = 60;
  const cx = size / 2, cy = size / 2;
  let cumulative = 0;

  const slices = entries.map(([name, arr], i) => {
    const pct = arr.length / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    cumulative += pct;
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2;
    const largeArc = pct > 0.5 ? 1 : 0;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return <path key={name} d={d} fill={COLORS[i % COLORS.length]} opacity={0.85} />;
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices}
        <circle cx={cx} cy={cy} r={32} fill="var(--bg-card)" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--text-primary)">{total}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontWeight="600">FINDINGS</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {entries.map(([name, arr], i) => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i % COLORS.length], flexShrink: 0 }} />
            <span style={{ color: 'var(--text-secondary)' }}>{name}</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', marginLeft: 'auto' }}>{arr.length}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
