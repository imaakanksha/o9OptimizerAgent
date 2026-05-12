import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const BENCHMARKS = {
  demand_planning: { idealKpis: 8, maxRows: 50000, maxCols: 12, maxHierarchy: 5, maxUsers: 100, label: 'Demand Planning' },
  supply_planning: { idealKpis: 10, maxRows: 75000, maxCols: 15, maxHierarchy: 5, maxUsers: 80, label: 'Supply Planning' },
  inventory: { idealKpis: 7, maxRows: 40000, maxCols: 10, maxHierarchy: 4, maxUsers: 60, label: 'Inventory' },
  financial: { idealKpis: 12, maxRows: 30000, maxCols: 20, maxHierarchy: 6, maxUsers: 50, label: 'Financial' },
  control_tower: { idealKpis: 6, maxRows: 100000, maxCols: 8, maxHierarchy: 4, maxUsers: 200, label: 'Control Tower' },
  scenario: { idealKpis: 8, maxRows: 25000, maxCols: 12, maxHierarchy: 5, maxUsers: 30, label: 'Scenario Analysis' },
  exception: { idealKpis: 5, maxRows: 20000, maxCols: 8, maxHierarchy: 3, maxUsers: 150, label: 'Exception' },
  kpi_dashboard: { idealKpis: 8, maxRows: 10000, maxCols: 6, maxHierarchy: 3, maxUsers: 200, label: 'KPI Dashboard' },
  snop: { idealKpis: 10, maxRows: 50000, maxCols: 15, maxHierarchy: 5, maxUsers: 100, label: 'S&OP' },
  custom: { idealKpis: 10, maxRows: 50000, maxCols: 15, maxHierarchy: 5, maxUsers: 100, label: 'Custom' },
};

function MetricRow({ label, actual, benchmark, unit = '' }) {
  if (!actual) return null;
  const val = parseInt(actual);
  const ratio = val / benchmark;
  const status = ratio <= 0.8 ? 'good' : ratio <= 1.2 ? 'ok' : 'bad';
  const colors = { good: '#10b981', ok: '#f59e0b', bad: '#ef4444' };
  const icons = { good: <ArrowDownRight size={13} />, ok: <Minus size={13} />, bad: <ArrowUpRight size={13} /> };

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 80px',
      alignItems: 'center', padding: '10px 0',
      borderBottom: '1px solid var(--border-subtle)', fontSize: '0.82rem'
    }}>
      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
      <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
        {val.toLocaleString()}{unit}
      </span>
      <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        ≤ {benchmark.toLocaleString()}{unit}
      </span>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        color: colors[status], fontWeight: 600, fontSize: '0.75rem'
      }}>
        {icons[status]}
        {status === 'good' ? 'Optimal' : status === 'ok' ? 'Borderline' : 'Over'}
      </span>
    </div>
  );
}

export default function BenchmarkPanel({ form }) {
  const bench = BENCHMARKS[form.reportType];
  if (!bench) return null;
  const hasData = form.rowCount || form.columnCount || form.kpiCount || form.hierarchyDepth || form.userCount;
  if (!hasData) return null;

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)', padding: '24px 28px',
      boxShadow: 'var(--shadow-sm)', marginBottom: 20
    }}>
      <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: 4, color: 'var(--text-primary)' }}>
        📊 Benchmark Comparison — {bench.label} Reports
      </h4>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 14 }}>
        Your configuration vs. o9 recommended thresholds
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 80px', padding: '0 0 6px', borderBottom: '2px solid var(--border-subtle)', marginBottom: 2 }}>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Metric</span>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Yours</span>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Target</span>
        <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Status</span>
      </div>
      <MetricRow label="Row Count" actual={form.rowCount} benchmark={bench.maxRows} />
      <MetricRow label="Column Count" actual={form.columnCount} benchmark={bench.maxCols} />
      <MetricRow label="KPI Count" actual={form.kpiCount} benchmark={bench.idealKpis} />
      <MetricRow label="Hierarchy Depth" actual={form.hierarchyDepth} benchmark={bench.maxHierarchy} unit=" lvls" />
      <MetricRow label="Concurrent Users" actual={form.userCount} benchmark={bench.maxUsers} />
    </div>
  );
}
