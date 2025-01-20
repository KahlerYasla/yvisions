import React, { useState } from "react"
import { TaskStatus } from "../types/TaskStatus"
import { useTasks } from "../hooks/useTask"

const AddTaskFormView: React.FC = () => {
    const { addTask } = useTasks()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [tags, setTags] = useState("")
    const [status, setStatus] = useState(TaskStatus.Backlog)
    const [sprintID, setSprintID] = useState("sprint-1")

    const handleAddTask = () => {
        addTask({
            id: `task-${Date.now()}`,
            reporterUserID: "user-1", // Auto-set
            watcherUserIDs: [], // Default
            primaryAssignedUserID: "user-1", // Auto-set
            assignedUserIds: ["user-1"], // Default
            title,
            description,
            creationDate: new Date(), // Auto-set
            deadline: new Date(deadline),
            sprintID,
            tags: tags.split(",").map((tag) => tag.trim()), // Convert comma-separated string to array
            status, // User-provided
        })
        // Reset form fields
        setTitle("")
        setDescription("")
        setDeadline("")
        setTags("")
        setStatus(TaskStatus.Backlog)
        setSprintID("sprint-1")
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Task Title
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Task Description
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Deadline
                </label>
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Enter tags separated by commas"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {Object.values(TaskStatus).map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                            {statusOption}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                    Sprint ID
                </label>
                <input
                    type="text"
                    value={sprintID}
                    onChange={(e) => setSprintID(e.target.value)}
                    placeholder="Enter sprint ID"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={handleAddTask}
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add Task
            </button>
        </div>
    )
}

export default AddTaskFormView
