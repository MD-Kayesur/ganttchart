 




import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

// --- Estimated Data ---
const chartData = [
    { name: 'Jan', Globex: 100, Oceanic: 250 },
    { name: 'Feb', Globex: 500, Oceanic: 1200 },
    { name: 'Mar', Globex: 350, Oceanic: 800 },
    { name: 'Apr', Globex: 700, Oceanic: 300 },
    { name: 'May', Globex: 1000, Oceanic: 450 },
    { name: 'Jun', Globex: 1150, Oceanic: 550 },
    { name: 'Jul', Globex: 1250, Oceanic: 200 },
    { name: 'Aug', Globex: 1300, Oceanic: 850 },
    { name: 'Sep', Globex: 1350, Oceanic: 400 },
    { name: 'Oct', Globex: 1250, Oceanic: 150 },
    { name: 'Nov', Globex: 1450, Oceanic: 600 },
    { name: 'Dec', Globex: 1400, Oceanic: 50 },
];

const yTickFormatter = (value) => {
    const desiredTicks = [0, 250, 500, 750, 1000, 1250, 1500, 1750];
    return desiredTicks.includes(value) ? value : '';
};

const AreaChartComponent = () => {
  const [copied, setCopied] = React.useState(false);
  const [showLineOnly, setShowLineOnly] = React.useState(false); // State for the toggle
  const GLOBEX_COLOR = '#28a745'; // Closer to the green in the image
  const OCEANIC_COLOR = '#007bff'; // Closer to the blue in the image
  
  const handleCopy = async () => {
    const headers = ['Month', 'Globex Inc', 'Oceanic Airlines'];
    const keys = ['name', 'Globex', 'Oceanic'];
    const headerRow = headers.join(',');

    const dataRows = chartData.map(d => 
        keys.map(key => {
            let value = d[key];
            if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
        }).join(',')
    ).join('\n');
    
    const csvData = `${headerRow}\n${dataRows}`;

    try {
        await navigator.clipboard.writeText(csvData);
        setCopied(true);
    } catch (err) {
        console.error('Failed to copy data:', err);
    }
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl w-full mx-auto"> {/* Added w-[500px] as in your commented code */}
      
      {/* Header and Controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Area Chart</h2>
        
        {/* Right-side controls */}
        <div className="flex items-center space-x-2"> {/* space-x-2 for tighter spacing */}
          
          {/* Show Line Only Toggle */}
          <div className="flex items-center space-x-2 text-sm text-gray-700"> {/* Use gray for general text */}
            <span className="text-blue-600 font-medium">Show Line Only</span> {/* Blue for the clickable text */}
            <div 
              onClick={() => setShowLineOnly(!showLineOnly)}
              className={`w-10 h-5 flex items-center p-0.5 rounded-full cursor-pointer transition-colors duration-200 ease-in-out 
                          ${showLineOnly ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
              <div 
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out
                            ${showLineOnly ? 'translate-x-full' : 'translate-x-0'}`}
              />
            </div>
          </div>
          
          {/* Vertical Separator */}
          <div className="w-px h-6 bg-gray-300 mx-2"></div> {/* Added a separator for visual distinction */}


          {/* Icon Group for Copy and Delete */}
          <div className="text-gray-400 flex items-center space-x-2"> {/* space-x-2 for icons */}
            
            {/* COPY ICON (Matches original image's edit icon) */}
            <div 
              onClick={handleCopy}
              className="p-1 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-150 relative" // Added relative for tooltip
              title="Copy Data (CSV)"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              {copied && ( // "Copied!" feedback - positioned absolutely
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                  Copied! ✅
                </span>
              )}
            </div>
            
            {/* DELETE ICON (Matches original image's trash icon) */}
            <div className="p-1 rounded-md hover:bg-gray-100 cursor-pointer transition-colors duration-150" title="Delete Chart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </div>

          </div>
        </div>
      </div>

      {/* Legend - positioned manually to match the image */}
      <div className="flex space-x-6 mb-4 text-sm font-medium">
        <div className="flex items-center">
          <span className={`w-4 h-0.5 mr-2`} style={{ backgroundColor: GLOBEX_COLOR }}></span>
          <span className="text-gray-800">Globex Inc</span>
        </div>
        <div className="flex items-center">
          <span className={`w-4 h-0.5 mr-2`} style={{ backgroundColor: OCEANIC_COLOR }}></span>
          <span className="text-gray-800">Oceanic Airlines</span>
        </div>
      </div>

      {/* Recharts Component */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Only draw horizontal dashed grid lines */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />

          {/* X-Axis (Months) */}
          <XAxis dataKey="name" axisLine={false} tickLine={false} />

          {/* Y-Axis (Values) - Customized to match the ticks in the image */}
          <YAxis 
            domain={[0, 1850]} 
            ticks={[0, 250, 500, 750, 1000, 1250, 1500, 1750]}
            tickFormatter={yTickFormatter}
            axisLine={false} 
            tickLine={false}
            orientation="left"
            width={40}
          />
          
          <Tooltip />
          
          {/* Area Series 1: Oceanic Airlines (Blue)
            Plot first so it is underneath Globex in the rendering order.
          */}
          <Area 
            type="monotone" 
            dataKey="Oceanic" 
            stroke={OCEANIC_COLOR} 
            fill={showLineOnly ? 'none' : OCEANIC_COLOR} // Conditionally fill
            fillOpacity={showLineOnly ? 0 : 0.3} 
            strokeWidth={2}
            name="Oceanic Airlines"
          />

          {/* Area Series 2: Globex Inc (Green)
            Use a slightly higher opacity to appear more prominent.
          */}
          <Area 
            type="monotone" 
            dataKey="Globex" 
            stroke={GLOBEX_COLOR} 
            fill={showLineOnly ? 'none' : GLOBEX_COLOR} // Conditionally fill
            fillOpacity={showLineOnly ? 0 : 0.4} 
            strokeWidth={2}
            name="Globex Inc"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComponent;