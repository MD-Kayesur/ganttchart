 

// Define the type for the Task
interface Task {
  Info:string;
  cellBorders?: string;
  text: string;
  duration: string;
  start_date: string;
  finished_date: string;
  assigned: string;
  complete: string;
  priority: "High" | "Medium" | "Low";  // If you have only three priorities
  actual_hour: string;
  planned_hour: string;
  planned_cost: string;
  planned_resource_cost: string;
}

// Create the tasks array with the Task type
export const tasks: Task[] = [
  {
    Info:" ",
    text: "Planning",
    duration: "5 Days",
    start_date: "3/1/25",
    finished_date: "8/19/25",
    assigned: "Mike Smith",
    complete: "15%",
    priority: "High",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:" ",
    text: "Mobilization at Site",
    duration: "14 Days",
    start_date: "3/1/25",
    finished_date: "3/1/25",
    assigned: "Mike Smith",
    complete: "40%",
    priority: "High",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:" ",
    text: "Surveying & Layout",
    duration: "5 Days",
    start_date: "3/1/25",
    finished_date: "3/14/25",
    assigned: "Mike Smith",
    complete: "25%",
    priority: "High",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:" ",
    text: "Excavation",
    duration: "8 Days",
    start_date: "3/5/25",
    finished_date: "3/9/25",
    assigned: "Mike Smith",
    complete: "60%",
    priority: "High",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:"ok", 
    text: "Footing",
    duration: "10 Days",
    start_date: "3/7/25",
    finished_date: "3/14/25",
    assigned: "Mike Smith",
    complete: "50%",
    priority: "High",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:"ok",
    text: "Column up to Plinth Level",
    duration: "10 Days",
    start_date: "3/9/25",
    finished_date: "3/18/25",
    assigned: "Mike Smith",
    complete: "70%",
    priority: "High",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:" ",
    text: "Backfilling in Footing",
    duration: "7 Days",
    start_date: "3/12/25",
    finished_date: "3/21/25",
    assigned: "Mike Smith",
    complete: "35%",
    priority: "Medium",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:" ",
    text: "Plinth Beam",
    duration: "7 Days",
    start_date: "3/16/25",
    finished_date: "3/22/25",
    assigned: "Jennifer Jones",
    complete: "45%",
    priority: "Medium",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:" ",
    text: "Earth Filling in Plinth Level",
    duration: "4 Days",
    start_date: "3/19/25",
    finished_date: "3/25/25",
    assigned: "Jennifer Jones",
    complete: "55%",
    priority: "Medium",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  },
  {
    Info:" ",
    text: "Anti Termite Treatment",
    duration: "4 Days",
    start_date: "3/23/25",
    finished_date: "3/26/25",
    assigned: "Jennifer Jones",
    complete: "80%",
    priority: "Medium",
    actual_hour: "5 hours",
    planned_hour: "12.4 hours",
    planned_cost: "$1250.00",
    planned_resource_cost: "$850.25"
  }
];


 