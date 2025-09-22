//  import ChartShowDynamic from "@/components/AllChart/ChartShowDynamic";
 import DashboardBuilder from "@/components/AllChart/dashbord/DashboardBuilder";
import WidgetConfiguration from "@/components/AllChart/WidgetConfiguration/WidgetConfiguration";
  import ImportExportButtons from "@/components/ganttChart/button/ImportExportButtons";
import Component from "@/components/ganttChart/Component ";
     
const GanttChart:React.FC = () => {
  

    return (
      <>
 
       <div>

       
        </div> 

   <div className="flex gap-4 p-4">
  

      <DashboardBuilder/> 
       <div className="w-2/6"> 
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








