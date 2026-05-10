// EKG (Enterprise Knowledge Graph) Health Checker
// Deep o9 architecture diagnostics for Graph Cube, nodes, edges, hierarchies

export const EKG_DIMENSIONS = [
  { id: 'product', label: 'Product', icon: '📦' },
  { id: 'location', label: 'Location / Geography', icon: '🌍' },
  { id: 'customer', label: 'Customer', icon: '👥' },
  { id: 'supplier', label: 'Supplier', icon: '🏭' },
  { id: 'time', label: 'Time', icon: '📅' },
  { id: 'channel', label: 'Channel', icon: '🔗' },
  { id: 'brand', label: 'Brand', icon: '🏷️' },
  { id: 'resource', label: 'Resource / Capacity', icon: '⚙️' },
];

export const EKG_CHECKLIST = [
  {
    id: 'ekg-nodes',
    category: 'Graph Nodes & Edges',
    items: [
      { id: 'n1', text: 'All master data entities (Product, Location, Customer, etc.) are modeled as distinct node types', weight: 3 },
      { id: 'n2', text: 'Node naming convention is consistent and documented', weight: 1 },
      { id: 'n3', text: 'Edges represent real business relationships (BOM, sourcing, distribution)', weight: 3 },
      { id: 'n4', text: 'No orphan nodes (disconnected from the main graph)', weight: 2 },
      { id: 'n5', text: 'Cross-dimensional edges are properly validated (e.g., Product-Location mappings)', weight: 2 },
    ]
  },
  {
    id: 'ekg-hierarchies',
    category: 'Hierarchy Design',
    items: [
      { id: 'h1', text: 'Product hierarchy has ≤ 5 levels with clear planning purpose per level', weight: 3 },
      { id: 'h2', text: 'Location hierarchy aligns with actual supply chain network topology', weight: 3 },
      { id: 'h3', text: 'Time hierarchy supports all planning horizons (weekly, monthly, quarterly)', weight: 2 },
      { id: 'h4', text: 'No 1:1 parent-child ratio levels (redundant levels removed)', weight: 2 },
      { id: 'h5', text: 'Alternative hierarchies exist for different planning views (commercial vs. supply)', weight: 1 },
      { id: 'h6', text: 'Hierarchy attributes are used for filtering instead of additional levels', weight: 2 },
    ]
  },
  {
    id: 'ekg-measures',
    category: 'Measures & Calculations',
    items: [
      { id: 'm1', text: 'Base measures are stored at native granularity (not pre-aggregated)', weight: 3 },
      { id: 'm2', text: 'Derived measures use efficient aggregation formulas', weight: 2 },
      { id: 'm3', text: 'No duplicate or redundant measure definitions', weight: 2 },
      { id: 'm4', text: 'Measure calculation dependencies are documented', weight: 1 },
      { id: 'm5', text: 'Time-based measures have proper lag/lead offset configurations', weight: 2 },
    ]
  },
  {
    id: 'ekg-integration',
    category: 'Data Integration',
    items: [
      { id: 'i1', text: 'ERP source-to-EKG mappings are documented and validated', weight: 3 },
      { id: 'i2', text: 'Data refresh frequency matches business planning cycles', weight: 2 },
      { id: 'i3', text: 'Data validation rules exist at ingestion points', weight: 3 },
      { id: 'i4', text: 'Error handling and retry logic is configured for data loads', weight: 2 },
      { id: 'i5', text: 'Historical data retention policies are defined and enforced', weight: 1 },
      { id: 'i6', text: 'Real-time vs batch integration is appropriate per data type', weight: 2 },
    ]
  },
  {
    id: 'ekg-performance',
    category: 'Graph Cube Performance',
    items: [
      { id: 'p1', text: 'In-memory footprint is monitored and within allocated limits', weight: 3 },
      { id: 'p2', text: 'Graph traversal queries are optimized (no full-graph scans)', weight: 3 },
      { id: 'p3', text: 'Sparse data handling is configured to avoid storing zeros', weight: 2 },
      { id: 'p4', text: 'Aggregation caching is enabled for frequently-accessed rollups', weight: 2 },
      { id: 'p5', text: 'Parallel calculation execution is configured appropriately', weight: 2 },
    ]
  },
];

export function evaluateEKGHealth(checkedItems) {
  let totalWeight = 0;
  let earnedWeight = 0;
  const categoryScores = {};

  EKG_CHECKLIST.forEach(cat => {
    let catTotal = 0;
    let catEarned = 0;
    cat.items.forEach(item => {
      catTotal += item.weight;
      totalWeight += item.weight;
      if (checkedItems.includes(item.id)) {
        catEarned += item.weight;
        earnedWeight += item.weight;
      }
    });
    categoryScores[cat.category] = Math.round((catEarned / catTotal) * 100);
  });

  const overallScore = Math.round((earnedWeight / totalWeight) * 100);

  const findings = [];
  EKG_CHECKLIST.forEach(cat => {
    cat.items.forEach(item => {
      if (!checkedItems.includes(item.id) && item.weight >= 2) {
        findings.push({
          category: cat.category,
          issue: item.text,
          severity: item.weight === 3 ? 'critical' : 'high',
        });
      }
    });
  });

  findings.sort((a, b) => (a.severity === 'critical' ? -1 : 1));

  return { overallScore, categoryScores, findings };
}
