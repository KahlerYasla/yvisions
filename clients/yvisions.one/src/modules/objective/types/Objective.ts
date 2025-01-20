import { User } from "../../auth/types/User"
import { Result } from "./Result"

export type Objective = {
    id: string
    title: string
    description: string
    status: "done" | "doing" | "planned"
    startDate: Date
    deadline: Date
    progressPercentage: string
    assignees: User[]
    results: Result[]
    effort?: number
    priority?: number
    progressHistory?: number[] // e.g., [20, 40, 60, 75]
}
