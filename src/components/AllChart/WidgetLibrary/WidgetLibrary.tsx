 

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
// Assuming these imports are correct and available:
import { StackedChart } from '../StackedChart/StackedChart';
import AreaChartComponent from '../AreaChart/AreaChart';
import PieChartComponent from '../PieChart/PieChart';
 import MultiAxisLineChart from '../MaltiLineChart/MailtilineChart';

export interface WidgetRendererProps {
    // The widget object containing ID, type, position, etc.
    widget: Widget; 

    // Function to call when the remove button is clicked (takes no arguments)
    onRemove: () => void;
}

// --- FIXED WIDGET RENDERER COMPONENT ---
const WidgetRenderer = ({ widget, onRemove }) => {

    const renderChart = () => {
        // Use the base widget ID to determine which component to render
        const type = widget.id.split('-')[0];

        switch (type) {
            case 'area':
                // FIX: Render AreaChartComponent for 'area' widget
                return (
                    <div className="h-64 w-full">
                        <AreaChartComponent />
                    </div>
                );

            case 'stackedBar':
                // FIX: Render StackedChart for 'stackedBar' widget
                return (
                    <div className="h-64 w-full">
                        <StackedChart />
                    </div>
                );

            case 'pie':
                // FIX: Render PieChartComponent for 'pie' widget
                return (
                    <div className="h-64 w-full">
                        <PieChartComponent />
                    </div>
                );

            case 'kpi':
                // FIX: Render MultiAxisLineChart (as you had it) for 'kpi'
                return (
                    <div className="h-64 w-full">
                        <MultiAxisLineChart />
                    </div>
                );

            case 'line':
            // Added support for 'line' widget as it exists in your widgets array
            case 'dataTable':
            case 'progressRing':
            case 'gantt':
            case 'media':
            default:
                // Default fallback chart, or just a placeholder for unhandled types
                return (
                    <div className="h-48 flex items-center justify-center text-gray-500">
                        <p>Widget: {widget.name} ({type}) - Component not found or default.</p>
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm relative" style={{ minHeight: '100px' }}>
            <button
                onClick={onRemove}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors z-10"
                title="Remove Widget"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            {renderChart()}
        </div>
    );
};


// --- DASHBOARD BUILDER COMPONENT (Mostly Unchanged, just cleaned up imports) ---
const DashboardBuilder = ({ chartType, widgetTitle }) => {

    const [canvasWidgets, setCanvasWidgets] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
    const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
    const [config, setConfig] = useState<any>({
    chartType: "",
    widgetTitle: "",
  });
    const programs = [
        "Dashboard Analytics",
        "Sales Tracking",
        "Marketing Insights",
        "Financial Reports",
        "User Analytics"
    ];

    const projects = [
        "Q4 Revenue Dashboard",
        "Marketing Campaign ROI",
        "Customer Analytics Portal",
        "Sales Performance Tracker",
        "Financial Overview Board"
    ];

    const widgets = [
        {
            id: 'kpi',
            name: 'KPI widget',
            description: 'Display key metrics with trends',
            icon: '📊',
            category: 'metrics'
        },
        {
            id: 'stackedBar',
            name: 'Stacked Bar Chart',
            description: 'Compare data across categories',
            icon: '📊',
            category: 'charts'
        },
        {
            id: 'line',
            name: 'Line Chart',
            description: 'Track changes over time',
            icon: '📈',
            category: 'charts'
        },
        {
            id: 'pie',
            name: 'Pie Chart',
            description: 'Show proportions of a whole',
            icon: '🥧',
            category: 'charts'
        },
        {
            id: 'area',
            name: 'Area Chart',
            description: 'Track trends with filled areas',
            icon: '📈',
            category: 'charts'
        },
        {
            id: 'dataTable',
            name: 'Data Table',
            description: 'Display detailed data records',
            icon: '📋',
            category: 'data'
        },
        {
            id: 'progressRing',
            name: 'Progress Ring',
            description: 'Show completion percentage',
            icon: '⭕',
            category: 'indicators'
        },
        {
            id: 'gantt',
            name: 'Gantt Chart',
            description: 'Visualize project timelines',
            icon: '📅',
            category: 'planning'
        },
        {
            id: 'media',
            name: 'Picture/Video',
            description: 'Add images or videos',
            icon: '🖼️',
            category: 'media'
        }
    ];

    // Create the dashboard layout from the image
    const dashboardStats = [
        { title: 'Total Project', value: '56', change: '+5% ↗', color: 'from-blue-500 to-purple-600', subtitle: '6 program Running this month' },
        { title: 'Live Project', value: '36', change: '+3% ↗', color: 'from-pink-500 to-purple-600', subtitle: '190 New user joined' },
        { title: 'Project In draft', value: '15', change: '+1% ↗', color: 'from-blue-400 to-blue-600', subtitle: '5 new clients joined' },
        { title: 'Pending Review', value: '75', change: '+8% ↗', color: 'from-green-500 to-teal-500', subtitle: '28 Score growth' }
    ];

    const handleProgramSelect = (program) => {
        setSelectedProgram(program);
        setProgramDropdownOpen(false);
    };

    const handleProjectSelect = (project) => {
        setSelectedProject(project);
        setProjectDropdownOpen(false);
    };

    const handleWidgetDragStart = (e, widget) => {
        e.dataTransfer.setData('application/json', JSON.stringify(widget));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const widgetData = JSON.parse(e.dataTransfer.getData('application/json'));
        const rect = e.currentTarget.getBoundingClientRect();

        // Calculate drop position relative to the drop area
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newWidget = {
            ...widgetData,
            id: `${widgetData.id}-${Date.now()}`,
            // Adjusted position logic to place the top-left of the widget at the drop point
            x: x,
            y: y
        };

        setCanvasWidgets(prev => [...prev, newWidget]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const removeWidget = (widgetId) => {
        setCanvasWidgets(prev => prev.filter(w => w.id !== widgetId));
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Widget Library Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
                {/* Program Name Selector */}
                <div className="p-4 border-b border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Program Name *
                    </label>
                    <div className="relative">
                        <button
                            className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
                            onClick={() => setProgramDropdownOpen(!programDropdownOpen)}
                        >
                            <span className="text-gray-500">
                                {selectedProgram || "Add program or select"}
                            </span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${programDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {programDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
                                {programs.map((program, index) => (
                                    <button
                                        key={index}
                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                                        onClick={() => handleProgramSelect(program)}
                                    >
                                        {program}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Project Name Selector */}
                <div className="p-4 border-b border-gray-100">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Name *
                    </label>
                    <div className="relative">
                        <button
                            className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
                            onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
                        >
                            <span className="text-gray-500">
                                {selectedProject || "Add Project or select"}
                            </span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform ${projectDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {projectDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
                                {projects.map((project, index) => (
                                    <button
                                        key={index}
                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                                        onClick={() => handleProjectSelect(project)}
                                    >
                                        {project}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Widget Library */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Widget Library</h3>
                        <p className="text-sm text-gray-500 mb-4">Drag widgets to the canvas</p>

                        <div className="space-y-3">
                            {widgets.map((widget) => (
                                <div
                                    key={widget.id}
                                    draggable
                                    onDragStart={(e) => handleWidgetDragStart(e, widget)}
                                    className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-grab hover:bg-gray-50 hover:border-gray-300 transition-colors active:cursor-grabbing"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                                        <span className="text-lg">{widget.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                                            {widget.name}
                                        </h4>
                                        <p className="text-xs text-gray-500 line-clamp-2">
                                            {widget.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Instructions */}
                        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800 mb-2">
                                Drag and drop widgets to add them to your dashboard. Click on a placed widget to configure it.
                            </p>
                            <div className="flex items-center gap-4 text-xs text-blue-600">
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>Draft</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>Published</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                    <span>Needs Data</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Dashboard Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Dashboard Stats */}
                <div className="p-6 bg-white">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        {dashboardStats.map((stat, index) => (
                            <div key={index} className={`bg-gradient-to-r ${stat.color} text-white p-4 rounded-lg`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm opacity-90">{stat.title}</span>
                                    <span className="text-xs bg-white/20 px-2 py-1 rounded">{stat.change}</span>
                                </div>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="text-xs opacity-75 mt-1">{stat.subtitle}</div>
                                <div className="text-xs opacity-60 mt-1">
                                    {index < 2 ? 'View all →' : 'View all →'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 p-6   overflow-auto">
                    <div
                        className="min-h-full    rounded-lg -left-40  relative"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        style={{ minHeight: '600px' }}
                    >
                        {/* Default Area Chart */}
                        <div className="">

                            {/* <StackedChart></StackedChart>   */}
                                    {/* <ChartShowDynamic chartType={config.chartType} widgetTitle={config.widgetTitle} /> */}

                        </div>

                        {/* Dropped widgets */}
                        {canvasWidgets.map((widget) => (
                            <div
                                key={widget.id}
                                className="absolute p-2  -left-7" // Added padding here for better spacing
                                style={{
                                    left: widget.x,
                                    top: widget.y, // Removed the unnecessary + 350 offset
                                    width: '90%', // Standard width for dragged widgets
                                    zIndex: 10
                                }}
                            >
                                <WidgetRenderer
                                    widget={widget}
                                    onRemove={() => removeWidget(widget.id)}
                                />
                            </div>
                        ))}

                        {/* Drop zone indicator */}
                        {/* {canvasWidgets.length === 0 && (
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-400">
                                <div className="text-sm">Drag and drop widgets here to build your dashboard.</div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardBuilder;





 
