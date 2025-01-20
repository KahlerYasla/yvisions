import React from "react"
import CTabs, { Tab } from "../../core/components/CTabs"
import { Bar, Doughnut, Line, Pie, Radar } from "react-chartjs-2"
import { utils, writeFile } from "xlsx"
import { useObjective } from "../../objective/hooks/useObjective"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale,
} from "chart.js"
import { useUser } from "../../auth/hooks/useUser"
import { Objective } from "../../objective/types/Objective"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    RadialLinearScale
)

const CompassView = () => {
    const { objectives }: { objectives: Objective[] } = useObjective()
    const users = useUser((c) => c.dummyUsers)

    const handleExportToExcel = (data: any, fileName: string) => {
        const worksheet = utils.json_to_sheet(data)
        const workbook = utils.book_new()
        utils.book_append_sheet(workbook, worksheet, "Report")
        writeFile(workbook, fileName)
    }

    const renderTable = (data: any) => {
        if (!data || data.length === 0) {
            return <div className="text-gray-500">No data available.</div>
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200 rounded-md">
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th
                                    key={key}
                                    className="px-4 py-2 border-b bg-gray-100 text-left"
                                >
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row: any, index: number) => (
                            <tr key={index} className="border-b">
                                {Object.entries(row).map(
                                    ([key, value], idx) => (
                                        <td
                                            key={idx}
                                            className="px-4 py-2 break-words max-w-[200px]"
                                        >
                                            {typeof value === "object" &&
                                            value !== null
                                                ? JSON.stringify(value)
                                                : String(value)}
                                        </td>
                                    )
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    const userObjectiveData = users.map((user: { username: string }) => ({
        username: user.username,
        objectivesAssigned: objectives.filter(
            (obj: { assignees: { username: string }[] }) =>
                obj.assignees.some(
                    (assignee: { username: string }) =>
                        assignee.username === user.username
                )
        ).length,
    }))

    const keyResultsByUser = users.map((user: { username: string }) => ({
        username: user.username,
        keyResultsContributed: objectives.reduce(
            (
                count: number,
                obj: { assignees: { username: string }[]; results: any[] }
            ) =>
                obj.assignees.some(
                    (assignee: { username: string }) =>
                        assignee.username === user.username
                )
                    ? count + obj.results.length
                    : count,
            0 // Initial value
        ),
    }))

    const tabs: Tab[] = [
        {
            title: "Objectives Overview",
            content: (
                <div className="space-y-8">
                    <Bar
                        data={{
                            labels: objectives.map((obj) => obj.title),
                            datasets: [
                                {
                                    label: "Progress",
                                    data: objectives.map((obj) =>
                                        Number(
                                            obj.progressPercentage.replace(
                                                "%",
                                                ""
                                            )
                                        )
                                    ),
                                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                                    borderColor: "rgba(75, 192, 192, 1)",
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />
                    {renderTable(objectives)}
                    <button
                        className="bg-green-700 font-bold text-white px-4 py-2 hover:bg-green-800"
                        onClick={() =>
                            handleExportToExcel(
                                objectives,
                                "objectives_overview.xlsx"
                            )
                        }
                    >
                        Export Objectives
                    </button>
                </div>
            ),
        },
        {
            title: "Key Results Overview",
            content: (
                <div className="space-y-8">
                    <Pie
                        data={{
                            labels: objectives.map((obj) => obj.title),
                            datasets: [
                                {
                                    label: "Key Results",
                                    data: objectives.map(
                                        (obj) => obj.results.length
                                    ),
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.2)",
                                        "rgba(54, 162, 235, 0.2)",
                                        "rgba(255, 206, 86, 0.2)",
                                    ],
                                    borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />
                    {renderTable(
                        objectives.map((obj) => ({
                            title: obj.title,
                            keyResults: obj.results.length,
                        }))
                    )}
                    <button
                        className="bg-green-700 font-bold text-white px-4 py-2 hover:bg-green-800"
                        onClick={() =>
                            handleExportToExcel(
                                objectives,
                                "key_results_overview.xlsx"
                            )
                        }
                    >
                        Export Key Results
                    </button>
                </div>
            ),
        },
        {
            title: "Completion Trends",
            content: (
                <div className="space-y-8">
                    <Line
                        data={{
                            labels: objectives.map((obj) => obj.title),
                            datasets: [
                                {
                                    label: "Completion Rate (%)",
                                    data: objectives.map((obj) =>
                                        Number(
                                            obj.progressPercentage.replace(
                                                "%",
                                                ""
                                            )
                                        )
                                    ),
                                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                                    borderColor: "rgba(153, 102, 255, 1)",
                                    borderWidth: 2,
                                },
                            ],
                        }}
                    />
                    {renderTable(
                        objectives.map((obj) => ({
                            title: obj.title,
                            completion: obj.progressPercentage,
                        }))
                    )}
                    <button
                        className="bg-green-700 font-bold text-white px-4 py-2 hover:bg-green-800"
                        onClick={() =>
                            handleExportToExcel(
                                objectives,
                                "completion_trends.xlsx"
                            )
                        }
                    >
                        Export Completion Trends
                    </button>
                </div>
            ),
        },
        {
            title: "Objectives per User",
            content: (
                <div className="space-y-8">
                    <Bar
                        data={{
                            labels: userObjectiveData.map(
                                (user: { username: any }) => user.username
                            ),
                            datasets: [
                                {
                                    label: "Objectives Assigned",
                                    data: userObjectiveData.map(
                                        (user: { objectivesAssigned: any }) =>
                                            user.objectivesAssigned
                                    ),
                                    backgroundColor: "rgba(255, 159, 64, 0.2)",
                                    borderColor: "rgba(255, 159, 64, 1)",
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />
                    {renderTable(userObjectiveData)}
                    <button
                        className="bg-green-700 font-bold text-white px-4 py-2 hover:bg-green-800"
                        onClick={() =>
                            handleExportToExcel(
                                userObjectiveData,
                                "objectives_per_user.xlsx"
                            )
                        }
                    >
                        Export Report
                    </button>
                </div>
            ),
        },
        {
            title: "Key Results by Assignee",
            content: (
                <div className="space-y-8">
                    <Radar
                        data={{
                            labels: users.map(
                                (user: { username: any }) => user.username
                            ),
                            datasets: [
                                {
                                    label: "Key Results",
                                    data: users.map(
                                        (user: { username: string }) =>
                                            objectives.reduce(
                                                (count, obj) =>
                                                    obj.assignees.some(
                                                        (assignee) =>
                                                            assignee.username ===
                                                            user.username
                                                    )
                                                        ? count +
                                                          obj.results.length
                                                        : count,
                                                0
                                            )
                                    ),
                                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                                    borderColor: "rgba(54, 162, 235, 1)",
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />
                    {renderTable(
                        users.map((user: { username: string }) => ({
                            username: user.username,
                            keyResultsContributed: objectives.reduce(
                                (count, obj) =>
                                    obj.assignees.some(
                                        (assignee) =>
                                            assignee.username === user.username
                                    )
                                        ? count + obj.results.length
                                        : count,
                                0
                            ),
                        }))
                    )}
                    <button
                        className="bg-green-700 font-bold text-white px-4 py-2 hover:bg-green-800"
                        onClick={() =>
                            handleExportToExcel(
                                users.map((user: { username: string }) => ({
                                    username: user.username,
                                    keyResultsContributed: objectives.reduce(
                                        (count, obj) =>
                                            obj.assignees.some(
                                                (assignee) =>
                                                    assignee.username ===
                                                    user.username
                                            )
                                                ? count + obj.results.length
                                                : count,
                                        0
                                    ),
                                })),
                                "key_results_by_assignee.xlsx"
                            )
                        }
                    >
                        Export Report
                    </button>
                </div>
            ),
        },
        {
            title: "Assignee Contributions",
            content: (
                <div className="space-y-8">
                    <Doughnut
                        data={{
                            labels: users.map(
                                (user: { username: any }) => user.username
                            ),
                            datasets: [
                                {
                                    label: "Objectives Progress",
                                    data: users.map(
                                        (user: { username: string }) =>
                                            objectives
                                                .filter((obj) =>
                                                    obj.assignees.some(
                                                        (assignee) =>
                                                            assignee.username ===
                                                            user.username
                                                    )
                                                )
                                                .reduce(
                                                    (sum, obj) =>
                                                        sum +
                                                        Number(
                                                            obj.progressPercentage.replace(
                                                                "%",
                                                                ""
                                                            )
                                                        ),
                                                    0
                                                )
                                    ),
                                    backgroundColor: [
                                        "rgba(255, 99, 132, 0.2)",
                                        "rgba(54, 162, 235, 0.2)",
                                        "rgba(255, 206, 86, 0.2)",
                                    ],
                                    borderColor: [
                                        "rgba(255, 99, 132, 1)",
                                        "rgba(54, 162, 235, 1)",
                                        "rgba(255, 206, 86, 1)",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />
                    {renderTable(
                        users.map((user: { username: string }) => ({
                            username: user.username,
                            totalProgress: objectives
                                .filter((obj) =>
                                    obj.assignees.some(
                                        (assignee) =>
                                            assignee.username === user.username
                                    )
                                )
                                .reduce(
                                    (sum, obj) =>
                                        sum +
                                        Number(
                                            obj.progressPercentage.replace(
                                                "%",
                                                ""
                                            )
                                        ),
                                    0
                                ),
                        }))
                    )}
                    <button
                        className="bg-green-700 font-bold text-white px-4 py-2 hover:bg-green-800"
                        onClick={() =>
                            handleExportToExcel(
                                users.map((user: { username: string }) => ({
                                    username: user.username,
                                    totalProgress: objectives
                                        .filter((obj) =>
                                            obj.assignees.some(
                                                (assignee) =>
                                                    assignee.username ===
                                                    user.username
                                            )
                                        )
                                        .reduce(
                                            (sum, obj) =>
                                                sum +
                                                Number(
                                                    obj.progressPercentage.replace(
                                                        "%",
                                                        ""
                                                    )
                                                ),
                                            0
                                        ),
                                })),
                                "assignee_contributions.xlsx"
                            )
                        }
                    >
                        Export Report
                    </button>
                </div>
            ),
        },
    ]

    return (
        <div className="w-full pb-32">
            <CTabs tabs={tabs} />
        </div>
    )
}

export default CompassView
