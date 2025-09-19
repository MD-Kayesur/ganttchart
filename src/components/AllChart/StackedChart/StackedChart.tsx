 



// // components/StackedChart.tsx
// import React, { useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";

// // papaparse যদি ইনস্টল করা থাকে তবে এটি ব্যবহার করা যাবে
// import { unparse } from 'papaparse'; 

// // ডেটা এবং রং
// const COLORS = {
//   OnTime: "#6F78F9", 
//   Late: "#35B6EE",   
//   Absent: "#13A490", 
// };

// // ডেটা সেট (এখানে 7টি ডেটা আছে, কিন্তু সংখ্যা পরিবর্তন হলে কোডটি কাজ করবে)
// const employeeAttendanceData = [
//   { name: "Sunday", OnTime: 58, Late: 24, Absent: 18 },
//   { name: "Monday", OnTime: 72, Late: 13, Absent: 15 },
//   { name: "Tues day", OnTime: 40, Late: 30, Absent: 30 },
//   { name: "Wednesday", OnTime: 22, Late: 58, Absent: 20 },
//   { name: "Thursday", OnTime: 60, Late: 20, Absent: 20 },
//   { name: "Friday", OnTime: 40, Late: 35, Absent: 25 },
//   { name: "Saturday", OnTime: 65, Late: 20, Absent: 15 },
//   // যদি এখানে আরো 71টি ডেটা থাকে, তবে মোট 78টিই কপি হবে।
// ];

// // কাস্টম লেজেন্ড কম্পোনেন্ট (আগের মতোই)
// const CustomLegend = ({ payload }: { payload?: any[] }) => (
//   <div className="flex justify-start items-center space-x-4 text-xs pt-2 pb-1 text-gray-700">
//     {payload?.map((entry, index) => (
//       <div key={`legend-${index}`} className="flex  items-center space-x-1">
//         <span
//           className="w-2.5  h-2.5 rounded-full"
//           style={{ backgroundColor: entry.color }}
//         ></span>
//         <span className="">{entry.value}</span>
//       </div>
//     ))}
//   </div>
// );

// export const StackedChart: React.FC = () => {
//   const [isCopied, setIsCopied] = useState(false);
//   const [isVisible, setIsVisible] = useState(true);
//   const totalEmployees = 576; 

//   // --- CSV কপি ফাংশনালিটি ---
//   const handleCopy = () => {
//     // employeeAttendanceData-তে যতগুলো অবজেক্ট আছে, unparse ঠিক ততগুলোকেই CSV তে রূপান্তর করবে।
//     const csvString = unparse(employeeAttendanceData, {
//         quotes: false,     
//         delimiter: ",",    
//         header: true,      
//     });

//     // ক্লিপবোর্ডে সম্পূর্ণ CSV ডেটা কপি করা
//     navigator.clipboard.writeText(csvString);
//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000);
//   };
//   // -------------------------

//   const handleDelete = () => {
//     setIsVisible(false);
//   };

//   if (!isVisible) {
//     return (
//       <div className="p-6 mx-auto mt-8 bg-white rounded-xl shadow max-w-lg text-center text-gray-600 border border-gray-200">
//         ❌ Chart Deleted
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 mx-auto mt-8 bg-white rounded-xl shadow max-w-lg relative border border-gray-200">
      
//       {/* Toast */}
//       {isCopied && (
//         <div className="absolute top-2 right-24 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
//           Data Copied as CSV!
//         </div>
//       )}

//       {/* Header */}
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h3 className="text-xl font-semibold text-gray-800 mb-1">
//             Stacked Bar Chart
//           </h3>
//           <CustomLegend  
//             payload={[
//               { value: "On time", color: COLORS.OnTime  },
//               { value: "Absent", color: COLORS.Absent },
//               { value: "Late", color: COLORS.Late },
//             ]}
//           />
//         </div>

//         <div className="flex flex-col items-end">
//           <div className="flex space-x-3 text-gray-500">
//             {/* Copy Button */}
//             <svg
//               onClick={handleCopy}
//               className="w-5 h-5 cursor-pointer hover:text-gray-700"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
//               />
//             </svg>

//             {/* Delete Button */}
//             <svg
//               onClick={handleDelete}
//               className="w-5 h-5 cursor-pointer hover:text-red-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </div>

//           <span className="text-sm text-gray-500 mt-1">
//             Total {totalEmployees} employee
//           </span>
//         </div>
//       </div>

//       {/* Chart */}
//       <div className="h-72">
//         <ResponsiveContainer style={{marginTop:"20px"}} width="100%" height="100%">
//           <BarChart
//             data={employeeAttendanceData}
//             stackOffset="expand"
//             margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
//             barCategoryGap="15%"
//           >
//             {/* ব্যাকগ্রাউন্ড গ্রিড লাইন */}
//             <CartesianGrid 
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="#e5e7eb"
//             />
            
