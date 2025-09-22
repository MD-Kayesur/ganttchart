 



import * as React from "react";
import { Gantt, Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import "./GanttChart.css";

interface Task {
  Info?: string;
  text: string;
  duration: string;
  start_date: string;
  finished_date: string;
  assigned: string;
  complete: string;
  priority?: string;
  actual_hour?: string;
  planned_hour?: string;
  planned_cost?: string;
  planned_resource_cost?: string;
  id?: number;
  type?: string;
}

const Component: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
   // 🔄 Load from localStorage on mount
  React.useEffect(() => {
    const savedTasks = localStorage.getItem("importedCsvData");
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      } catch (e) {
        console.error("Invalid data in localStorage:", e);
      }
    }
  }, []);

  

  // 🛡️ Safe date parser
  const parseDate = (dateStr: string | undefined) => {
    if (!dateStr) return null;
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  // 📊 Map for Gantt
  const mappedTasks = tasks.map((task, index) => {
    const start = parseDate(task.start_date);
    const end = parseDate(task.finished_date);

    return {
      id: task.id || index + 1,
      text: task.text || `Task ${index + 1}`,
      start: start || new Date(), // fallback to "now"
      end: end || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // fallback +3 days
      duration: Number(task.duration) || 3,
      progress: parseInt(task.complete?.replace("%", "") || "0"),
      complete: task.complete,
      Info: task.Info || "",
      assigned: task.assigned || "",
      priority: task.priority || "",
      actual_hour: task.actual_hour || "",
      planned_hour: task.planned_hour || "",
      p_cost: task.planned_cost || "",
      p_resource_cost: task.planned_resource_cost || "",
      type: task.type || "task",
    };
  });

  return (
    <div className="p-4">
      {mappedTasks.length === 0 ? (
        <p className="text-center text-gray-500">
          ⚠️ No tasks found. Please import a CSV file first.
        </p>
      ) : (
        <>
           

          {/* 📊 Gantt Chart */}
          <Willow className="gantt-willow-wrapper">
            <Gantt tasks={mappedTasks} cellBorders="none" rowBorders="rows" />
          </Willow>
        </>
      )}
    </div>
  );
};

export default Component;

