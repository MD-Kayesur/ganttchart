






// import { useState } from "react";
// // আপনার চার্ট কম্পোনেন্টগুলো ইম্পোর্ট করুন
// import LineChart from "./LineChart/LineChart";
// import PieChart from "./PieChart/PieChart";
// import AreaChart from "./AreaChart/AreaChart";
// import { StackedChart } from "./StackedChart/StackedChart";
// import RadarChart from "./RadarChart/RadarChart";
// import { StackedChart } from "./StackedChart/StackedChart"; // StackedChart কম্পোনেন্ট
// import RadarChart from "./RadarChart/RadarChart"; // RadarChart কম্পোনেন্ট
// import WidgetConfiguration from "./WidgetConfiguration/WidgetConfiguration";

// // WidgetConfiguration কম্পোনেন্ট ইম্পোর্ট করুন
// // import WidgetConfiguration from "./WidgetConfiguration";

// const ChartShowDynamic = () => {
//   const [selectedChartType, setSelectedChartType] = useState<string>(""); // নির্বাচিত চার্টের ধরণ
//   const [showConfiguration, setShowConfiguration] = useState(false); // কনফিগারেশন প্যানেল দেখানোর জন্য
//   const [chartConfig, setChartConfig] = useState<any>(null); // কনফিগারেশন ডেটা সংরক্ষণের জন্য

//   // কনফিগারেশন ডেটা প্রাপ্ত হলে
//   const handleConfigurationSave = (config: any) => {
//     setChartConfig(config);
//     setSelectedChartType(config.chartType); // কনফিগারেশন থেকে চার্টের ধরণ সেট করা
//     setShowConfiguration(false); // কনফিগারেশন প্যানেল বন্ধ করা
//   };

//   // চার্ট রেন্ডার করার ফাংশন
//   const renderChart = () => {
//     if (!chartConfig) {
//       return (
//         <p className="text-gray-500 text-center mt-6">
//           ⚠️ Please configure a chart type and its settings.
//         </p>
//       );
//     }

//     switch (selectedChartType) {
//       case "Stacked Bar Chart":
//         return <StackedChart />; // এখানে আপনি config.xAxis, config.yAxis ডেটা পাস করতে পারেন
//       // case "Line Chart":
//       //   return <LineChart />;
//       // case "Pie Chart":
//       //   return <PieChart />;
//       // case "Area Chart":
//       //   return <AreaChart />;
//       case "Radar Chart":
//         return <RadarChart />;
//       case "Horizontal Bar Chart": // যদি এই অপশন থাকে
//           return <p>Horizontal Bar Chart will be rendered here.</p>; // আপনার Horizontal Bar Chart কম্পোনেন্ট
//       case "Doughnut Pie": // যদি এই অপশন থাকে
//           return <p>Doughnut Pie Chart will be rendered here.</p>; // আপনার Doughnut Pie Chart কম্পোনেন্ট
//       default:
//         return (
//           <p className="text-gray-500 text-center mt-6">
//             ⚠️ Selected chart type not found.
//           </p>
//         );
//     }
//   };

//  return (
//   <div className="flex p-4 space-x-4">
//     {/* --- বাম দিকের চার্ট ডিসপ্লে --- */}
//     <div className="flex-1 p-6 bg-white rounded-xl shadow border border-gray-200">

//       {/* ... Header এবং Configure Widget বাটন ... */}

//       {/* রেন্ডার করা চার্ট বা ডিফল্ট মেসেজ এই ডিভের ভেতরে দেখানো হবে */}
//       <div className="h-72">
//         {renderChart()} {/* <--- এটিই চার্ট দেখানোর জায়গা */}
//       </div>
//     </div>

//     {/* --- ডান দিকের Widget Configuration Modal --- */}
//     {showConfiguration && (
//       <WidgetConfiguration
//         sendData={handleConfigurationSave} 
//         onClose={() => setShowConfiguration(false)} 
//       />
//     )}
//   </div>
// );
// };

// export default ChartShowDynamic;








import { useState } from "react";
// আপনার চার্ট কম্পোনেন্টগুলো ইম্পোর্ট করুন (Import your chart components)
import LineChart from "./LineChart/LineChart";
import PieChart from "./PieChart/PieChart";
import AreaChart from "./AreaChart/AreaChart";
import { StackedChart } from "./StackedChart/StackedChart";
import RadarChart from "./RadarChart/RadarChart";

// WidgetConfiguration কম্পোনেন্ট ইম্পোর্ট করুন (Import WidgetConfiguration)
import WidgetConfiguration from "./WidgetConfiguration/WidgetConfiguration";
// ধরে নিচ্ছি এটি আপনার পূর্বের আলোচনা অনুযায়ী লেখা হয়েছে (Assuming it's written as per our previous discussion)

