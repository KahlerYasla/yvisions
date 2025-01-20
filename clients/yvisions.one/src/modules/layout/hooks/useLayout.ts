import { create } from "zustand"

// Types
import { Alert } from "../../core"

interface useLayoutState {
    alertStack: Alert[]
    addAlert: (alert: Alert) => void
    removeAlert: (id: string) => void
    clearAlerts: () => void
}

export const useLayout = create<useLayoutState>((set) => ({
    alertStack: [],
    addAlert: (alert: Alert) => {
        set((state) => ({ alertStack: [...state.alertStack, alert] }))
        setTimeout(() => {
            set((state) => ({
                alertStack: state.alertStack.filter((a) => a.id !== alert.id),
            }))
        }, 3000)
    },
    removeAlert: (id: string) =>
        set((state) => ({
            alertStack: state.alertStack.filter((alert) => alert.id !== id),
        })),
    clearAlerts: () => set({ alertStack: [] }),
}))
