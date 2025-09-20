import React, { useState } from 'react';
import { X } from 'lucide-react';
import FieldDataInput from './FieldDataInput';  

export default function WidgetConfiguration({ChangeChart}) {



 const chartOptions = [
    { value: "Stacked Bar Chart", label: "Stacked Bar Chart" },
     { value: "Radar Chart", label: "Radar Chart" },
    { value: "Line Chart", label: "Line Chart" },
    { value: "Pie Chart", label: "Pie Chart" },
    { value: "Area Chart", label: "Area Chart" },
   ];


const [chartType, setChartType] = useState('[Stacked Bar Chart]'); 
  const [widgetTitle, setWidgetTitle] = useState('Campaign Performance');  
    const [numberOfDataSets, setNumberOfDataSets] = useState(3);
  const [xAxisSelectedField, setXAxisSelectedField] = useState('First field');
   const [xAxisFieldData, setXAxisFieldData] = useState<string[]>(Array(numberOfDataSets).fill(''));

   const [yAxisDataSets, setYAxisDataSets] = useState(3);
   const [yAxisFieldData, setYAxisFieldData] = useState<string[]>(Array(yAxisDataSets).fill(''));

   const fieldOptions = ['First field', 'Second field', 'Third field', 'Fourth field','Fifth field', 'Sixth field', 'Seventh field'];

   const handleXAxisCountChange = (val: string) => {
     const num = parseInt(val) || 0;
    setNumberOfDataSets(num);

     if (num > 0 && num < 7) {
      setXAxisFieldData((prev) => {
        const newArr = [...prev];
        if (num > newArr.length) {
           return [...newArr, ...Array(num - newArr.length).fill('')];
        }
         return newArr.slice(0, num);
      });
    }
  };

  const handleYAxisCountChange = (val: string) => {
    const num = parseInt(val) || 0;
    setYAxisDataSets(num);

     if (num > 0) {
      setYAxisFieldData((prev) => {
        const newArr = [...prev];
        if (num > newArr.length) {
           return [...newArr, ...Array(num - newArr.length).fill('')];
        }
         return newArr.slice(0, num);
      });
    }
  };


   
    const HandleChangeChart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    
    ChangeChart={selectedType}
     setChartType(selectedType);
 console.log(selectedType);
   }
  return (
     <div className="inset-0 bg-opacity-50 w flex items-center justify-center p-4">
       <div className="bg-white rounded-lg shadow-xl overflow-y-auto max-h-screen w-full max-w-2xl">

         <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Widget Configuration</h2>
           <button className="text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

         <div className="p-6 space-y-6">

      <div>
            <h3 className="text-blue-600 font-medium mb-4">
                {chartType ? `${chartType} Widget Details` : "Select a Chart Widget"}
            </h3>

            <select
                value={chartType}  
                onChange={HandleChangeChart}  
                
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            >
                <option value="">Select Chart Type</option>
                {chartOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
        
         <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Widget Title *</label>
            <input
                type="text"
                value={widgetTitle}
                onChange={(e) => setWidgetTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Campaign Performance"
            />
        </div>
        
 
    

           <div>
            <h3 className="text-blue-600 font-medium mb-4">Data Mapping for X-Axis</h3>
            
             <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium text-gray-700 w-32">Number of Data set:</label>
              <input
                type="text"
                value={numberOfDataSets}
                onChange={(e) => handleXAxisCountChange(e.target.value)}
                className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
              />
            </div>
            
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Field:</label>
              <select
                value={xAxisSelectedField}
                onChange={(e) => setXAxisSelectedField(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {fieldOptions.map((field) => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>
            
             <div className="mt-2">
              <FieldDataInput
                count={numberOfDataSets}
                selectedField={xAxisSelectedField}
                values={xAxisFieldData}
                onChange={setXAxisFieldData}
              />
            </div>
          </div>

           <div>
            <h3 className="text-blue-600 font-medium mb-4">Data Mapping for Y-Axis</h3>
            
             <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium text-gray-700 w-32">Number of Data set:</label>
              <input
                type="text"
                value={yAxisDataSets}
                onChange={(e) => handleYAxisCountChange(e.target.value)}
                className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
              />
            </div>
            
             <div className="mt-2">
              <FieldDataInput
                count={yAxisDataSets}
                 selectedField="Y Axis Field" 
                values={yAxisFieldData}
                onChange={setYAxisFieldData}
              />
            </div>
          </div>

        </div>
       </div>
    </div>
  );
}











