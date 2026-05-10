// S&OP / IBP Process Maturity Advisor
// Assess planning process maturity and recommend improvements

export const MATURITY_LEVELS = [
  { level: 1, name: 'Reactive', color: '#ef4444', description: 'Siloed, spreadsheet-driven, no formal process' },
  { level: 2, name: 'Defined', color: '#f59e0b', description: 'Basic process exists but inconsistently followed' },
  { level: 3, name: 'Integrated', color: '#3b82f6', description: 'Cross-functional process with system support' },
  { level: 4, name: 'Advanced', color: '#8b5cf6', description: 'AI/ML-augmented with scenario planning' },
  { level: 5, name: 'Autonomous', color: '#10b981', description: 'Self-learning, continuous optimization' },
];

export const PROCESS_DIMENSIONS = [
  {
    id: 'demand',
    name: 'Demand Planning',
    icon: '📊',
    questions: [
      { id: 'dq1', text: 'How is demand forecasting performed?', options: [
        { value: 1, label: 'Manual spreadsheets / gut feel' },
        { value: 2, label: 'Basic statistical models (moving average, exponential smoothing)' },
        { value: 3, label: 'Advanced statistical models with causal factors' },
        { value: 4, label: 'ML-driven forecasting with demand sensing' },
        { value: 5, label: 'Autonomous demand sensing with real-time signal processing' },
      ]},
      { id: 'dq2', text: 'How are demand exceptions managed?', options: [
        { value: 1, label: 'No exception management' },
        { value: 2, label: 'Manual review of all items' },
        { value: 3, label: 'Threshold-based exception alerts' },
        { value: 4, label: 'AI-prioritized exception queue with suggested actions' },
        { value: 5, label: 'Auto-resolved exceptions with human oversight for critical items' },
      ]},
      { id: 'dq3', text: 'How is consensus demand created?', options: [
        { value: 1, label: 'Single person creates forecast' },
        { value: 2, label: 'Email-based review with offline inputs' },
        { value: 3, label: 'Structured consensus meeting with system-supported workflow' },
        { value: 4, label: 'Collaborative platform with override tracking and bias analysis' },
        { value: 5, label: 'Automated consensus with ML-weighted inputs from multiple sources' },
      ]},
    ]
  },
  {
    id: 'supply',
    name: 'Supply Planning',
    icon: '🏭',
    questions: [
      { id: 'sq1', text: 'How is supply planning executed?', options: [
        { value: 1, label: 'Reactive, order-by-order' },
        { value: 2, label: 'MRP-driven with manual adjustments' },
        { value: 3, label: 'Constrained supply planning with capacity checks' },
        { value: 4, label: 'Multi-echelon optimization with scenario analysis' },
        { value: 5, label: 'Autonomous supply orchestration with real-time replanning' },
      ]},
      { id: 'sq2', text: 'How are supply constraints handled?', options: [
        { value: 1, label: 'Discovered after the fact (firefighting)' },
        { value: 2, label: 'Known but managed manually' },
        { value: 3, label: 'Modeled in system with alerts' },
        { value: 4, label: 'Proactive scenario planning for constraint resolution' },
        { value: 5, label: 'Dynamic constraint resolution with automated fallback strategies' },
      ]},
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory Optimization',
    icon: '📦',
    questions: [
      { id: 'iq1', text: 'How are inventory targets set?', options: [
        { value: 1, label: 'Fixed safety stock / days-of-supply rules' },
        { value: 2, label: 'Periodic review with manual adjustments' },
        { value: 3, label: 'Statistical safety stock calculation (service level based)' },
        { value: 4, label: 'Multi-echelon inventory optimization (MEIO)' },
        { value: 5, label: 'Dynamic, AI-adjusted targets based on real-time demand/supply signals' },
      ]},
      { id: 'iq2', text: 'How is excess/obsolete inventory managed?', options: [
        { value: 1, label: 'Reactive write-offs' },
        { value: 2, label: 'Quarterly reviews' },
        { value: 3, label: 'Systematic aging analysis with alerts' },
        { value: 4, label: 'Predictive E&O identification with proactive disposition' },
        { value: 5, label: 'AI-driven lifecycle management preventing E&O before it occurs' },
      ]},
    ]
  },
  {
    id: 'financial',
    name: 'Financial Integration',
    icon: '💰',
    questions: [
      { id: 'fq1', text: 'How are financial plans connected to operational plans?', options: [
        { value: 1, label: 'Completely separate processes and systems' },
        { value: 2, label: 'Manual reconciliation between finance and operations' },
        { value: 3, label: 'Shared data with periodic alignment meetings' },
        { value: 4, label: 'Integrated Business Planning with real-time P&L impact analysis' },
        { value: 5, label: 'Unified planning with automatic financial impact on every operational decision' },
      ]},
    ]
  },
  {
    id: 'technology',
    name: 'Technology & Data',
    icon: '💻',
    questions: [
      { id: 'tq1', text: 'What is the primary planning technology?', options: [
        { value: 1, label: 'Spreadsheets (Excel)' },
        { value: 2, label: 'Legacy planning system' },
        { value: 3, label: 'Modern cloud-based platform (o9, Kinaxis, etc.)' },
        { value: 4, label: 'AI-native platform with EKG and knowledge graph' },
        { value: 5, label: 'Fully integrated digital twin with autonomous capabilities' },
      ]},
      { id: 'tq2', text: 'How is data quality managed?', options: [
        { value: 1, label: 'No formal data quality process' },
        { value: 2, label: 'Periodic manual checks' },
        { value: 3, label: 'Automated validation rules at ingestion' },
        { value: 4, label: 'Data quality scorecards with automated cleansing' },
        { value: 5, label: 'AI-driven anomaly detection with self-healing data pipelines' },
      ]},
    ]
  },
];

export function assessMaturity(answers) {
  const dimensionScores = {};
  let totalScore = 0;
  let totalQuestions = 0;

  PROCESS_DIMENSIONS.forEach(dim => {
    let dimTotal = 0;
    let dimCount = 0;
    dim.questions.forEach(q => {
      if (answers[q.id] !== undefined) {
        dimTotal += answers[q.id];
        dimCount++;
        totalScore += answers[q.id];
        totalQuestions++;
      }
    });
    dimensionScores[dim.id] = dimCount > 0 ? Math.round((dimTotal / dimCount) * 10) / 10 : 0;
  });

  const overallScore = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 10) / 10 : 0;
  const maturityLevel = MATURITY_LEVELS.find(l => l.level === Math.round(overallScore)) || MATURITY_LEVELS[0];

  // Generate recommendations
  const recommendations = [];
  PROCESS_DIMENSIONS.forEach(dim => {
    const score = dimensionScores[dim.id];
    if (score > 0 && score < 3) {
      recommendations.push({
        dimension: dim.name,
        currentLevel: Math.round(score),
        targetLevel: Math.min(5, Math.round(score) + 2),
        priority: score < 2 ? 'critical' : 'high',
        actions: getImprovementActions(dim.id, Math.round(score)),
      });
    } else if (score >= 3 && score < 4) {
      recommendations.push({
        dimension: dim.name,
        currentLevel: Math.round(score),
        targetLevel: Math.min(5, Math.round(score) + 1),
        priority: 'medium',
        actions: getImprovementActions(dim.id, Math.round(score)),
      });
    }
  });

  recommendations.sort((a, b) => {
    const prio = { critical: 0, high: 1, medium: 2 };
    return prio[a.priority] - prio[b.priority];
  });

  return { overallScore, maturityLevel, dimensionScores, recommendations };
}

