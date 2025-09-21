 




import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --- Sample Data (Kept for context) ---
const defaultLineData = [
    { name: 'Jan', acmeCorp: 250, globexInc: 200 },
    { name: 'Feb', acmeCorp: 400, globexInc: 300 },
    { name: 'Mar', acmeCorp: 350, globexInc: 450 },
    { name: 'Apr', acmeCorp: 1200, globexInc: 800 },
    { name: 'May', acmeCorp: 1100, globexInc: 900 },
    { name: 'Jun', acmeCorp: 1250, globexInc: 1000 },
    { name: 'Jul', acmeCorp: 1650, globexInc: 1200 },
    { name: 'Aug', acmeCorp: 1500, globexInc: 1350 },
    { name: 'Sep', acmeCorp: 1700, globexInc: 1300 },
    { name: 'Oct', acmeCorp: 1200, globexInc: 1300 },
    { name: 'Nov', acmeCorp: 1100, globexInc: 1500 },
    { name: 'Dec', acmeCorp: 1250, globexInc: 1450 }
];


// --- Helper Components ---

const CustomLegendContent = ({ payload }) => {
    return (
        <div className="flex items-center gap-6">
            {payload.map((entry, index) => (
                <div key={index} className="flex items-center gap-2" title={entry.value}>
                    <div
                        className="w-4 h-0.5 rounded-full"
                        style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-sm text-gray-700 font-medium">
                        {entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                <p className="font-medium text-gray-800 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-gray-600">{entry.name}:</span>
                        <span className="font-medium text-gray-800">
                            {entry.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};


// --- Core MultiAxisLineChart Component ---

const MultiAxisLineChart = ({
    data = defaultLineData,
    width = "100%",
    height = 400,
    title = "Multi-Axis Line Chart",
    leftAxisKey = 'acmeCorp',
    rightAxisKey = 'globexInc',
    leftAxisLabel = 'Acme Corp',
    rightAxisLabel = 'Globex Inc',
    leftAxisColor = '#8b5cf6', // Purple
    rightAxisColor = '#10b981', // Green
    showGrid = true,
    showTooltip = true,
    strokeWidth = 2,
    animationDuration = 1000,
    dotSize = 4,
    xAxisKey = 'name',
    showOnlyMode = true,
}) => {
    // Corrected state initialization: showLineOnly is false by default (show full UI)
    const [showLineOnly, setShowLineOnly] = useState(false);
    const [message, setMessage] = useState('');
    const [hoveredLine, setHoveredLine] = useState(null);

    // --- Data Calculations (Defined HERE to ensure they are available in scope) ---
    const leftData = data.map(d => d[leftAxisKey]);
    const rightData = data.map(d => d[rightAxisKey]);
    
    // Helper functions for safe calculation
    const safeMax = (arr) => arr.length > 0 ? Math.max(...arr) : 0;
    const safeMin = (arr) => arr.length > 0 ? Math.min(...arr) : 0;
    const safeAvg = (arr) => arr.length > 0 ? Math.round(arr.reduce((sum, d) => sum + d, 0) / arr.length) : 0;

    // Calculated Statistics (now defined before use)
    const leftStats = {
        Max: safeMax(leftData),
        Avg: safeAvg(leftData),
        Min: safeMin(leftData),
    };
    const rightStats = {
        Max: safeMax(rightData),
        Avg: safeAvg(rightData),
        Min: safeMin(rightData),
    };

    // Raw min/max values for YAxis domain calculation
    const leftMax = leftStats.Max;
    const leftMin = leftStats.Min;
    const rightMax = rightStats.Max;
    const rightMin = rightStats.Min;

    // --- Action Handlers (Kept as is) ---

    const handleCopyData = async () => {
        if (!data || data.length === 0) {
            setMessage('No data to copy.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        const explicitHeaders = [xAxisKey, leftAxisLabel, rightAxisLabel];
        const keys = [xAxisKey, leftAxisKey, rightAxisKey];
        const headers = explicitHeaders.join(',');

        const rows = data.map(row => 
            keys.map(key => {
                let value = row[key];
                if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                    return `"${value.replace(/"/g, '""')}"`;
                }
                return value;
            }).join(',')
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
        setMessage('Chart deleted (Mock Action).');
        setTimeout(() => setMessage(''), 3000);
    };

    // --- Rendering Helpers (Kept as is) ---

    const StatBox = ({ label, value }) => (
        <div className="p-3 bg-white rounded-lg border border-gray-200 text-center flex flex-col justify-center items-center h-full w-full">
            <div className="text-xl font-bold text-gray-800 leading-none">
                {value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">{label}</div>
        </div>
    );

    const StatGroup = ({ label, stats, color }) => (
        <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-1 rounded-full" style={{ backgroundColor: color }}></div>
                <span className="font-medium text-gray-700">{label}</span>
            </div>
            <div className="flex gap-4">
                <StatBox label="Max" value={stats.Max} />
                <StatBox label="Avg" value={stats.Avg} />
                <StatBox label="Min" value={stats.Min} />
            </div>
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-100 max-w-5xl mx-auto relative">
            {/* Status Message */}
            {message && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-4 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg z-20">
                    {message}
                </div>
            )}

            {/* --- TOP HEADER & ACTIONS --- */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                
                {/* Actions (Copy, Delete, Show Line Only Toggle) */}
                <div className="flex items-center gap-3">
                    {/* Show Line Only Toggle */}
                    {showOnlyMode && (
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show Line Only</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={showLineOnly} 
                                    onChange={() => setShowLineOnly(!showLineOnly)} 
                                    className="sr-only peer" 
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    )}

                    <button onClick={handleCopyData} title="Copy Data (CSV)" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                    <button onClick={handleDeleteChart} title="Delete Chart" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* --- LEGEND and STATISTICS --- */}
            {/* CONDITIONAL RENDERING ADDED HERE */}
            {!showLineOnly && (
                <div className="flex justify-between items-start mb-6 pt-4 border-t border-gray-100">
                    {/* Left Side: Legend */}
                    <Legend 
                        content={CustomLegendContent} 
                        payload={[
                            { value: leftAxisLabel, color: leftAxisColor },
                            { value: rightAxisLabel, color: rightAxisColor },
                        ]} 
                    />

                    {/* Right Side: Statistics Grid */}
                    <div className="flex gap-6">
                        <StatGroup label={leftAxisLabel} stats={leftStats} color={leftAxisColor} />
                        <StatGroup label={rightAxisLabel} stats={rightStats} color={rightAxisColor} />
                    </div>
                </div>
            )}
            {/* END OF CONDITIONAL RENDERING */}

            {/* --- CHART AREA --- */}
            <div className="relative pt-4">
                <ResponsiveContainer width={width} height={height}>
                    <LineChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
                        {showGrid && (
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#f0f0f0"
                                horizontal={true}
                                vertical={false}
                            />
                        )}

                        <XAxis
                            dataKey={xAxisKey}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                        />

                        {/* Left Y-Axis (Visible ticks and labels) */}
                        <YAxis
                            yAxisId="left"
                            // Using the correctly scoped variables here
                            domain={[leftMin > 0 ? leftMin * 0.8 : 0, leftMax * 1.2]}
                            tick={{ fontSize: 12, fill: '#9ca3af' }}
                            axisLine={false}
                            tickLine={false}
                            orientation="left"
                            tickFormatter={(value) => value.toLocaleString()}
                        />

                        {/* Right Y-Axis (Hidden ticks and labels) */}
                        <YAxis
                            yAxisId="right"
                            // Using the correctly scoped variables here
                            domain={[rightMin > 0 ? rightMin * 0.8 : 0, rightMax * 1.2]}
                            hide={true}
                            orientation="right"
                        />

                        {showTooltip && <Tooltip content={<CustomTooltip />} />}

                        {/* Left Axis Line (Acme Corp) - REMOVED CONDITIONAL RENDERING */}
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey={leftAxisKey}
                            name={leftAxisLabel}
                            stroke={leftAxisColor}
                            strokeWidth={hoveredLine === leftAxisKey ? strokeWidth + 1 : strokeWidth}
                            dot={false}
                            activeDot={{ r: dotSize + 2, stroke: leftAxisColor, strokeWidth: 2, fill: '#fff' }}
                            onMouseEnter={() => setHoveredLine(leftAxisKey)}
                            onMouseLeave={() => setHoveredLine(null)}
                            animationDuration={animationDuration}
                        />

                        {/* Right Axis Line (Globex Inc) - REMOVED CONDITIONAL RENDERING */}
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey={rightAxisKey}
                            name={rightAxisLabel}
                            stroke={rightAxisColor}
                            strokeWidth={hoveredLine === rightAxisKey ? strokeWidth + 1 : strokeWidth}
                            dot={false}
                            activeDot={{ r: dotSize + 2, stroke: rightAxisColor, strokeWidth: 2, fill: '#fff' }}
                            onMouseEnter={() => setHoveredLine(rightAxisKey)}
                            onMouseLeave={() => setHoveredLine(null)}
                            animationDuration={animationDuration}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MultiAxisLineChart;
















