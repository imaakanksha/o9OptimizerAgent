import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers, Gauge, Wrench, Layout, Database, GitBranch,
  ShieldCheck, CheckCircle
} from 'lucide-react';

const practices = [
  {
    icon: <Layers size={24} />, color: 'indigo',
    title: 'Hierarchy Design',
    tips: [
      'Keep hierarchy depth to 4-5 meaningful levels maximum',
      'Use attributes for filtering instead of adding hierarchy levels',
      'Align hierarchies to actual planning granularity',
      'Avoid 1:1 parent-child ratios — merge those levels',
      'Test aggregation/disaggregation performance after hierarchy changes',
    ]
  },
  {
    icon: <Gauge size={24} />, color: 'violet',
    title: 'KPI Strategy',
    tips: [
      'Limit dashboards to 5-8 strategic KPIs per view',
      'Create role-specific views (Demand Planner, Supply Planner, Finance)',
      'Standardize KPI definitions across the organization',
      'Use WMAPE over MAPE for forecast accuracy to handle low-volume items',
      'Add tooltips showing KPI formula and data source on each metric',
    ]
  },
  {
    icon: <Wrench size={24} />, color: 'cyan',
    title: 'Calculation Engine',
    tips: [
      'Profile and benchmark all calculation engine runs monthly',
      'Match engine type to problem type (heuristic vs LP/MIP vs ML)',
      'Implement incremental calculations instead of full recalculations',
      'Schedule heavy computations during off-peak hours',
      'Tune solver parameters: gap tolerance, time limits, thread count',
    ]
  },
  {
    icon: <Layout size={24} />, color: 'emerald',
    title: 'Report Layout',
    tips: [
      'Default to summary views with drill-down capability',
      'Limit visible columns to 8-12 in default view',
      'Implement exception-based reporting with color-coded severity',
      'Use virtual scrolling for reports exceeding 1,000 rows',
      'Add column show/hide toggles for user customization',
    ]
  },
  {
    icon: <Database size={24} />, color: 'amber',
    title: 'Data Management',
    tips: [
      'Implement hot/warm/cold data tiering by time horizon',
      'Cleanse and validate data at the ingestion layer before EKG',
      'Create summary aggregate tables for historical trend analysis',
      'Only process truly necessary data points in real-time',
      'Set up automated data quality scorecards with trend tracking',
    ]
  },
  {
    icon: <GitBranch size={24} />, color: 'rose',
    title: 'Scenario Planning',
    tips: [
      'Limit real-time scenario comparisons to 3-4 scenarios',
      'Show delta/variance views instead of full absolute values',
      'Pre-compute and cache scenario results on save',
      'Use spider charts and waterfalls for visual scenario comparison',
      'Archive old scenarios to prevent performance creep',
    ]
  },
  {
    icon: <ShieldCheck size={24} />, color: 'indigo',
    title: 'Governance & Operations',
    tips: [
      'Assign clear ownership and maintenance responsibility for every report',
      'Run quarterly report audits to identify unused or duplicate reports',
      'Define and monitor performance SLAs (e.g., < 3s load time)',
      'Maintain a performance optimization backlog',
      'Implement a formal report request workflow for new reports',
    ]
  },
];

export default function BestPracticesPage() {
  return (
    <div className="section" style={{ background: 'white' }}>
      <div className="page-wrapper">
        <div className="section-header">
          <h2>o9 Report Best Practices</h2>
          <p>
            Curated best practices from real-world o9 implementations to keep your
            reports fast, accurate, and actionable.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {practices.map((practice, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              style={{ padding: 32 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                <div className={`card-icon ${practice.color}`} style={{ width: 50, height: 50 }}>
                  {practice.icon}
                </div>
                <h3 style={{ fontSize: '1.15rem' }}>{practice.title}</h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: 0, listStyle: 'none' }}>
                {practice.tips.map((tip, j) => (
                  <li key={j} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65
                  }}>
                    <CheckCircle size={16} style={{
                      color: 'var(--accent-emerald)', flexShrink: 0, marginTop: 3
                    }} />
                    {tip}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
