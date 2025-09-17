// import { tasks } from './Data';
// import { Gantt, Willow } from 'wx-react-gantt';
// import "wx-react-gantt/dist/gantt.css";
// import "./GanttChart.css"

// const Component: React.FC = () => {
//  const sequentialTasks = tasks.map((task, index) => ({
//   ...task,
//   start: new Date(2024, 7, 10 + index),
//   end: new Date(2024, 8, 12 + index),
//   duration: 3,
//   progress: parseInt(task["complete"]), // convert "20%" → 20
// }));

// const cellBorders="none"      // optional: "columns" | "none"
// const rowBorders="rows"  
//    console.log(sequentialTasks[0].complete);

//   return (
//    <Willow className="bg-amber-700">
//     <Gantt 
//       tasks={sequentialTasks}  
//       cellBorders={cellBorders} 
//       rowBorders={rowBorders} 
//       cellHeight={32}
//     activeTask={10}
//     />
//   </Willow>
//   );
// };

// export default Component;



 
import { tasks } from './Data';
import { Gantt, Willow } from 'wx-react-gantt';
import "wx-react-gantt/dist/gantt.css";
import "./GanttChart.css"

const Component: React.FC = () => {
 const sequentialTasks = tasks.map((task, index) => ({
  ...task,
  start: new Date(2024, 7, 10 + index),
  end: new Date(2024, 8, 12 + index),
  duration: 3,
  progress: parseInt(task["complete"]), // convert "20%" → 20
}));

const cellBorders="none"      // optional: "columns" | "none"
const rowBorders="rows"  
   console.log(sequentialTasks[0].complete);
 
  return (
   <Willow className="bg-amber-700">
    <Gantt 
      tasks={sequentialTasks}  
      cellBorders={cellBorders} 
      rowBorders={rowBorders} 
      cellHeight={32}
    activeTask={10}
   
    />
  </Willow>
  );
};

export default Component;



 