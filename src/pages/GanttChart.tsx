 import ChartShowDynamic from "@/components/AllChart/ChartShowDynamic";
import { StackedChart } from "@/components/AllChart/StackedChart/StackedChart";
import WidgetConfiguration from "@/components/AllChart/WidgetConfiguration/WidgetConfiguration";
import ImportExportButtons from "@/components/ganttChart/button/ImportExportButtons";
import Component from "@/components/ganttChart/Component ";
import { useState } from "react";
    
const GanttChart:React.FC = () => {
     const [ChartType,setChartType]=useState()
 
  const ChangeChart = (e: React.ChangeEvent<HTMLSelectElement>) => {
     const selectedType = e.target.value;
     
      setChartType(selectedType);
    console.log(selectedType);
    }

    return (
        <>

        <div>
 <ChartShowDynamic setChartType={setChartType}/>
         </div>
       <div className="flex gap-4 p-4">
  {/* Chart section */}
  <div className="flex-1 bg-white rounded-2xl shadow-md p-4">
    <StackedChart  ChartType={ChartType}/>
  </div>

  {/* Widget config section */}
  <div className="w-150 bg-white rounded-2xl shadow-md p-4">
    <WidgetConfiguration ChangeChart={ChangeChart}/>
  </div>
</div>
       
<div>
    <div className="flex justify-end"> <ImportExportButtons/></div>
    <div><Component></Component></div>
</div>
     
</>
    );
};

export default GanttChart;








