import React from "react"

interface CLogoSectionProps {
    lightMode?: boolean
    className?: string
    isHorizontal?: boolean
}

const CLogoSection: React.FC<CLogoSectionProps> = ({
    lightMode = false,
    className = "",
    isHorizontal = false,
}: CLogoSectionProps) => {
    return (
        <div
            className={`flex items-center
        ${isHorizontal ? "flex-row" : "flex-col"}
         gap-2 py-1`}
        >
            <img
                src="/brand/raw.png"
                alt="Logo"
                className={`w-16 h-16 ${lightMode ? "" : ""} ${className}`}
            />
            {isHorizontal && (
                <span
                    className={`font-bold ${
                        lightMode ? "text-black" : "text-black font-normal"
                    }`}
                >
                    |
                </span>
            )}
            <span
                className={`font-bold ${
                    lightMode ? "text-white" : "text-black"
                }`}
            >
                yvisions.one
            </span>
        </div>
    )
}

export default CLogoSection