function getImprovementActions(dimensionId, currentLevel) {
  const actions = {
    demand: {
      1: ['Implement statistical baseline forecasting in o9', 'Configure demand history cleansing', 'Set up basic exception alerts for large forecast errors'],
      2: ['Add causal factors (promotions, pricing, weather) to forecast models', 'Implement structured consensus workflow', 'Configure forecast value-add (FVA) tracking'],
      3: ['Enable ML-based demand sensing with short-horizon signals', 'Implement automated segmentation for forecast method selection', 'Deploy real-time demand signal repository'],
    },
    supply: {
      1: ['Migrate from reactive ordering to MRP-based planning in o9', 'Model key capacity constraints', 'Establish weekly supply review cadence'],
      2: ['Enable constrained supply planning with material and capacity checks', 'Implement supply scenario modeling', 'Configure supply exception alerts'],
      3: ['Deploy multi-echelon supply optimization', 'Enable automated supply allocation logic', 'Implement digital twin for supply network simulation'],
    },
    inventory: {
      1: ['Replace fixed rules with statistical safety stock calculations', 'Implement inventory segmentation (ABC-XYZ)', 'Set up inventory KPI dashboards'],
      2: ['Deploy service-level-based inventory optimization', 'Configure aging analysis and E&O alerts', 'Implement inventory policy recommendations'],
      3: ['Enable MEIO (Multi-Echelon Inventory Optimization)', 'Deploy predictive E&O identification', 'Implement dynamic safety stock adjustments'],
    },
    financial: {
      1: ['Establish common data definitions between finance and operations', 'Create shared assumptions registers', 'Implement basic revenue/cost planning in o9'],
      2: ['Link operational plans to P&L impact views', 'Enable scenario-based financial analysis', 'Implement gap-to-budget tracking'],
      3: ['Deploy real-time P&L simulation on operational changes', 'Enable margin optimization in supply decisions', 'Implement working capital optimization views'],
    },
    technology: {
      1: ['Migrate critical planning processes to o9 platform', 'Implement EKG with core dimensions', 'Establish data governance fundamentals'],
      2: ['Optimize EKG model for performance', 'Implement automated data quality monitoring', 'Enable API-based integration with source systems'],
      3: ['Deploy AI/ML capabilities for forecasting and optimization', 'Implement real-time data streaming', 'Enable advanced analytics and insights engine'],
    },
  };
  return actions[dimensionId]?.[currentLevel] || ['Continue current optimization trajectory'];
}
