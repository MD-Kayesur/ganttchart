  

import * as React from 'react';
import { tasks } from './Data';
import { Gantt, Willow } from 'wx-react-gantt';
import "wx-react-gantt/dist/gantt.css";
import "./GanttChart.css"

// NOTE: We remove the explicit TaskItem interface definition to simplify things
// and rely on the implicit structure of the mapped data.

const Component: React.FC = () => {
    
    // --- Data Mapping ---
    // Ensure all data is ready, but avoid complex mapping unless necessary.
    const mappedTasks = tasks.map((task, index) => ({
        // Use standard wx-react-gantt fields where possible
        id: task.id || index + 1, 
        text: task.text || `Task ${index + 1}`, // This is the task name
        
        // Dates must be Date objects
        start: new Date(task.start_date), 
        end: new Date(task.finished_date),
        
        // Numeric properties
        duration: task.duration ? parseInt(task.duration) : 3,
        progress: parseInt(task["complete"]?.replace('%', '') || "0"), 
        
        // Pass all custom fields exactly as they are named in 'tasks'
        complete: task["complete"], 
        Info: task.Info || '',
        assigned: task.assigned || '',
        priority: task.priority || '',
        actual_hour: task.actual_hour || '',
        planned_hour: task.planned_hour || '',
        p_cost: task.planned_cost || '', 
        p_resource_cost: task.planned_resource_cost || '', 
        type: task.type || 'task', 
    }));

    // --- Column Definition ---
    // 🔑 EXTREME SIMPLIFICATION: Only include the essential 'field' and 'header' properties.
    // We are deliberately keeping the list short to test the library's limits.
    const columns = [
        // 1. Task Name (often mapped to 'text')
        { field: 'text', header: 'Task Name', width: 250 }, 
        
        // 2. Duration (required for Gantt calculation)
        { field: 'duration', header: 'Duration', width: 100 },
        
        // 3. Start Date (must be included for consistency)
        { field: 'start', header: 'Start Date', width: 120 }, 
        
        // 4. Custom fields (testing if the library handles them)
        { field: 'assigned', header: 'Assigned', width: 120 },
        { field: 'p_cost', header: 'Planned Cost', width: 120 },
    ];


    const cellBorders = "none";
    const rowBorders = "rows"; 

    return (
        <Willow className="gantt-willow-wrapper">
          <Gantt 
    tasks={mappedTasks} 
    // columns={columns}  // <--- REMOVED
    cellBorders={cellBorders} 
    // ...
/>
        </Willow>
    );
};

export default Component;