import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WIDGET_CATALOG } from './widgetTypes';
 import uniqueId from 'lodash/uniqueId'; // Utility to generate unique IDs
import WidgetLibrary from './WidgetLibrary';
import DashboardCanvas from './DashboardCanvas';
import WidgetConfigurationPanel from './WidgetConfigurationPanel';

// --- State Management for the Dashboard ---
const useDashboardState = () => {
  const [widgets, setWidgets] = useState([]); // List of widgets on the canvas
  const [selectedWidgetId, setSelectedWidgetId] = useState(null); // ID of the widget being configured

  const addWidget = useCallback((typeId) => {
    const catalogItem = WIDGET_CATALOG.find(w => w.id === typeId);
    if (!catalogItem) return;

    const newWidget = {
      id: uniqueId('widget-'),
      typeId: typeId,
      title: catalogItem.name, // Initial Title
      config: { ...catalogItem.defaultConfig }, // Deep copy of defaults
      data: { /* Placeholder for actual widget data */ } 
    };
    
    setWidgets(prev => [...prev, newWidget]);
    setSelectedWidgetId(newWidget.id); // Select the new widget immediately
  }, []);

  const updateWidgetConfig = useCallback((widgetId, newConfig) => {
    setWidgets(prev => 
      prev.map(w => 
        w.id === widgetId ? { ...w, config: newConfig } : w
      )
    );
  }, []);

  const selectedWidget = widgets.find(w => w.id === selectedWidgetId);
  
  return {
    widgets,
    addWidget,
    selectedWidget,
    setSelectedWidgetId,
    updateWidgetConfig,
  };
};


// --- Main Layout Component ---
const Dashboard = () => {
  const { 
    widgets, 
    addWidget, 
    selectedWidget, 
    setSelectedWidgetId, 
    updateWidgetConfig 
  } = useDashboardState();

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="dashboard-layout" style={styles.layout}>
        
        {/* LEFT SIDEBAR: WIDGET LIBRARY */}
        <div style={styles.sidebarLeft}>
          <WidgetLibrary />
        </div>

        {/* CENTER: DASHBOARD CANVAS (DROP ZONE) */}
        <div style={styles.canvas}>
          <DashboardCanvas
            widgets={widgets} 
            onWidgetClick={setSelectedWidgetId} 
            onDropWidget={addWidget} // Passes the function to handle the drop
            selectedWidgetId={selectedWidgetId}
          />
        </div>

        {/* RIGHT SIDEBAR: CONFIGURATION PANEL */}
        {selectedWidget && (
          <div style={styles.sidebarRight}>
            <WidgetConfigurationPanel
              widget={selectedWidget}
              onUpdateConfig={updateWidgetConfig}
              onClose={() => setSelectedWidgetId(null)}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

// Simple inline styles for layout demonstration
const styles = {
    layout: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f4f7f9'
    },
    sidebarLeft: {
        width: '200px',
        backgroundColor: '#fff',
        padding: '15px',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    },
    canvas: {
        flexGrow: 1,
        padding: '20px',
        overflowY: 'auto',
        display: 'grid', // Use grid for dashboard layout
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
    },
    sidebarRight: {
        width: '350px',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
        overflowY: 'auto'
    }
};

export default Dashboard;