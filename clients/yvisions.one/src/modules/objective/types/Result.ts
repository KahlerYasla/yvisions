import { User } from "../../auth/types/User"

export type Result = {
    id: string
    objectiveID: string
    title: string
    description: string
    targetValue: number
    currentValue: number
    initialValue: number
    progressPercentage: number
    status: "on risk" | "on track" | "completed"
    owner: User | null
    deadline: Date
    startDate: Date
    weight: number
}