// --- ChartShowDynamic Component ---
const ChartShowDynamic = () => {
  // State for managing the selected chart type, modal visibility, and chart settings
  const [selectedChartType, setSelectedChartType] = useState<string>("");
  const [showConfiguration, setShowConfiguration] = useState(false);
  const [chartConfig, setChartConfig] = useState<any>(null);

  // কনফিগারেশন ডেটা প্রাপ্ত হলে (When configuration data is received)
  const handleConfigurationSave = (config: any) => {
    // WidgetConfiguration থেকে প্রাপ্ত config ডেটা সংরক্ষণ করা
    setChartConfig(config);
    // নির্বাচিত চার্টের ধরণ সেট করা
    setSelectedChartType(config.chartType);
    // Modal বন্ধ করা
    setShowConfiguration(false);
  };

  // চার্ট রেন্ডার করার ফাংশন (Function to render the chart)
  const renderChart = () => {
    // 1. যদি কোনো কনফিগারেশন সেভ না করা থাকে, তবে ডিফল্ট মেসেজ দেখাবে (If no config is saved, show a default message)
    if (!chartConfig) {
      return (
        <p className="text-gray-500 text-center mt-6">
          ⚠️ Please configure a chart type and its settings.
        </p>
      );
    }

    // 2. Widget Title যদি ডিফল্ট হয়, তবে ওয়ার্নিং মেসেজ দেখাবে (If Widget Title is default, show a warning)
    // Note: This check relies on a flag `isTitleDefault` being passed from the configuration.
    if (chartConfig.isTitleDefault) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4 border border-yellow-400 bg-yellow-50 rounded-md">
          <p className="font-semibold text-yellow-700">
            Configuration Saved, but please set a custom Widget Title.
          </p>
          <button
            onClick={() => setShowConfiguration(true)}
            className="mt-3 px-3 py-1 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Edit Title
          </button>
        </div>
      );
    }

    // 3. নির্বাচিত চার্টের ধরণ অনুযায়ী সঠিক চার্ট কম্পোনেন্ট রেন্ডার করা (Render the correct chart component based on selected type)
    switch (selectedChartType) {
      case "Stacked Bar Chart":
        // StackedChart কম্পোনেন্ট রেন্ডার হচ্ছে
        return <StackedChart />;
      case "Line Chart":
        // LineChart কম্পোনেন্ট রেন্ডার হচ্ছে
        return <LineChart />;
      case "Pie Chart":
        // PieChart কম্পোনেন্ট রেন্ডার হচ্ছে
        return <PieChart />;
      case "Area Chart":
        // AreaChart কম্পোনেন্ট রেন্ডার হচ্ছে
        return <AreaChart />;
      case "Radar Chart":
        // RadarChart কম্পোনেন্ট রেন্ডার হচ্ছে
        return <RadarChart />;
      // অন্যান্য চার্টগুলি এখনও কম্পোনেন্ট দ্বারা প্রতিস্থাপিত হয়নি
      case "Horizontal Bar Chart":
        return <p className="text-gray-500 text-center mt-6">Horizontal Bar Chart component goes here.</p>;
      case "Doughnut Pie":
        return <p className="text-gray-500 text-center mt-6">Doughnut Pie Chart component goes here.</p>;
      default:
        return (
          <p className="text-gray-500 text-center mt-6">
            ⚠️ Selected chart type not found.
          </p>
        );
    }
  };

  return (
    <div className="flex p-4 space-x-4">
      {/* --- বাম দিকের চার্ট ডিসপ্লে প্যানেল (Left Chart Display Panel) --- */}
      <div className="flex-1 p-6 bg-white rounded-xl shadow border border-gray-200">

        {/* Header এবং Configure Button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {/* নির্বাচিত Title বা ডিফল্ট Title দেখাবে */}
            {chartConfig?.widgetTitle || "Chart Widget"}
          </h3>

          <button
            onClick={() => setShowConfiguration(true)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Configure Widget
          </button>
        </div>

        {/* রেন্ডার করা চার্ট এই ডিভের ভেতরে দেখাবে (The rendered chart will show inside this div) */}
        <div className="h-72">
          {renderChart()}
        </div>
      </div>

      {/* --- ডান দিকের Widget Configuration Modal (Right Widget Configuration Modal) --- */}
      {showConfiguration && (
        // Modal কে স্ক্রিনের মাঝখানে ফিক্সড পজিশনে রাখার জন্য এই Modal Logic টি প্রয়োজন হবে।
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <WidgetConfiguration
            sendData={handleConfigurationSave}
            onClose={() => setShowConfiguration(false)}
          />
        </div>
      )}
    </div>
  );
};

export default ChartShowDynamic;