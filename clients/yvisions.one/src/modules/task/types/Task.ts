import { TaskStatus } from "./TaskStatus"

export interface Task {
    id: string // Unique identifier for the task
    reporterUserID: string // User ID of the reporter who created the task
    watcherUserIDs: string[] // List of user IDs watching the task
    primaryAssignedUserID: string // User ID primarily assigned to the task
    assignedUserIds: string[] // List of all users assigned to the task
    title: string // Title of the task
    description: string // Detailed description of the task
    creationDate: Date // Date the task was created
    deadline: Date // Deadline for the task
    sprintID: string | null // ID of the involved sprint (nullable if not part of a sprint)
    tags: string[] // Array of tags for categorization
    status: TaskStatus // Status of the task (now uses enum)
}
