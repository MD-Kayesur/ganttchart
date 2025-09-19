// components/WidgetConfiguration.tsx

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import FieldDataInput from './FieldDataInput'; // 👈 Import the new component

export default function WidgetConfiguration() {
  const [widgetTitle, setWidgetTitle] = useState('Campaign Performance');
  const [numberOfDataSets, setNumberOfDataSets] = useState('07');
  const [showFilter, setShowFilter] = useState(true);
  const [filterBy, setFilterBy] = useState('On time,Late');
  const [yAxisDataSets, setYAxisDataSets] = useState('07');
  const [firstFieldData, setFirstFieldData] = useState('0');
  const [lastFieldData, setLastFieldData] = useState('0');
//   const [showLegend, setShowLegend] = useState(true);
//   const [legend1Name, setLegend1Name] = useState('On time');
//   const [legend1Color, setLegend1Color] = useState('#7F56D9');
//   const [legend2Name, setLegend2Name] = useState('Absent');
//   const [legend2Color, setLegend2Color] = useState('#7F56D9');
//   const [legend3Name, setLegend3Name] = useState('Late');
//   const [legend3Color, setLegend3Color] = useState('#7F56D9');

  const fieldOptions = ['First field', 'Second field', 'Third field', 'Fourth field', 'Sixth field', 'Seventh field'];

  // Handle CSV data from child
  const handleImportedCSV = (csvData: any[]) => {
    console.log("Received CSV data in parent:", csvData);

    // Optionally update firstFieldData, lastFieldData, etc.
    if (csvData.length > 0) {
      setFirstFieldData(csvData[0]?.[fieldOptions[1]] || '0');
      setLastFieldData(csvData[csvData.length - 1]?.[fieldOptions[1]] || '0');
    }
  };

  return (
    <div className="inset-0 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl overflow-y-auto max-h-screen w-full max-w-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Widget Configuration</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* Widget Title */}
          <div>
            <h3 className="text-blue-600 font-medium mb-4">Stacked BarChart Widget Details</h3>
            <input
              type="text"
              value={widgetTitle}
              onChange={(e) => setWidgetTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Data Mapping for X-Axis */}
          <div>
            <h3 className="text-blue-600 font-medium mb-4">Data Mapping for X-Axis</h3>

            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium text-gray-700 w-32">Number of Data set:</label>
              <input
                type="text"
                value={numberOfDataSets}
                onChange={(e) => setNumberOfDataSets(e.target.value)}
                className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
              />
            </div>

            {/* 📦 FieldDataInput Component */}
            <FieldDataInput
              fieldOptions={fieldOptions}
              onDataImported={handleImportedCSV}
            />

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-700">Show Filter</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showFilter}
                  onChange={(e) => setShowFilter(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-11 h-6 rounded-full transition-colors ${showFilter ? 'bg-blue-600' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${showFilter ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
                </div>
              </label>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <label className="text-sm font-medium text-gray-700 w-20">Filter By:</label>
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="On time,Late">On time, Late</option>
              </select>
            </div>
          </div>

          {/* Y Axis Configuration */}
          <div>
            <h3 className="text-blue-600 font-medium mb-4">Data Mapping for Y-Axis</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium text-gray-700">Number of Data set:</label>
                <input
                  type="text"
                  value={yAxisDataSets}
                  onChange={(e) => setYAxisDataSets(e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium text-gray-700">1st field Data:</label>
                <input
                  type="text"
                  value={firstFieldData}
                  onChange={(e) => setFirstFieldData(e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="w-32 text-sm font-medium text-gray-700">Last field Data:</label>
                <input
                  type="text"
                  value={lastFieldData}
                  onChange={(e) => setLastFieldData(e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
                />
              </div>
            </div>
          </div>

          {/* (Keep rest same — legend, assigned by, footer, etc.) */}

        </div>
      </div>
    </div>
  );
}
