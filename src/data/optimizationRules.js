// o9 Report Optimization Knowledge Base
// Comprehensive rules engine based on o9 Solutions best practices

export const REPORT_TYPES = [
  { value: 'demand_planning', label: 'Demand Planning Report' },
  { value: 'supply_planning', label: 'Supply Planning Report' },
  { value: 'inventory', label: 'Inventory Optimization Report' },
  { value: 'financial', label: 'Financial Planning Report' },
  { value: 'control_tower', label: 'Control Tower Dashboard' },
  { value: 'scenario', label: 'Scenario Analysis Report' },
  { value: 'exception', label: 'Exception Report' },
  { value: 'kpi_dashboard', label: 'KPI Dashboard' },
  { value: 'snop', label: 'S&OP Report' },
  { value: 'custom', label: 'Custom / Ad-Hoc Report' },
];

export const ISSUE_CATEGORIES = [
  { value: 'slow_load', label: 'Slow Loading' },
  { value: 'data_accuracy', label: 'Data Accuracy' },
  { value: 'layout_complex', label: 'Complex Layout' },
  { value: 'too_many_kpis', label: 'Too Many KPIs' },
  { value: 'hierarchy_deep', label: 'Deep Hierarchies' },
  { value: 'calc_heavy', label: 'Heavy Calculations' },
  { value: 'data_volume', label: 'High Data Volume' },
  { value: 'stale_data', label: 'Stale/Outdated Data' },
  { value: 'poor_ux', label: 'Poor User Experience' },
  { value: 'no_exceptions', label: 'No Exception Handling' },
];

