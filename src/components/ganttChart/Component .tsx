 

import { tasks } from './Data'; // Import the tasks directly
import { Gantt, Willow } from 'wx-react-gantt';
import "wx-react-gantt/dist/gantt.css"; // theme import

const Component:React.FC = () => {
  // Modifying the tasks for waterfall-like visualization (sequential)
  const sequentialTasks = tasks.map((task, index) => ({
    ...task,
    start: new Date(2024, 7, 10 + index), // Start each task one after another
    end: new Date(2024, 8, 12 + index), // End each task a few days later
    duration: 3, // Assign a standard duration for simplicity
  }));

  return (
    <Willow>
      <Gantt tasks={sequentialTasks} /> {/* Pass tasks sequentially */}
    </Willow>
  );
};

export default Component;

 

 