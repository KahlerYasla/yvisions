import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Task } from "../types/Task"
import { TaskStatus } from "../types/TaskStatus"
import AddTaskFormView from "./AddTaskFromView"

export interface TaskViewProps {
    className?: string
    tasks: Task[]
    sprintID: string
    onStatusChange: (taskId: string, newStatus: TaskStatus) => void // Callback to update task status
}

const columns = ["backlog", "todo", "doing", "review", "done"]

const TaskView: React.FC<TaskViewProps> = ({
    className,
    tasks,
    sprintID = 0,
    onStatusChange,
}) => {
    const [showForm, setShowForm] = useState(false)

    // Group tasks by their status
    const groupedTasks = columns.reduce((acc, status) => {
        acc[status] = tasks.filter(
            (task) => task.status === status && task.sprintID === sprintID
        )
        return acc
    }, {} as Record<string, Task[]>)

    const handleDragEnd = (result: any) => {
        const { source, destination } = result

        if (!destination) {
            console.warn("Task dropped outside a column.")
            return
        }

        const sourceStatus = source.droppableId
        const destinationStatus = destination.droppableId

        if (sourceStatus !== destinationStatus) {
            const taskId = result.draggableId

            // Validate taskId exists
            const task = tasks.find((t) => t.id === taskId)
            if (!task) {
                console.error(`Task with id ${taskId} not found.`)
                return
            }

            onStatusChange(taskId, destinationStatus)
        }
    }

    return (
        <div
            className={`relative grid grid-cols-${columns.length} gap-4 ${className}`}
        >
            <DragDropContext onDragEnd={handleDragEnd}>
                {columns.map((column) => (
                    <Droppable key={column} droppableId={column}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="bg-gray-100 rounded-lg p-4 shadow-md"
                            >
                                <h3 className="text-lg font-bold mb-3 capitalize">
                                    {column}
                                </h3>
                                {groupedTasks[column]?.map((task, index) => (
                                    <Draggable
                                        key={task.id}
                                        draggableId={task.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className="bg-white p-3 rounded-md shadow-md mb-3"
                                            >
                                                <h4 className="font-semibold text-md">
                                                    {task.title}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {task.description}
                                                </p>
                                                <span className="text-xs text-gray-500">
                                                    Assigned:{" "}
                                                    {task.primaryAssignedUserID}
                                                </span>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>

            {/* Floating Button */}
            <button
                onClick={() => setShowForm(true)}
                className="text-2xl fixed bottom-1/2 right-12 bg-5 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
            >
                +
            </button>

            {/* Modal for Add Task Form */}
            {showForm && (
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 "
                    onClick={() => setShowForm(false)}
                >
                    <div
                        className="bg-white  p-6 shadow-lg w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <AddTaskFormView />
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskView
