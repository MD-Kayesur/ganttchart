// ./types.ts

// Define the structure for a single data entry in your pie chart
export interface PieChartDataEntry {
  name: string;
  value: number;
  color: string;
  // You can add more properties as needed, e.g., 'id' for keying
}

// Define the props for your PieChartComponent
export interface PieChartProps {
  data?: PieChartDataEntry[];
  width?: string | number;
  height?: number;
  isDoughnut?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  title?: string;
  subtitle?: string;
  centerValue?: string;
  centerLabel?: string;
  showPercentages?: boolean;
  animationDuration?: number;
  onRemove?: () => void;
  handleCopy: (data: PieChartDataEntry[]) => void; // Assuming handleCopy takes your data type
  isCopied: boolean;
}
