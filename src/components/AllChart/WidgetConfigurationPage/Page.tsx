import React, { useState } from 'react';
import { X, User } from 'lucide-react';

const WidgetConfigModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [widgetTitle, setWidgetTitle] = useState('Heat Map');
  const [filterBy, setFilterBy] = useState('On time, Late');
  
  // Data fields
  const [dataFields] = useState([
    'First field', 'Second field', 'Third field', 'Fourth field', 
    'Fifth field', 'Sixth field', 'Seventh field'
  ]);
  
  // Legend data
  const [legends, setLegends] = useState([
    { name: 'On time', color: '#7F5609' },
    { name: 'Absent', color: '#7F5609' },
    { name: 'Late', color: '#7F5609' }
  ]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = () => {
    const configData = {
      widgetTitle,
      dataFields,
      filterBy,
      showLegend,
      legends: showLegend ? legends : []
    };
    console.log('Configuration saved:', configData);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const updateLegend = (index, field, value) => {
    const updatedLegends = [...legends];
    updatedLegends[index][field] = value;
    setLegends(updatedLegends);
  };

  if (!isOpen) return null;

  return (
    <div className="  relative right-0 top-0 inset-0     flex  p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-[300px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Widget Configuration</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Column Chart Widget Details */}
          <div>
            <h3 className="text-blue-600 font-medium mb-3">Column Chart Widget Details</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Widget Title *
              </label>
              <input
                type="text"
                value={widgetTitle}
                onChange={(e) => setWidgetTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Heat Map"
              />
            </div>
          </div>

          {/* Data Mapping for X-Axis */}
          <div>
            <h3 className="text-blue-600 font-medium mb-3">Data Mapping for X-Axis</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Data set:
                </label>
                <input
                  type="text"
                  value="07"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Input all field Data:
                </label>
                {dataFields.map((field, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 mb-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {field}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter By:
                </label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="On time, Late">On time, Late</option>
                  <option value="Present, Absent">Present, Absent</option>
                  <option value="Complete, Incomplete">Complete, Incomplete</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Mapping for Y-Axis */}
          <div>
            <h3 className="text-blue-600 font-medium mb-3">Data Mapping for Y-Axis</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Data set:
                </label>
                <input
                  type="text"
                  value="07"
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  1st field Data:
                </label>
                <input
                  type="number"
                  defaultValue="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last field Data:
                </label>
                <input
                  type="number"
                  defaultValue="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div>
            <h3 className="text-blue-600 font-medium mb-3">Display Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showLegend"
                  checked={showLegend}
                  onChange={(e) => setShowLegend(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="showLegend" className="ml-2 text-sm font-medium text-gray-700">
                  Show Legend
                </label>
              </div>

              {showLegend && (
                <div className="space-y-3 pl-6">
                  {legends.map((legend, index) => (
                    <div key={index} className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} Legend Name:
                        </label>
                        <input
                          type="text"
                          value={legend.name}
                          onChange={(e) => updateLegend(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : 'rd'} Legend Color:
                        </label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="color"
                            value={legend.color}
                            onChange={(e) => updateLegend(index, 'color', e.target.value)}
                            className="h-10 w-16 border border-gray-300 rounded cursor-pointer"
                          />
                          <input
                            type="text"
                            value={legend.color}
                            onChange={(e) => updateLegend(index, 'color', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Assigned by */}
          <div>
            <h3 className="text-gray-700 font-medium mb-3">Assigned by</h3>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Kathryn Murphy</div>
                <div className="text-sm text-gray-500">Admin</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between space-x-3 pt-4">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetConfigModal;
























 