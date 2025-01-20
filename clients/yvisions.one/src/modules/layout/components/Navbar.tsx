import React from "react"

// Components
import CLogoSection from "../../core/components/CLogoSection"

// Icons
import { FaTachometerAlt, FaBrain, FaTasks } from "react-icons/fa"
import { GiStairsGoal } from "react-icons/gi"
import { FaPerson } from "react-icons/fa6"
import { MdOutlineDataThresholding } from "react-icons/md"

import { Link } from "react-router-dom"
import { IconType } from "react-icons"

interface NavbarProps {
    isHorizontal: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isHorizontal }) => {
    const renderLinkButton = (
        endpointWithoutSlash: string,
        title: string,
        subtitle?: string,
        IconComponent?: IconType
    ) => {
        return (
            <Link
                to={endpointWithoutSlash}
                className={`
                            flex justify-start items-center hover:text-gray-400 py-4 px-4
                                ${
                                    document.URL.endsWith(
                                        "/" + endpointWithoutSlash
                                    )
                                        ? "bg-1 bg-opacity-10"
                                        : ""
                                }
                            `}
            >
                <div
                    className={`flex flex-col items-end justify-center ${
                        IconComponent && "mr-4"
                    }`}
                >
                    <p>{title}</p>
                    <p className="text-xs opacity-40">{subtitle}</p>
                </div>
                {IconComponent && <IconComponent className="text-2xl" />}
            </Link>
        )
    }

    return (
        <nav
            className={`
                bg-white text-black z-40
                    sticky top-0
                ${isHorizontal ? "" : ""}
            `}
        >
            <div
                className={`
                    mx-auto flex
                
                    ${
                        isHorizontal
                            ? "container justify-between items-center"
                            : "h-full flex-col pl-16 pr-4 text-nowrap py-6 z-10 items-end text-end "
                    }
                `}
            >
                <div className="px-4">
                    <CLogoSection />
                </div>

                <hr className="w-full my-8" />

                <div
                    className={`
                        text-end
                        items-end
                flex h-full
                ${isHorizontal ? "space-x-12" : "flex-col space-y-4"}
                `}
                >
                    {renderLinkButton(
                        "tadvisor",
                        "T-Advisor",
                        "ai agent",
                        FaBrain
                    )}
                    {renderLinkButton(
                        "home",
                        "Compass",
                        "dashboards",
                        MdOutlineDataThresholding
                    )}
                    {renderLinkButton(
                        "objective",
                        "Objectives",
                        "key-results",
                        GiStairsGoal
                    )}
                    {renderLinkButton("task", "Sprints", "board", FaTasks)}

                    {/* {renderLinkButton("me", "Profile", "me", FaPerson)} */}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
