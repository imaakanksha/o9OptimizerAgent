import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3, Layers, Gauge, ShieldCheck, Zap, Database,
  GitBranch, ArrowRight, Sparkles, Target, Layout, BookOpen
} from 'lucide-react';

const features = [
  {
    icon: <BarChart3 size={22} />, color: 'indigo', link: '/analyzer',
    title: 'Report Performance Analyzer',
    desc: 'Deep-dive analysis of report load times, calculation complexity, and rendering bottlenecks with actionable recommendations.'
  },
  {
    icon: <Database size={22} />, color: 'violet', link: '/ekg-health',
    title: 'EKG Health Checker',
    desc: 'Audit your Enterprise Knowledge Graph — nodes, edges, hierarchies, measures, data integration, and Graph Cube performance.'
  },
  {
    icon: <Target size={22} />, color: 'cyan', link: '/snop-advisor',
    title: 'S&OP Maturity Advisor',
    desc: 'Assess your planning maturity across demand, supply, inventory, finance, and technology with a tailored improvement roadmap.'
  },
  {
    icon: <Layout size={22} />, color: 'emerald', link: '/templates',
    title: 'Report Templates Gallery',
    desc: '8 pre-built optimized report configs — demand, supply, inventory, S&OP, control tower, financial, and NPI templates.'
  },
  {
    icon: <BookOpen size={22} />, color: 'amber', link: '/knowledge',
    title: 'Optimization Knowledge Base',
    desc: 'Searchable catalog of 12+ optimization rules covering hierarchy, KPI, calculation engine, layout, data, and governance.'
  },
  {
    icon: <ShieldCheck size={22} />, color: 'rose', link: '/best-practices',
    title: 'Best Practices Guide',
    desc: 'Curated tips across 7 categories from real-world o9 implementations — hierarchy design, KPI strategy, and more.'
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: 'easeOut' }
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
          transition={{ duration: 0.5 }}
        >
          <div className="hero-badge">
            <Sparkles size={13} /> AI-Powered o9 Optimization Suite
          </div>
          <h1>
            The Complete Toolkit for<br />
            <span>o9 Report Optimization</span>
          </h1>
          <p>
            Analyze reports, audit your EKG model, assess S&OP maturity, browse
            optimized templates, and follow best practices — all powered by deep
            o9 Solutions domain expertise.
          </p>
          <div className="hero-actions">
            <Link to="/analyzer" className="btn btn-primary">
              <Zap size={18} /> Start Analysis
            </Link>
            <Link to="/ekg-health" className="btn btn-secondary">
              <Database size={18} /> Check EKG Health
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="section" style={{ background: 'white' }}>
        <div className="page-wrapper">
          <div className="section-header">
            <h2>6 Powerful Tools, One Platform</h2>
            <p>
              Every aspect of your o9 implementation analyzed with deep
              consultant-level domain expertise.
            </p>
          </div>
          <div className="card-grid">
            {features.map((f, i) => (
              <Link to={f.link} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  className="card"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  style={{ height: '100%' }}
                >
                  <div className={`card-icon ${f.color}`}>{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <div style={{ marginTop: 14, fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    Explore <ArrowRight size={14} />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div className="page-wrapper">
          <div className="stats-bar" style={{ maxWidth: 900, margin: '0 auto' }}>
            {[
              { value: '12+', label: 'Optimization Rules' },
              { value: '8', label: 'Report Templates' },
              { value: '27', label: 'EKG Checklist Items' },
              { value: '5', label: 'Maturity Dimensions' },
            ].map((s, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="stat-value" style={{ color: 'var(--accent-blue)' }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center', background: 'white' }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 style={{ marginBottom: 14, fontSize: '1.5rem', fontWeight: 700 }}>Ready to Optimize?</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 28px', fontSize: '0.95rem' }}>
            Start with the Report Analyzer for quick wins, or run a full EKG health audit
            for deep architectural insights.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/analyzer" className="btn btn-primary">
              <Zap size={18} /> Launch Analyzer
            </Link>
            <Link to="/snop-advisor" className="btn btn-secondary">
              <Target size={18} /> Assess S&OP Maturity
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
