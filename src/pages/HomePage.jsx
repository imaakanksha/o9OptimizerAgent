import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, Layers, Gauge, ShieldCheck, Zap,
  Database, GitBranch, ArrowRight, Sparkles
} from 'lucide-react';

const features = [
  {
    icon: <BarChart3 size={22} />, color: 'indigo',
    title: 'Report Performance Analysis',
    desc: 'Deep-dive analysis of report load times, calculation complexity, and rendering bottlenecks with actionable optimization paths.'
  },
  {
    icon: <Layers size={22} />, color: 'violet',
    title: 'Hierarchy Optimization',
    desc: 'Identify over-deep hierarchies, misaligned granularity, and redundant levels that slow down your EKG Graph Cube.'
  },
  {
    icon: <Gauge size={22} />, color: 'cyan',
    title: 'KPI Rationalization',
    desc: 'Combat analysis paralysis by identifying redundant KPIs and recommending role-specific dashboards.'
  },
  {
    icon: <ShieldCheck size={22} />, color: 'emerald',
    title: 'Data Quality Gates',
    desc: 'Assess data integrity issues at the ingestion layer and suggest cleansing and normalization strategies.'
  },
  {
    icon: <Database size={22} />, color: 'amber',
    title: 'Calculation Engine Tuning',
    desc: 'Optimize solver configurations, implement incremental calculations, and reduce computation overhead.'
  },
  {
    icon: <GitBranch size={22} />, color: 'rose',
    title: 'Governance Framework',
    desc: 'Establish report ownership, review cycles, and deprecation policies to prevent report sprawl.'
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' }
  })
};

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-badge">
            <Sparkles size={14} /> AI-Powered Optimization Engine
          </div>
          <h1>Optimize Your o9 Reports<br />for Maximum Performance</h1>
          <p>
            Analyze, diagnose, and optimize your o9 Solutions reports with intelligent
            recommendations spanning hierarchy design, KPI strategy, calculation engines,
            and governance best practices.
          </p>
          <div className="hero-actions">
            <Link to="/analyzer" className="btn btn-primary">
              <Zap size={18} /> Start Analysis
            </Link>
            <Link to="/knowledge" className="btn btn-secondary">
              <BarChart3 size={18} /> Knowledge Base
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="page-wrapper">
          <div className="section-header">
            <h2>Comprehensive Optimization Toolkit</h2>
            <p>
              Every aspect of your o9 reports analyzed with deep domain expertise
              from real-world implementations.
            </p>
          </div>
          <div className="card-grid">
            {features.map((f, i) => (
              <motion.div
                key={i}
                className="card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className={`card-icon ${f.color}`}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ marginBottom: 16 }}>Ready to Optimize?</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 32px' }}>
            Run a comprehensive analysis on any o9 report and get prioritized, actionable
            recommendations in seconds.
          </p>
          <Link to="/analyzer" className="btn btn-primary">
            Launch Analyzer <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
