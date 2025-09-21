export const WIDGET_CATALOG = [
  { id: 'kpi', name: 'KPI Widget', component: 'KPIWidget', icon: '📊', defaultConfig: { valueKey: 'sales', color: '#4CAF50' } },
  { id: 'column', name: 'Column Chart', component: 'ColumnChartWidget', icon: '📈', defaultConfig: { chartType: 'bar', xAxis: 'month', seriesName: 'Revenue' } },
  { id: 'area', name: 'Area Chart', component: 'AreaChartWidget', icon: '📉', defaultConfig: { showLegend: true, areaColor: '#2196F3' } },
  // ... add other widgets like Stacked Bar Chart, Gantt Chart, etc.
];