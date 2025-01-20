import { create } from "zustand"
import { useUser } from "../../auth/hooks/useUser"
import { Objective } from "../types/Objective"

// Helper functions for localStorage
const loadFromLocalStorage = (key: string) => {
    try {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : null
    } catch (error) {
        console.error("Error loading from localStorage", error)
        return null
    }
}

const saveToLocalStorage = (key: string, value: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error("Error saving to localStorage", error)
    }
}

// Dummy data
const dummyObjectives: Objective[] = [
    {
        id: "obj-1",
        title: "Increase Revenue",
        description:
            "Focus on increasing revenue by expanding customer base and upselling.",
        status: "doing",
        startDate: new Date("2025-01-01"),
        deadline: new Date("2025-06-30"),
        progressPercentage: "45%",
        assignees: [],
        results: [
            {
                id: "res-1",
                objectiveID: "obj-1",
                title: "Acquire 100 New Customers",
                description:
                    "Reach out to new markets and onboard 100 new customers.",
                targetValue: 100,
                currentValue: 45,
                initialValue: 0,
                progressPercentage: 45,
                status: "on track",
                owner: useUser.getState().dummyUsers[1],
                deadline: new Date("2025-03-31"),
                startDate: new Date("2025-01-01"),
                weight: 50,
            },
        ],
    },
]

// Zustand store
interface useObjectiveState {
    objectives: Objective[] | []
    dummyObjectives: Objective[]
    getObjectives: () => Promise<Objective[]>
    setObjectives: (objectives: Objective[]) => Promise<boolean>
    assignUserToObjective: (objectiveID: string, userID: string) => void
}

export const useObjective = create<useObjectiveState>((set, get) => ({
    objectives: loadFromLocalStorage("objectives") || [],
    dummyObjectives,
    getObjectives: async () => {
        return new Promise((resolve) => {
            const storedObjectives = loadFromLocalStorage("objectives")
            if (storedObjectives) {
                set({ objectives: storedObjectives })
                resolve(storedObjectives)
            } else {
                resolve(get().dummyObjectives)
            }
        })
    },
    setObjectives: async (objectives: Objective[]) => {
        return new Promise((resolve) => {
            set(() => ({ objectives }))
            saveToLocalStorage("objectives", objectives)
            resolve(true)
        })
    },
    assignUserToObjective: (objectiveID, userID) => {
        const { dummyObjectives } = get()
        const { dummyUsers } = useUser.getState()

        const updatedObjectives = dummyObjectives.map((objective) => {
            if (objective.id === objectiveID) {
                const user = dummyUsers.find((u) => u.id === userID)
                if (user) {
                    return {
                        ...objective,
                        assignees: [...objective.assignees, user],
                    }
                }
            }
            return objective
        })

        set({ dummyObjectives: updatedObjectives })
        saveToLocalStorage("objectives", updatedObjectives)
    },
}))
