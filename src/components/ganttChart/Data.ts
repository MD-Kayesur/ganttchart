 

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



export const simpleTasks = [
    {
        id: 7,
        title: 'Software validation, research and implementation',
        start: new Date('2014-06-02T00:00:00.000Z'),
        end: new Date('2014-06-19T00:00:00.000Z'),
        completionRatio: 0.45708333333333334,
        isExpanded: true,
        subtasks: [
            {
                id: 18,
                title: 'Project Kickoff',
                start: new Date('2014-06-02T00:00:00.000Z'),
                end: new Date('2014-06-02T00:00:00.000Z'),
                completionRatio: 0.23
            },
            {
                id: 11,
                title: 'Research',
                start: new Date('2014-06-02T00:00:00.000Z'),
                end: new Date('2014-06-07T00:00:00.000Z'),
                completionRatio: 0.5766666666666667,
                isExpanded: true,
                subtasks: [
                    {
                        id: 19,
                        title: 'Validation with Customers',
                        start: new Date('2014-06-02T00:00:00.000Z'),
                        end: new Date('2014-06-04T00:00:00.000Z'),
                        completionRatio: 0.25
                    },
                    {
                        id: 39,
                        title: 'Functional and Technical Specification',
                        start: new Date('2014-06-04T00:00:00.000Z'),
                        end: new Date('2014-06-07T00:00:00.000Z'),
                        completionRatio: 0.66
                    }
                ]
            },
            {
                id: 13,
                title: 'Implementation',
                start: new Date('2014-06-08T00:00:00.000Z'),
                end: new Date('2014-06-19T00:00:00.000Z'),
                completionRatio: 0.77,
                isExpanded: true,
                subtasks: [
                    {
                        id: 24,
                        title: 'Prototype',
                        start: new Date('2014-06-08T00:00:00.000Z'),
                        end: new Date('2014-06-14T00:00:00.000Z'),
                        completionRatio: 0.77
                    },
                    {
                        id: 29,
                        title: 'UI and Interaction',
                        start: new Date('2014-06-14T00:00:00.000Z'),
                        end: new Date('2014-06-19T00:00:00.000Z'),
                        completionRatio: 0.6
                    }
                ]
            },
            {
                id: 17,
                title: 'Release',
                start: new Date('2014-06-19T00:00:00.000Z'),
                end: new Date('2014-06-19T00:00:00.000Z'),
                completionRatio: 0
            }
        ]
    }
];

export const simpleDependencies = [
    {
        id: 528,
        fromId: 18,
        toId: 19,
        type: 1
    },
    {
        id: 529,
        fromId: 19,
        toId: 39,
        type: 1
    },
    {
        id: 535,
        fromId: 24,
        toId: 29,
        type: 1
    },
    {
        id: 551,
        fromId: 13,
        toId: 29,
        type: 0
    },
    {
        id: 777,
        fromId: 7,
        toId: 11,
        type: 2
    },
    {
        id: 556,
        fromId: 39,
        toId: 24,
        type: 1
    },
    {
        id: 546,
        fromId: 29,
        toId: 17,
        type: 1
    }
];

 