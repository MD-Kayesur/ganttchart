import React from 'react';
import { WIDGET_CATALOG } from '../widgetTypes';

// Dynamic Component Mapping for Configuration Fields
const ConfigFieldsMap = {
  // Use a different component for the configuration fields of each chart type
  kpi: ({ config, onUpdate }) => (
    <div>
      <label>Value Key:</label>
      <input value={config.valueKey} onChange={e => onUpdate({ ...config, valueKey: e.target.value })} />
      <label>Color:</label>
      <input type="color" value={config.color} onChange={e => onUpdate({ ...config, color: e.target.value })} />
    </div>
  ),
  column: ({ config, onUpdate }) => (
    <div>
      <label>X-Axis Label:</label>
      <input value={config.xAxis} onChange={e => onUpdate({ ...config, xAxis: e.target.value })} />
      <label>Series Name:</label>
      <input value={config.seriesName} onChange={e => onUpdate({ ...config, seriesName: e.target.value })} />
    </div>
  ),
  area: ({ config, onUpdate }) => (
    <div>
      <label>Area Color:</label>
      <input type="color" value={config.areaColor} onChange={e => onUpdate({ ...config, areaColor: e.target.value })} />
      <label>Show Legend:</label>
      <input type="checkbox" checked={config.showLegend} onChange={e => onUpdate({ ...config, showLegend: e.target.checked })} />
    </div>
  ),
  // Add more configuration field components as needed
};


const WidgetConfigurationPanel = ({ widget, onUpdateConfig, onClose }) => {
  const catalogItem = WIDGET_CATALOG.find(w => w.id === widget.typeId);
  const ConfigComponent = ConfigFieldsMap[widget.typeId];

  // Function to pass updated config back to the parent state
  const handleConfigChange = (newConfig) => {
    onUpdateConfig(widget.id, newConfig);
  };

  if (!ConfigComponent) {
    return <div>No configuration available for this widget type.</div>;
  }

  return (
    <div>
      <button onClick={onClose} style={{ float: 'right' }}>X</button>
      
      {/* DYNAMIC TITLE */}
      <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
        {catalogItem.name} Widget Details
      </h3>

      {/* STATIC WIDGET CONFIGURATION HEADER */}
      <h4>Widget Configuration</h4>
      
      {/* DYNAMIC CONFIGURATION FIELDS */}
      <ConfigComponent 
        config={widget.config} 
        onUpdate={handleConfigChange} 
      />

      {/* You can add more general configuration fields here, like Title, Data Source, etc. */}
      <h4>General Settings</h4>
      <label>Widget Title:</label>
      <input 
        value={widget.title} 
        onChange={e => onUpdateConfig(widget.id, { ...widget.config, title: e.target.value })} // Update title as part of config
      />

    </div>
  );
};

export default WidgetConfigurationPanel;