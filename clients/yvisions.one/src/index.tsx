import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

// Client-side routing
import { BrowserRouter, Route, Routes } from "react-router-dom"

// Components
import { LayoutView, NotFoundView } from "./modules/layout"
import { LoginView } from "./modules/auth"
import { TaskView } from "./modules/task"
import ObjectiveView from "./modules/objective/views/ObjectiveView"
import CompassView from "./modules/compass/views/CompassView"
import TadvisorView from "./modules/tadvisor/views/TadvisorView"

// Hooks
import { useTasks } from "./modules/task/hooks/useTask"
import { TaskStatus } from "./modules/task/types/TaskStatus"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

const App = () => {
    const dummyTasks = useTasks((c) => c.dummyTasks)
    console.log("Dummy Tasks:", dummyTasks)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutView />}>
                    <Route index element={<LoginView />} />
                    <Route path="tadvisor" element={<TadvisorView />} />
                    <Route path="home" element={<CompassView />} />
                    <Route path="objective" element={<ObjectiveView />} />
                    <Route
                        path="task"
                        element={
                            <TaskView
                                tasks={dummyTasks}
                                sprintID="sprint-1"
                                onStatusChange={(
                                    id: string,
                                    status: TaskStatus
                                ) => {
                                    return useTasks.setState((state) => ({
                                        dummyTasks: state.dummyTasks.map(
                                            (task) =>
                                                task.id === id
                                                    ? { ...task, status }
                                                    : task
                                        ),
                                    }))
                                }}
                            />
                        }
                    />
                    <Route path="*" element={<NotFoundView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

root.render(<App />)
