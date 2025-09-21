 












import React, { useState } from "react";
 import { RiDeleteBin6Line } from 'react-icons/ri'; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

 import { unparse } from 'papaparse'; 

 
 const COLORS = {
  OnTime: "#6F78F9", 
  Late: "#46B8D6",   
  Absent: "#13A490", 
   Gap: "transparent", 
};

 const rawData = [
  { name: "Sunday", OnTime: 58, Late: 24, Absent: 18 },
  { name: "Monday", OnTime: 72, Late: 13, Absent: 15 },
  { name: "Tues day", OnTime: 40, Late: 30, Absent: 30 },
  { name: "Wednesday", OnTime: 22, Late: 58, Absent: 20 },
  { name: "Thursday", OnTime: 60, Late: 20, Absent: 20 },
  { name: "Friday", OnTime: 40, Late: 35, Absent: 25 },
  { name: "Saturday", OnTime: 65, Late: 20, Absent: 15 },
];

 const addGapsToData = (data: typeof rawData) => {
     return data.map(item => ({
        name: item.name,
         Absent: item.Absent,
        Gap2: 2, 
         Late: item.Late,
        Gap1: 2, 
        // Top segment
        OnTime: item.OnTime,
    }));
};


 
 const CustomLegend = ({ payload }: { payload?: any[] }) => (
  <div className="flex justify-start items-center space-x-4 text-xs pt-2 pb-1 text-gray-700">
    {payload?.map((entry, index) => {
       if (entry.dataKey.includes("Gap")) return null; 
      return (
        <div key={`legend-${index}`} className="flex items-center space-x-1">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span>{entry.value}</span>
        </div>
      );
    })}
  </div>
);

 export const StackedChart: React.FC = ({ChartType}) => {
  console.log(ChartType);
  const [chartData, setChartData] = useState(addGapsToData(rawData));
  const [isCopied, setIsCopied] = useState(false);
  const totalEmployees = 576;
 
  const handleCopy = () => {
     const csvString = unparse(rawData, {
      quotes: false,
      delimiter: ",",
      header: true,
    });
    navigator.clipboard.writeText(csvString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDelete = () => {
     setChartData([]); 
  };

  const handleReset = () => {
     setChartData(addGapsToData(rawData));
  };
  
   const radiusSize = 6; 


  return (
    <div className="p-6 mx-auto mt-8 bg-white rounded-xl shadow w-full  relative border border-gray-200">
       {isCopied && (
        <div className="absolute top-2 right-24 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
          Data Copied as CSV!
        </div>
      )}

       <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Stacked Bar Chart
          </h3>
          <CustomLegend
            payload={[
               { dataKey: "OnTime", value: "On time", color: COLORS.OnTime },
              { dataKey: "Absent", value: "Absent", color: COLORS.Absent },
              { dataKey: "Late", value: "Late", color: COLORS.Late },
            ]}
          />
        </div>

        <div className="flex flex-col items-end">
          <div className="flex space-x-3 text-gray-500">
             <svg
              onClick={handleCopy}
              className="w-5 h-5 cursor-pointer hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>

             <RiDeleteBin6Line
              className="w-5 h-5 cursor-pointer hover:text-red-500"  
              onClick={handleDelete}
            />
          </div>

          <span className="text-sm text-gray-500 mt-1">
            Total {totalEmployees} employee
          </span>
        </div>
      </div>

       {chartData.length === 0 && (
        <div className="text-center mb-4">
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Reset Data
          </button>
        </div>
      )}

      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}  
            stackOffset="expand"
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis
              tickFormatter={(tick) => `${Math.round(tick * 100)}%`}
              axisLine={false}
              tickLine={false}
              domain={[0, 1]}
              className="text-xs"
            />
            <Tooltip
              formatter={(value: number, name: string) => {
                if (name.includes("Gap")) return null;
                return [`${Math.round(value * 100)}%`, name];
              }}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "14px",
                borderColor: "#CBD5E0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              cursor={{ fill: "rgba(237, 242, 247, 0.7)" }}
            />

         
           
             <Bar
              dataKey="OnTime"
              stackId="a"
              fill={COLORS.OnTime}
              name="On time"
              barSize={25}
              radius={radiusSize} 
            />
            {/* 2. Gap 2 (Transparent Gap) */}
            <Bar
              dataKey="Gap2"
              stackId="a"
              fill={COLORS.Gap}
              barSize={25}
            />
            
            {/* 3. Late (MIDDLE Segment) */}
            <Bar
              dataKey="Late"
              stackId="a"
              fill={COLORS.Late}
              name="Late"
              barSize={25}
              radius={radiusSize}
            />
            
            {/* 4. Gap 1 (Transparent Gap) */}
            <Bar
              dataKey="Gap1"
              stackId="a"
              fill={COLORS.Gap}
              barSize={25}
            />
            
            {/* 5. OnTime (TOP Segment) */}
            <Bar
              dataKey="Absent"
              stackId="a"
              fill={COLORS.Absent}
              name="Absent"
              barSize={25}
              radius={radiusSize} 
            />
            
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};