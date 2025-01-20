import React, { useEffect, useState } from "react"
import "tailwindcss/tailwind.css"
import { useObjective } from "../hooks/useObjective"
import { Result } from "../types/Result"
import { Objective } from "../types/Objective"
import { useUser } from "../../auth/hooks/useUser"

type ObjectiveViewProps = {
    className?: string
}

const ObjectiveView: React.FC<ObjectiveViewProps> = ({ className }) => {
    const { getObjectives, setObjectives } = useObjective()
    const [objectives, setLocalObjectives] = useState<Objective[]>([])
    const availableUsers = useUser((state) => state.dummyUsers)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedObjectiveID, setSelectedObjectiveID] = useState<
        string | null
    >(null)

    useEffect(() => {
        const fetchObjectives = async () => {
            const fetchedObjectives = await getObjectives()
            const objectivesWithProgress = fetchedObjectives.map((obj) => {
                const totalWeight =
                    obj.results.reduce((acc, res) => acc + res.weight, 0) || 1
                const weightedProgress = obj.results.reduce(
                    (acc, res) =>
                        acc +
                        ((res.progressPercentage / 100) * res.weight) /
                            totalWeight,
                    0
                )
                return {
                    ...obj,
                    progressPercentage: `${Math.round(
                        weightedProgress * 100
                    )}%`,
                }
            })
            setLocalObjectives(objectivesWithProgress)
        }
        fetchObjectives()
    }, [getObjectives])

    const handleOpenModal = (objectiveID: string) => {
        setSelectedObjectiveID(objectiveID)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedObjectiveID(null)
    }

    const handleSelectUser = (userID: string) => {
        if (selectedObjectiveID) {
            const updatedObjectives = objectives.map((obj) => {
                if (obj.id === selectedObjectiveID) {
                    const user = availableUsers.find(
                        (user) => user.id === userID
                    )
                    if (!user) return obj
                    return { ...obj, assignees: [...obj.assignees, user] }
                }
                return obj
            })
            setLocalObjectives(updatedObjectives)
            setObjectives(updatedObjectives)
        }
        handleCloseModal()
    }

    const handleRemoveAssignee = (objectiveID: string, userID: string) => {
        const updatedObjectives = objectives.map((obj) => {
            if (obj.id === objectiveID) {
                const updatedAssignees = obj.assignees.filter(
                    (user) => user.id !== userID
                )
                return { ...obj, assignees: updatedAssignees }
            }
            return obj
        })

        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    const handleObjectiveChange = (
        id: string,
        field: keyof Objective,
        value: any
    ) => {
        const updatedObjectives = objectives.map((obj) =>
            obj.id === id ? { ...obj, [field]: value } : obj
        )
        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    const handleResultChange = (
        objectiveID: string,
        resultID: string,
        field: keyof Result,
        value: any
    ) => {
        const updatedObjectives = objectives.map((obj) => {
            if (obj.id === objectiveID) {
                const updatedResults = obj.results.map((res) =>
                    res.id === resultID ? { ...res, [field]: value } : res
                )
                const totalWeight =
                    updatedResults.reduce((acc, res) => acc + res.weight, 0) ||
                    1
                const weightedProgress = updatedResults.reduce(
                    (acc, res) =>
                        acc +
                        ((res.progressPercentage / 100) * res.weight) /
                            totalWeight,
                    0
                )
                return {
                    ...obj,
                    results: updatedResults,
                    progressPercentage: `${Math.round(
                        weightedProgress * 100
                    )}%`,
                }
            }
            return obj
        })
        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    const incrementProgress = (objectiveID: string, resultID: string) => {
        const updatedObjectives = objectives.map((obj) => {
            if (obj.id === objectiveID) {
                const updatedResults = obj.results.map((res) => {
                    if (res.id === resultID) {
                        const newProgress = Math.min(
                            100,
                            res.progressPercentage + 10
                        )
                        return { ...res, progressPercentage: newProgress }
                    }
                    return res
                })
                const totalWeight =
                    updatedResults.reduce((acc, res) => acc + res.weight, 0) ||
                    1
                const weightedProgress = updatedResults.reduce(
                    (acc, res) =>
                        acc +
                        ((res.progressPercentage / 100) * res.weight) /
                            totalWeight,
                    0
                )
                return {
                    ...obj,
                    results: updatedResults,
                    progressPercentage: `${Math.round(
                        weightedProgress * 100
                    )}%`,
                }
            }
            return obj
        })
        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    const decrementProgress = (objectiveID: string, resultID: string) => {
        const updatedObjectives = objectives.map((obj) => {
            if (obj.id === objectiveID) {
                const updatedResults = obj.results.map((res) => {
                    if (res.id === resultID) {
                        const newProgress = Math.max(
                            0,
                            res.progressPercentage - 10
                        )
                        return { ...res, progressPercentage: newProgress }
                    }
                    return res
                })
                const totalWeight =
                    updatedResults.reduce((acc, res) => acc + res.weight, 0) ||
                    1
                const weightedProgress = updatedResults.reduce(
                    (acc, res) =>
                        acc +
                        ((res.progressPercentage / 100) * res.weight) /
                            totalWeight,
                    0
                )
                return {
                    ...obj,
                    results: updatedResults,
                    progressPercentage: `${Math.round(
                        weightedProgress * 100
                    )}%`,
                }
            }
            return obj
        })
        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    const handleDeleteObjective = (id: string) => {
        const updatedObjectives = objectives.filter((obj) => obj.id !== id)
        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    const handleDeleteKeyResult = (objectiveID: string, resultID: string) => {
        const updatedObjectives = objectives.map((obj) => {
            if (obj.id === objectiveID) {
                const updatedResults = obj.results.filter(
                    (res) => res.id !== resultID
                )
                return { ...obj, results: updatedResults }
            }
            return obj
        })
        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    const handleAddObjective = () => {
        const newObjective: Objective = {
            id: `obj-${Date.now()}`,
            title: "New Objective",
            description: "Description here...",
            status: "planned",
            startDate: new Date(),
            deadline: new Date(),
            progressPercentage: "0%",
            assignees: [],
            results: [],
        }
        const updatedObjectives = [...objectives, newObjective]
        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    const handleAddKeyResult = (objectiveID: string) => {
        const updatedObjectives = objectives.map((obj) => {
            if (obj.id === objectiveID) {
                const newResult: Result = {
                    id: `res-${Date.now()}`,
                    objectiveID,
                    title: "New Key Result",
                    description: "Description here...",
                    targetValue: 0,
                    currentValue: 0,
                    initialValue: 0,
                    progressPercentage: 0,
                    status: "on track",
                    owner: null,
                    deadline: new Date(),
                    startDate: new Date(),
                    weight: 1,
                }
                return { ...obj, results: [...obj.results, newResult] }
            }
            return obj
        })
        setLocalObjectives(updatedObjectives)
        setObjectives(updatedObjectives)
    }

    return (
        <div
            className={`${
                className || "objective-view"
            } p-6 bg-white text-black min-h-screen gap-11 flex flex-col`}
        >
            <h1 className="text-xl font-bold mb-4 border-b border-black border-opacity-20 pb-2">
                objectives
            </h1>
            <button
                onClick={handleAddObjective}
                className="bg-black text-white px-4 py-2 mb-4 border border-black hover:bg-gray-800 w-fit"
            >
                Add Objective
            </button>
            {objectives.length > 0 ? (
                objectives.map((objective) => (
                    <div
                        key={objective.id}
                        className="objective-item p-16 pb-16  border-black my-4"
                    >
                        <div className="flex items-center">
                            <button
                                onClick={() =>
                                    handleDeleteObjective(objective.id)
                                }
                                className="text-nowrap font-bold mr-8 text-red-500 border border-red-500 px-2 py-1 hover:bg-red-500 hover:text-white"
                            >
                                delete objective
                            </button>
                            <input
                                type="text"
                                value={objective.title}
                                onChange={(e) =>
                                    handleObjectiveChange(
                                        objective.id,
                                        "title",
                                        e.target.value
                                    )
                                }
                                className="bg-white text-black font-bold  w-full border-black border-opacity-20 my-2 focus:outline-none text-lg"
                            />
                        </div>
                        <textarea
                            value={objective.description}
                            onChange={(e) =>
                                handleObjectiveChange(
                                    objective.id,
                                    "description",
                                    e.target.value
                                )
                            }
                            className="bg-white text-black border-black w-full mt-2 p-2 focus:outline-none"
                        />
                        <div className="flex gap-4">
                            <p>Assignees:</p>
                            {objective.assignees.map((user) => (
                                <div key={user.id} className="relative group">
                                    <img
                                        className="h-16 w-16 border mb-10"
                                        src={user.imageURL}
                                        alt={user.username}
                                        onClick={() =>
                                            handleRemoveAssignee(
                                                objective.id,
                                                user.id
                                            )
                                        }
                                    />
                                    <p className="absolute hidden group-hover:block text-xs text-red-500 -bottom-2">
                                        Remove
                                    </p>
                                </div>
                            ))}
                            <button
                                className="h-16 w-16 flex border mb-10 items-center justify-center text-3xl hover:cursor-pointer"
                                onClick={() => handleOpenModal(objective.id)}
                            >
                                +
                            </button>
                        </div>

                        <div className="mt-4">
                            <p>Progress: {objective.progressPercentage}</p>
                            <div className="w-[75%] bg-gray-300 h-2 mt-2">
                                <div
                                    className="bg-3 h-2"
                                    style={{
                                        width: objective.progressPercentage,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="results mt-4">
                            <h4 className="font-bold mt-16 mb-8">
                                Key Results
                            </h4>
                            {objective.results.map((result) => (
                                <div
                                    key={result.id}
                                    className="pb-16 px-32 mb-4"
                                >
                                    <button
                                        onClick={() =>
                                            handleDeleteKeyResult(
                                                objective.id,
                                                result.id
                                            )
                                        }
                                        className="font-bold mr-8 mb-4 text-red-500 border border-red-500 px-2 py-1 hover:bg-red-500 hover:text-white"
                                    >
                                        Delete Key Result
                                    </button>
                                    <input
                                        type="text"
                                        value={result.title}
                                        onChange={(e) =>
                                            handleResultChange(
                                                objective.id,
                                                result.id,
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        className="bg-white text-black font-bold border-black border-opacity-20 my-2 focus:outline-none w-full"
                                    />
                                    <textarea
                                        value={result.description}
                                        onChange={(e) =>
                                            handleResultChange(
                                                objective.id,
                                                result.id,
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        className="bg-white text-black w-full mt-2 p-1 focus:outline-none"
                                    />
                                    <div className="flex items-center mt-2">
                                        <label className="mr-2">
                                            Deadline:
                                        </label>
                                        <input
                                            type="date"
                                            value={
                                                result.deadline
                                                    .toString()
                                                    .split("T")[0]
                                            }
                                            onChange={(e) =>
                                                handleResultChange(
                                                    objective.id,
                                                    result.id,
                                                    "deadline",
                                                    new Date(e.target.value)
                                                )
                                            }
                                            className="border border-black px-2 py-1"
                                        />
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <label className="mr-2">Weight:</label>
                                        <select
                                            value={result.weight}
                                            onChange={(e) =>
                                                handleResultChange(
                                                    objective.id,
                                                    result.id,
                                                    "weight",
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="border border-black px-2 py-1"
                                        >
                                            {[1, 2, 3, 4, 5].map((w) => (
                                                <option key={w} value={w}>
                                                    {w}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-2">
                                        <p>
                                            Progress:{" "}
                                            {result.progressPercentage}%
                                        </p>
                                        <div className="w-[75%] bg-gray-300 h-2">
                                            <div
                                                className="bg-5 h-2"
                                                style={{
                                                    width: `${result.progressPercentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex space-x-2 mt-2">
                                            <button
                                                onClick={() =>
                                                    decrementProgress(
                                                        objective.id,
                                                        result.id
                                                    )
                                                }
                                                className="bg-1 text-white px-4 py-1 hover:bg-yellow-600"
                                            >
                                                -
                                            </button>
                                            <button
                                                onClick={() =>
                                                    incrementProgress(
                                                        objective.id,
                                                        result.id
                                                    )
                                                }
                                                className="bg-1 text-white px-4 py-1 hover:bg-green-600"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => handleAddKeyResult(objective.id)}
                                className="bg-gray-800 text-white px-3 py-1 mt-2 border border-black hover:bg-gray-700"
                            >
                                Add Key Result
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No objectives available</p>
            )}
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h3 className="text-lg font-bold mb-4">Select User</h3>
                        <ul className="space-y-2">
                            {availableUsers.map((user) => (
                                <li
                                    key={user.id}
                                    className="flex items-center justify-between border p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelectUser(user.id)}
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={user.imageURL}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span>{user.username}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ObjectiveView
