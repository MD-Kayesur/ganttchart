import { StackedChart } from "@/components/AllChart/StackedChart/StackedChart";
import WidgetConfiguration from "@/components/AllChart/WidgetConfiguration.tsx/WidgetConfiguration";
 import ImportExportButtons from "@/components/ganttChart/button/ImportExportButtons";
import Component from "@/components/ganttChart/Component ";
 
const GanttChart:React.FC = () => {
    return (
        <>
      <div className="   flex justify-end ">
  <div className="w-4xl   justify-end "><StackedChart ></StackedChart></div>
          <div className="max-w-md relative z-10" ><WidgetConfiguration  ></WidgetConfiguration></div>
      </div>
<div className="flex justify-end"> <ImportExportButtons/></div>
    <div><Component></Component></div>
     
</>
    );
};

export default GanttChart;