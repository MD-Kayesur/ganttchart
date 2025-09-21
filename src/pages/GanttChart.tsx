//  import ChartShowDynamic from "@/components/AllChart/ChartShowDynamic";
  import WidgetConfiguration from "@/components/AllChart/WidgetConfiguration/WidgetConfiguration";
import DashboardBuilder from "@/components/AllChart/WidgetLibrary/WidgetLibrary";
 import ImportExportButtons from "@/components/ganttChart/button/ImportExportButtons";
import Component from "@/components/ganttChart/Component ";
import { useState } from "react";
import { Outlet } from "react-router-dom";
    
const GanttChart:React.FC = () => {
  const [config, setConfig] = useState<any>({
    chartType: "",
    widgetTitle: "",
  });

    return (
      <>
 
       <div>

       
        </div> 

   <div className="flex gap-4 p-4">
    <div className="w-4/6">
    <DashboardBuilder chartType={config.chartType} widgetTitle={config.widgetTitle}></DashboardBuilder>
      </div>
       <div className="w-2/6">
         <WidgetConfiguration onConfigChange={setConfig}  />
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