export const OPTIMIZATION_RULES = [
  // ========== HIERARCHY OPTIMIZATION ==========
  {
    id: 'hier-001',
    title: 'Flatten Over-Deep Hierarchies',
    category: 'Hierarchy & Data Model',
    severity: 'critical',
    triggers: ['hierarchy_deep', 'slow_load', 'calc_heavy'],
    reportTypes: ['demand_planning', 'supply_planning', 'inventory', 'snop', 'custom'],
    problem: 'Hierarchies with more than 6-7 levels create exponential data volume growth and dramatically slow down aggregation, disaggregation, and allocation calculations in the o9 Graph Cube.',
    recommendation: 'Audit all hierarchies and reduce depth to 4-5 meaningful levels. Merge intermediate levels that do not add decision-making value. Use attributes for filtering instead of additional hierarchy levels.',
    steps: [
      'Export hierarchy structure from the EKG model configuration',
      'Identify levels that have a 1:1 or near-1:1 parent-child ratio — these are candidates for merging',
      'Evaluate which levels are actually used for planning decisions vs. just for display',
      'Consolidate redundant levels and convert to attributes where appropriate',
      'Re-test aggregation and disaggregation performance after restructuring',
    ],
    impact: 'Up to 60% improvement in calculation and rendering speed',
    effortLevel: 'High',
  },
  {
    id: 'hier-002',
    title: 'Align Hierarchies to Planning Granularity',
    category: 'Hierarchy & Data Model',
    severity: 'high',
    triggers: ['data_accuracy', 'hierarchy_deep', 'calc_heavy'],
    reportTypes: ['demand_planning', 'supply_planning', 'snop', 'financial'],
    problem: 'Misaligned hierarchies (e.g., planning at SKU level but reporting at category level) cause expensive aggregation calculations and potential data allocation inaccuracies.',
    recommendation: 'Ensure the planning granularity matches the reporting granularity. Configure the report to pull data at the native planning level and only aggregate where explicitly needed.',
    steps: [
      'Document the planning granularity for each business process (demand, supply, finance)',
      'Map report hierarchy levels to planning hierarchy levels',
      'Identify mismatches and configure direct node mappings',
      'Remove unnecessary cross-hierarchy allocations',
    ],
    impact: '40-50% reduction in allocation errors and calculation time',
    effortLevel: 'Medium',
  },

  // ========== KPI & METRICS OPTIMIZATION ==========
  {
    id: 'kpi-001',
    title: 'Rationalize KPI Overload',
    category: 'KPI & Metrics',
    severity: 'critical',
    triggers: ['too_many_kpis', 'slow_load', 'poor_ux'],
    reportTypes: ['kpi_dashboard', 'control_tower', 'snop', 'exception'],
    problem: 'Dashboards with 15+ KPIs suffer from "analysis paralysis" and severe performance degradation. Each KPI requires separate calculation threads, multiplying load times.',
    recommendation: 'Limit dashboards to 5-8 strategic KPIs per view. Create role-specific views showing only relevant metrics. Archive or move secondary KPIs to drill-down pages.',
    steps: [
      'Inventory all KPIs currently displayed on the report',
      'Categorize each KPI as Critical / Important / Nice-to-Have',
      'Survey end users on which KPIs they actually use for decisions',
      'Remove or relocate KPIs rated as Nice-to-Have',
      'Group remaining KPIs into role-specific dashboard tabs',
      'Implement lazy-loading for secondary KPI panels',
    ],
    impact: '50-70% faster dashboard load times',
    effortLevel: 'Low',
  },
  {
    id: 'kpi-002',
    title: 'Standardize KPI Definitions',
    category: 'KPI & Metrics',
    severity: 'medium',
    triggers: ['data_accuracy', 'too_many_kpis'],
    reportTypes: ['kpi_dashboard', 'control_tower', 'snop', 'financial'],
    problem: 'Different teams using different definitions for the same KPI (e.g., "Forecast Accuracy" measured as MAPE vs. WMAPE vs. Bias) leads to conflicting reports and eroded trust.',
    recommendation: 'Establish a centralized KPI glossary with agreed-upon calculation methods. Implement formulas at the platform level rather than in individual reports.',
    steps: [
      'Create a KPI governance committee with cross-functional representation',
      'Document each KPI: name, formula, data sources, update frequency, owner',
      'Migrate KPI calculations to centralized platform-level formulas',
      'Add tooltips in dashboards showing KPI definition and formula',
    ],
    impact: 'Eliminates data trust issues and reduces duplicate KPI maintenance',
    effortLevel: 'Medium',
  },

  // ========== QUERY & CALCULATION OPTIMIZATION ==========
  {
    id: 'calc-001',
    title: 'Optimize Calculation Engine Configuration',
    category: 'Calculation Engine',
    severity: 'critical',
    triggers: ['calc_heavy', 'slow_load', 'data_volume'],
    reportTypes: ['demand_planning', 'supply_planning', 'inventory', 'scenario'],
    problem: 'Default engine configurations may not be optimized for your specific data volume and model complexity. Untuned solvers can run 5-10x slower than properly configured ones.',
    recommendation: 'Profile calculation engine runs, identify bottlenecks, and tune solver parameters. Consider switching engine types (heuristic vs. LP/MIP) based on the problem characteristics.',
    steps: [
      'Enable execution profiling/logging on all calculation engines',
      'Identify the top 5 slowest calculation jobs',
      'Analyze whether the engine type matches the problem type',
      'Tune solver parameters (gap tolerance, time limits, thread count)',
      'Test performance improvements with A/B benchmarks',
      'Schedule heavy calculations during off-peak hours',
    ],
    impact: 'Up to 80% reduction in calculation execution time',
    effortLevel: 'High',
  },
  {
    id: 'calc-002',
    title: 'Implement Incremental Calculations',
    category: 'Calculation Engine',
    severity: 'high',
    triggers: ['slow_load', 'calc_heavy', 'data_volume'],
    reportTypes: ['demand_planning', 'supply_planning', 'inventory', 'control_tower'],
    problem: 'Full recalculation on every report refresh wastes compute resources and creates unnecessary delays, especially when only a small subset of data has changed.',
    recommendation: 'Configure incremental calculation policies that only recompute affected nodes when input data changes, rather than running full model recalculations.',
    steps: [
      'Map data dependency chains in the calculation graph',
      'Identify which inputs trigger full vs. partial recalculations',
      'Configure change-detection triggers on input nodes',
      'Implement delta-based calculation propagation',
      'Set up caching for stable intermediate results',
    ],
    impact: '60-75% reduction in routine calculation times',
    effortLevel: 'High',
  },

  // ========== LAYOUT & UX OPTIMIZATION ==========
  {
    id: 'layout-001',
    title: 'Simplify Report Layout Density',
    category: 'Layout & UX',
    severity: 'high',
    triggers: ['layout_complex', 'slow_load', 'poor_ux'],
    reportTypes: ['demand_planning', 'supply_planning', 'financial', 'custom', 'snop'],
    problem: 'Overly dense layouts with 20+ columns and multiple nested pivots force the browser to render thousands of cells simultaneously, causing UI freezes and poor user experience.',
    recommendation: 'Apply progressive disclosure principles. Show summary views by default with drill-down capabilities. Limit visible columns to 8-12 and use horizontal scrolling only for detailed views.',
    steps: [
      'Audit current report layouts for column and row counts',
      'Identify the most-used columns via user analytics or surveys',
      'Create a default "Summary View" with 8-10 key columns',
      'Implement expandable sections for detailed data',
      'Add column show/hide toggles for user customization',
      'Implement virtual scrolling for large data sets',
    ],
    impact: '40-60% improvement in UI responsiveness',
    effortLevel: 'Medium',
  },
  {
    id: 'layout-002',
    title: 'Implement Exception-Based Reporting',
    category: 'Layout & UX',
    severity: 'high',
    triggers: ['no_exceptions', 'poor_ux', 'too_many_kpis'],
    reportTypes: ['demand_planning', 'supply_planning', 'inventory', 'control_tower', 'exception'],
    problem: 'Planners reviewing all data points wastes time and leads to critical issues being buried in noise. Without exception highlighting, users must manually scan thousands of rows.',
    recommendation: 'Configure intelligent exception alerts that surface only items requiring attention. Use color-coding, threshold-based filters, and priority ranking to guide planner focus.',
    steps: [
      'Define business exception rules (e.g., forecast error > 30%, stock below safety level)',
      'Configure threshold-based alerts in the o9 platform',
      'Create exception-first views that show flagged items at the top',
      'Implement severity-based color coding (red/amber/green)',
      'Add one-click navigation from exceptions to detailed analysis',
      'Set up automated alert notifications for critical exceptions',
    ],
    impact: '70% reduction in planner review time',
    effortLevel: 'Medium',
  },

  // ========== DATA MANAGEMENT ==========
  {
    id: 'data-001',
    title: 'Implement Data Tiering Strategy',
    category: 'Data Management',
    severity: 'high',
    triggers: ['data_volume', 'slow_load', 'stale_data'],
    reportTypes: ['demand_planning', 'supply_planning', 'inventory', 'financial', 'custom'],
    problem: 'Loading all historical data into reports significantly increases load times. Most planning decisions only require recent data plus summary historical views.',
    recommendation: 'Implement a data tiering strategy: hot data (current + 3 months) loaded by default, warm data (3-12 months) on-demand, cold data (12+ months) archived with summary aggregates only.',
    steps: [
      'Analyze historical data access patterns to determine cut-off points',
      'Configure data partitioning by time horizon',
      'Set up automatic archival policies for cold data',
      'Create summary aggregate tables for historical trend analysis',
      'Implement lazy-loading for warm data access',
      'Monitor storage and query performance metrics',
    ],
    impact: '50-65% reduction in initial load times',
    effortLevel: 'Medium',
  },
  {
    id: 'data-002',
    title: 'Cleanse and Normalize Source Data',
    category: 'Data Management',
    severity: 'medium',
    triggers: ['data_accuracy', 'stale_data', 'calc_heavy'],
    reportTypes: ['demand_planning', 'supply_planning', 'inventory', 'financial', 'snop'],
    problem: 'Dirty data from ERP and transactional systems creates reconciliation overhead, calculation errors, and undermines trust in report outputs.',
    recommendation: 'Implement data quality gates at the ingestion layer. Validate, cleanse, and normalize data before it enters the EKG model. Set up automated data quality dashboards.',
    steps: [
      'Identify top data quality issues from user feedback and error logs',
      'Implement validation rules at data ingestion points',
      'Create automated data cleansing transformations',
      'Set up data quality scorecards with trend tracking',
      'Establish data stewardship roles and processes',
      'Configure alerts for data quality threshold breaches',
    ],
    impact: 'Eliminates 80% of data-related calculation errors',
    effortLevel: 'High',
  },

  // ========== SCENARIO & SIMULATION ==========
  {
    id: 'scenario-001',
    title: 'Optimize Scenario Comparison Views',
    category: 'Scenario Planning',
    severity: 'medium',
    triggers: ['layout_complex', 'calc_heavy', 'slow_load'],
    reportTypes: ['scenario', 'snop', 'financial', 'supply_planning'],
    problem: 'Comparing multiple scenarios side-by-side with full detail overloads both the calculation engine and the UI rendering, leading to very slow interactive analysis.',
    recommendation: 'Limit real-time scenario comparisons to 3-4 scenarios maximum. Show delta/variance views instead of full absolute values. Pre-compute scenario results rather than calculating on-the-fly.',
    steps: [
      'Set maximum concurrent scenario limit to 3-4',
      'Implement delta/variance columns instead of full scenario duplication',
      'Pre-compute and cache scenario results on save',
      'Create scenario summary scorecards with drill-down to details',
      'Add visual scenario comparison charts (spider charts, waterfall)',
    ],
    impact: '55% improvement in scenario analysis performance',
    effortLevel: 'Medium',
  },

  // ========== GOVERNANCE ==========
  {
    id: 'gov-001',
    title: 'Establish Report Governance Framework',
    category: 'Governance & Process',
    severity: 'medium',
    triggers: ['layout_complex', 'too_many_kpis', 'poor_ux'],
    reportTypes: ['kpi_dashboard', 'control_tower', 'custom', 'snop'],
    problem: 'Without governance, reports proliferate uncontrolled. Duplicate, outdated, and poorly designed reports waste system resources and confuse users.',
    recommendation: 'Create a report governance framework with ownership, review cycles, and deprecation policies. Consolidate duplicate reports and establish design standards.',
    steps: [
      'Inventory all existing reports with ownership and usage metrics',
      'Identify duplicate, unused, or outdated reports for consolidation',
      'Define report design standards (naming, layout, KPI selection)',
      'Assign report owners responsible for maintenance and accuracy',
      'Schedule quarterly report review and cleanup cycles',
      'Implement a report request workflow for new reports',
    ],
    impact: '30% reduction in system resource usage from report consolidation',
    effortLevel: 'Low',
  },
  {
    id: 'gov-002',
    title: 'Implement Continuous Performance Monitoring',
    category: 'Governance & Process',
    severity: 'low',
    triggers: ['slow_load', 'data_volume'],
    reportTypes: ['kpi_dashboard', 'control_tower', 'demand_planning', 'supply_planning', 'custom'],
    problem: 'Performance degradation is often gradual and only noticed when it becomes severe. Without proactive monitoring, issues compound over time.',
    recommendation: 'Set up automated performance monitoring for all critical reports. Track load times, calculation durations, and user interaction metrics. Alert on threshold breaches.',
    steps: [
      'Define performance SLAs for each report type (e.g., < 3s load time)',
      'Instrument reports with timing metrics',
      'Set up automated monitoring dashboards',
      'Configure alerts for SLA breaches',
      'Schedule monthly performance review meetings',
      'Maintain a performance optimization backlog',
    ],
    impact: 'Prevents performance regression and enables proactive optimization',
    effortLevel: 'Low',
  },
];

