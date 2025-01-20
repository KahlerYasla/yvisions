// Sprint Type
export interface Sprint {
    id: string // Unique identifier for the sprint
    name: string // Name of the sprint
    startDate: Date // Start date of the sprint
    endDate: Date // End date of the sprint
    tasks: string[] // List of task IDs involved in the sprint
    goal: string // The goal of the sprint
}
