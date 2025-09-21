 









 import React, { useState, useEffect } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// --- 1. Data specifically for the "Radar Chart" image ---
const imageRadarData = [
  {
    subject: 'Average Session Duration',
    'This Month': 0.75, // Corresponds to 180ms visually if fullMark is 1 (or 240ms)
    'Previous Month': 1.0, // Represents the peak "180ms" visually
    fullMark: 1.0, // Assuming a normalized scale for demonstration
  },
  {
    subject: 'ROI',
    'This Month': 1,
    'Previous Month': 0.70,
    fullMark: 1.0,
  },
  {
    subject: 'Pages per Session',
    'This Month': 0.70,
    'Previous Month': 1,
    fullMark: 1.0,
  },
  {
    subject: 'Conversion Rate',
    'This Month': 0.95,
    'Previous Month': 0.70,
    fullMark: 1.0,
  },
  {
    subject: 'Bounce Rate',
    'This Month': 0.75,
    'Previous Month': 0.75,
    fullMark: 1.0,
  },
];

// Custom label formatter for PolarRadiusAxis to match the image's values
const formatRadiusTick = (value, index, data) => {
  // These specific values are hardcoded based on the image's visible labels.
  if (index === 0) return ''; // The innermost circle is often unlabeled
  if (index === 1) return ' ';
  if (index === 2) return ' '; // Or adjust if 3 ticks are desired
  if (index === 3) return ' '; // Topmost value
  // Topmost value
  return '';
};

// --- Custom Tooltip Component for better styling (Optional but recommended) ---
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-300 shadow-md rounded-lg text-sm text-gray-800">
        <p className="font-bold mb-1 text-base">{label}</p>
        {payload.map((p, index) => (
          <p key={`tooltip-item-${index}`} style={{ color: p.color }}>
            {`${p.name}: ${p.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// --- 2. RadarChartComponent tailored to the image ---
const RadarChartComponent = ({ 
  initialData = imageRadarData, // Use the image-specific data as default
  width = "100%", 
  height = 300,
  title = "Radar Chart",
  subtitle = "Average Session Duration",
  colors = ['#359CD4', '#057762'], // Blue for 'This Month', Green for 'Previous Month' (swapping colors to match common convention/visuals better)
  dataKeys = ['This Month', 'Previous Month'],
  dataLabels = ['This Month', 'Previous Month'],
  onDelete, // From previous interaction
}) => {
  const [data, setData] = useState(initialData);
  const [message, setMessage] = useState('');

  // Reset data if initialData prop changes (e.g., for different examples)
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // --- Action Handlers (from HeatmapComponent, adapted) ---
  const handleCopyData = async () => {
    if (!data || data.length === 0) {
      setMessage('No data to copy.');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // Convert JSON to CSV format
    const headers = ['subject', ...dataKeys].join(',');
    const rows = data.map(row => 
      [row.subject, ...dataKeys.map(key => row[key])].join(',')
    ).join('\n');
    const csvData = headers + '\n' + rows;

    try {
      await navigator.clipboard.writeText(csvData);
      setMessage('Chart data copied to clipboard (CSV)!');
    } catch (err) {
      console.error('Failed to copy data:', err);
      setMessage('Error copying data.');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  const handleDeleteChart = () => {
    if (window.confirm('Are you sure you want to delete this chart?')) {
      if (onDelete) {
        onDelete(); // Notify parent to remove the component or clear its state
        setMessage('Chart deleted.');
        setData([]); // Clear internal data to show the empty state message
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full  mx-auto relative">
      {/* Status Message (Copy/Delete confirmation) */}
      {message && (
        <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-4 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg z-20">
          {message}
        </div>
      )}

      {/* Chart Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {/* Subtitle is part of the legend in the image, or general description */}
        </div>

        {/* Action Icons */}
        <div className="flex gap-2 text-gray-400">
          <button onClick={handleCopyData} title="Copy Data (CSV)" className="p-1 hover:text-gray-600 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button onClick={handleDeleteChart} title="Delete Chart" className="p-1 hover:text-red-500 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom Legend (above the chart, matching image style) */}
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="flex  w-full justify-start gap-7 text-sm font-medium mb-1">
          <span className="flex items-center text-gray-700">
            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: colors[0]}}></span>
            This Month
          </span>
          <span className="flex items-center text-gray-700">
            <span className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: colors[1]}}></span>
            Previous Month
          </span>
        </div>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>


      {/* Radar Chart */}
      {data && data.length > 0 ? (
        <ResponsiveContainer width={width} height={height}>
          <RadarChart data={data} outerRadius="80%">  
            <PolarGrid 
              gridType="polygon" 
              radialLines={true}
              stroke="#e0e7ff" 
              strokeWidth={1}
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ 
                fontSize: 12, 
                fill: '#4B5563',  
                fontWeight: 500
              }}
              // Removed the tickFormatter for 'Average Session Duration' here 
              // as the label is handled by the subtitle/custom labels, 
              // but I'll keep the logic if the goal was to hide it on the axis:
              tickFormatter={(value) => {
                 if (value === 'Average Session Duration') {
                   return '';  
                 }
                 return value;
               }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 1.0]}  
              tickCount={4}  
              tickFormatter={formatRadiusTick}  
              stroke="#e0e7ff"
              strokeOpacity={0.7}
            />

            {/* ADDED Tooltip Component here */}
            <Tooltip content={<CustomTooltip />} />
            
            {dataKeys.map((key, index) => (
              <Radar
                key={key}
                name={dataLabels[index]}
                dataKey={key}
                stroke={colors[index]}
                fill={colors[index]}
                fillOpacity={0.15}
                strokeWidth={2.5}
                dot={{ 
                  fill: colors[index], 
                  strokeWidth: 2, 
                  stroke: '#fff',
                  r: 4
                }}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-10 text-gray-500">
          Chart data is unavailable or has been deleted.
        </div>
      )}

      {/* Custom labels below specific points on the chart to match the image */}
      {data && data.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Note: These absolute labels may overlap with the Tooltip, 
          but are kept to match the image's specific look. */}
          <div className="absolute text-xs font-medium text-gray-700" style={{ top: '140px', left: '270px', transform: 'translateX(-50%)' }}>180ms</div>
           <div className="absolute text-xs font-medium text-gray-700" style={{ top: '210px', right: '160px' }}>0.65</div>
           <div className="absolute text-xs font-medium text-gray-700" style={{ bottom: '80px', right: '190px' }}>0.65</div>
           <div className="absolute text-xs font-medium text-gray-700" style={{ bottom: '80px', left: '190px' }}>0.95</div>
           <div className="absolute text-xs font-medium text-gray-700" style={{ top: '210px', left: '160px' }}>0.65</div>
        </div>
      )}

    </div>
  );
};

export default RadarChartComponent;

// --- Example Usage in a Parent Component ---
export const RadarChartDashboard = () => {
    const [currentRadarData, setCurrentRadarData] = useState(imageRadarData);

    const handleChartDelete = () => {
        setCurrentRadarData([]); // Clear data to simulate deletion
    };

    return (
      <div className="p-8 bg-gray-50  min-h-screen">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Analytics Dashboard</h1>

          <RadarChartComponent 
              initialData={currentRadarData} // Pass the state data
              onDelete={handleChartDelete} // Pass the delete handler
          />

          {/* Optional: Button to restore the chart */}
          {currentRadarData.length === 0 && (
              <button 
                  onClick={() => setCurrentRadarData(imageRadarData)}
                  className="mt-6 px-5  py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
              >
                  Restore Radar Chart
              </button>
          )}
      </div>
    );
};