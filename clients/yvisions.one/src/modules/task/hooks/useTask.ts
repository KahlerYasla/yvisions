import { create } from "zustand"
import { Task } from "../types/Task"
import { TaskStatus } from "../types/TaskStatus"

interface useTasksState {
    dummyTasks: Task[] // Predefined dummy data
    tasks: Task[] | null // Tasks fetched or managed in the state
    getTasks: (userID: string) => Promise<Task[]> // Function to get tasks by userID
    addTask: (newTask: Task) => void
}

export const useTasks = create<useTasksState>((set, get) => ({
    dummyTasks: [
        {
            id: "task-1",
            reporterUserID: "user-1",
            watcherUserIDs: ["user-2", "user-3"],
            primaryAssignedUserID: "user-4",
            assignedUserIds: ["user-4", "user-5"],
            title: "Implement API Endpoint",
            description:
                "Create and test the API endpoint for user authentication.",
            creationDate: new Date("2025-01-01"),
            deadline: new Date("2025-01-31"),
            sprintID: "sprint-1",
            tags: ["API", "Backend"],
            status: TaskStatus.Doing,
        },
        {
            id: "task-2",
            reporterUserID: "user-2",
            watcherUserIDs: ["user-1"],
            primaryAssignedUserID: "user-3",
            assignedUserIds: ["user-3"],
            title: "Fix UI Bug",
            description: "Resolve the overlapping issue on the login page.",
            creationDate: new Date("2025-01-05"),
            deadline: new Date("2025-01-10"),
            sprintID: "sprint-1",
            tags: ["UI", "Bug"],
            status: TaskStatus.Done,
        },
    ],
    tasks: null,
    getTasks: async (userID: string) => {
        const filteredTasks = get().dummyTasks.filter(
            (task) =>
                task.reporterUserID === userID ||
                task.watcherUserIDs.includes(userID) ||
                task.assignedUserIds.includes(userID)
        )

        set({ tasks: filteredTasks })
        return filteredTasks
    },
    addTask: (newTask: Task) => {
        set((state) => ({
            dummyTasks: [...state.dummyTasks, newTask],
        }))
    },
}))
