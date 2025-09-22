//  import ChartShowDynamic from "@/components/AllChart/ChartShowDynamic";
import DashboardBuilder from "@/components/AllChart/dashbord/DashboardBuilder";
import WidgetConfigurationModal from "@/components/AllChart/WidgetConfigurationPage/Page";
import WidgetConfiguration from "@/components/AllChart/WidgetConfiguration/WidgetConfiguration";
import ImportExportButtons from "@/components/ganttChart/button/ImportExportButtons";
import Component from "@/components/ganttChart/Component ";
import { useState } from "react";

const Charts: React.FC = () => {


    return (
        <>

            <div>
            </div>
            <div className="flex w-full gap-4 p-4">
                <DashboardBuilder />

            </div>

            <div>
                <div className="flex justify-end"> <ImportExportButtons /></div>
                <div><Component></Component></div>
            </div>

        </>
    );
};

export default Charts;








