import React, { useState } from "react"
import CTabs, { Tab } from "../../core/components/CTabs"
import { Pie } from "react-chartjs-2"
import { useObjective } from "../../objective/hooks/useObjective"
import { useUser } from "../../auth/hooks/useUser"
import { Objective } from "../../objective/types/Objective"
import axios from "axios"

interface OpenAIResponse {
    choices: {
        message: {
            content: string
        }
    }[]
}

const TadvisorView = () => {
    const { objectives }: { objectives: Objective[] } = useObjective()
    const users = useUser((c) => c.dummyUsers)

    const [safeBuffer, setSafeBuffer] = useState("")
    const [openAISuggestions, setOpenAISuggestions] = useState(null)
    const [loading, setLoading] = useState(false) // Loading state

    const generateSuggestions = async () => {
        setLoading(true) // Start loading
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an OKR advisor. Provide only a valid JSON response. Do not include any other text or formatting outside of the JSON. Create anyways even you do not have enough data",
                        },
                        {
                            role: "user",
                            content: `Evaluate these objectives: ${JSON.stringify(
                                objectives
                            )} and suggest new key results and objectives. Create anyways even you do not have enough data, never return something like Not enough data. Made up if needed`,
                        },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                    },
                }
            )

            const data = response.data as OpenAIResponse
            const content = data.choices[0]?.message?.content

            if (content) {
                try {
                    const parsedContent = JSON.parse(content)
                    setOpenAISuggestions(parsedContent)
                    setSafeBuffer(content)
                } catch (error) {
                    console.error("Error parsing OpenAI response:", error)
                }
            }
        } catch (error) {
            console.error("Failed to fetch suggestions:", error)
        } finally {
            setLoading(false) // Stop loading
        }
    }

    const renderSuggestionCards = (suggestions: any) => {
        if (!suggestions) {
            return <p className="bg-gray-50 border p-8">{safeBuffer}</p>
        }

        return (
            <div className="w-full">
                {safeBuffer && (
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-bold mb-4">
                            AI Suggestions Via JSON Format (easy to export and
                            use as a report)
                        </h3>
                        <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                            {JSON.stringify(JSON.parse(safeBuffer), null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        )
    }

    const tabs: Tab[] = [
        {
            title: "Tadvisor Dashboard",
            content: (
                <div className="space-y-8">
                    <div className="w-96 h-96">
                        <Pie
                            data={{
                                labels: [
                                    "Low Progress (<50%)",
                                    "Moderate Progress (50-80%)",
                                    "High Progress (>80%)",
                                ],
                                datasets: [
                                    {
                                        data: [
                                            objectives.filter(
                                                (obj) =>
                                                    Number(
                                                        obj.progressPercentage.replace(
                                                            "%",
                                                            ""
                                                        )
                                                    ) < 50
                                            ).length,
                                            objectives.filter(
                                                (obj) =>
                                                    Number(
                                                        obj.progressPercentage.replace(
                                                            "%",
                                                            ""
                                                        )
                                                    ) >= 50 &&
                                                    Number(
                                                        obj.progressPercentage.replace(
                                                            "%",
                                                            ""
                                                        )
                                                    ) < 80
                                            ).length,
                                            objectives.filter(
                                                (obj) =>
                                                    Number(
                                                        obj.progressPercentage.replace(
                                                            "%",
                                                            ""
                                                        )
                                                    ) >= 80
                                            ).length,
                                        ],
                                        backgroundColor: [
                                            "rgba(255, 99, 132, 0.2)",
                                            "rgba(255, 206, 86, 0.2)",
                                            "rgba(75, 192, 192, 0.2)",
                                        ],
                                        borderColor: [
                                            "rgba(255, 99, 132, 1)",
                                            "rgba(255, 206, 86, 1)",
                                            "rgba(75, 192, 192, 1)",
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                        />
                    </div>
                    <button
                        className="bg-green-700 font-bold text-white px-4 py-2 hover:bg-blue-800 flex items-center"
                        onClick={generateSuggestions}
                        disabled={loading} // Disable button during loading
                    >
                        {loading ? (
                            <span className="loader spinner-border spinner-border-sm mr-2">
                                GENERATING RESPONSE...
                            </span>
                        ) : (
                            "Generate Suggestions via AI"
                        )}
                    </button>
                    {renderSuggestionCards(openAISuggestions)}
                </div>
            ),
        },
    ]

    return (
        <div className="w-full flex pb-32">
            <CTabs tabs={tabs} className="w-full flex" />
        </div>
    )
}

export default TadvisorView
