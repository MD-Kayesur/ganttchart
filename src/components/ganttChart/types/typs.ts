// types.ts
export interface Task {
  task_name: string;
  duration: string; // Will be parsed to a number
  start_date: string;
  finished_date: string;
  assigned: string;
  "%_complete": string; // Will be parsed to number
  priority: string;
  actual_hour: string;
  planned_hour: string;
  planned_cost: string;
  planned_resource_cost: string;
}