//             <XAxis
//               dataKey="name"
//               axisLine={false}
//               tickLine={false}
//               className="text-xs"
//             />
//             <YAxis
//               tickFormatter={(tick) => `${Math.round(tick * 100)}%`}
//               axisLine={false}
//               tickLine={false}
//               domain={[0, 1]}
//               className="text-xs"
//             />
//             <Tooltip
//               formatter={(value: number, name: string) => [
//                 `${Math.round(value * 100)}%`,
//                 name,
//               ]}
//               contentStyle={{
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 borderColor: "#CBD5E0",
//                 boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//               }}
//               cursor={{ fill: "rgba(237, 242, 247, 0.7)" }}
//             />

//             {/* Bars */}
//             <Bar
//               dataKey="OnTime"
//               stackId="a"
//               fill={COLORS.OnTime}
//               name="On time"
//               barSize={30}
//             />
//             <Bar
//               dataKey="Late"
//               stackId="a"
//               fill={COLORS.Late}
//               name="Late"
//               barSize={30}
//             />
//             <Bar
//               dataKey="Absent"
//               stackId="a"
//               fill={COLORS.Absent}
//               name="Absent"
//               barSize={30}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };










// components/StackedChart.tsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// papaparse যদি ইনস্টল করা থাকে তবে এটি ব্যবহার করা যাবে
import { unparse } from 'papaparse'; 

// ডেটা এবং রং
const COLORS = {
  OnTime: "#7f59d0", 
  Late: "#46B8D6",   
  Absent: "#3CB371", 
};

// ডেটা সেট
const employeeAttendanceData = [
  { name: "Sunday", OnTime: 58, Late: 24, Absent: 18 },
  { name: "Monday", OnTime: 72, Late: 13, Absent: 15 },
  { name: "Tues day", OnTime: 40, Late: 30, Absent: 30 },
  { name: "Wednesday", OnTime: 22, Late: 58, Absent: 20 },
  { name: "Thursday", OnTime: 60, Late: 20, Absent: 20 },
  { name: "Friday", OnTime: 40, Late: 35, Absent: 25 },
  { name: "Saturday", OnTime: 65, Late: 20, Absent: 15 },
];

// কাস্টম লেজেন্ড কম্পোনেন্ট
const CustomLegend = ({ payload }: { payload?: any[] }) => (
  <div className="flex justify-start items-center space-x-4 text-xs pt-2 pb-1 text-gray-700">
    {payload?.map((entry, index) => (
      <div key={`legend-${index}`} className="flex items-center space-x-1">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: entry.color }}
        ></span>
        <span>{entry.value}</span>
      </div>
    ))}
  </div>
);

export const StackedChart: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const totalEmployees = 576; 

  const handleCopy = () => {
    // সম্পূর্ণ অ্যারেটিকে CSV তে রূপান্তর করে কপি করা হচ্ছে
    const csvString = unparse(employeeAttendanceData, {
        quotes: false,     
        delimiter: ",",    
        header: true,      
    });

    navigator.clipboard.writeText(csvString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDelete = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return (
      <div className="p-6 mx-auto mt-8 bg-white rounded-xl shadow max-w-lg text-center text-gray-600 border border-gray-200">
        ❌ Chart Deleted
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto mt-8 bg-white rounded-xl shadow max-w-lg relative border border-gray-200">
      
      {/* Toast */}
      {isCopied && (
        <div className="absolute top-2 right-24 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
          Data Copied as CSV!
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Stacked Bar Chart
          </h3>
          <CustomLegend
            payload={[
              { value: "On time", color: COLORS.OnTime },
              { value: "Absent", color: COLORS.Absent },
              { value: "Late", color: COLORS.Late },
            ]}
          />
        </div>

        <div className="flex flex-col items-end">
          <div className="flex space-x-3 text-gray-500">
            {/* Copy Button */}
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

            {/* Delete Button */}
            <svg
              onClick={handleDelete}
              className="w-5 h-5 cursor-pointer hover:text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <span className="text-sm text-gray-500 mt-1">
            Total {totalEmployees} employee
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={employeeAttendanceData}
            stackOffset="expand"
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
            // *** পরিবর্তন #১: বারগুলোর মধ্যে বেশি ফাঁকা জায়গা (Category Gap) ***
            barCategoryGap="50%" 
          >
            {/* ব্যাকগ্রাউন্ড গ্রিড লাইন */}
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
              formatter={(value: number, name: string) => [
                `${Math.round(value * 100)}%`,
                name,
              ]}
              contentStyle={{
                borderRadius: "8px",
                fontSize: "14px",
                borderColor: "#CBD5E0",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
              cursor={{ fill: "rgba(237, 242, 247, 0.7)" }}
            />

            {/* Bars: পরিবর্তন #২: radius যোগ করা হলো */}
            <Bar
              dataKey="OnTime"
              stackId="a"
              fill={COLORS.OnTime}
              name="On time"
              barSize={30}
              radius={[6, 6, 6, 6]} // টপ-লেফট, টপ-রাইট, বটম-রাইট, বটম-লেফট
            />
            <Bar
              dataKey="Late"
              stackId="a"
              fill={COLORS.Late}
              name="Late"
              barSize={30}
              radius={[6, 6, 6, 6]} // সব কোণায় ১০ পিক্সেল রাউন্ডেড
            />
            <Bar
              dataKey="Absent"
              stackId="a"
              fill={COLORS.Absent}
              name="Absent"
              barSize={30}
              radius={[6, 6, 6, 6]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};