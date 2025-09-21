 


import React, { useState } from 'react';

// --- 1. Data Generation for Product Inventory (Mock Data) ---
const alternativeHeatmapData = {
    // Generates the 5x7 grid data with mock stock levels
    productInventory: (() => {
        const data = [];
        const products = ['Smart Watch', 'Power Bank', 'Smart Phone', 'Earphone', 'Earpiece'];
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        products.forEach((product, productIndex) => {
            days.forEach((day, dayIndex) => {
                data.push({
                    product: productIndex,
                    day: dayIndex,
                    productName: product,
                    dayName: day,
                    // 'value' is for color intensity (0-3)
                    value: Math.floor(Math.random() * 4), 
                    // 'stock' is the actual inventory number
                    stock: Math.floor(Math.random() * 2000) 
                });
            });
        });
        return data;
    })(),
};


// --- 2. Heatmap Component ---

/**
 * HeatmapComponent renders a grid-based chart visualizing product inventory levels.
 * It includes action buttons for copying data and deletion, and a mouse-following tooltip.
 */
const HeatmapComponent = ({
    data = alternativeHeatmapData.productInventory,
    title = "Heat Map Chart",
    subtitle = "Total in Stock",
    colorScheme = "teal",
    showTooltip = true,
    cellSize = 40,
    cellGap = 8,
    xAxisLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    yAxisLabels = ['Smart Watch', 'Power Bank', 'Smart Phone', 'Earphone', 'Earpiece'],
    valueKey = "value",
    maxValue = 3,
    onDelete, // Callback function to handle deletion in the parent component
}) => {
    // State to track which cell is hovered, including mouse coordinates (for following pointer)
    const [hoveredCell, setHoveredCell] = useState(null);
    const [message, setMessage] = useState('');

    // Define colors to visually match the provided image
    const colorSchemes = {
        teal: ['#E8F4F1', '#C5E0D9', '#86B6AB', '#527C72', '#314B45'],
    };
    const colors = colorSchemes[colorScheme] || colorSchemes.teal;

    const getColor = (value) => {
        if (value === 0) return colors[0];
        // Map value (0-3) to one of the 5 colors
        const index = Math.min(Math.ceil((value / maxValue) * (colors.length - 1)), colors.length - 1);
        return colors[index] || colors[0];
    };

    // --- Action Handlers (CSV Copy) ---

    const handleCopyData = async () => {
        if (!data || data.length === 0) {
            setMessage('No data to copy.');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        // 1. Define the headers for CSV
        const explicitHeaders = ['productName', 'dayName', 'stock', 'value'];
        const headers = explicitHeaders.join(',');

        // 2. Map data to rows, ensuring order matches headers and applying CSV escaping
        const rows = data.map(row => 
            explicitHeaders.map(header => {
                let value = row[header];
                if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
                    // Escape internal quotes and enclose in external quotes for proper Excel parsing
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
        if (window.confirm('Are you sure you want to delete this chart?')) {
            if (onDelete) {
                onDelete();
                setMessage('Chart deleted.');
            }
        }
    };

    // --- Tooltip & Hover Handlers ---

    // Tooltip component that is positioned relative to the mouse pointer
    const DefaultTooltip = ({ data: cellData, x, y }) => {
        if (!cellData) return null;
        return (
            <div
                className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl text-sm pointer-events-none transition-opacity duration-100"
                style={{
                    // Use fixed positioning based on mouse coordinates relative to the viewport
                    left: x + 15, // Offset 15px to the right of the pointer
                    top: y + 15, // Offset 15px below the pointer
                }}
            >
                <div className="font-medium">{cellData.productName} on {cellData.dayName}</div>
                <div>Stock: **{cellData.stock}** units</div>
                <div className="text-xs text-gray-400">Color Intensity: {cellData.value}</div>
            </div>
        );
    };

    // Handler to track the cell entered and set initial mouse position
    const handleCellMouseEnter = (cellData, event) => {
        if (showTooltip) {
            setHoveredCell({ 
                data: cellData, 
                x: event.clientX, 
                y: event.clientY 
            });
        }
    };

    // Handler to update the tooltip position while the mouse is moving over the cell
    const handleCellMouseMove = (event) => {
        if (hoveredCell && showTooltip) {
            // Only update coordinates, keep the data the same
            setHoveredCell(prev => ({ 
                ...prev, 
                x: event.clientX, 
                y: event.clientY 
            }));
        }
    };

    const handleCellMouseLeave = () => { setHoveredCell(null); };

    // --- Chart Rendering Logic (Grid Type) ---

    const renderGridHeatmap = () => {
        const rowLabels = yAxisLabels;
        const colLabels = xAxisLabels;

        const yAxisWidth = 100;
        const cellStyle = { width: cellSize, height: cellSize, margin: 0, borderRadius: '6px' };
        const gapStyle = { gap: cellGap };

        return (
            <div className="flex flex-col" style={gapStyle}>

                {/* --- Row Labels (Y-axis: Products) and Cells --- */}
                <div className="flex flex-col" style={gapStyle}>
                    {/* Placeholder for X-axis spacing to align cells with the day names below */}
                    <div style={{ width: yAxisWidth }}></div> 
                    
                    {rowLabels.map((rowLabel, rowIndex) => (
                        <div key={rowIndex} className="flex items-center" style={gapStyle}>
                            {/* Row Label (Y-axis) */}
                            <div className="text-sm text-gray-800 font-medium text-right pr-4" style={{ width: yAxisWidth }}>
                                {rowLabel}
                            </div>
                            {/* Cells */}
                            <div className="flex" style={gapStyle}>
                                {colLabels.map((_, colIndex) => {
                                    const cellData = data.find(d => d.product === rowIndex && d.day === colIndex);

                                    return (
                                        <div
                                            key={colIndex}
                                            className="cursor-pointer hover:shadow-md transition-shadow"
                                            style={{
                                                ...cellStyle,
                                                backgroundColor: cellData ? getColor(cellData[valueKey]) : colors[0]
                                            }}
                                            onMouseEnter={(e) => cellData && handleCellMouseEnter(cellData, e)}
                                            onMouseMove={handleCellMouseMove}
                                            onMouseLeave={handleCellMouseLeave}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- Column labels (X-axis: Days) - MOVED TO THE BOTTOM --- */}
                <div className="flex" style={{ marginLeft: yAxisWidth, ...gapStyle, marginTop: cellGap }}>
                    {colLabels.map((label, index) => (
                        <div key={index} className="text-sm font-medium text-gray-700 text-center" style={{ width: cellSize, height: 'auto' }}>
                            {label}
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 w-full mx-auto relative">
            {/* Status Message (Copy/Delete confirmation) */}
            {message && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-4 px-3 py-1 bg-gray-800 text-white text-xs rounded shadow-lg z-20">
                    {message}
                </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                    {/* Subtitle and Legend */}
                    <div className="text-sm text-gray-600 flex items-center mt-1">
                        {subtitle}
                        <div className="ml-4 flex items-center space-x-3 text-xs font-medium">
                            <span className="flex items-center"><div className="w-2.5 h-2.5 rounded-sm mr-1" style={{ backgroundColor: colors[1] }}></div>0-499</span>
                            <span className="flex items-center"><div className="w-2.5 h-2.5 rounded-sm mr-1" style={{ backgroundColor: colors[2] }}></div>500-999</span>
                            <span className="flex items-center"><div className="w-2.5 h-2.5 rounded-sm mr-1" style={{ backgroundColor: colors[3] }}></div>1000-2000</span>
                        </div>
                    </div>
                </div>

                {/* Action Icons */}
                <div className="flex gap-2 text-gray-400">
                    {/* Copy Button (CSV) */}
                    <button onClick={handleCopyData} title="Copy Data (CSV)" className="p-1 hover:text-gray-600 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                    {/* Delete Button */}
                    <button onClick={handleDeleteChart} title="Delete Chart" className="p-1 hover:text-red-500 rounded-lg transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Heatmap Grid (The main chart area) */}
            <div className="relative overflow-x-auto">
                {/* Only render the grid if data exists */}
                {data && data.length > 0 ? renderGridHeatmap() : (
                    <div className="text-center py-10 text-gray-500">
                        Chart data is unavailable or has been deleted.
                    </div>
                )}
            </div>

            {/* Tooltip (Renders outside the flow, fixed position) */}
            {hoveredCell && showTooltip && <DefaultTooltip {...hoveredCell} />}
        </div>
    );
};

export default HeatmapComponent;