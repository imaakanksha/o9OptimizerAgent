import React from 'react';

export default function ScoreRing({ score, size = 180 }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 80) return '#34d399';
    if (score >= 60) return '#fbbf24';
    if (score >= 40) return '#fb923c';
    return '#ef4444';
  };

  const getLabel = () => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Needs Work';
    return 'Critical';
  };

  return (
    <div className="score-ring-container">
      <div className="score-ring" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor={getColor()} />
            </linearGradient>
          </defs>
          <circle
            className="score-ring-bg"
            cx={size / 2} cy={size / 2} r={radius}
          />
          <circle
            className="score-ring-progress"
            cx={size / 2} cy={size / 2} r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            stroke={`url(#scoreGradient)`}
          />
        </svg>
        <div className="score-ring-text">
          <div className="score-value">{score}</div>
          <div className="score-label">{getLabel()}</div>
        </div>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        Report Health Score
      </p>
    </div>
  );
}