export function analyzeReport(config) {
  const { reportType, issues, rowCount, columnCount, kpiCount, hierarchyDepth, dataAge, userCount } = config;

  const matchedRules = OPTIMIZATION_RULES.filter(rule => {
    const typeMatch = rule.reportTypes.includes(reportType) || rule.reportTypes.includes('custom');
    const issueMatch = rule.triggers.some(t => issues.includes(t));
    return typeMatch && issueMatch;
  });

  // Score additional context-based rules
  const contextRules = [];

  if (rowCount > 10000) {
    contextRules.push(...OPTIMIZATION_RULES.filter(r =>
      r.triggers.includes('data_volume') && !matchedRules.includes(r)
    ));
  }

  if (columnCount > 15) {
    contextRules.push(...OPTIMIZATION_RULES.filter(r =>
      r.triggers.includes('layout_complex') && !matchedRules.includes(r) && !contextRules.includes(r)
    ));
  }

  if (kpiCount > 12) {
    contextRules.push(...OPTIMIZATION_RULES.filter(r =>
      r.triggers.includes('too_many_kpis') && !matchedRules.includes(r) && !contextRules.includes(r)
    ));
  }

  if (hierarchyDepth > 5) {
    contextRules.push(...OPTIMIZATION_RULES.filter(r =>
      r.triggers.includes('hierarchy_deep') && !matchedRules.includes(r) && !contextRules.includes(r)
    ));
  }

  const allRules = [...matchedRules, ...contextRules];

  // Remove duplicates
  const uniqueRules = allRules.filter((rule, idx, arr) =>
    arr.findIndex(r => r.id === rule.id) === idx
  );

  // Sort by severity
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  uniqueRules.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);

  // Calculate optimization score
  const maxPossibleIssues = OPTIMIZATION_RULES.length;
  const issueCount = uniqueRules.length;
  const severityWeight = uniqueRules.reduce((sum, r) => {
    const weights = { critical: 4, high: 3, medium: 2, low: 1 };
    return sum + weights[r.severity];
  }, 0);
  const maxWeight = maxPossibleIssues * 4;
  const score = Math.max(10, Math.round(100 - (severityWeight / maxWeight) * 100));

  // Categorize
  const categories = {};
  uniqueRules.forEach(rule => {
    if (!categories[rule.category]) categories[rule.category] = [];
    categories[rule.category].push(rule);
  });

  return {
    score,
    totalRecommendations: uniqueRules.length,
    criticalCount: uniqueRules.filter(r => r.severity === 'critical').length,
    highCount: uniqueRules.filter(r => r.severity === 'high').length,
    mediumCount: uniqueRules.filter(r => r.severity === 'medium').length,
    lowCount: uniqueRules.filter(r => r.severity === 'low').length,
    recommendations: uniqueRules,
    categories,
  };
}
